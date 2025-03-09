import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Shopninfo</h2>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>
          <FaShoppingCart /> Cart
        </Link>
        <Link to="/order-tracking" onClick={() => setMenuOpen(false)}>Track Order</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>
          <FaUser /> Login
        </Link>
        <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
