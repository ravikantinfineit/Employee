import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeesListPage from "./pages/Employee/EmployeesListPage";
import EmployeeFormPage from "./pages/Employee/EmployeeFormPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="employees" element={<EmployeesListPage />} />
          <Route path="employees/add" element={<EmployeeFormPage />} />
          <Route path="/employees/edit/:id" element={<EmployeeFormPage/>} />
          <Route path="invoices" element={<div>Invoices Page</div>} />
          <Route path="payslips" element={<div>Payslips Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
