import React from "react";

const Topbar: React.FC = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Employee Management</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="rounded-full w-8 h-8"
        />
      </div>
    </div>
  );
};

export default Topbar;
