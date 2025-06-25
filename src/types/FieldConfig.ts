// types/FieldConfig.ts
export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select"; // Add more types if needed
  required?: boolean;
  options?: { label: string; value: string }[]; // For select fields
}
