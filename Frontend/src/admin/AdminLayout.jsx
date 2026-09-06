import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  HeartHandshake,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Newsletter
} from "lucide-react";

export default function AdminLayout() {
  const adminEmail = localStorage.getItem("adminEmail");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    window.location.href = "/admin/login";
  };
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col">

        <div className="px-8 py-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-wide">
            Shoova-Initiative
          </h1>
          <p className="text-sm text-gray-400">
            Admin Dashboard
          </p>
        </div>
        <nav className="flex-1 px-6 py-8 space-y-2">

          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/admin/donations"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <HeartHandshake size={20} />
            Donations
          </Link>

          <Link
            to="/admin/donors"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <Users size={20} />
            Donors
          </Link>

          <Link
            to="/admin/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <BarChart3 size={20} />
            Analytics
          </Link>
          <Link
            to="/admin/newsletter"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition">
            Newsletter
          </Link>
          <Link
            to="/admin/stories"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <Newspaper size={20} />
            Stories
          </Link>
 
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <Settings size={20} />
            Settings
          </Link>

        </nav>
        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>

      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-10 py-4 flex justify-between items-center">

          <h2 className="text-xl font-semibold text-gray-800">
            Shoova Restoration Initiative
            Admin Console
          </h2>
          <div className="flex cursor-default items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                Admin User
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {adminEmail}
              </p>
            </div>

            <img
              src="/img/logoo.png"
              alt="Shoova"
              className="w-10 h-10 rounded-full object-cover"
            />

          </div>

        </header>
        <main className="flex-1 p-10 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
