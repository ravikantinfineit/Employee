import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { getUser, createUser, updateUser } from "./UsersApi";
import { userFields, User } from "./Users";

interface Props {
  initialValues?: Partial<User>;
  onClose?: () => void;
  onSuccess?: (user: User) => void;
}

const UserFormPage: React.FC<Props> = ({
  initialValues = {},
  onClose,
  onSuccess,
}) => {
  const { user_id } = useParams<{ user_id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<User>>(initialValues);
  const [loading, setLoading] = useState(!!user_id);
  const isEditFromRoute = !!user_id && !initialValues?.user_id;

  useEffect(() => {
    if (isEditFromRoute) {
      getUser(user_id).then((data) => {
        if (data) setFormValues(data);
        setLoading(false);
      });
    } else {
      setFormValues(initialValues);
      setLoading(false);
    }
  }, [user_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const userData = formData as Omit<User, "user_id">;

    if (user_id) {
      await updateUser(user_id, userData);
    } else if (initialValues?.id) {
      await updateUser(initialValues.id as string, userData);
    } else {
      const newUser = await createUser(userData);
      onSuccess?.(newUser.data);
    }
    onClose?.();
    if (onClose) {
      navigate("/dashboard/users", {
        replace: true,
        state: { refresh: true },
      });
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {user_id || initialValues?.user_id ? "Edit" : "Add"} User
      </h2>
      <DynamicForm
        fields={userFields}
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserFormPage;
