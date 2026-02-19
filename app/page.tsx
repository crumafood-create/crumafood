"use client";
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart'; // Asegúrate de crear este archivo con tu lógica

// --- DATOS DE PRODUCTOS (Basado en tu código) ---
const PRODUCTS = [
  {
    id: 'teq-queso-8cm-25',
    nombre: 'Tequeños de queso (8 cm) – 25 pzs',
    categoria: 'Tequeños',
    precio_menudeo: 302,
    precio_mayoreo: 281,
    imagen: 'https://via.placeholder.com/150'
  },
  // Agrega aquí el resto de tus productos...
];

const SHIPPING_ZONES = {
  local: { label: 'Toluca y zona metropolitana', price: 120 },
  centro: { label: 'Centro del país', price: 190 },
  nacional: { label: 'Resto de la República Mexicana', price: 260 },
};

export default function Home() {
  const { cart, addToCart, getCartSubtotal, updateQuantity, removeFromCart } = useCart();
  const [shippingZone, setShippingZone] = useState('local');
  const [loading, setLoading] = useState(false);

  const subtotal = getCartSubtotal();
  const shippingPrice = SHIPPING_ZONES[shippingZone].price;
  const total = subtotal + shippingPrice;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            title: item.nombre,
            unit_price: item.quantity >= 5 ? item.precio_mayoreo : item.precio_menudeo,
            quantity: item.quantity,
          })),
          shipping: shippingPrice,
          email: "cliente@ejemplo.com", // Esto vendrá de tu formulario
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      alert("Error al conectar con Mercado Pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HEADER PROFESIONAL */}
      <header className="p-4 shadow-md flex justify-between items-center bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-black">CRUMAFOOD</h1>
        <div className="relative">
          🛒 <span className="bg-red-500 text-white rounded-full px-2 text-xs">{cart.length}</span>
        </div>
      </header>

      {/* SECCIÓN HERO */}
      <section className="p-8 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-2">Empanadas y Tequeños Premium</h2>
        <p className="text-gray-600 mb-6">Envíos congelados a todo México desde Toluca ❄️</p>
      </section>

      {/* CATÁLOGO DINÁMICO */}
      <section id="catalogo" className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCTS.map(product => (
          <div key={product.id} className="border p-4 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg">{product.nombre}</h3>
            <p className="text-sm text-gray-500 mb-4">{product.categoria}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">Desde 5 pqtes:</p>
                <p className="font-bold text-green-600">${product.precio_mayoreo} c/u</p>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="bg-black text-white px-4 py-2 rounded-xl text-sm"
              >
                + Agregar
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* CARRITO Y CHECKOUT UNIFICADO */}
      {cart.length > 0 && (
        <section className="p-6 max-w-2xl mx-auto border-t">
          <h2 className="text-2xl font-bold mb-4">Tu Pedido</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <div>
                  <p className="font-medium">{item.nombre}</p>
                  <p className="text-xs text-blue-600">
                    {item.quantity >= 5 ? '¡Precio Mayoreo aplicado!' : 'Precio Menudeo'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-12 p-1 border rounded text-center"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* SELECCIÓN DE ENVÍO */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Zona de Envío:</label>
            <select 
              value={shippingZone} 
              onChange={(e) => setShippingZone(e.target.value)}
              className="w-full p-3 border rounded-xl bg-white"
            >
              {Object.entries(SHIPPING_ZONES).map(([key, zone]) => (
                <option key={key} value={key}>{zone.label} (${zone.price})</option>
              ))}
            </select>
          </div>

          {/* TOTALES FINALES */}
          <div className="bg-black text-white p-6 rounded-3xl space-y-2">
            <div className="flex justify-between text-sm opacity-80">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm opacity-80">
              <span>Envío:</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
              <span>TOTAL:</span>
              <span>${total} MXN</span>
            </div>
            <button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-4 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition"
            >
              {loading ? 'Procesando...' : 'Pagar con Mercado Pago'}
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            ❄️ Los productos se envían congelados. Asegúrate de poder recibirlos.
          </p>
        </section>
      )}
    </main>
  );
}