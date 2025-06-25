import { FieldConfig } from "../../types/FieldConfig";

export interface Employee {
  id?:string;
  employee_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;      // ISO format date as string
  date_of_joining: string;    // ISO format date as string
  address: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
}
export const employeeFields: FieldConfig[] = [
  //{ name: "employee_id", label: "Employee ID", type: "text", required: true },
  { name: "first_name", label: "First Name", type: "text", required: true },
  { name: "last_name", label: "Last Name", type: "text", required: true },
  { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
  { name: "date_of_joining", label: "Date of Joining", type: "date", required: true },
  { name: "address", label: "Address", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "position", label: "Position", type: "text", required: true },
  { name: "department", label: "Department", type: "text", required: true },
  { name: "salary", label: "Salary", type: "number", required: true },
];

export const employeeTableColumns = [
 // { name: "employee_id", label: "Employee ID" },
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
  { name: "position", label: "Position" },
  { name: "department", label: "Department" },
  { name: "salary", label: "Salary" },
  { name: "date_of_birth", label: "Date of Birth" },
  { name: "date_of_joining", label: "Date of Joining" },
  { name: "address", label: "Address" },
];
