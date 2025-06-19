import React, { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { getEmployees, saveEmployees } from "../utils/storage";

export const EmployeeList: React.FC<{
  refresh: boolean;
  onEdit: (employee: Employee) => void;
}> = ({ refresh, onEdit }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setEmployees(getEmployees());
  }, [refresh]);

  const handleDelete = (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    const updated = employees.filter((e) => e.id !== id);
    saveEmployees(updated);
    setEmployees(updated);
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Position</th>
            <th className="p-2">Salary</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="p-2">{emp.id}</td>
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">{emp.position}</td>
              <td className="p-2">₹{emp.salary}</td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(emp)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
