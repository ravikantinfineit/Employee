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

const EmployeeFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(!!id);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      getEmployee(Number(id)).then((data) => {
        if (data) setInitialValues(data);
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = (formData: Record<string, any>) => {
    const employeeData = formData as Omit<Employee, "id">;
    const submit = async () => {
      if (isEdit) {
        await updateEmployee(Number(id), employeeData);
      } else {
        await createEmployee(employeeData);
      }
      navigate("/dashboard/employees");
    };
    submit();
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Employee</h2>
      <DynamicForm
        fields={employeeFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EmployeeFormPage;
