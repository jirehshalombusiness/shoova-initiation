import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { DollarSign, Users, Repeat, BarChart3 } from "lucide-react";
import RecentDonations from "../components/RecentDonations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { fetchWithAuth } from "../../utils/api";

export default function Dashboard() {

  const [data, setData] = useState({
    totalRaised: 0,
    totalDonors: 0,
    monthlyDonors: 0,
    averageDonation: 0,
    recentDonations: [],
    topDonors: []
  });

  const [loading, setLoading] = useState(true);
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value || 0);

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        const res = await fetchWithAuth(
          "https://shoova-initiation-nf6m.onrender.com/admin/dashboard"
        );

        const result = await res.json();

        setData({
          totalRaised: result.totalRaised || 0,
          totalDonors: result.totalDonors || 0,
          monthlyDonors: result.monthlyDonors || 0,
          averageDonation: result.averageDonation || 0,
          recentDonations: result.recentDonations || [],
          topDonors: result.topDonors || []
        });

        setLoading(false);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setLoading(false);
      }
    };

    fetchDashboard();

    const interval = setInterval(fetchDashboard, 5000);

    return () => clearInterval(interval);

  }, []);
  const grouped = {};

  (data.recentDonations || []).forEach(d => {
    const day = new Date(d.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

    if (!grouped[day]) {
      grouped[day] = 0;
    }

    grouped[day] += d.amount;
  });

  const chartData = Object.keys(grouped).map(day => ({
    day,
    total: grouped[day]
  }));

  if (loading) {
    return (
      <div className="p-10 text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          Fundraising Overview
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Live
          </span>
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Real-time insights into donations and supporter activity
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-6">

        <StatCard
          title="Total Raised"
          value={formatCurrency(data.totalRaised)}
          icon={<DollarSign size={28} />}
        />

        <StatCard
          title="Total Donors"
          value={data.totalDonors}
          icon={<Users size={28} />}
        />

        <StatCard
          title="Monthly Donations"
          value={data.monthlyDonors}
          icon={<Repeat size={28} />}
        />

        <StatCard
          title="Average Donation"
          value={formatCurrency(data.averageDonation)}
          icon={<BarChart3 size={28} />}
        />

      </div>
      <RecentDonations donations={data.recentDonations} />
      <div className="bg-white rounded-xl shadow-sm p-6 border">

        <h2 className="text-xl font-semibold mb-4">
          Live Activity
        </h2>

        <div className="space-y-3 max-h-[250px] overflow-y-auto">

          {(data.recentDonations || []).slice(0, 5).map((donation) => (
            <div
              key={donation._id}
              className="flex justify-between items-center text-sm bg-gray-50 px-4 py-2 rounded-lg transition hover:scale-[1.02]"
            >
              <span className="text-gray-700">
                💰 {donation.name || "Anonymous"} donated
              </span>

              <span
                className={`font-semibold ${donation.amount >= 1000
                  ? "text-yellow-600"
                  : "text-green-600"
                  }`}
              >
                {formatCurrency(donation.amount)}
              </span>
            </div>
          ))}

        </div>

      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border">

        <h2 className="text-xl font-semibold mb-6">
          Donation Activity
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar
              dataKey="total"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border">

        <h2 className="text-xl font-semibold mb-6">
          Top Donors
        </h2>

        {(data.topDonors || []).length === 0 ? (
          <p className="text-gray-500">No donors yet</p>
        ) : (
          (data.topDonors || []).map((donor) => (
            <div
              key={donor._id}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {donor.name || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {donor._id}
                </p>
              </div>

              <span className="font-semibold text-gray-900">
                {formatCurrency(donor.total)}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}
