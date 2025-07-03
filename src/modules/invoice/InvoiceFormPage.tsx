import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { getInvoice, createInvoice, updateInvoice } from "./InvoiceApi";
import { invoiceFields as baseInvoiceFields, Invoice } from "./Invoice";
import { getClients } from "../Clients/ClientApi";
import { Client } from "../Clients/Clients";
import { FieldConfig } from "../../types/FieldConfig";

interface Props {
  initialValues?: Partial<Invoice>;
  onClose?: () => void;
  onSuccess?: (invoice: Invoice) => void;
}

const InvoiceFormPage: React.FC<Props> = ({
  initialValues = {},
  onClose,
  onSuccess,
}) => {
  const { invoice_id } = useParams<{ invoice_id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<Invoice>>({});
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const isEditFromRoute = !!invoice_id && !initialValues?.invoice_id;

  useEffect(() => {
    const loadForm = async () => {
      try {
        const clients = await getClients();

        const clientOptions = clients.map((client: Client) => ({
          label: client.name,
          value: client.client_id,
        }));

        const updatedFields = baseInvoiceFields(clients).map((field) =>
          field.name === "client_id"
            ? ({
                ...field,
                type: "select",
                options: clientOptions,
                required: true,
              } as FieldConfig)
            : field
        );

        setFields(updatedFields);

        // Load invoice data if editing via URL param
        if (isEditFromRoute) {
          const data = await getInvoice(invoice_id);
          if (data) {
            setFormValues({
              ...data,
              client_id: data.client?.client_id ?? data.client_id,
            });
          }
        } else {
          // Load initialValues passed via props
          setFormValues({
            ...initialValues,
            client_id: initialValues.client?.client_id ?? initialValues.client_id,
          });
        }
      } catch (error) {
        console.error("Error loading invoice form:", error);
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [invoice_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const invoiceData = formData as Omit<Invoice, "invoice_id">;
console.log("Submitting invoice data:", invoiceData);
    try {
      if (invoice_id) {
        await updateInvoice(invoice_id, invoiceData);
      } else if (initialValues?.id) {
        await updateInvoice(initialValues.id, invoiceData);
      } else {
        const newInvoice = await createInvoice(invoiceData);
        onSuccess?.(newInvoice.data);
      }

      onClose?.();
      if (onClose) {
        navigate("/dashboard/invoices", {
          replace: true,
          state: { refresh: true },
        });
      }
    } catch (error) {
      console.error("Failed to submit invoice:", error);
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {invoice_id || initialValues?.invoice_id ? "Edit" : "Add"} Invoice
      </h2>
      <DynamicForm
        fields={fields}
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default InvoiceFormPage;
