import { Outlet } from "react-router-dom";
import Sidebar from "../compnents/Sidebar";

const AdminDashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
