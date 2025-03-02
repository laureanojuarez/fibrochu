"use client";
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get("payment_id");
    const status = urlParams.get("status");

    if (paymentId && status) {
      fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, status }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Orden actualizada:", data))
        .catch((err) => console.error("Error:", err));
    }
  }, []);

  return <h1>Pago aprobado, gracias por tu compra 🎉</h1>;
};

export default Success;
