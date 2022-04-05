import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";
import Button from "./Button";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div style={styles.nav}>
      <span
        style={{
          color: "grey",
          marginRight: "2rem",
        }}
      >
        {auth?.user?.email}
      </span>
      <Button onClick={() => (auth.isLoggedIn ? dispatch(logout()) : null)}>
        {auth.isLoggedIn ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default Navbar;

const styles = {};

styles.nav = {
  borderBottom: "1px solid #e5e5e5",
  textAlign: "right",
  padding: "1rem 2rem",
};
