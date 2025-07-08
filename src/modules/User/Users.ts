import { FieldConfig } from "../../types/FieldConfig";

export interface User {
  id?: string;
  user_id?: string; // Optional if using UUID or auto-generated
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER"; // Optional: enforce only allowed roles
  is_active?: boolean;
}

export const userFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { label: "Admin", value: "ADMIN" },
      { label: "User", value: "USER" },
    ],
    defaultValue: "USER",
  },
  {
    name: "is_active",
    label: "Active",
    type: "checkbox",
    required: true,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
    defaultValue: true,
  },
];

export const userTableColumns = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
  { name: "role", label: "Role" },
  { name: "is_active", label: "Active" },
];
