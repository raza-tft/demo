import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "1rem" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
