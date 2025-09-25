import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = (e) => {
    logout();
  };

  return (
    <header>
      <div className="Navbar">
        <button>&#9776;</button>
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
    </header>
  );
};

export default Navbar;
