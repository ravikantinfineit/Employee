import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../types/Employee";
import { getEmployees, deleteEmployee } from "./EmployeeApi"; // <-- your mock API
import DynamicTable from "../../components/DynamicTable";
import { FieldConfig } from "../../types/FieldConfig";

const employeeFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "position", label: "Position", type: "text", required: true },
  { name: "salary", label: "Salary", type: "number", required: true },
];

const EmployeesListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  // ✅ Load data from your mock API
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    await deleteEmployee(id);
    loadEmployees(); // Refresh list
  };

  const handleEdit = (row: Record<string, any>) => {
    navigate(`/employees/edit/${row.id}`);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <button
          onClick={() => navigate("/employees/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Employee
        </button>
      </div>

      <DynamicTable
        columns={employeeFields.map(field => field.name)}
        data={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeesListPage;
