import React, { useEffect, useState } from "react";

export default function RecentDonations() {

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("https://shoova-initiation-yjg3.onrender.com/admin/recent-donations")
      .then(res => res.json())
      .then(data => setDonations(data));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow border p-6">

      <h2 className="text-lg font-semibold mb-6">
        Recent Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-gray-500">No recent donations.</p>
      ) : (

        <div className="space-y-4">

          {donations.map((d, i) => (

            <div key={i} className="flex justify-between border-b pb-3">

              <div>

                <p className="font-semibold">
                  {d.name || "Anonymous"}
                </p>

                <p className="text-sm text-gray-500">
                  {d.email}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  ${d.amount}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(d.createdAt).toLocaleString()}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
