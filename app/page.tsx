"use client";

export default function Home() {

  const handlePayment = async () => {
    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Pedido CRUMAFOOD",
          price: 10,
        }),
      });

      const data = await response.json();

     if (data.init_point) {
  window.location.href = data.init_point;
}

    } catch (error) {
      console.error("Error:", error);
      alert("Error al iniciar el pago");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">
          CRUMAFOOD
        </h1>

        <p className="text-xl mb-8">
          Empanadas y masas congeladas de calidad premium en México.
        </p>

        <button
          onClick={handlePayment}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Pagar ahora
        </button>
      </section>
    </main>
  );
}
