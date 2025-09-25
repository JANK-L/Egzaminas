import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [visible, setVisible] = useState(false);

  const handleLogout = (e) => {
    logout();
  };

  const handleHamburger = () => {
    setVisible(!visible);
  };

  return (
    <header>
      <div className="Navbar">
        <button onClick={handleHamburger}>&#9776;</button>
        <nav>
          <h2>
            <Link to="/">Rent A Something</Link>
          </h2>
          {user ? (
            <div className="Logout">
              <h2>Hello, {user.username}</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button className="login">
              <Link to={location.pathname === "/Login" ? "Signup" : "Login"}>
                Login/Signup
              </Link>
            </button>
          )}
        </nav>
      </div>
      <div className="sideNav" style={{ display: visible ? "flex" : "none" }}>
        <Link to={"/"}>Product List</Link>
        {user?.role === "user" && <Link to={"/"}>My reservations</Link>}
        {user?.role === "admin" && (
          <>
            <Link to={"/Equipment/add"}>Add Product</Link>
            <Link to={"/Equipment/edit"}>Edit Products</Link>
            <Link to={"/Reservation"}>reservation list</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
