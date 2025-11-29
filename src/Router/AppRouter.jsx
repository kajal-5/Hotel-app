// AppRouter.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../store/authSlice";

import Navbar from "../Navbar/Nav";
import Home from "../Home/Home";
import Login from "../login/Login";
import Signup from "../login/Signup";
import ForgotPassword from "../login/ForgotPassword";
import AdminPage from "../admin/AdminPage";
// import UserPage from "../User/UserPage";


import Booking from "../admin/BookingReq/Booking";

import UserHotelPage from "../User/Userpage/UserHotelPage";
import Cart from "../User/Cart/Cart";
import BookingPage from "../User/Booking/Booking";
import CartPage from "../admin/Cart/CartPage";

import "./AppRouter.css";

const AppRouter = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const closeAllModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowForgot(false);
  };



  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    // If no token → go home
    if (!savedUser?.token) {
      navigate("/home");
      return;
    }

    dispatch(verifyToken(savedUser.token))
      .unwrap()
      .then(() => {
        // Redirect only when first loading the app
        if (window.location.pathname === "/") {
          navigate(savedUser.role === "admin" ? "/admin" : "/user");
        }
      })
      .catch(() => {
        localStorage.removeItem("user");
        navigate("/home");
      });

    // IMPORTANT: run only ONCE
  }, []);

  return (
    <>
      {/* Always visible Navbar */}
      <Navbar
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
      />

      {/* 👇 NEW WRAPPER TO FIX NAVBAR OVERLAP */}
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/home" />
            }
          />
          <Route
            path="/admin/booking"
            element={
              user?.role === "admin" ? <Booking /> : <Navigate to="/home" />
            }
          />

          <Route
            path="/user/booking"
            element={
              user?.role === "user" ? <BookingPage /> : <Navigate to="/home" />
            }
          />
          <Route
            path="/user"
            element={
              user?.role === "user" ? <UserHotelPage /> : <Navigate to="/home" />
            }
          />
          <Route
            path="/user/cart"
            element={
              user?.role === "user" ? <Cart/> : <Navigate to="/home" />
            }
          />

          <Route
            path="/user/booking"
            element={
              user?.role === "user" ? <BookingPage/> : <Navigate to="/home" />
            }
          />  
          <Route
            path="/admin/cart"
            element={
              user?.role === "admin" ? <CartPage/> : <Navigate to="/home" />
            }
          />         

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>

      {/* Login modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Login
              onClose={closeAllModals}
              onForgot={() => {
                setShowForgot(true);
                setShowLogin(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Signup modal */}
      {showSignup && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Signup onClose={closeAllModals} />
          </div>
        </div>
      )}

      {/* Forgot password modal */}
      {showForgot && (
        <div className="modal-overlay">
          <div className="modal-box">
            <ForgotPassword onClose={closeAllModals} />
          </div>
        </div>
      )}
    </>
  );
};

export default AppRouter;
