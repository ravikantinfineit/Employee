// types/FieldConfig.ts
export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select"; // Add more types if needed
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number; // Default value for number fields
  options?: { label: string; value: string }[]; // For select fields
  computeValue?: (form: Record<string, any>) => any; // 👈 new
}
