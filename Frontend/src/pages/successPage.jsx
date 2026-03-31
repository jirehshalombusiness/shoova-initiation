import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [donation, setDonation] = useState(null);

  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `https://shoova-initiation-yjg3.onrender.com/api/verify-session/${sessionId}`
        );

        const data = await res.json();

        if (data.success) {
          setVerified(true);
          setDonation(data.donation);
        } else {
          setVerified(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) verify();
  }, [sessionId]);

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Confirming your transaction...
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-center px-6">
        <p>
          We were unable to verify your payment.
          Please contact support if this issue persists.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/20 px-6">
      <div className="max-w-xl w-full text-center">

        {/* subtle accent */}
        <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto mb-8"></div>

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
          Thank you for your support
        </h1>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Your contribution of{" "}
          <span className="font-medium text-gray-900">
            ${Number(donation.amount).toLocaleString()}
          </span>{" "}
          has been successfully received.
        </p>

        <p className="text-gray-500 leading-relaxed">
          A confirmation and official receipt for your donation will be sent to your email.
        </p>

        <div className="mt-10">
          <button
            onClick={() => window.location.href = "/"}
            className="bg-secondary/20 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-900 hover:text-gray-900 transition"
          >
            Return to Home
          </button>
        </div>

      </div>
    </div>
  );
}
