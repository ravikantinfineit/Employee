import axios from "axios";
import {User} from "./Users"


const API = `${process.env.REACT_APP_API_URL}/Users`; // Change if needed

export const getUsers = () =>
  axios.get<User[]>(API).then((res) => res.data);

// Get single user by user_id (UUID)
export const getUser = (user_id: string) =>
  axios.get<User[]>(`${API}?user_id=${user_id}`).then((res) => res.data[0]);

// Create new employee (user_id will be generated backend or manually)
export const createUser = (data: Omit<User, "user_id">) =>
  axios.post<User>(API, {
    ...data,
    user_id: crypto.randomUUID(), // OR generate with uuidv4()
  });

// Update user using internal `id` (depends on what json-server uses as primary key)
export const updateUser = (id: string, data: Omit<User, "user_id">) =>
  axios.patch<User>(`${API}/${id}`, data); // You must use the json-server's primary key here (usually `id`, not user_id)

// Delete user
export const deleteUser = (id: string) =>
  axios.delete(`${API}/${id}`);// export interface User {

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  const response = await axios.get<User[]>(`${API}?email=${email}&password=${password}`);
  return response.data.length > 0 ? response.data[0] : null;
};