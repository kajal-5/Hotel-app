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
import UserPage from "../User/UserPage";

import "./AppRouter.css";

const AppRouter = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // ✅ Close all modals
  const closeAllModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowForgot(false);
  };

  // ✅ Auto-verify token from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.token) {
      dispatch(verifyToken(savedUser.token))
        .unwrap()
        .then(() => {
          navigate(savedUser.role === "admin" ? "/admin" : "/user");
        })
        .catch(() => {
          localStorage.removeItem("user");
          navigate("/home");
        });
    } else {
      navigate("/home");
    }
  }, [dispatch, navigate]);

  return (
    <>
      {/* ✅ Always show navbar once */}
      <Navbar
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
      />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Role-based routes */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <AdminPage /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/user"
          element={
            user?.role === "user" ? <UserPage /> : <Navigate to="/home" />
          }
        />

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      {/* ✅ Login Modal */}
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

      {/* ✅ Signup Modal */}
      {showSignup && (
        <div className="modal-overlay">
          <div className="modal-box">
            <Signup onClose={closeAllModals} />
          </div>
        </div>
      )}

      {/* ✅ Forgot Password Modal */}
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




















// import React, { useState , useEffect} from "react";
// import Navbar from "../Navbar/Nav";
// import Home from "../Home/Home";
// import Login from "../login/Login";
// import Signup from "../login/Signup";
// import ForgotPassword from "../login/ForgotPassword";
// import "./AppRouter.css";
// import { useDispatch } from "react-redux";
// import { verifyToken } from "../store/authSlice";
// import { useNavigate } from "react-router-dom"; 
// import AdminPage from "../admin/AdminPage";
// import UserPage from "../User/UserPage";
// import { Routes, Route, Navigate } from "react-router-dom";

// const AppRouter = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [showForgot, setShowForgot] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//   const closeAllModals = () => {
//     setShowLogin(false);
//     setShowSignup(false);
//     setShowForgot(false);
//   };
//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     if (savedUser?.token) {
//       dispatch(verifyToken(savedUser.token))
//         .unwrap()
//         .then(() => {
//           navigate(savedUser.role === "admin" ? "/admin" : "/user");
//         })
//         .catch(() => {
//           localStorage.removeItem("user");
//           navigate("/home");
//         });
//     }
//   }, [dispatch, navigate]);

//   return (
//     <>
//       <Navbar
//         onLogin={() => setShowLogin(true)}
//         onSignup={() => setShowSignup(true)}
//       />
//       {/* <Home /> */}

//       {showLogin && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <Login
//               onClose={closeAllModals}
//               onForgot={() => {
//                 setShowForgot(true);
//                 setShowLogin(false);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {showSignup && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <Signup onClose={closeAllModals} />
//           </div>
//         </div>
//       )}

//       {showForgot && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <ForgotPassword onClose={closeAllModals} />
//           </div>
//         </div>
//       )}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="*" element={<Navigate to="/home" />} />
//       </Routes>
//     </>
//   );
// };

// export default AppRouter;
