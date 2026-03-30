import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./components/Layout";

import { IndexPage } from "./pages/IndexPage";
import { AboutPage } from "./pages/AboutPage";
import  StoryPage  from "./pages/StoryPage";
import { ProgramsPage } from "./pages/ProgramsPage";
import { ContactPage } from "./pages/ContactPage";
import { DonatePage } from "./pages/DonatePage";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Donations from "./admin/pages/Donations";
import Donors from "./admin/pages/Donors";
import Analytics from "./admin/pages/Analytics";
import Settings from "./admin/pages/Settings";
import Login from "./admin/pages/Login";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";
import DonorProfile from "./admin/pages/DonorProfile";
import Newsletter from "./admin/pages/Newsletter";
import { Toaster } from "react-hot-toast";
import SuccessPage from "./pages/successPage"; // adjust path
import WhyItMatters from "./pages/WhyItMatters";
import { RestorationUpdates } from "./pages/RestorationUpdates";


const App = () => {
  return (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#111",
            color: "#fff",
            padding: "14px 18px",
          },
        }}
      />
    <Router>
      <ScrollToTop />

      <Routes>

        {/* PUBLIC WEBSITE ROUTES */}
        <Route element={<Layout />}>

          <Route path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/why-it-matters" element={<WhyItMatters />} />
          <Route path="/restoration-updates" element={<RestorationUpdates />} />

        </Route>

        {/* ADMIN DASHBOARD ROUTES */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >

          <Route index element={<Dashboard />} />

          <Route path="donations" element={<Donations />} />
          <Route path="donors" element={<Donors />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="donor/:email" element={<DonorProfile />} />
          <Route path="/admin/newsletter" element={<Newsletter />} />

        </Route>

      </Routes>

    </Router>
    </>
  );
};

export default App;
