import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <header>
      <div className="Navbar">
        <button>&#9776;</button>
        <nav>
          <h1>
            <Link to="/">Rent A Something</Link>
          </h1>
          <button className="login">
            <Link to={location.pathname === "/Login" ? "Signup" : "Login"}>
              Login/Signup
            </Link>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
