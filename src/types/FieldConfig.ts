// types/FieldConfig.ts
export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "date" | "select"; // Add more types if needed
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number; // Default value for number fields
  options?: {
    label: string;
    value: string | number | boolean | Record<string, any>; // 👈 allow full objects
  }[];
  storeObject?: boolean; // 💡 store full object instead of just value
  valueKey?: string; 
  computeValue?: (form: Record<string, any>) => any; // 👈 new
}
