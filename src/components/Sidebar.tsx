import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { 
  FaTimes, 
  FaUsers, 
  FaFileInvoiceDollar, 
  FaMoneyBillWave 
} from "react-icons/fa";

// Type assertion for icons
const Icons = {
  Bars: FaBars as React.ComponentType<{ size?: number; className?: string }>,
  Times: FaTimes as React.ComponentType<{ size?: number; className?: string }>,
  Users: FaUsers as React.ComponentType<{ size?: number; className?: string }>,
  Invoice: FaFileInvoiceDollar as React.ComponentType<{ size?: number; className?: string }>,
  Money: FaMoneyBillWave as React.ComponentType<{ size?: number; className?: string }>
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center px-3 py-2 rounded transition-colors ${
      isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
    }`;

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      <div className="flex justify-between items-center mb-6">
        {!isCollapsed && <h2 className="text-2xl font-bold">Admin Panel</h2>}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-700">
          {isCollapsed ? (
            <Icons.Bars size={20} />
          ) : (
            <Icons.Times size={20} />
          )}
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard/employees" className={linkClass}>
          <Icons.Users className="mr-3" size={18} />
          {!isCollapsed && "Employees"}
        </NavLink>
        <NavLink to="/dashboard/Units" className={linkClass}>
          <Icons.Invoice className="mr-3" size={18} />
          {!isCollapsed && "Units"}
        </NavLink>
        <NavLink to="/dashboard/services" className={linkClass}>
          <Icons.Money className="mr-3" size={18} />
          {!isCollapsed && "Services"}
        </NavLink>
        <NavLink to="/dashboard/clients" className={linkClass}>
          <Icons.Users className="mr-3" size={18} />
          {!isCollapsed && "Clients"}
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;