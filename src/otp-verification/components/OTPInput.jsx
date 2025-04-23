import React, { useState } from "react";

const OTPInput = ({ onVerifyOTP }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onVerifyOTP(newOtp.join(""));
    }
  };

  return (
    <div className="otp-field">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={digit}
          maxLength="1"
          onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
