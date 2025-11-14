// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AddHotelButton from "../admin/AddHotelButton";
import { logout } from "../store/authSlice";
import UserNotification from "../User/UserNotification";
import AdminNotification from "../admin/AdminNotification";

import "./Nav.css";

const Navbar = ({ onLogin, onSignup }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleLogout = () => dispatch(logout());
  const userName = user?.email ? user.email.split("@")[0] : "";

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="navbar-title">🏨 Hotel App</h1>
        <a href="#home" className="nav-link">Home</a>
        {user && <span className="welcome">Welcome, {userName}</span>}
      </div>

      <div className="nav-center">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search hotels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />
        </div>
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <button className="nav-btn" onClick={onLogin}>Login</button>
            <button className="nav-btn signup" onClick={onSignup}>Signup</button>
          </>
        ) : (
          <>
            {user.role === "user" && <UserNotification />}
            {/* {user.role === "admin" && <AdminNotificationBell />} */}
            {user.role === "admin" && <AdminNotification />}
            {user.role === "admin" && <AddHotelButton />}
            <button className="nav-btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
