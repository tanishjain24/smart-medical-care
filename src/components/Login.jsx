import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ role }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueId, setUniqueId] = useState(""); // Only for doctors
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate input fields based on role
    if (!username || !password || (role === "doctor" && !uniqueId)) {
      setError("All required fields must be filled!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role === "doctor" ? { username, password, uniqueId, role } : { username, password, role }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Invalid JSON response:", text);
        setError("Unexpected server response. Please try again.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.message || "Login failed.");
        setLoading(false);
        return;
      }

      alert(data.message);

      // Navigation Logic:
      if (role === "patient") {
        navigate("/otp-verification"); // Navigate to OTP verification for patients
      } else if (role === "doctor") {
        navigate("/doctor-dashboard"); // Navigate to doctor dashboard for doctors
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Error logging in. Please try again.");
    } finally {
      setLoading(false);
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
      <h2 className="signup-title">
        {role === "patient" ? "Patient" : "Doctor"} Login
      </h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="signup-form">
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
        {role === "doctor" && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Unique ID"
              className="form-input"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className={`signup-button ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="login-link">
        {role === "patient" ? (
          <p>
            Don't have an account? <a href="/patient-signup">Sign up</a>
          </p>
        ) : (
          <p>
            Don't have an account? <a href="/doctor-signup">Sign up</a>
          </p>
        )}
      </div>
    </div>
  </div>    </>
  );
};

export default Login;
