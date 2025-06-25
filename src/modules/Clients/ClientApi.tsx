import axios from "axios";
import {Client} from "./Clients"


const API = "http://localhost:4000/Clients"; // Change if needed

export const getClients = () =>
  axios.get<Client[]>(API).then((res) => res.data);

// Get single client by client_id (UUID)
export const getClient = (client_id: string) =>
  axios.get<Client[]>(`${API}?client_id=${client_id}`).then((res) => res.data[0]);

// Create new client (client_id will be generated backend or manually)
export const createClient = (data: Omit<Client, "client_id">) =>
  axios.post<Client>(API, {
    ...data,
    client_id: crypto.randomUUID(), // OR generate with uuidv4()
  });

// Update client using internal `id` (depends on what json-server uses as primary key)
export const updateClient = (id: string, data: Omit<Client, "client_id">) =>
  axios.patch<Client>(`${API}/${id}`, data); // You must use the json-server's primary key here (usually `id`, not client_id)

// Delete client
export const deleteClient = (id: string) =>
  axios.delete(`${API}/${id}`);// export interface Client {