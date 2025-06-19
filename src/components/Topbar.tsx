import { FaUserCircle } from "react-icons/fa";

// Type assertion
const UserIcon = FaUserCircle as React.ComponentType<{ size?: number; className?: string }>;

const Topbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Employee Management</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <UserIcon className="rounded-full text-gray-600" size={32} />
      </div>
    </div>
  );
};

export default Topbar;