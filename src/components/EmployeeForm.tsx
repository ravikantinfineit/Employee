import React, { useEffect, useState } from "react";
import { Employee } from "../types/Employee";
import { getEmployees, saveEmployees } from "../utils/storage";

const defaultEmployee = {
  name: "",
  email: "",
  position: "",
  salary: 0,
};

export const EmployeeForm: React.FC<{
  onAdd: () => void;
  editData?: Employee | null;
}> = ({ onAdd, editData }) => {
  const [employee, setEmployee] = useState(defaultEmployee);

  useEffect(() => {
    if (editData) setEmployee(editData);
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: name === "salary" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employees = getEmployees();

    let updatedList: Employee[] = [];

    if (editData) {
      updatedList = employees.map((emp) =>
        emp.id === editData.id ? { ...employee, id: emp.id } : emp
      );
    } else {
      const nextId =
        employees.length > 0
          ? Math.max(...employees.map((e) => Number(e.id))) + 1
          : 1;

      const newEmployee: Employee = {
        id: String(nextId),
        ...employee,
      };
      updatedList = [...employees, newEmployee];
    }

    saveEmployees(updatedList);
    setEmployee(defaultEmployee);
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white shadow rounded">
      <h3 className="text-lg font-semibold mb-2">
        {editData ? "Edit Employee" : "Add New Employee"}
      </h3>
      <input name="name" placeholder="Name" value={employee.name} onChange={handleChange} className="w-full border p-2" required />
      <input name="email" placeholder="Email" value={employee.email} onChange={handleChange} className="w-full border p-2" required />
      <input name="position" placeholder="Position" value={employee.position} onChange={handleChange} className="w-full border p-2" required />
      <input name="salary" type="number" placeholder="Salary" value={employee.salary} onChange={handleChange} className="w-full border p-2" required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {editData ? "Update" : "Add"}
      </button>
    </form>
  );
};
