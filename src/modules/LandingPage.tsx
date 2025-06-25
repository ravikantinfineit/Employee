import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./LoginPage";

const LandingPage = () => {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setInfo(location.state.message);
      // Clear message on navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">MyCompany</h1>
          <nav className="space-x-6 hidden md:block">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Notification */}
      {info && (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2">
          {info}
        </div>
      )}

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to MyCompany</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          We provide professional solutions for all your management needs including employee, billing, and invoicing systems.
        </p>
      </section>

      {/* Modal Login */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <LoginForm onSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
