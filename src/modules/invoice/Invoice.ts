import { FieldConfig } from "../../types/FieldConfig";

export interface Invoice {
  id?: string; // UUID
  invoice_id: string;
  invoice_sight: string;
  client_id: string;
  invoice_date: string;
  due_date?: string;
  billing_address: string;
  shipping_address?: string;
  subtotal: number;
  tax: number;
  total: number;
  status: "PAID" | "UNPAID" | "PARTIALLY_PAID";
  notes?: string;
}


export const invoiceFields: FieldConfig[] = [
  //{ name: "invoice_id", label: "Invoice ID", type: "text", required: true },
  { name: "invoice_sight", label: "Invoice Sight", type: "text", required: true },
  { name: "client_id", label: "Client", type: "select", required: true }, // will populate dynamically
  { name: "invoice_date", label: "Invoice Date", type: "date", required: true },
  { name: "due_date", label: "Due Date", type: "date", required: false },
  { name: "billing_address", label: "Billing Address", type: "text", required: true },
  { name: "shipping_address", label: "Shipping Address", type: "text", required: false },
  { name: "subtotal", label: "Subtotal", type: "number", required: true },
  { name: "tax", label: "Tax", type: "number", required: true,defaultValue: 0  },
  {
    name: "total",
    label: "Total",
    type: "number",
    required: true,
    disabled: true, // read-only in the form
    computeValue: (form: Record<string, any>) => {
      const subtotal = parseFloat(form.subtotal) || 0;
      const tax = parseFloat(form.tax) || 0;
      return subtotal + tax;
    },
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Paid", value: "PAID" },
      { label: "Unpaid", value: "UNPAID" },
      { label: "Partially Paid", value: "PARTIALLY_PAID" },
    ],
    required: true,
  },
  { name: "notes", label: "Notes", type: "text", required: false },
];

export const invoiceTableColumns = [
  //{ name: "invoice_id", label: "Invoice ID" },
  { name: "invoice_sight", label: "Invoice Sight" },
  { name: "client_id", label: "Client" }, // optional: replace with client name if needed
  { name: "invoice_date", label: "Invoice Date" },
  { name: "due_date", label: "Due Date" },
  { name: "subtotal", label: "Subtotal" },
  { name: "tax", label: "Tax" },
  { name: "total", label: "Total" },
  { name: "status", label: "Status" },
];


