export default function SuccessPage({ searchParams }) {
  const paymentId = searchParams?.payment_id;
  const status = searchParams?.collection_status;

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

      {paymentId && (
        <p>
          <strong>ID de pago:</strong> {paymentId}
        </p>
      )}

      {status && (
        <p>
          <strong>Estado:</strong> {status}
        </p>
      )}

      <p>Gracias por tu compra.</p>
    </div>
  );
}
