import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./pages/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import { Toaster } from "react-hot-toast";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";
import ClassPage from "./pages/ClassPage";
import TeacherPage from "./pages/TeacherPage";
import FinancePage from "./pages/FinancePage"; // Create this component if needed

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Protected routes */}
          <Route
            path="/dashboard/:userID/*"
            element={<ProtectedRoute element={DashboardLayout} />}
          >
            {/* Add protected routes here */}
          </Route>

          {/* Admin dashboard */}
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<Navigate to="class" replace />} />
            <Route path="class" element={<ClassPage />} />
            <Route path="teacher" element={<TeacherPage />} />
            <Route path="finance" element={<FinancePage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
