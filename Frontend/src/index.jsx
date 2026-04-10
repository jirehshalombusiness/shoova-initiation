import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


// console.log("PAYPAL ID:", process.env.REACT_APP_PAYPAL_CLIENT_ID)

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, currency: "USD" }} >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
