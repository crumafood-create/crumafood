"use client";

import { useSearchParams } from "next/navigation";

export default function PendingPage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 font-sans">
      <div className="mb-6">
        <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          ⏳
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Pago en proceso</h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 w-full max-w-md mb-8">
        <p className="text-gray-600 mb-4">
          Estamos esperando la confirmación de tu pago. Esto puede tardar desde unos minutos hasta 48 horas dependiendo del método elegido.
        </p>
        <div className="text-sm text-gray-500">
          <p>ID de referencia: <span className="font-mono font-bold">{paymentId || "Pendiente"}</span></p>
        </div>
      </div>

      <p className="text-gray-500 mb-8 text-sm">
        Te enviaremos un correo electrónico en cuanto tu pedido sea confirmado.
      </p>

      <a 
        href="/" 
        className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:opacity-80 transition-opacity"
      >
        Volver a la tienda
      </a>
    </main>
  );
}