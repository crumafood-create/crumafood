"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  
  // Mercado Pago envía estos datos automáticamente en la URL después de pagar
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 font-sans">
      <div className="mb-6">
        <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-gray-900">¡Pago aprobado! 🎉</h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 w-full max-w-md mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4"> Detalle del pedido </h2>
        
        <div className="space-y-3 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">ID de Pago:</span>
            <span className="font-mono text-gray-900">{paymentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estado:</span>
            <span className="text-green-600 font-medium capitalize">{status}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-gray-900 font-bold">Total:</span>
            <span className="text-gray-900 font-bold">$10.00 MXN</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-8">
        Gracias por tu compra. Recibirás un correo con los detalles para la entrega.
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