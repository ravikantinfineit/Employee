import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Topbar />
        <main className="p-6 bg-gray-50 h-full overflow-y-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default Dashboard;
