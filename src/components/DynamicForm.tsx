import React, { useState } from "react";
import { FieldConfig } from "../types/FieldConfig";

interface Props {
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const DynamicForm: React.FC<Props> = ({ fields, initialValues = {}, onSubmit }) => {
  const [form, setForm] = useState<Record<string, any>>(
    fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] || "";
      return acc;
    }, {} as Record<string, any>)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.label}
          required={field.required}
          value={form[field.name]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
