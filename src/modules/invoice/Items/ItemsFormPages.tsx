import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../../components/DynamicForm";
import { getInvoiceItem, createInvoiceItem, updateInvoiceItem } from "./ItemsApis";
import { invoiceItemFields, InvoiceItem } from "./Items";
import { getServices } from "../../Services/ServiceApi"; // Adjust path to your Units API
import { Service } from "../../Services/Services"; // Adjust path to your Unit interface
import { FieldConfig } from "../../../types/FieldConfig";

interface Props {
  initialValues?: Partial<InvoiceItem>;
  onClose?: () => void;
  onSuccess?: (invoice: InvoiceItem) => void;
}

const InvoiceItemFormPage: React.FC<Props> = ({
  initialValues = {},
  onClose,
  onSuccess,
}) => {
  const { invoice_id } = useParams<{ invoice_id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<InvoiceItem>>(initialValues);
  const [fields, setFields] = useState<FieldConfig[]>(invoiceItemFields);
  const [loading, setLoading] = useState(!!invoice_id);

  const isEditFromRoute = !!invoice_id && !initialValues?.invoice_item_id;

  useEffect(() => {
    const loadForm = async () => {
      const services = await getServices();

      const serviceOptions = [
        { label: "Select Service", value: "" },
        ...services.map((service: Service) => ({
          label: service.service_name,
          value: service.service_id,
        })),
      ];

      const updatedFields = invoiceItemFields.map((field) =>
        field.name === "service_id"
          ? ({ ...field, type: "select", options: serviceOptions } as FieldConfig)
          : field
      );

      setFields(updatedFields);

      if (isEditFromRoute) {
        const data = await getInvoiceItem(invoice_id);
        if (data) setFormValues(data);
      } else {
        setFormValues(initialValues);
      }

      setLoading(false);
    };

    loadForm();
  }, [invoice_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const invoiceData = formData as Omit<InvoiceItem, "invoice_item_id">;

    if (invoice_id) {
      await updateInvoiceItem(invoice_id, invoiceData);
    } else if (initialValues?.invoice_item_id) {
      await updateInvoiceItem(initialValues.invoice_item_id as string, invoiceData);
    } else {
      const newInvoiceItem = await createInvoiceItem(invoiceData);
      onSuccess?.(newInvoiceItem.data);
    }

    onClose?.();
    if (onClose) {
      navigate("/invoices/items", {
        replace: true,
        state: { refresh: true },
      });
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {invoice_id || initialValues?.invoice_id ? "Edit" : "Add"} Invoice Item
      </h2>
      <DynamicForm
        fields={fields}
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default InvoiceItemFormPage;
