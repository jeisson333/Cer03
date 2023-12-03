/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const RequireAuth = ({ authRoles }) => {
  const location = useLocation();
  try {
    const { role } = cookies.get("auth");
    if (authRoles.find((authRole) => authRole === role)) {
      return <Outlet />;
    } else {
      if (role)
        return <Navigate to="/home" state={{ from: location }} replace />;
      else return <Navigate to="/" state={{ from: location }} replace />;
    }
  } catch (error) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
