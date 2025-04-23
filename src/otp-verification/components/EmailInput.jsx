import React, { useState } from "react";

const EmailInput = ({ onSendOTP }) => {
  const [email, setEmail] = useState("");

  const handleSendOTP = () => {
    if (email) {
      onSendOTP(email);
    }
  };

  return (
    <div className="text-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="email-input"
      />
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
};

export default EmailInput;
