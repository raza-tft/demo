import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLoggedIn) return <Navigate to="/login" />;

  return <Outlet />;
};

export default AuthGuard;
