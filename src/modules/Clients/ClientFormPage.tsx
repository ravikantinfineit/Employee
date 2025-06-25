import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { getClient, createClient, updateClient } from "./ClientApi";
import { clientFields, Client } from "./Clients";

interface Props {
  initialValues?: Partial<Client>;
  onClose?: () => void;
  onSuccess?: (client: Client) => void;
}

const ClientFormPage: React.FC<Props> = ({
  initialValues = {},
  onClose,
  onSuccess,
}) => {
  const { client_id } = useParams<{ client_id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<Client>>(initialValues);
  const [loading, setLoading] = useState(!!client_id);
  const isEditFromRoute = !!client_id && !initialValues?.client_id;

  useEffect(() => {
    if (isEditFromRoute) {
      getClient(client_id).then((data) => {
        if (data) setFormValues(data);
        setLoading(false);
      });
    } else {
      setFormValues(initialValues);
      setLoading(false);
    }
  }, [client_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const clientData = formData as Omit<Client, "client_id">;

    if (client_id) {
      await updateClient(client_id, clientData);
    } else if (initialValues?.id) {
      await updateClient(initialValues.id as string, clientData);
    } else {
      const newClient = await createClient(clientData);
      onSuccess?.(newClient.data);
    }
    debugger;
    onClose?.();
    if (onClose) {
      navigate("/dashboard/clients", {
        replace: true,
        state: { refresh: true },
      });
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {client_id || initialValues?.client_id ? "Edit" : "Add"} Client
      </h2>
      <DynamicForm
        fields={clientFields}
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ClientFormPage;
