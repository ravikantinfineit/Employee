import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const PrivateRoute = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation();

  return isLoggedIn() ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ message: "Please log in to access the dashboard." }} />
  );
};

export default PrivateRoute;
