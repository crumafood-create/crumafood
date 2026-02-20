"use client";
import React, { useState } from 'react';
import { useCart } from './hooks/useCart';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X, UserCircle, Search } from 'lucide-react';

const PRODUCTS = [
  // --- TEQUEÑOS ---
  { id: 'f-teq-q', nombre: 'Tequeños Queso (8cm) - Fresco', categoria: 'Tequeños', precio_menudeo: 302, precio_mayoreo: 281 },
  { id: 'f-teq-qg', nombre: 'Tequeños Queso con Guayaba (8cm)', categoria: 'Tequeños', precio_menudeo: 372, precio_mayoreo: 346 },
  // --- EMPANADAS ---
  { id: 'f-emp-q', nombre: 'Empanada Queso - Fresca', categoria: 'Empanadas', precio_menudeo: 446, precio_mayoreo: 415 },
  { id: 'f-emp-pq', nombre: 'Empanada Pastor con Queso - Fresca', categoria: 'Empanadas', precio_menudeo: 512, precio_mayoreo: 476 },
  // --- MINI ---
  { id: 'f-mini-q', nombre: 'Mini Empanada Queso - Fresca', categoria: 'Mini Empanadas', precio_menudeo: 465, precio_mayoreo: 432 },
  // --- MASAS ---
  { id: 'm-piz', nombre: 'Masa Pizza (1kg)', categoria: 'Masas', precio_menudeo: 60, precio_mayoreo: 45 },
];

export default function Home() {
  const { cart, addToCart, getCartSubtotal } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["Todos", "Tequeños", "Empanadas", "Mini Empanadas", "Masas"];
  
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || p.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const subtotal = getCartSubtotal();
  const total = subtotal + 120; 

  return (
    <main className="min-h-screen bg-gray-50 pb-40">
      {/* HEADER CON LOGO Y BOTÓN NARANJA */}
      <header className="p-4 bg-white shadow-sm sticky top-0 z-[60] flex justify-between items-center">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="bg-[#f97316] p-3 rounded-xl text-white shadow-lg active:scale-95 transition"
        >
          <Menu size={24} strokeWidth={3} />
        </button>
        
        {/* LOGO EN EL CENTRO */}
        <div className="flex items-center gap-2">
          <img src="/logo-crumafood.png" alt="Crumafood Logo" className="h-10 w-auto" />
          <h1 className="font-black text-xl tracking-tighter italic hidden sm:block">CRUMAFOOD</h1>
        </div>
        
        <div className="bg-black text-white px-4 py-2 rounded-full text-xs font-black tracking-widest">
          🛒 {cart.length}
        </div>
      </header>

      {/* BUSCADOR */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="¿Qué se te antoja hoy?" 
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#f97316]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* MENÚ LATERAL (SIDEBAR) */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        <aside className={`absolute inset-y-0 left-0 w-80 bg-white shadow-2xl p-8 flex flex-col transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
            <X size={32} />
          </button>

          {/* PERFIL */}
          <div className="mt-10 border-b pb-8 mb-8">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-4 group">
                  <div className="bg-gray-100 p-3 rounded-full group-hover:bg-orange-50 transition">
                    <UserCircle size={32} className="text-gray-400 group-hover:text-[#f97316]" />
                  </div>
                  <span className="font-black text-xl uppercase tracking-tighter">Iniciar Sesión</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/" />
                <span className="font-black text-xl uppercase tracking-tighter">Mi Cuenta</span>
              </div>
            </SignedIn>
          </div>

          {/* MENÚ DE CATEGORÍAS */}
          <nav className="flex flex-col gap-6">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Menú</p>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setIsMenuOpen(false); }}
                className={`text-left font-black text-2xl uppercase tracking-tighter transition-all ${
                  activeCategory === cat ? "text-[#f97316] translate-x-2" : "text-gray-900 hover:text-[#f97316]"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>
      </div>

      {/* LISTA DE PRODUCTOS */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <span className="text-[10px] font-black text-[#f97316] uppercase tracking-widest">{p.categoria}</span>
            <h3 className="font-black text-gray-800 text-lg leading-tight mt-1 mb-4">{p.nombre}</h3>
            <div className="flex justify-between items-center">
              <p className="font-black text-2xl text-black tracking-tighter">${p.precio_mayoreo}</p>
              <button 
                onClick={() => addToCart(p)} 
                className="bg-[#f97316] text-white px-6 py-2 rounded-2xl text-xs font-black shadow-lg shadow-orange-100 active:scale-95 transition"
              >
                AGREGAR
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CARRITO Y BOTÓN DE PAGO */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-[40px] max-w-xl mx-auto z-50">
          <div className="flex justify-between items-center mb-4">
             <p className="font-black text-2xl text-black tracking-tighter">${total} MXN</p>
             <p className="text-xs font-bold text-gray-400 italic">{cart.length} productos</p>
          </div>
          <SignedIn>
            <button className="w-full bg-black text-white py-5 rounded-[24px] font-black text-xl shadow-xl active:scale-95 transition uppercase tracking-tight">Continuar al Pago</button>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full bg-[#f97316] text-white py-5 rounded-[24px] font-black text-xl shadow-xl active:scale-95 transition uppercase tracking-tight">Inicia sesión para pagar</button>
            </SignInButton>
          </SignedOut>
        </div>
      )}
    </main>
  );
}