import axios from "axios"; // Change if needed

// export const getInvoices = () =>
//   axios.get<Invoice[]>(API).then((res) => res.data);

import { Invoice } from "./Invoice";


const API = "http://localhost:4000/Invoices";

// Final returned Invoice has { client: { client_id, name } }
export const getInvoices = async (): Promise<Invoice[]> => {
  const [invoicesData, clientsData] = await Promise.all([
    fetch("http://localhost:4000/Invoices").then((res) => res.json()),
    fetch("http://localhost:4000/Clients").then((res) => res.json()),
  ]);

  // Create map of client_id => { client_id, name }
  const clientMap = clientsData.reduce(
    (acc: Record<string, { client_id: string; name: string }>, client: any) => {
      acc[client.client_id] = {
        client_id: client.client_id,
        name: client.name,
      };
      return acc;
    },
    {}
  );

  // Enrich each invoice with just the client_id + name
  const enrichedInvoices: Invoice[] = invoicesData.map((invoice: any) => ({
    ...invoice,
    client: clientMap[invoice.client_id] || {
      client_id: invoice.client_id,
      name: "Unknown",
    },
  }));
  return enrichedInvoices;
};


// Get single invoice by invoice_id (UUID)
export const getInvoice = (invoice_id: string) =>
  axios.get<Invoice[]>(`${API}?invoice_id=${invoice_id}`).then((res) => res.data[0]);

// Create new invoice (invoice_id will be generated backend or manually)
export const createInvoice = (data: Omit<Invoice, "invoice_id">) =>
  axios.post<Invoice>(API, {
    ...data,
    invoice_id: crypto.randomUUID(), // OR generate with uuidv4()
  });

// Update invoice using internal `id` (depends on what json-server uses as primary key)
export const updateInvoice = (id: string, data: Omit<Invoice, "invoice_id">) =>
  axios.patch<Invoice>(`${API}/${id}`, data); // You must use the json-server's primary key here (usually `id`, not invoice_id)

// Delete invoice
export const deleteInvoice = (id: string) =>
  axios.delete(`${API}/${id}`);// export interface Invoice {