/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const RequireAuth = ({
  authRoles,
  Typesubscription = ["free", "basic", "premium"],
}) => {
  const location = useLocation();
  try {
    const { role, subscription } = cookies.get("auth");
    if (authRoles.find((authRole) => authRole === role)) {
      if (Typesubscription.find((type) => type === subscription))
        return <Outlet />;
    } else {
      if (role)
        return <Navigate to="/home" state={{ from: location }} replace />;
      else return <Navigate to="/" state={{ from: location }} replace />;
    }
  } catch (error) {
    cookies.set("auth", {}, { path: "/" });
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
