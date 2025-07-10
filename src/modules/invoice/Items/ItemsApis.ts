import axios from "axios";
import {InvoiceItem} from "./Items"
import { Service } from "../../Services/Services";
import { Unit } from "../../Units/Units";


const API = `${process.env.REACT_APP_API_URL}/Invoice_items`; // Change if needed
const UNITAPI=`${process.env.REACT_APP_API_URL}/Units`;
const SERVICEAPI=`${process.env.REACT_APP_API_URL}/Services`;

// export const getInvoiceItems = (invoice_id:string) =>
//   axios.get<InvoiceItem[]>(API).then((res) => res.data);
export const getInvoiceItems = (invoice_id: string) =>
  axios
    .get<InvoiceItem[]>(`${API}?invoice_id=${invoice_id}`)
    .then((res) => res.data);
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

export interface EnrichedInvoiceItem {
  description: string;
  quantity : number;
  unit_price: number;
  total_price: number;
  unit_name: string;
}

export const getEnrichedInvoiceItems = async (
  invoice_id: string
): Promise<EnrichedInvoiceItem[]> => {
  // Fetch all required data
  const [invoiceItems, services, units] = await Promise.all([
    axios
      .get<InvoiceItem[]>(`${API}?invoice_id=${invoice_id}`)
      .then((res) => res.data),
    axios.get<Service[]>(SERVICEAPI).then((res) => res.data),
    axios.get<Unit[]>(UNITAPI).then((res) => res.data),
  ]);
  console.log(invoiceItems,services,units)

  const serviceMap = services.reduce((acc, svc) => {
    acc[svc.service_id] = svc;
    return acc;
  }, {} as Record<string, Service>);

  const unitMap = units.reduce((acc, unit) => {
    acc[unit.unit_id] = unit.name;
    return acc;
  }, {} as Record<string, string>);

  // Enrich each invoice item
  return invoiceItems.map((item) => {
    const service = serviceMap[item.service_id];
    const unitName =
      service && service.unit_id
        ? unitMap[service.unit_id] || "N/A"
        : "N/A";

    return {
      description: item.description,
      quantity:item.quantity,
      unit_price: Number(item.unit_price),
      total_price: Number(item.total_price),
      unit_name: unitName,
    };
  });
};