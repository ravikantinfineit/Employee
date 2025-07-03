import axios from "axios";
import {InvoiceItem} from "./Items"


const API = "http://localhost:4000/Invoice_items"; // Change if needed

export const getInvoiceItems = () =>
  axios.get<InvoiceItem[]>(API).then((res) => res.data);

// Get single invoice by invoice_item_id (UUID)
export const getInvoiceItem = (invoice_item_id: string) =>
  axios.get<InvoiceItem[]>(`${API}?invoice_item_id=${invoice_item_id}`).then((res) => res.data[0]);

// Create new invoice (invoice_item_id will be generated backend or manually)
export const createInvoiceItem = (data: Omit<InvoiceItem, "invoice_item_id">) =>
  axios.post<InvoiceItem>(API, {
    ...data,
    invoice_item_id: crypto.randomUUID(), // OR generate with uuidv4()
  });

// Update invoice using internal `id` (depends on what json-server uses as primary key)
export const updateInvoiceItem = (id: string, data: Omit<InvoiceItem, "invoice_item_id">) =>
  axios.patch<InvoiceItem>(`${API}/${id}`, data); // You must use the json-server's primary key here (usually `id`, not invoice_id)

// Delete invoice
export const deleteInvoiceItem = (id: string) =>
  axios.delete(`${API}/${id}`);// export interface InvoiceItem {