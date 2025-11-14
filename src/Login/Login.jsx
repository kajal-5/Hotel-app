import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Email and password cannot be empty!");
      return;
    }
    setLoading(true);
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      alert("Login successful!");
      if (result.role === "admin") navigate("/admin");
      else navigate("/user");

      setEmail("");
      setPassword("");
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button type="button" className="forgot-link" onClick={onForgot}>
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default Login;
















// // import React, { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { loginUser } from "../store/authSlice";
// // import { useNavigate } from "react-router-dom";
// // import "./Login.css";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loading, setLoading] = useState(false); // to disable button while processing
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     const trimmedEmail = email.trim();
// //     const trimmedPassword = password.trim();
// //     if (!trimmedEmail || !trimmedPassword) {
// //       alert("Email and password cannot be empty or spaces only!");
// //       return;
// //     }

// //     setLoading(true); // disable button

// //     try {
// //       const result = await dispatch(loginUser({ email, password })).unwrap();

// //       // clear inputs
// //       setEmail("");
// //       setPassword("");

// //       navigate(result.role === "admin" ? "/admin" : "/user");
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setLoading(false); // enable button again
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <h2>Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
// //           required
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           required
// //         />
// //         <button type="submit" disabled={loading}>
// //           {loading ? "Logging in..." : "Login"}
// //         </button>

// //         <button
// //           type="button"
// //           className="secondary-btn"
// //           onClick={() => navigate("/signup")}
// //           disabled={loading}
// //         >
// //           Create Account
// //         </button>

// //         <button
// //           type="button"
// //           onClick={() => navigate("/forgot-password")}
// //           disabled={loading}
// //         >
// //           Forgot Password?
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;






















// // // import React, { useState } from "react";
// // // import { useDispatch } from "react-redux";
// // // import { loginUser } from "../store/authSlice";
// // // import { useNavigate } from "react-router-dom";
// // // import "./Login.css";

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();

// // //     const trimmedEmail = email.trim();
// // //     const trimmedPassword = password.trim();
// // //     if (!trimmedEmail || !trimmedPassword) {
// // //       alert("Email and password cannot be empty or spaces only!");
// // //       return;
// // //     }

// // //     try {
// // //       const result = await dispatch(loginUser({ email, password })).unwrap();
// // //       navigate(result.role === "admin" ? "/admin" : "/user");
// // //     } catch (err) {
// // //       alert(err.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="auth-container">
// // //       <h2>Login</h2>
// // //       <form onSubmit={handleLogin}>
// // //         <input
// // //           type="email"
// // //           placeholder="Email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
// // //           required
// // //         />
// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           required
// // //         />
// // //         <button type="submit">Login</button>

// // //         <button
// // //           type="button"
// // //           className="secondary-btn"
// // //           onClick={() => navigate("/signup")}
// // //         >
// // //           Create Account
// // //         </button>
// // //         <button type="button" onClick={() => navigate("/forgot-password")}>
// // //           Forgot Password?
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
