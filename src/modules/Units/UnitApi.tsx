import axios from "axios";
import {Unit} from "./Units"


const API = "http://localhost:4000/Units"; // Change if needed

export const getUnits = () =>
  axios.get<Unit[]>(API).then((res) => res.data);

// Get single unit by unit_id (UUID)
export const getUnit = (unit_id: string) =>
  axios.get<Unit[]>(`${API}?unit_id=${unit_id}`).then((res) => res.data[0]);

// Create new employee (employee_id will be generated backend or manually)
export const createUnit = (data: Omit<Unit, "unit_id">) =>
  axios.post<Unit>(API, {
    ...data,
    unit_id: crypto.randomUUID(), // OR generate with uuidv4()
  });

// Update unit using internal `id` (depends on what json-server uses as primary key)
export const updateUnit = (id: string, data: Omit<Unit, "unit_id">) =>
  axios.patch<Unit>(`${API}/${id}`, data); // You must use the json-server's primary key here (usually `id`, not unit_id)

// Delete unit
export const deleteUnit = (id: string) =>
  axios.delete(`${API}/${id}`);// export interface Unit {