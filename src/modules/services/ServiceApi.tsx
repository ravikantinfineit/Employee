import axios from "axios";
import {Service} from "./Services"


const API = "http://localhost:4000/Services"; // Change if needed

export const getServices = () =>
  axios.get<Service[]>(API).then((res) => res.data);

// Get single service by service_id (UUID)
export const getService = (service_id: string) =>
  axios.get<Service[]>(`${API}?service_id=${service_id}`).then((res) => res.data[0]);

// Create new service (service_id will be generated backend or manually)
export const createService = (data: Omit<Service, "service_id">) =>
  axios.post<Service>(API, {
    ...data,
    service_id: crypto.randomUUID(), // OR generate with uuidv4()
  });

// Update service using internal `id` (depends on what json-server uses as primary key)
export const updateService = (id: string, data: Omit<Service, "service_id">) =>
  axios.put(`${API}/${id}`, data); // You must use the json-server's primary key here (usually `id`, not service_id)

// Delete service
export const deleteService = (id: string) =>
  axios.delete(`${API}/${id}`);// export interface Service {