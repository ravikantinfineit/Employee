import { Employee } from "../types/Employee";
import data from "../data/employee.json";
import { getEmployees, saveEmployees } from "./storage";

export const initializeEmployeeData = () => {
  const employees = getEmployees();
  if (employees.length === 0) {
    saveEmployees(data as Employee[]);
  }
};
