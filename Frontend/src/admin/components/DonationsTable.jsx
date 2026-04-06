import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api";

export default function DonationsTable() {

  const [donations, setDonations] = useState([]);

  useEffect(() => {

    const fetchDonations = () => {
      fetchWithAuth("https://shoova-initiation-yjg3.onrender.com/admin/donations")
        .then(res => res.json())
        .then(data => setDonations(data));
    };

    fetchDonations();

  }, []);

  /* =============================
     RESEND RECEIPT
  ============================= */

  const resendReceipt = async (donationId) => {

    try {

      const res = await fetch(
        `https://shoova-initiation-yjg3.onrender.com/admin/resend-receipt/${donationId}`,
        { method: "POST" }
      );

      const data = await res.json();

      if (data.success) {
        alert("Receipt resent successfully");
      } else {
        alert("Failed to resend receipt");
      }

    } catch (error) {
      alert("Server error while resending receipt");
    }

  };

  return (

    <div className="bg-white rounded-xl shadow-sm border p-6">

      {/* <h1 className="text-3xl font-bold mb-8">
        Donations
      </h1> */}

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

            {donations.map(d => (

              <tr key={d._id} className="border-b hover:bg-gray-50">

                <td className="py-4 font-mono text-xs">
                  {d.donationNumber||d._id}
                </td>

                <td className="font-medium">
                  {d.name || "Anonymous"}
                </td>

                <td>{d.email}</td>

                <td className="font-semibold">
                  ${d.amount}
                </td>

                <td className="capitalize">
                  {d.donationType}
                </td>

                <td>
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td className="flex gap-4">

                  <a
                    href={`https://shoova-initiation-yjg3.onrender.com/admin/receipt/${d.donationNumber || d._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Download
                  </a>

                  <button
                    onClick={() => resendReceipt(d.donationNumber ||d._id)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Resend
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
