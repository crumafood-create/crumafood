"use client";
import React, { useState } from 'react';
import { useCart } from './hooks/useCart';

const PRODUCTS = [
  // --- FRESCOS: TEQUEÑOS (25 pzs) ---
  { id: 'f-teq-q-8', nombre: 'Tequeños Queso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 302, precio_mayoreo: 281 },
  { id: 'f-teq-qg-8', nombre: 'Tequeños Queso con Guayaba (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-dq-8', nombre: 'Tequeños Doble Queso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-dc-8', nombre: 'Tequeños Doble Chocolate (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-pz-8', nombre: 'Tequeños Pizza (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-cq-8', nombre: 'Tequeños Choriqueso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-ja-7', nombre: 'Tequeños Jalapeños con Q. Crema (7cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 454, precio_mayoreo: 422 },

  // --- FRESCOS: TEQUEÑOS PARTY (50 pzs) ---
  { id: 'f-tp-q-5', nombre: 'Tequeños Party Queso (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 454, precio_mayoreo: 422 },
  { id: 'f-tp-qg-5', nombre: 'Tequeños Party Q/Guayaba (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-dq-5', nombre: 'Tequeños Party Doble Queso (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-dc-4', nombre: 'Tequeños Party Doble Choc (4cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-pz-5', nombre: 'Tequeños Party Pizza (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-cq-5', nombre: 'Tequeños Party Choriqueso (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },

  // --- FRESCOS: EMPANADAS (25 pzs) ---
  { id: 'f-emp-q', nombre: 'Empanadas Queso - Fresco', categoria: 'Empanadas Frescas', precio_menudeo: 446, precio_mayoreo: 415 },
  { id: 'f-emp-jq', nombre: 'Empanadas Jamón/Queso - Fresco', categoria: 'Empanadas Frescas', precio_menudeo: 512, precio_mayoreo: 476 },
  { id: 'f-emp-tq', nombre: 'Empanadas Tocino/Queso - Fresco', categoria: 'Empanadas Frescas', precio_menudeo: 512, precio_mayoreo: 476 },
  { id: 'f-emp-cq', nombre: 'Empanadas Chorizo/Queso - Fresco', categoria: 'Empanadas Frescas', precio_menudeo: 512, precio_mayoreo: 476 },
  { id: 'f-emp-pq', nombre: 'Empanadas Pastor/Queso - Fresco', categoria: 'Empanadas Frescas', precio_menudeo: 512, precio_mayoreo: 476 },
  { id: 'f-emp-pmq', nombre: 'Empanadas Plátano Macho/Queso - Fresco', categoria: 'Empanadas Frescas', precio_menudeo: 512, precio_mayoreo: 476 },

  // --- FRESCOS: MINI EMPANADAS (50 pzs) ---
  { id: 'f-me-q', nombre: 'Mini Empanadas Queso - Fresco', categoria: 'Mini Empanadas Frescas', precio_menudeo: 465, precio_mayoreo: 432 },
  { id: 'f-me-jq', nombre: 'Mini Empanadas Jamón/Queso - Fresco', categoria: 'Mini Empanadas Frescas', precio_menudeo: 558, precio_mayoreo: 519 },
  { id: 'f-me-tq', nombre: 'Mini Empanadas Tocino/Queso - Fresco', categoria: 'Mini Empanadas Frescas', precio_menudeo: 558, precio_mayoreo: 519 },
  { id: 'f-me-cq', nombre: 'Mini Empanadas Chorizo/Queso - Fresco', categoria: 'Mini Empanadas Frescas', precio_menudeo: 558, precio_mayoreo: 519 },
  { id: 'f-me-pq', nombre: 'Mini Empanadas Pastor/Queso - Fresco', categoria: 'Mini Empanadas Frescas', precio_menudeo: 558, precio_mayoreo: 519 },
  { id: 'f-me-pmq', nombre: 'Mini Empanadas Plátano/Queso - Fresco', categoria: 'Mini Empanadas Frescas', precio_menudeo: 558, precio_mayoreo: 519 },

  // --- PRECOCIDOS: TEQUEÑOS (25 pzs) ---
  { id: 'p-teq-q-8', nombre: 'Tequeños Queso (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 325, precio_mayoreo: 309 },
  { id: 'p-teq-qg-8', nombre: 'Tequeños Queso/Guayaba (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-dq-8', nombre: 'Tequeños Doble Queso (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-dc-8', nombre: 'Tequeños Doble Chocolate (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-pz-8', nombre: 'Tequeños Pizza (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-cq-8', nombre: 'Tequeños Choriqueso (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-ja-7', nombre: 'Tequeños Jalapeño/Q. Crema (7cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 488, precio_mayoreo: 464 },

  // --- PRECOCIDOS: EMPANADAS (25 pzs) ---
  { id: 'p-emp-q', nombre: 'Empanadas Queso - Precocido', categoria: 'Empanadas Precocidas', precio_menudeo: 480, precio_mayoreo: 446 },
  { id: 'p-emp-jq', nombre: 'Empanadas Jamón/Queso - Precocido', categoria: 'Empanadas Precocidas', precio_menudeo: 550, precio_mayoreo: 512 },
  { id: 'p-emp-tq', nombre: 'Empanadas Tocino/Queso - Precocido', categoria: 'Empanadas Precocidas', precio_menudeo: 550, precio_mayoreo: 512 },
  { id: 'p-emp-cq', nombre: 'Empanadas Chorizo/Queso - Precocido', categoria: 'Empanadas Precocidas', precio_menudeo: 550, precio_mayoreo: 512 },
  { id: 'p-emp-pq', nombre: 'Empanadas Pastor/Queso - Precocido', categoria: 'Empanadas Precocidas', precio_menudeo: 550, precio_mayoreo: 512 },
  { id: 'p-emp-pmq', nombre: 'Empanadas Plátano Macho/Queso - Precocido', categoria: 'Empanadas Precocidas', precio_menudeo: 550, precio_mayoreo: 512 },

  // --- DISCOS Y MASAS ---
  { id: 'd-n9-12', nombre: 'Discos Nº 9 (12 pzs)', categoria: 'Discos', precio_menudeo: 30, precio_mayoreo: 28 },
  { id: 'd-n14-12', nombre: 'Discos Nº 14 (12 pzs)', categoria: 'Discos', precio_menudeo: 66, precio_mayoreo: 61 },
  { id: 'm-est-500', nombre: 'Masa Estirada (500g)', categoria: 'Masas', precio_menudeo: 35, precio_mayoreo: 33 },
  { id: 'm-piz-1kg', nombre: 'Masa Pizza (1kg)', categoria: 'Masas', precio_menudeo: 60, precio_mayoreo: 45 },
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
  const shippingPrice = SHIPPING_ZONES[shippingZone as keyof typeof SHIPPING_ZONES].price;
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
      <header className="p-4 shadow-md flex justify-between items-center bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold">CRUMAFOOD</h1>
        <div className="bg-black text-white px-3 py-1 rounded-full text-sm">
          🛒 {cart.length}
        </div>
      </header>

      <section className="p-8 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-2">Catálogo de Productos</h2>
        <p className="text-gray-600 italic">Envíos desde Toluca · Menudeo y Mayoreo ❄️</p>
      </section>

      <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map(product => (
          <div key={product.id} className="border p-4 rounded-2xl shadow-sm bg-white">
            <h3 className="font-bold text-lg leading-tight">{product.nombre}</h3>
            <p className="text-xs text-blue-500 mb-4">{product.categoria}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-gray-500 line-through">${product.precio_menudeo}</p>
                <p className="font-bold text-green-600 text-xl">${product.precio_mayoreo} <span className="text-xs text-gray-400 font-normal">(5+)</span></p>
              </div>
              <button onClick={() => addToCart(product)} className="bg-black text-white px-4 py-2 rounded-xl text-sm active:scale-95 transition">
                Agregar
              </button>
            </div>
          </div>
        ))}
      </section>

      {cart.length > 0 && (
        <section className="p-6 max-w-2xl mx-auto border-t bg-gray-50 rounded-t-3xl shadow-2xl sticky bottom-0">
          <h2 className="text-xl font-bold mb-4">Tu Carrito</h2>
          <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded-lg text-sm border">
                <span>{item.nombre} (x{item.quantity})</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 px-2 font-bold font-mono">X</button>
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Zona de Envío:</label>
            <select value={shippingZone} onChange={(e) => setShippingZone(e.target.value)} className="w-full p-2 border rounded-lg bg-white text-sm">
              {Object.entries(SHIPPING_ZONES).map(([key, zone]) => (
                <option key={key} value={key}>{zone.label} (${zone.price})</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between