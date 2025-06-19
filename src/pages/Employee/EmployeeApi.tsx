// import axios from "axios";
// interface Employee {
//   id: number;
//   name: string;
//   email: string;
//   position: string;
//   salary: number;
// }

// const API = "http://localhost:3011/api/v1/countries"; // Change if needed

// export const getEmployees = () => axios.get<Employee[]>(API).then(res => res.data);
// export const getEmployee = (id: number) => axios.get<Employee>(`${API}/${id}`).then(res => res.data);
// export const createEmployee = (data: Omit<Employee, "id">) => axios.post<Employee>(API, data);
// export const updateEmployee = (id: number, data: Omit<Employee, "id">) => axios.put(`${API}/${id}`, data);
// export const deleteEmployee = (id: number) => axios.delete(`${API}/${id}`);
export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
}

const dummyData: Employee[] = [
  { id: 1, name: "John Doe", email: "john@example.com", position: "Manager", salary: 60000 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", position: "Developer", salary: 50000 },
];

let EMPLOYEES: Employee[] = [...dummyData];

export const getEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...EMPLOYEES]), 300); // simulate delay
  });
};

export const getEmployee = (id: number): Promise<Employee | undefined> => {
  return new Promise((resolve) => {
    const emp = EMPLOYEES.find((e) => e.id === id);
    setTimeout(() => resolve(emp), 300);
  });
};

export const createEmployee = (data: Omit<Employee, "id">): Promise<Employee> => {
  return new Promise((resolve) => {
    const newEmployee: Employee = {
      id: EMPLOYEES.length ? EMPLOYEES[EMPLOYEES.length - 1].id + 1 : 1,
      ...data,
    };
    EMPLOYEES.push(newEmployee);
    setTimeout(() => resolve(newEmployee), 300);
  });
};

export const updateEmployee = (id: number, data: Omit<Employee, "id">): Promise<void> => {
  return new Promise((resolve) => {
    EMPLOYEES = EMPLOYEES.map((emp) => (emp.id === id ? { id, ...data } : emp));
    setTimeout(() => resolve(), 300);
  });
};

export const deleteEmployee = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    EMPLOYEES = EMPLOYEES.filter((emp) => emp.id !== id);
    setTimeout(() => resolve(), 300);
  });
};
