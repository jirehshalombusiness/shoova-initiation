import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import { IndexPage } from "./pages/IndexPage";
import { AboutPage } from "./pages/AboutPage";
import StoryPage from "./pages/StoryPage";
import StoriesPage from "./pages/StoriesPage";
import ArticlePage from "./pages/ArticlePage";
import { InitiativesPage } from "./pages/InitiativesPage";
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
import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import ".././src/styles/globals.css";
import ShoovaCampus from "./pages/ShoovaCampus";
import ResetPassword from "./admin/pages/ResetPassword";
import VerifyOTP from "./admin/pages/OtpPage";
import Stories from "./admin/pages/Stories";
import NewStory from "./admin/pages/NewStory";
function loadAnalytics() {
  const GA_ID = "";

  if (!GA_ID || window.gtagInitialized) return;
  window.gtagInitialized = true;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", GA_ID);
}


const App = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Window exists ✅");
    } else {
      console.log("Window undefined ❌");
    }

    if (window.cookieConsentInitialized) return;
    window.cookieConsentInitialized = true;

    CookieConsent.run({

      guiOptions: {
        consentModal: {
          layout: "cloud",
          position: "bottom center",
        },
        preferencesModal: {
          layout: "box",
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
        marketing: {},
      },


      onConsent: ({ cookie }) => {
        if (cookie.categories.includes("analytics")) {
          loadAnalytics();
        }
      },

      onFirstConsent: ({ cookie }) => {
        if (cookie.categories.includes("analytics")) {
          loadAnalytics();
        }
      },

      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We use cookies",
              description:
                "We use cookies to improve your experience, analyze usage, and support our mission.",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject All",
              showPreferencesBtn: "Cookie Settings",
            },
            preferencesModal: {
              title: "Customise Consent Preferences",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject All",
              savePreferencesBtn: "Save Settings",
              sections: [
                {
                  title: "About Cookies",
                  description:
                    `We use cookies to ensure our platform works smoothly and to improve your experience as you explore Shoova.

                     Some cookies are essential—they help core features function properly and cannot be turned off.

                     With your permission, we also use additional cookies to understand how visitors interact with our site, remember your preferences, and help us share content that aligns with our mission of restoration.

                     You are free to accept or decline these optional cookies at any time. However, disabling some of them may affect how certain parts of the site function.`,
                },
                {
                  title: "Strictly Necessary",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics",
                  linkedCategory: "analytics",
                },
                {
                  title: "Marketing",
                  linkedCategory: "marketing",
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (window.googleTranslateLoaded) return;
    window.googleTranslateLoaded = true;

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,zh-CN,ja",
          },
          "google_translate_element"
        );
      } catch (e) {
        console.warn("Translate init failed", e);
      }
    };

    document.body.appendChild(script);
  }, []);
  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>
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

          
          <Route element={<Layout />}>

            <Route path="/" element={<IndexPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shoovainitiatives" element={<InitiativesPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:slug" element={<ArticlePage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/why-it-matters" element={<WhyItMatters />} />
            <Route path="/restoration-updates" element={<RestorationUpdates />} />
            <Route path="/shoova-campus" element={<ShoovaCampus />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/admin/verify-otp" element={<VerifyOTP />} />

          </Route>


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
            <Route path="stories" element={<Stories />} />
            <Route path="stories/new" element={<NewStory />} />
          </Route>

        </Routes>

      </Router>
    </>
  );
};

export default App;
