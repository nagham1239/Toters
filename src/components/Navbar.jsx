import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // For managing cookies
import { FaShoppingCart, FaBars, FaTimes, FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if the user is logged in by checking the cookie
  const isLoggedIn = !!Cookies.get("userSession");

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Toters</h2>
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/About" onClick={() => setMenuOpen(false)}>About us</Link>
        {/* Show Cart link only if the user is logged in */}
        {isLoggedIn && (
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <FaShoppingCart /> Cart
          </Link>
        )}

        {/* Show Order Tracking link only if the user is logged in */}
        {isLoggedIn && (
          <Link to="/order-tracking" onClick={() => setMenuOpen(false)}>
            Track Order
          </Link>
        )}
        {isLoggedIn && (
          <button  onClick={() => {setMenuOpen(false),Cookies.remove("userSession")}}>
            logout
          </button>
        )}
        {/* Show Login/Sign Up links only if the user is NOT logged in */}
        {!isLoggedIn && (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <FaUser /> Login
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;