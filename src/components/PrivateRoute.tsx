// components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
