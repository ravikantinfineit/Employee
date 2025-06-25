
import { FieldConfig } from "../../types/FieldConfig";

export interface Service {
  id?: string; // optional UUID
  service_id: string;
  service_name: string;
  service_type: string;
  service_category: string;
  service_code: string;
  service_description: string;
  description: string;
  unit_id: string;
  price: number;
}

export const serviceFields: FieldConfig[] = [
  // { name: "service_id", label: "Service ID", type: "text", required: true },
  { name: "service_name", label: "Service Name", type: "text", required: true },
  { name: "service_type", label: "Service Type", type: "text", required: true },
  { name: "service_category", label: "Service Category", type: "text", required: true },
  { name: "service_code", label: "Service Code", type: "text", required: true },
  { name: "service_description", label: "Service Description", type: "text", required: true },
  { name: "description", label: "Description", type: "text", required: true },
  { name: "unit_id", label: "Unit ID", type: "text", required: true },
  { name: "price", label: "Price", type: "number", required: true },
];

export const serviceTableColumns = [
  // { name: "service_id", label: "Service ID" },
  { name: "service_name", label: "Service Name" },
  { name: "service_type", label: "Service Type" },
  { name: "service_category", label: "Service Category" },
  { name: "service_code", label: "Service Code" },
  { name: "service_description", label: "Service Description" },
  { name: "description", label: "Description" },
  { name: "unit_id", label: "Unit ID" },
  { name: "price", label: "Price" },
];


