"use client";

import { useEffect, useState } from "react";

export default function SuccessPage({ searchParams }) {
  const paymentId = searchParams?.payment_id;
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (paymentId) {
      fetch(`/api/payment?id=${paymentId}`)
        .then((res) => res.json())
        .then((data) => setPaymentData(data));
    }
  }, [paymentId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ color: "green" }}>Pago aprobado 🎉</h1>

      {paymentData ? (
        <>
          <p><strong>ID:</strong> {paymentData.id}</p>
          <p><strong>Monto:</strong> ${paymentData.amount} MXN</p>
          <p><strong>Email:</strong> {paymentData.payer_email}</p>
        </>
      ) : (
        <p>Cargando detalles...</p>
      )}

      <p>Gracias por tu compra.</p>
    </div>
  );
}
