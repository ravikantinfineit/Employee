import { Employee } from "../types/Employee";

const STORAGE_KEY = "employees";

export const getEmployees = (): Employee[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveEmployees = (employees: Employee[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

export const deleteEmployee = (id: string) => {
  const employees = getEmployees().filter(emp => emp.id !== id);
  saveEmployees(employees);
};
