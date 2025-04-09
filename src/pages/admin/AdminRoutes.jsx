import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // For managing cookies
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import "./AdminRoutes.css";

const AdminRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove("userSession"); // Remove user session cookie
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin/dashboard" onClick={() => setSidebarOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" onClick={() => setSidebarOpen(false)}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" onClick={() => setSidebarOpen(false)}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/products" onClick={() => setSidebarOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
        <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "Close" : "Open"}
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>

        {/* Content Area */}
        <div className="content">
          <AdminPanel />
        </div>
      </div>
    </div>
  );
};

// Define routes for the admin panel
const AdminPanel = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;