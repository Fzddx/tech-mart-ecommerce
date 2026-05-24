import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-row">
        <h1>Tech Mart</h1>

        <div className="nav-actions">
          {username && <span className="nav-user">Hi, {username}</span>}

          {role !== "admin" && (
            <>
              <Link
                className={`nav-link ${
                  location.pathname === "/products" ? "nav-link-active" : ""
                }`}
                to="/products"
              >
                Products
              </Link>
    
              <Link
                className={`nav-link ${
                  location.pathname === "/cart" ? "nav-link-active" : ""
                }`}
                to="/cart"
              >
                Cart
              </Link>
            </>
          )}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;