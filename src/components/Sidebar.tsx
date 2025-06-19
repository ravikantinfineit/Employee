import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded ${
      isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
    }`;

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/employees" className={linkClass}>
          Employees
        </NavLink>
        <NavLink to="/invoices" className={linkClass}>
          Invoices
        </NavLink>
        <NavLink to="/payslips" className={linkClass}>
          Payslips
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
