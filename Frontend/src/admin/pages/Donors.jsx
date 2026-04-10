import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/api";
export default function Donors() {

  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchWithAuth("https://shoova-initiation-yjg3.onrender.com/admin/donors")
      .then(res => res.json())
      .then(data => setDonors(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      <h1 className="text-3xl font-bold mb-8">
        Donor CRM
      </h1>

      {donors.length === 0 ? (
        <p className="text-gray-500">No donors yet.</p>
      ) : (

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b text-gray-500 text-sm">

                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Total Donated</th>
                <th>Donations</th>
                <th>Country</th>
                <th>Last Donation</th>

              </tr>

            </thead>

            <tbody>

              {donors.map(d => (

                <tr key={d._id} className="border-b hover:bg-gray-50">

                  <td className="py-4">
                    <a
                      href={`/admin/donor/${d._id}`}
                      className="text-green-700 font-semibold hover:underline"
                    >
                      {d.name || "Anonymous"}
                    </a>
                  </td>

                  <td>
                    {d.email || d._id}
                  </td>

                  <td className="font-semibold">
                    ${d.totalDonated}
                  </td>

                  <td>
                    {d.donationCount || d.donationsCount}
                  </td>

                  <td>
                    {d.country || "Unknown"}
                  </td>

                  <td>
                    {d.lastDonation
                      ? new Date(d.lastDonation).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}
