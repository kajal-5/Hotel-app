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
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
        <br></br>
        <button type="button" className="forgot-link" onClick={onForgot}>
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default Login;
