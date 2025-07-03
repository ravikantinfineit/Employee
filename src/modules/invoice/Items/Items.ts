import { FieldConfig } from "../../../types/FieldConfig";

export interface InvoiceItem {
  id?: string;
  invoice_item_id: string;
  invoice_id: string;
  service_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}


export const invoiceItemFields: FieldConfig[] = [
  { name: "service_id", label: "Service", type: "select", required: true }, // to populate dynamically
  { name: "description", label: "Description", type: "text", required: true },
  { name: "quantity", label: "Quantity", type: "number", required: true, defaultValue: 1 },
  { name: "unit_price", label: "Unit Price", type: "number", required: true, defaultValue: 0 },
  {
    name: "total_price",
    label: "Total Price",
    type: "number",
    required: true,
    disabled: true, // read-only
    computeValue: (form: Record<string, any>) => {
      const quantity = parseFloat(form.quantity) || 0;
      const unit_price = parseFloat(form.unit_price) || 0;
      return quantity * unit_price;
    },
  },
];

export const invoiceItemTableColumns = [
  { name: "description", label: "Description" },
  { name: "quantity", label: "Quantity" },
  { name: "unit_price", label: "Unit Price" },
  { name: "total_price", label: "Total Price" },
];
