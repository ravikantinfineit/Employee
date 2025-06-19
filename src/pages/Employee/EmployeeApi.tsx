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
  { id: 3, name: "Robert Johnson", email: "robert@example.com", position: "Designer", salary: 48000 },
  { id: 4, name: "Emily Brown", email: "emily@example.com", position: "HR", salary: 52000 },
  { id: 5, name: "Michael Davis", email: "michael@example.com", position: "Support", salary: 45000 },
  { id: 6, name: "Sarah Miller", email: "sarah@example.com", position: "Product Owner", salary: 68000 },
  { id: 7, name: "William Wilson", email: "william@example.com", position: "QA Engineer", salary: 47000 },
  { id: 8, name: "Linda Taylor", email: "linda@example.com", position: "Business Analyst", salary: 55000 },
  { id: 9, name: "David Anderson", email: "david@example.com", position: "Team Lead", salary: 65000 },
  { id: 10, name: "Susan Thomas", email: "susan@example.com", position: "Frontend Developer", salary: 54000 },
  { id: 11, name: "Kevin Jackson", email: "kevin@example.com", position: "Backend Developer", salary: 56000 },
  { id: 12, name: "Lisa White", email: "lisa@example.com", position: "Recruiter", salary: 43000 },
  { id: 13, name: "Mark Harris", email: "mark@example.com", position: "DevOps Engineer", salary: 62000 },
  { id: 14, name: "Patricia Martin", email: "patricia@example.com", position: "UI/UX Designer", salary: 51000 },
  { id: 15, name: "Charles Thompson", email: "charles@example.com", position: "System Admin", salary: 49000 },
  { id: 16, name: "Barbara Garcia", email: "barbara@example.com", position: "Scrum Master", salary: 60000 },
  { id: 17, name: "Daniel Martinez", email: "daniel@example.com", position: "Tech Lead", salary: 70000 },
  { id: 18, name: "Jennifer Robinson", email: "jennifer@example.com", position: "Marketing Manager", salary: 58000 },
  { id: 19, name: "Paul Clark", email: "paul@example.com", position: "Sales Executive", salary: 47000 },
  { id: 20, name: "Nancy Rodriguez", email: "nancy@example.com", position: "Data Analyst", salary: 53000 },
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
