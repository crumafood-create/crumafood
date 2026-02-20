"use client";
import React, { useState } from 'react';
import { useCart } from './hooks/useCart';
// Importamos los componentes de usuario de Clerk
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const PRODUCTS = [
  // ... (Toda tu lista de productos que ya tenemos configurada)
  { id: 'f-teq-q', nombre: 'Tequeños Queso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 302, precio_mayoreo: 281 },
  { id: 'f-teq-qg', nombre: 'Tequeños Queso con Guayaba (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-dq', nombre: 'Tequeños Doble Queso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-dc', nombre: 'Tequeños Doble Chocolate (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-pz', nombre: 'Tequeños Pizza (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-cq', nombre: 'Tequeños Choriqueso (8cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 372, precio_mayoreo: 346 },
  { id: 'f-teq-ja', nombre: 'Tequeños Jalapeños con Q. Crema (7cm) - Fresco', categoria: 'Tequeños Frescos', precio_menudeo: 454, precio_mayoreo: 422 },
  { id: 'f-tp-q', nombre: 'Tequeños Party Queso (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 454, precio_mayoreo: 422 },
  { id: 'f-tp-qg', nombre: 'Tequeños Party Q/Guayaba (5cm) - Fresco', categoria: 'Tequeños Party Frescos', precio_menudeo: 605, precio_mayoreo: 562 },
  { id: 'p-teq-q', nombre: 'Tequeños Queso (8cm) - Precocido', categoria: 'Tequeños Precocidos', precio_menudeo: 325, precio_mayoreo: 309 },
  { id: 'd-9', nombre: 'Discos Nº 9 (12 pzs)', categoria: 'Discos', precio_menudeo: 30, precio_mayoreo: 28 },
  { id: 'm-piz', nombre: 'Masa Pizza (1kg)', categoria: 'Masas', precio_menudeo: 60, precio_mayoreo: 45 },
];

const SHIPPING_ZONES = {
  local: { label: 'Toluca y zona metropolitana', price: 120 },
  centro: { label: 'Centro del país', price: 190 },
  nacional: { label: 'Resto de la República Mexicana', price: 260 },
};

export default function Home() {
  const { cart, addToCart, getCartSubtotal, removeFromCart } = useCart();
  const [shippingZone, setShippingZone] = useState('local');

  const subtotal = getCartSubtotal();
  const shippingPrice = SHIPPING_ZONES[shippingZone as keyof typeof SHIPPING_ZONES].price;
  const total = subtotal + shippingPrice;

  return (
    <main className="min-h-screen bg-gray-50 pb-40">
      <header className="p-6 bg-white shadow-sm sticky top-0 z-50 flex justify-between items-center">
        <h1 className="font-black text-2xl tracking-tighter">CRUMAFOOD</h1>
        
        <div className="flex items-center gap-4">
          {/* Si el usuario NO ha iniciado sesión, muestra el botón de entrar */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-bold border-2 border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition">
                Entrar
              </button>
            </SignInButton>
          </SignedOut>

          {/* Si el usuario YA inició sesión, muestra su foto/avatar */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <div className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">🛒 {cart.length}</div>
        </div>
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
              <button onClick={() => addToCart(p)} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition">
                Agregar
              </button>
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

          <div className="flex justify-between items-center py-4 border-t border-dashed mb-4">
            <span className="font-bold">Total a pagar:</span>
            <span className="font-black text-2xl text-black">${total} MXN</span>
          </div>

          {/* --- BLOQUE DE PAGO PROTEGIDO --- */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition">
                Inicia sesión para pagar
              </button>
            </SignInButton>
            <p className="text-[10px] text-center text-gray-400 mt-2 font-bold uppercase tracking-wider">
              Debes estar registrado para finalizar tu pedido
            </p>
          </SignedOut>

          <SignedIn>
            <button 
              onClick={() => alert("Redirigiendo a Mercado Pago...")} 
              className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition"
            >
              Continuar al Pago
            </button>
          </SignedIn>
          {/* ------------------------------- */}
        </div>
      )}