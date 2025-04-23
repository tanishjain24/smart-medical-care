
import React from "react";
import { Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import Login from "./components/Login";
import SignupPatient from "./components/SignupPatient";
import OTPVerification from "./otp-verification/OTPVerification";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/patient-login" element={<Login role="patient" />} />
      <Route path="/doctor-login" element={<Login role="doctor" />} />
      <Route path="/patient-signup" element={<SignupPatient />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
    </Routes>
  );
}

export default App;