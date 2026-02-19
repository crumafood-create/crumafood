"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState(""); // Estado para el correo

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos que la página se recargue

    if (!email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Pedido CRUMAFOOD",
          price: 10,
          email: email, // 👈 Ahora enviamos el email real a la API
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al generar el enlace de pago");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar el pago");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">CRUMAFOOD</h1>
        <p className="text-xl mb-4">
          Empanadas y masas congeladas de calidad premium en México.
        </p>

        {/* Pequeño formulario para capturar el email */}
        <form onSubmit={handlePayment} className="max-w-sm mx-auto space-y-4">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Pagar $10 MXN
          </button>
        </form>
      </section>
    </main>
  );
}