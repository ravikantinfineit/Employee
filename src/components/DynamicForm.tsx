import React, { useEffect, useState } from "react";
import { FieldConfig } from "../types/FieldConfig";

interface Props {
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const DynamicForm: React.FC<Props> = ({
  fields,
  initialValues = {},
  onSubmit,
}) => {
  const [form, setForm] = useState<Record<string, any>>(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] ?? field.defaultValue ?? "";
      return acc;
    }, {} as Record<string, any>)
  );

  // 🧠 Auto-compute values if any field uses computeValue
  useEffect(() => {
    const updatedForm = { ...form };
    let changed = false;

    fields.forEach((field) => {
      if (typeof field.computeValue === "function") {
        const computed = field.computeValue(form);
        if (form[field.name] !== computed) {
          updatedForm[field.name] = computed;
          changed = true;
        }
      }
    });

    if (changed) {
      setForm(updatedForm);
    }
  }, [form, fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const splitFields =
    fields.length > 10
      ? [
          fields.slice(0, Math.ceil(fields.length / 2)),
          fields.slice(Math.ceil(fields.length / 2)),
        ]
      : [fields];

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div
        className={`grid gap-4 ${
          fields.length > 10 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {splitFields.map((columnFields, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {columnFields.map((field) => {
              const value = form[field.name];

              return (
                <div key={field.name} className="relative">
                  <label
                    htmlFor={field.name}
                    className="absolute left-[43%] -top-2.5 transform -translate-x-1/2 bg-white px-1 text-sm text-gray-500 transition-all 
                  peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-3 
                  peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600"
                  >
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={value}
                      onChange={handleChange}
                      required={field.required}
                      disabled={field.disabled}
                      className="peer w-full pt-3 pb-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="" disabled hidden>
                        Select {field.label}
                      </option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder=" "
                      required={field.required}
                      disabled={field.disabled}
                      value={value}
                      onChange={handleChange}
                      className="peer w-full pt-3 pb-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
