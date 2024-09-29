/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = true;

  // If authenticated, render the component, otherwise navigate to the login page
  return isAuthenticated ? <Component /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
