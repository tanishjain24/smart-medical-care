import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Ensure this import is present
const smartcareLogo = "/smartcare-logo.png";;
const RoleSelection = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSelection = () => {
    if (role === "patient") {
      navigate("/patient-signup");
    } else if (role === "doctor") {
      navigate("/doctor-login");
    }
  };

  return (
    <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img src="/smartcare-logo.png" alt="SmartCare Logo" className="logo" />
                    <span className="logo-text">SmartCare</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Link</a></li>
                </ul>
            </nav>

            <div className="role-selection-container">
                <div className="main-content">
                    <div className="role-card">
                        <h2 className="role-title">Choose Your Role</h2>
                        <p className="role-subtitle">Select how you want to use SmartCare</p>
                        <div className="role-options">
                            <div
                                className={`role-option ${role === "patient" ? "selected" : ""}`}
                                onClick={() => setRole("patient")}
                            >
                                <img src="/patient-logo.png" alt="Patient Logo" className="role-icon" />
                                <span>Patient</span>
                                <p className="role-description">Find doctors and book appointments</p>
                            </div>
                            <div
                                className={`role-option ${role === "doctor" ? "selected" : ""}`}
                                onClick={() => setRole("doctor")}
                            >
                                <img src="/doctor-logo.png" alt="Doctor Logo" className="role-icon" />
                                <span>Doctor</span>
                                <p className="role-description">Manage your practice and patients</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSelection}
                            disabled={!role}
                            className="continue-button"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
