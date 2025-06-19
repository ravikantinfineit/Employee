import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCogs, FaIdBadge } from "react-icons/fa";
import { logout } from "../utils/auth";

// Define icons with type assertion
const Icons = {
  User: FaUserCircle as React.ComponentType<{
    size?: number;
    className?: string;
  }>,
  Logout: FaSignOutAlt as React.ComponentType<{
    size?: number;
    className?: string;
  }>,
  Settings: FaCogs as React.ComponentType<{
    size?: number;
    className?: string;
  }>,
  Profile: FaIdBadge as React.ComponentType<{
    size?: number;
    className?: string;
  }>,
};

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    setDropdownOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Employee Management</h1>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-600"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span>Admin</span>
          <Icons.User size={32} className="rounded-full" />
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border shadow rounded z-10 w-44">
            <button
              onClick={() => handleNavigate("/profile")}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            >
              <Icons.Profile className="text-gray-500" />
              Profile
            </button>
            <button
              onClick={() => handleNavigate("/settings")}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
            >
              <Icons.Settings className="text-gray-500" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              <Icons.Logout />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
