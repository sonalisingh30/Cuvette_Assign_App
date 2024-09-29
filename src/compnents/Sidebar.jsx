import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-slate-700 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <NavLink
            to="/admin/class"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive
                  ? "bg-slate-50 text-slate-700 font-semibold"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            Class
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/admin/teacher"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive
                  ? "bg-slate-50 text-slate-700 font-semibold"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            Teacher
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/admin/finance"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive
                  ? "bg-slate-50 text-slate-700 font-semibold"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white "
              }`
            }
          >
            Finance
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `flex px-4 py-2 rounded items-center gap-x-5 ${
                isActive
                  ? "bg-slate-50 text-slate-700"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white font-semibold"
              }`
            }
          >
            <CiLogout size={25} /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
