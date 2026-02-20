"use client";
import React, { useState } from 'react';
import { useCart } from './hooks/useCart';

const PRODUCTS = [
  // --- FRESCOS (25 pzs) ---
  { id: 'f-teq-q', nombre: 'Tequeños Queso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 302, precio_mayoreo: 281 },
  { id: 'f-teq-qg', nombre: 'Tequeños Queso con Guayaba (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-dq', nombre: 'Tequeños Doble Queso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-dc', nombre: 'Tequeños Doble Chocolate (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-pz', nombre: 'Tequeños Pizza (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-cq', nombre: 'Tequeños Choriqueso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-ja', nombre: 'Tequeños Jalapeños con Q. Crema (7cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 454, precio_mayoreo: 422 },
  
  // --- FRESCOS: PARTY (50 pzs) ---
  { id: 'f-tp-q', nombre: 'Tequeños Party Queso (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 454, precio_mayoreo: 422 },
  { id: 'f-tp-qg', nombre: 'Tequeños Party Q/Guayaba (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-dq', nombre: 'Tequeños Party Doble Queso (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-dc', nombre: 'Tequeños Party Doble Choc (4cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-pz', nombre: 'Tequeños Party Pizza (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'f-tp-cq', nombre: 'Tequeños Party Choriqueso (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },

  // --- PRECOCIDOS (25 pzs) ---
  { id: 'p-teq-q', nombre: 'Tequeños Queso (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 325, precio_mayoreo: 309 },
  { id: 'p-teq-qg', nombre: 'Tequeños Queso/Guayaba (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-dq', nombre: 'Tequeños Doble Queso (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-dc', nombre: 'Tequeños Doble Chocolate (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-pz', nombre: 'Tequeños Pizza (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-cq', nombre: 'Tequeños Choriqueso (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 400, precio_mayoreo: 380 },
  { id: 'p-teq-ja', nombre: 'Tequeños Jalapeño/Q. Crema (7cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 488, precio_mayoreo: 464 },

  // --- DISCOS Y MASAS ---
  { id: 'd-9', nombre: 'Discos Nº 9 (12 pzs)', categoria: 'Discos', precio_menudeo: 30, precio_mayoreo: 28 },
  { id: 'd-14', nombre: 'Discos Nº 14 (12 pzs)', categoria: 'Discos', precio_menudeo: 66, precio_mayoreo: 61 },
  { id: 'm-est', nombre: 'Masa Estirada (500g)', categoria: 'Masas', precio_menudeo: 35, precio_mayoreo: 33 },
  { id: 'm-piz', nombre: 'Masa Pizza (1kg)', categoria: 'Masas', precio_menudeo: 60, precio_mayoreo: 45 },
];

const SHIPPING_ZONES = {
  local: { label: 'Toluca y zona metropolitana', price: 120 },
  centro: { label: 'Centro del país', price: 190 },
  nacional: { label: 'Resto de la República Mexicana', price: 260 },
};

export default function Home() {
  const { cart, addToCart, getCartSubtotal, updateQuantity, removeFromCart } = useCart();
  const [shippingZone, setShippingZone] = useState('local');

  const subtotal = getCartSubtotal();
  const shippingPrice = SHIPPING_ZONES[shippingZone as keyof typeof SHIPPING_ZONES].price;
  const total = subtotal + shippingPrice;

  return (
    <main className="min-h-screen bg-gray-50 pb-40">
      <header className="p-6 bg-white shadow-sm sticky top-0 z-50 flex justify-between items-center">
        <h1 className="font-black text-2xl tracking-tighter">CRUMAFOOD</h1>
        <div className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">🛒 {cart.length}</div>
      </header>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-500">{p.categoria}</span>
              <h3 className="font-bold text-gray-800 leading-tight mb-2">{p.nombre}</h3>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-xs text-gray-400 line-through">${p.precio_menudeo}</p>
                <p className="text-lg font-black text-green-600">${p.precio_mayoreo} <span className="text-[10px] text-gray-400"> (5+)</span></p>
              </div>
              <button onClick={() => addToCart(p)} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition">Agregar</button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-3xl max-w-xl mx-auto z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">Tu Carrito</h2>
            <span className="text-sm text-gray-400">{cart.length} productos</span>
          </div>

          <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Zona de Envío</label>
            <select value={shippingZone} onChange={(e) => setShippingZone(e.target.value)} className="w-full mt-1 p-3 bg-gray-100 rounded-xl text-sm font-medium border-none outline-none">
              {Object.entries(SHIPPING_ZONES).map(([k, v]) => (
                <option key={k} value={k}>{v.label} (+${v.price})</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center py-4 border-t border-dashed">
            <span className="font-bold">Total a pagar:</span>
            <span className="font-black text-2xl text-black">${total} MXN</span>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition">
            Continuar al Pago
          </button>
        </div>
      )}
    </main>
  );
}