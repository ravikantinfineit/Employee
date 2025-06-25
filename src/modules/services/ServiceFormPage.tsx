import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { getService, createService, updateService } from "./ServiceApi";
import { serviceFields, Service } from "./Services";

interface Props {
  initialValues?: Partial<Service>;
  onClose?: () => void;
  onSuccess?: (service: Service) => void;
}

const ServiceFormPage: React.FC<Props> = ({
  initialValues = {},
  onClose,
  onSuccess,
}) => {
  const { service_id } = useParams<{ service_id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<Service>>(initialValues);
  const [loading, setLoading] = useState(!!service_id);
  const isEditFromRoute = !!service_id && !initialValues?.service_id;

  useEffect(() => {
    if (isEditFromRoute) {
      getService(service_id).then((data) => {
        if (data) setFormValues(data);
        setLoading(false);
      });
    } else {
      setFormValues(initialValues);
      setLoading(false);
    }
  }, [service_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const serviceData = formData as Omit<Service, "service_id">;

    if (service_id) {
      await updateService(service_id, serviceData);
    } else if (initialValues?.id) {
      await updateService(initialValues.id as string, serviceData);
    } else {
      const newService = await createService(serviceData);
      onSuccess?.(newService.data);
    }
    debugger;
    onClose?.();
    if (onClose) {
      navigate("/dashboard/services", {
        replace: true,
        state: { refresh: true },
      });
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {service_id || initialValues?.service_id ? "Edit" : "Add"} Service
      </h2>
      <DynamicForm
        fields={serviceFields}
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ServiceFormPage;
