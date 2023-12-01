import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ authRoles }) => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();

  if (authRoles.find((authRole) => authRole === role)) {
    return <Outlet />;
  } else {
    if (role) return <Navigate to="/home" state={{ from: location }} replace />;
    else return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
