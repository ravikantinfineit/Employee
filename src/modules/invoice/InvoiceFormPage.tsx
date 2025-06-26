import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { getInvoice, createInvoice, updateInvoice } from "./InvoiceApi";
import { invoiceFields, Invoice } from "./Invoice";
import { getClients } from "../Clients/ClientApi"; // Adjust path to your Units API
import { Client } from "../Clients/Clients"; // Adjust path to your Unit interface
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

  const [formValues, setFormValues] = useState<Partial<Invoice>>(initialValues);
  const [fields, setFields] = useState<FieldConfig[]>(invoiceFields);
  const [loading, setLoading] = useState(!!invoice_id);

  const isEditFromRoute = !!invoice_id && !initialValues?.invoice_id;

  useEffect(() => {
    const loadForm = async () => {
      const clients = await getClients();

      const clientOptions = [
        { label: "Select Client", value: "" },
        ...clients.map((client: Client) => ({
          label: client.name,
          value: client.client_id,
        })),
      ];

      const updatedFields = invoiceFields.map((field) =>
        field.name === "client_id"
          ? ({ ...field, type: "select", options: clientOptions } as FieldConfig)
          : field
      );

      setFields(updatedFields);

      if (isEditFromRoute) {
        const data = await getInvoice(invoice_id);
        if (data) setFormValues(data);
      } else {
        setFormValues(initialValues);
      }

      setLoading(false);
    };

    loadForm();
  }, [invoice_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const invoiceData = formData as Omit<Invoice, "invoice_id">;

    if (invoice_id) {
      await updateInvoice(invoice_id, invoiceData);
    } else if (initialValues?.id) {
      await updateInvoice(initialValues.id as string, invoiceData);
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
