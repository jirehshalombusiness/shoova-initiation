// import { useEffect } from "react";
// import * as CookieConsent from "vanilla-cookieconsent";
// import "vanilla-cookieconsent/dist/cookieconsent.css";
// import "../styles/globals.css";

// function loadAnalytics() {
//   const GA_ID = "";

//   if (!GA_ID || window.gtagInitialized) return;
//   window.gtagInitialized = true;

//   const script = document.createElement("script");
//   script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
//   script.async = true;
//   document.head.appendChild(script);

//   window.dataLayer = window.dataLayer || [];
//   function gtag(){window.dataLayer.push(arguments);}
//   gtag("js", new Date());
//   gtag("config", GA_ID);
// }

// export default function App({ Component, pageProps }) {

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//      console.log("Window undefined ❌");

//     if (window.cookieConsentInitialized) return;
//     window.cookieConsentInitialized = true;

//     CookieConsent.default.run({
      
//       guiOptions: {
//         consentModal: {
//           layout: "box",
//           position: "bottom center", // cleaner
//         },
//         preferencesModal: {
//           layout: "box",
//         },
//       },

//       categories: {
//         necessary: {
//           enabled: true,
//           readOnly: true,
//         },
//         analytics: {},
//         marketing: {},
//       },
      

//       onConsent: ({ cookie }) => {
//         if (cookie.categories.includes("analytics")) {
//           loadAnalytics();
//         }
//       },

//       onFirstConsent: ({ cookie }) => {
//         if (cookie.categories.includes("analytics")) {
//           loadAnalytics();
//         }
//       },

//       language: {
//         default: "en",
//         translations: {
//           en: {
//             consentModal: {
//               title: "We use cookies",
//               description:
//                 "We use cookies to improve your experience, analyze usage, and support our mission.",
//               acceptAllBtn: "Accept All",
//               acceptNecessaryBtn: "Reject All",
//               showPreferencesBtn: "Cookie Settings",
//             },
//             preferencesModal: {
//               title: "Cookie Preferences",
//               acceptAllBtn: "Accept All",
//               acceptNecessaryBtn: "Reject All",
//               savePreferencesBtn: "Save Settings",
//               sections: [
//                 {
//                   title: "About Cookies",
//                   description:
//                     "We use cookies to ensure the platform works properly and to understand how visitors interact with our site.",
//                 },
//                 {
//                   title: "Strictly Necessary",
//                   linkedCategory: "necessary",
//                 },
//                 {
//                   title: "Analytics",
//                   linkedCategory: "analytics",
//                 },
//                 {
//                   title: "Marketing",
//                   linkedCategory: "marketing",
//                 },
//               ],
//             },
//           },
//         },
//       },
//     });
//   }, []);

//   return <Component {...pageProps} />;
// }