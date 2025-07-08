import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DynamicForm from "../../../components/DynamicForm";
import {
  getInvoiceItem,
  createInvoiceItem,
  updateInvoiceItem,
} from "./ItemsApis";
import { invoiceItemFields, InvoiceItem } from "./Items";
import { getServices } from "../../Services/ServiceApi";
import { Service } from "../../Services/Services";
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
  const location = useLocation();
  const contextState = location.state || {};

  const [formValues, setFormValues] =
    useState<Partial<InvoiceItem>>(initialValues);
  const [fields, setFields] = useState<FieldConfig[]>(invoiceItemFields);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(!!invoice_id);
  const isEditFromRoute = !!invoice_id && !initialValues?.invoice_item_id;

  useEffect(() => {
    const loadForm = async () => {
      const servicesData = await getServices();
      setServices(servicesData); // ✅ Save services to state

      const serviceOptions = [
        { label: "Select Service", value: "" },
        ...servicesData.map((service: Service) => ({
          label: service.service_name,
          value: service.service_id,
        })),
      ];

      const updatedFields = invoiceItemFields.map((field) =>
        field.name === "service_id"
          ? {
              ...field,
              type: "select" as "select",
              options: serviceOptions,
            }
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

  // ✅ Auto-fill rate when service is selected
  const handleFieldChange = (fieldName: string, value: any) => {
    debugger;
    if (fieldName === "service_id") {
      const selectedService = services.find(
        (service) => service.service_id === value
      );
      const rate = selectedService?.price || 0;
      if (selectedService) {
        setFormValues((prev) => ({
          ...prev,
          service_id: value,
          unit_price: rate // auto-fill rate
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          service_id: value,
        }));
      }
    } else {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = async (formData: Record<string, any>) => {
    const invoiceData = formData as Omit<InvoiceItem, "invoice_item_id">;

    if (invoice_id) {
      await updateInvoiceItem(invoice_id, invoiceData);
    } else if (initialValues?.id) {
      await updateInvoiceItem(initialValues.id as string, invoiceData);
    } else {
      invoiceData.invoice_id = contextState.invoice_details.invoice_id;
      const newInvoiceItem = await createInvoiceItem(invoiceData);
      onSuccess?.(newInvoiceItem.data);
    }

    onClose?.();
    if (onClose) {
      navigate("/dashboard/invoices/items", {
        replace: true,
        state: { ...contextState, refresh: true },
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
        onChange={handleFieldChange} // ✅ Add this
      />
    </div>
  );
};

export default InvoiceItemFormPage;
