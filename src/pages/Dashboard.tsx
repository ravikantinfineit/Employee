import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { EmployeeForm } from "../components/EmployeeForm";
import { EmployeeList } from "../components/EmployeeList";
import { Employee } from "../types/Employee";

const Dashboard: React.FC = () => {
  const [view, setView] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<Employee | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleAddClick = () => {
    setEditData(null);         // Clear edit
    setView("form");           // Switch to add mode
  };

  const handleEdit = (employee: Employee) => {
    setEditData(employee);     // Set edit data
    setView("form");           // Show form
  };

  const handleFormSubmit = () => {
    setEditData(null);
    setRefresh(!refresh);      // Force list refresh
    setView("list");           // Back to list
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-grow bg-gray-50">
        <Topbar />

        <main className="p-6 overflow-y-auto">
          {view === "list" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Employee List</h2>
                <button
                  onClick={handleAddClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  + Add Employee
                </button>
              </div>
              <EmployeeList refresh={refresh} onEdit={handleEdit} />
            </div>
          )}

          {view === "form" && (
            <EmployeeForm onAdd={handleFormSubmit} editData={editData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
