import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm";
import { getEmployee, createEmployee, updateEmployee } from "./EmployeeApi";
import { employeeFields, Employee } from "../../types/Employee";

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
  const { employee_id } = useParams<{ employee_id: string }>();
  const navigate = useNavigate();

  const [formValues, setFormValues] =
    useState<Partial<Employee>>(initialValues);
  const [loading, setLoading] = useState(!!employee_id);
  const isEditFromRoute = !!employee_id && !initialValues?.employee_id;

  useEffect(() => {
    if (isEditFromRoute) {
      getEmployee(employee_id).then((data) => {
        if (data) setFormValues(data);
        setLoading(false);
      });
    } else {
      setFormValues(initialValues);
      setLoading(false);
    }
  }, [employee_id, initialValues, isEditFromRoute]);

  const handleSubmit = async (formData: Record<string, any>) => {
    const employeeData = formData as Omit<Employee, "employee_id">;

    if (employee_id) {
      await updateEmployee(employee_id, employeeData);
    } else if (initialValues?.id) {
      await updateEmployee(initialValues.id as string, employeeData);
    } else {
      const newEmp = await createEmployee(employeeData);
      onSuccess?.(newEmp.data);
    }
    debugger;
    onClose?.();
    if (onClose) {
      navigate("/dashboard/employees", {
        replace: true,
        state: { refresh: true },
      });
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {employee_id || initialValues?.employee_id ? "Edit" : "Add"} Employee
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
