import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const SignupPatient = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when signup starts

    if (!username || !password || password !== confirmPassword) {
      setError("All fields are required & passwords must match!");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : { message: "Signup failed" }; // Handle potential parsing errors
        throw new Error(data.message || "Signup failed");
      }

      const data = await response.json(); // Use response.json() for proper JSON parsing.
      alert(data.message);
      navigate("/patient-login");
    } catch (error) {
      setError(error.message || "Server error, please try again.");
    } finally {
      setLoading(false); // Set loading to false when signup finishes (success or error)
    }
  };

  return ( 
    <>
      {/* Modified navbar with only logo and text */}
      <nav className="navbar">
      <div className="logo-container">
                    <img src="/smartcare-logo.png" alt="SmartCare Logo" className="logo" />
                    <span className="logo-text">SmartCare</span>
                </div>
      </nav>
      
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Patient Signup</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSignup} className="signup-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`signup-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/patient-login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPatient;