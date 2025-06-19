import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Employees</a>
        <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Invoices</a>
        <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Payslips</a>
      </nav>
    </div>
  );
};

export default Sidebar;
