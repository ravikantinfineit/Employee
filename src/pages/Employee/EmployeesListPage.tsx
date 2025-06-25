import React, { useEffect, useState } from "react";
import { Employee } from "./Employee";
import { getEmployees, deleteEmployee } from "./EmployeeApi";
import DynamicTable from "../../components/DynamicTable";
import Modal from "../../components/Modal";
import EmployeeFormPage from "./EmployeeFormPage";
import { employeeTableColumns } from "./Employee";
import { useLocation } from "react-router-dom";

const EmployeesListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const location = useLocation();
  console.log("EmployeesListPage location state:", location);
  useEffect(() => {
    loadEmployees();
  }, [location.state]);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (employee_id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(employee_id);
      loadEmployees();
    }
  };

  const handleEdit = (row: Record<string, any>) => {
    setEditingEmployee(row as Employee);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    setModalOpen(false);
    await loadEmployees();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Employee
        </button>
      </div>

      <DynamicTable
        columns={employeeTableColumns}
        data={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <EmployeeFormPage
            key={editingEmployee?.employee_id || "new"}
            initialValues={editingEmployee || {}}
            onClose={() => setModalOpen(false)}
            onSuccess={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default EmployeesListPage;
