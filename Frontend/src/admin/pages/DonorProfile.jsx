import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DonorProfile() {

  const { email } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {

    fetch(`https://shoova-initiation-nf6m.onrender.com/admin/donor/${email}`)
      .then(res => res.json())
      .then(data => setData(data));

  }, [email]);

  if (!data) return <p>Loading donor...</p>;

  return (

    <div className="space-y-10">

      <h1 className="text-3xl font-bold">
        {email}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <p>Total Donated: ${data.donor.totalDonated}</p>
        <p>Donations: {data.donor.donationsCount}</p>
        <p>
          First Donation: {new Date(data.donor.firstDonation).toLocaleDateString()}
        </p>

        <p>
          Last Donation: {new Date(data.donor.lastDonation).toLocaleDateString()}
        </p>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Donation History
        </h2>

        {data.donations.map(d => (

          <div key={d._id} className="border-b py-3 flex justify-between">

            <span>${d.amount}</span>

            <span>
              {new Date(d.createdAt).toLocaleDateString()}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
