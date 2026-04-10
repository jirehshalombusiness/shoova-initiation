import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount }) {
  const navigate = useNavigate();

  return (
    <PayPalButtons
      style={{ layout: "vertical" ,label: "paypal" }}
      fundingSource="paypal"

      createOrder={async () => {
        const res = await fetch("http://localhost:5000/create-paypal-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount })
        });

        const data = await res.json();
        return data.id;
      }}

      onApprove={async (data, actions) => {
        try {
          const res = await fetch("http://localhost:5000/capture-paypal-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderID: data.orderID
            })
          });

          if (!res.ok) throw new Error("Server error");

          const result = await res.json();

          if (result.success) {
            navigate(`/success?source=paypal&orderID=${data.orderID}`);
          } else {
            alert("Payment failed");
          }
        } catch (err) {
          console.error("Capture error:", err);
          alert("Something went wrong after payment");
        }
      }}

      onError={(err) => {
        console.error("PayPal error:", err);
        alert("Something went wrong");
      }}
    />
  );
}