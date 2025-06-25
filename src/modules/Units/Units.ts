import { FieldConfig } from "../../types/FieldConfig";

export interface Unit {
  id?: string; // Optional if using UUID or auto-generated
  unit_id: string;
  name: string; 
  unit_code: string;
  description: string;
}

export const unitFields: FieldConfig[] = [
  // { name: "unit_id", label: "Unit ID", type: "text", required: true },
  { name: "name", label: "Name", type: "text", required: true },
  { name: "unit_code", label: "Unit Code", type: "text", required: true },
  { name: "description", label: "Description", type: "text", required: true },
];


export const unitTableColumns = [
  // { name: "unit_id", label: "Unit ID" },
  { name: "name", label: "Name" },
  { name: "unit_code", label: "Unit Code" },
  { name: "description", label: "Description" },
];
