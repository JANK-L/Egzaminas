import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="Navbar">
        <button>&#9776;</button>
        <nav>
          <h1>
            <Link to="/">Rent A Something</Link>
          </h1>
          <button className="login">
            <Link to="Login">Login/Signup</Link>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
