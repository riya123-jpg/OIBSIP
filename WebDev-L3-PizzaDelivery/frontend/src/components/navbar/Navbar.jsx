import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="/" className="navbar__logo">
          Sliceory
        </a>

        <nav className="navbar__links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#builder">Build Pizza</a>
          <a href="#how-it-works">How It Works</a>
        </nav>

        <div className="navbar__actions">
          <a href="/login" className="navbar__login">
            Login
          </a>

          <a href="/register" className="navbar__signup">
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
