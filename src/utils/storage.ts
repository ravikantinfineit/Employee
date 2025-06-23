import { Employee } from "../types/Employee";

const STORAGE_KEY = "employees_data";

export const getEmployees = (): Employee[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees: Employee[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

export const deleteEmployee = (employee_id: string) => {
  const updated = getEmployees().filter(emp => emp.employee_id !== employee_id);
  saveEmployees(updated);
};
