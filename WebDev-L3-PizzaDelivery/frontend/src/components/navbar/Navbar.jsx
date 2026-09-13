import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          Sliceory
        </Link>

        <nav className="navbar__links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <Link to="/builder">Build Pizza</Link>
          <a href="#how-it-works">How It Works</a>
        </nav>

        <div className="navbar__actions">
          <Link to="/login" className="navbar__login">
            Login
          </Link>

          <Link to="/register" className="navbar__signup">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
