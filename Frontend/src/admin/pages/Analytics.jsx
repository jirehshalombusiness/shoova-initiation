import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer
} from "recharts";
import { fetchWithAuth } from "../../utils/api";

export default function Analytics() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWithAuth("https://shoova-initiation-yjg3.onrender.com/admin/analytics")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="p-10 text-gray-500">
        Loading analytics...
      </div>
    );
  }

  /* =============================
     MONTH CHART DATA
  ============================= */

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthData = (data.donationsByMonth || []).map(m => ({
    month: `${monthNames[m._id?.month - 1] || ""} ${m._id?.year || ""}`,
    total: m.total
  }));

  /* =============================
     DONATION TYPE DATA
  ============================= */

  const donationTypeData = (data.donationTypes || []).map(t => ({
    name: t._id === "subscription" ? "Monthly" : "One-Time",
    value: t.total
  }));

  /* =============================
     TOP DONORS
  ============================= */

  const topDonors = data.topDonors || [];

  const COLORS = ["#16a34a", "#2563eb"];

  return (
    <div className="space-y-12">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-800">
        Fundraising Analytics
      </h1>

      {/* =============================
          FUNDRAISING GROWTH
      ============================= */}

      <div className="bg-white p-6 rounded-xl shadow border">

        <h2 className="text-xl font-semibold mb-6">
          Fundraising Growth
        </h2>

        {monthData.length === 0 ? (
          <p className="text-gray-500">No donation data yet.</p>
        ) : (

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={monthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* =============================
          DONATION TYPES
      ============================= */}

      <div className="bg-white p-6 rounded-xl shadow border">

        <h2 className="text-xl font-semibold mb-6">
          Donation Types
        </h2>

        {donationTypeData.length === 0 ? (
          <p className="text-gray-500">No donation data yet.</p>
        ) : (

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={donationTypeData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
              >

                {donationTypeData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* =============================
          TOP DONORS
      ============================= */}

      <div className="bg-white p-6 rounded-xl shadow border">

        <h2 className="text-xl font-semibold mb-6">
          Top Donors (Lifetime Giving)
        </h2>

        {topDonors.length === 0 ? (

          <p className="text-gray-500">
            No donors recorded yet.
          </p>

        ) : (

          topDonors.map(donor => (

            <div
              key={donor._id}
              className="flex justify-between py-3 border-b last:border-none"
            >

              <div>

                <p className="font-semibold text-gray-800">
                  {donor.name || "Anonymous"}
                </p>

                <p className="text-sm text-gray-500">
                  {donor._id}
                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-gray-900">
                  ${donor.totalDonated}
                </p>

                <p className="text-sm text-gray-500">
                  {donor.donationsCount} donations
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}
