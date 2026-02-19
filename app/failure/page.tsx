"use client";

import { useSearchParams } from "next/navigation";

export default function FailurePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 font-sans">
      <div className="mb-6">
        <div className="bg-red-100 text-red-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          ✕
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Pago no procesado</h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 w-full max-w-md mb-8">
        <p className="text-gray-600 mb-4">
          Lo sentimos, no pudimos completar tu transacción. El estado reportado es: 
          <span className="block font-bold text-red-600 mt-1 uppercase">{status || "Error desconocido"}</span>
        </p>
        <p className="text-sm text-gray-400">
          Por favor, verifica los datos de tu tarjeta o intenta con otro método de pago.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <a 
          href="/" 
          className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:opacity-80 transition-opacity"
        >
          Reintentar pago
        </a>
        <a 
          href="https://wa.me/TUNUMERO" 
          target="_blank"
          className="text-gray-500 text-sm hover:underline"
        >
          ¿Necesitas ayuda? Contactar soporte
        </a>
      </div>
    </main>
  );
}