import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AddHotelButton from "../admin/AddHotelButton";
import { logout } from "../store/authSlice";
import UserNotification from "../User/UserNotification";
import AdminNotification from "../admin/AdminNotification";
import { Link } from "react-router-dom";

import AdminHome from "../admin/AdminHome";

import "./Nav.css";
// import booking from "../admin/Booking";

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
        <Link to="/home" className="nav-link">
          Home
        </Link>
        {user && <span className="welcome">Welcome, {userName}</span>}
        {user?.role === "admin" && (
          <Link to="/admin/booking" className="nav-link">
            Booking
          </Link>
        )}
      </div>

      <div className="nav-center">
        <h3>Find the Best Hotel in low price</h3>
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <button className="nav-btn" onClick={onLogin}>
              Login
            </button>
            <button className="nav-btn signup" onClick={onSignup}>
              Signup
            </button>
          </>
        ) : (
          <>
            {user.role === "user" && <UserNotification />}
            {user.role === "admin" && <AdminNotification />}
            {user.role === "admin" && <AddHotelButton />}
            {user.role === "admin" && <AdminHome />}
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
