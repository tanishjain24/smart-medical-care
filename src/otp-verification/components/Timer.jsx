import React, { useState, useEffect } from "react";

const Timer = ({ onResendOTP }) => {
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <div>
      {seconds > 0 ? (
        <p>Resend OTP in {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}</p>
      ) : (
        <button onClick={onResendOTP}>Resend OTP</button>
      )}
    </div>
  );
};

export default Timer;
