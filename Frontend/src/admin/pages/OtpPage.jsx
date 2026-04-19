import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerify = async () => {
    const email = localStorage.getItem("adminEmail");

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://shoova-initiation-yjg3.onrender.com/admin/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp })
        }
      );

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      alert("Verification failed");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    const email = localStorage.getItem("adminEmail");

    try {
      const res = await fetch(
        "https://shoova-initiation-yjg3.onrender.com/admin/resend-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("OTP resent");
        setCooldown(30);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold mb-6">Verify OTP</h1>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="border p-3 w-full mb-4 rounded"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-green-600 text-white w-full py-3 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p
          className={`mt-3 text-sm ${
            cooldown > 0
              ? "text-gray-400"
              : "text-blue-600 cursor-pointer"
          }`}
          onClick={handleResend}
        >
          {cooldown > 0
            ? `Resend in ${cooldown}s`
            : "Resend OTP"}
        </p>
      </div>
    </div>
  );
}