import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);



    const handleVerify = async () => {
        const email = localStorage.getItem("adminEmail");

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
            alert("Invalid OTP");
        }
    };

    const handleResend = async () => {
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

            // if (res.ok) {
            //   alert("OTP resent to your email");
            // }
            if (res.ok) {
                alert("OTP resent");
                setCooldown(30); // 30 seconds
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Failed to resend OTP");
        }
    };

    return (
        <div>
            <input onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleVerify}>Verify</button>
            <p
                className={`mt-3 text-sm ${cooldown > 0 ? "text-gray-400" : "text-blue-600 cursor-pointer"
                    }`}
                onClick={() => {
                    if (cooldown === 0) handleResend();
                }}
            >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
            </p>
        </div>
    );
}