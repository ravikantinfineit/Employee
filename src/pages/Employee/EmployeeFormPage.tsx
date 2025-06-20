import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  Employee,
} from "./EmployeeApi";
import { FieldConfig } from "../../types/FieldConfig";

export const employeeFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "position", label: "Position", type: "text", required: true },
  { name: "salary", label: "Salary", type: "number", required: true },
];

interface Props {
  initialValues?: Partial<Employee>;
  onClose?: () => void;
  onSuccess?: (emp: Employee) => void;
}

const EmployeeFormPage: React.FC<Props> = ({
  initialValues = {},
  onClose,
  onSuccess,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<Partial<Employee>>(initialValues);
  const [loading, setLoading] = useState(!!id);

  const isEditFromRoute = !!id && !initialValues?.id;

  useEffect(() => {
    if (isEditFromRoute) {
      getEmployee(Number(id)).then((data) => {
        if (data) setFormValues(data);
        setLoading(false);
      });
    } else {
      setFormValues(initialValues);
      setLoading(false);
    }
  }, [id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const employeeData = formData as Omit<Employee, "id">;

    if (id) {
      await updateEmployee(Number(id), employeeData);
    } else if (initialValues?.id) {
      await updateEmployee(initialValues.id, employeeData);
    } else {
      const newEmp = await createEmployee(employeeData);
      onSuccess?.(newEmp);
    }
     setLoading(false);
    onClose?.();
    if (!onClose) navigate("/dashboard/employees");
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {(id || initialValues?.id) ? "Edit" : "Add"} Employee
      </h2>
      <DynamicForm
        fields={employeeFields}
        initialValues={formValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EmployeeFormPage;
