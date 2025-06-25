import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./modules/LandingPage";
import LoginPage from "./modules/LoginPage";
import Dashboard from "./modules/Dashboard";
import EmployeesListPage from "./modules/Employee/EmployeesListPage";
import EmployeeFormPage from "./modules/Employee/EmployeeFormPage";
import PrivateRoute from "./components/PrivateRoute";
import UnitsListPage from "./modules/Units/UnitsListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="employees" />} />
            <Route path="employees" element={<EmployeesListPage />} />
            <Route path="employees/add" element={<EmployeeFormPage />} />
            <Route path="employees/edit/:id" element={<EmployeeFormPage />} />
            <Route path="Units" element={<UnitsListPage />} />
            <Route path="payslips" element={<div>Payslips Page</div>} />
          </Route>
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
