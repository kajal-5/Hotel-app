import React, { useState } from "react";
import { API_KEY } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestType: "PASSWORD_RESET", email }),
      }
    );
    const data = await res.json();
    if (data.error) return alert(data.error.message);
    alert("Password reset email sent!");
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
          required
        />
        <button type="submit">Send Reset Link</button>
        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/login")}
        >
          Back toLogin
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
