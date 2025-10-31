import React from "react";
import "./Navbar.css";

export default function Navbar({ setPage, cartCount = 0 }) {
  const handleNavClick = (page) => {
    setPage(page);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Dual-Luxe</h2>

      <ul className="nav-links">
        <li onClick={() => handleNavClick("home")}>Home</li>
        <li onClick={() => handleNavClick("products")}>Products</li>
        <li onClick={() => handleNavClick("contact")}>Contact</li>
        <li onClick={() => handleNavClick("daily-rates")}>Daily Rates</li>
        <li onClick={() => handleNavClick("login")}>Login</li>

        {/* ✅ Cart with badge */}
        <li
          onClick={() => handleNavClick("cart")}
          style={{ position: "relative", cursor: "pointer" }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                background: "#ff6f61",
                color: "white",
                borderRadius: "50%",
                padding: "3px 7px",
                fontSize: "11px",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
