import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api";

export default function DonationsTable() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetchWithAuth(
          "https://shoova-initiation-yjg3.onrender.com/admin/donations"
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setDonations(data);
        } else {
          console.error("Unexpected response:", data);
          setDonations([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  /* =============================
     RESEND RECEIPT
  ============================= */

  const resendReceipt = async (donationNumber) => {
    try {
      const res = await fetchWithAuth(
        `https://shoova-initiation-yjg3.onrender.com/admin/resend-receipt/${donationNumber}`,
        { method: "POST" }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Receipt resent successfully");
      } else {
        console.error("Resend failed:", data);
        alert(data.message || "Failed to resend receipt");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error while resending receipt");
    }
  };

  if (loading) {
    return <div className="p-6">Loading donations...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="py-3">Donation ID</th>
              <th>Donor</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Receipt</th>
            </tr>
          </thead>

          <tbody>
  {!Array.isArray(donations) ? (
    <tr>
      <td colSpan="7" className="text-center py-6 text-red-500">
        Failed to load donations (unauthorized)
      </td>
    </tr>
  ) : donations.length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-6 text-gray-400">
        No donations found
      </td>
    </tr>
  ) : (
    donations.map((d) => (
      <tr key={d._id} className="border-b hover:bg-gray-50">
        <td className="py-4 font-mono text-xs">
          {d.donationNumber}
        </td>

        <td className="font-medium">
          {d.name || "Anonymous"}
        </td>

        <td>{d.email}</td>

        <td className="font-semibold">${d.amount}</td>

        <td className="capitalize">{d.donationType}</td>

        <td>
          {new Date(d.createdAt).toLocaleDateString()}
        </td>

        <td className="flex gap-4">
          <a
            href={`https://shoova-initiation-yjg3.onrender.com/admin/receipt/${d.donationNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-semibold hover:underline"
          >
            Download
          </a>

          <button
            onClick={() => resendReceipt(d.donationNumber)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Resend
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}