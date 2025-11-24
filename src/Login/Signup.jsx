import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../store/authSlice";
import "./Login.css";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Email and password cannot be empty!");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        signupUser({ email: trimmedEmail, password: trimmedPassword })
      ).unwrap();

      alert("Account created successfully!");

      // Reset form
      setEmail("");
      setPassword("");
      setConfirm("");

      // Close signup modal
      onClose();
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>

      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>


      </form>
    </div>
  );
};

export default Signup;
