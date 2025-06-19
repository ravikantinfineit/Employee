export type FieldType = "text" | "number" | "email" | "date" | "select";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[]; // only for select
}
