"use client";
import React, { useState } from 'react';
import { useCart } from './hooks/useCart';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X, UserCircle, Search, ShoppingBag, Snowflake, Flame, Clock } from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS — Crumafood Design System v2
───────────────────────────────────────────── */
const DS = {
  colors: {
    sand: '#E8DCC8',
    sandLight: '#F4EFE6',
    sandDark: '#C9B99A',
    golden: '#B8860B',
    goldenLight: '#D4A017',
    charcoal: '#2C2C2C',
    darkGray: '#3E3E3E',
    midGray: '#6B6B6B',
    lightGray: '#F0EDE8',
    white: '#FAFAF8',
    border: '#D6D3CC',
    surface: '#F4EFE6',
  },
};

/* ─────────────────────────────────────────────
   CATÁLOGO COMPLETO — desde design system v2
───────────────────────────────────────────── */

         const CATEGORIES = [
  {
    id: 'tequenos',
    name: 'Tequeños',
    subtitle: 'La Firma de Crumafood',
    emoji: '🧀',
    products: [
      { id: 'teq-q-f',   nombre: 'Queso (8 cm) — Fresco',           description: 'Tequeño artesanal con masa laminada y queso fresco.', badge: null,        menudeo: 302, mayoreo: 281, image: '/tequeno-queso.jpg' },
      { id: 'teq-q-p',   nombre: 'Queso (8 cm) — Precocido',        description: 'Listo para disfrutar. Ideal para Air Fryer o fritura rápida.', badge: 'popular',     menudeo: 322, mayoreo: 300, image: '/tequeno-precocido.jpg' },
      { id: 'teq-qg-f',  nombre: 'Queso con Guayaba — Fresco',      description: 'Equilibrio perfecto entre dulce y salado.', badge: 'favorito',  menudeo: 372, mayoreo: 346, image: '/tequeno-guayaba.jpg' },
      { id: 'teq-qg-p',  nombre: 'Queso con Guayaba — Precocido',   description: 'Receta técnica con guayaba premium y queso.', badge: null,        menudeo: 392, mayoreo: 365, image: '/tequeno-guayaba.jpg' },
      { id: 'teq-12-q',  nombre: 'Queso (12 cm) — Fresco',          description: 'Formato XL para los amantes del queso.', badge: 'grande',    menudeo: 428, mayoreo: 398, image: '/tequeno-grande.jpg' },
      { id: 'teq-12-qg', nombre: 'Queso con Guayaba (12 cm)',        description: 'La versión definitiva de nuestro clásico.', badge: null,        menudeo: 498, mayoreo: 463, image: '/tequeno-grande.jpg' },
    ],
  },
  {
    id: 'empanadas',
    name: 'Empanadas',
    subtitle: 'Formato Clásico',
    emoji: '🫓',
    products: [
      { id: 'emp-q',   nombre: 'Queso',                description: 'Relleno generoso de queso fundido artesanal.', badge: null,        menudeo: 446, mayoreo: 415, image: '/empanada.jpg' },
      { id: 'emp-pq',  nombre: 'Pastor con Queso',     description: 'Sabor tradicional mexicano con nuestra masa técnica.', badge: 'mexicano',  menudeo: 512, mayoreo: 476, image: '/empanada.jpg' },
      { id: 'emp-jq',  nombre: 'Jamón con Queso',      description: 'Un clásico indispensable con ingredientes de calidad.', badge: null,        menudeo: 512, mayoreo: 476, image: '/empanada.jpg' },
      { id: 'emp-tq',  nombre: 'Tocino con Queso',     description: 'Combinación ahumada y cremosa.', badge: null,        menudeo: 512, mayoreo: 476, image: '/empanada.jpg' },
      { id: 'emp-chq', nombre: 'Chorizo con Queso',    description: 'Intensidad y textura en cada bocado.', badge: 'mexicano',  menudeo: 512, mayoreo: 476, image: '/empanada.jpg' },
      { id: 'emp-pl',  nombre: 'Plátano Macho Queso',  description: 'Masa artesanal con el toque dulce del plátano.', badge: 'mexicano',  menudeo: 512, mayoreo: 476, image: '/empanada.jpg' },
    ],
  },
  {
    id: 'mini',
    name: 'Mini Empanadas',
    subtitle: 'Para Compartir',
    emoji: '🤏',
    products: [
      { id: 'me-q',   nombre: 'Queso',                  description: 'Pequeñas en tamaño, grandes en sabor.', badge: null,       menudeo: 465, mayoreo: 432, image: '/mini.jpg' },
      { id: 'me-jq',  nombre: 'Jamón con Queso',        description: 'Perfectas para eventos y catering.', badge: null,       menudeo: 558, mayoreo: 519, image: '/mini.jpg' },
      { id: 'me-tq',  nombre: 'Tocino con Queso',       description: 'Bocados crujientes con toque ahumado.', badge: null,       menudeo: 558, mayoreo: 519, image: '/mini.jpg' },
      { id: 'me-chq', nombre: 'Chorizo con Queso',      description: 'Mini empanadas con carácter.', badge: 'mexicano', menudeo: 558, mayoreo: 519, image: '/mini.jpg' },
      { id: 'me-pq',  nombre: 'Pastor con Queso',       description: 'La esencia de México en formato mini.', badge: 'mexicano', menudeo: 558, mayoreo: 519, image: '/mini.jpg' },
      { id: 'me-pl',  nombre: 'Plátano Macho con Queso',description: 'Dulzura técnica en tamaño bocado.', badge: 'mexicano', menudeo: 558, mayoreo: 519, image: '/mini.jpg' },
    ],
  },
  {
    id: 'discos',
    name: 'Discos de Masa',
    subtitle: 'Tu Aliado en la Cocina',
    emoji: '⭕',
    products: [
      { id: 'disco-9',  nombre: 'Disco Nº 9 — Estándar', description: 'Masa hojaldrada técnica para fritura seca.', badge: null,       menudeo: 30, mayoreo: 28, image: '/disco-9.jpg' },
      { id: 'disco-14', nombre: 'Disco Nº 14 — Grande',  description: 'Diámetro ideal para empanadas de alto formato.', badge: 'popular',  menudeo: 66, mayoreo: 61, image: '/disco-14.jpg' },
    ],
  },
  {
    id: 'masas',
    name: 'Masas',
    subtitle: 'Calidad Profesional',
    emoji: '🫙',
    products: [
      { id: 'masa-estirada', nombre: 'Masa Estirada 500g', description: 'Masa técnica lista para moldear tus ideas.', badge: null, menudeo: 35, mayoreo: 33, image: '/masa.jpg' },
      { id: 'm-piz',         nombre: 'Masa Pizza 1kg',      description: 'Base profesional para pizzas de alta crocancia.', badge: null, menudeo: 60, mayoreo: 45, image: '/masa-pizza.jpg' },
    ],
  },
];
  

const ALL_PRODUCTS = CATEGORIES.flatMap(cat =>
  cat.products.map(p => ({ ...p, categoria: cat.name }))
);

/* ─────────────────────────────────────────────
   BADGE COMPONENT
───────────────────────────────────────────── */
function Badge({ label }: { label: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    favorito:  { bg: DS.colors.golden,    color: DS.colors.white },
    mexicano:  { bg: DS.colors.sandDark,  color: DS.colors.charcoal },
    popular:   { bg: DS.colors.charcoal,  color: DS.colors.white },
    grande:    { bg: DS.colors.surface,   color: DS.colors.charcoal },
  };
  const style = colors[label] ?? { bg: DS.colors.sand, color: DS.colors.charcoal };
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      fontSize: '0.6rem',
      fontFamily: "'IBM Plex Mono', monospace",
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      padding: '3px 8px',
      borderRadius: '2px',
      fontWeight: 500,
    }}>
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ product, onAdd }: { product: typeof ALL_PRODUCTS[0]; onAdd: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div style={{
      background: DS.colors.white,
      border: `1px solid ${DS.colors.border}`,
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 24px rgba(44,44,44,0.08)',
      transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 300ms',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 48px rgba(44,44,44,0.16)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(44,44,44,0.08)';
    }}>
      {/* Category + Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          color: DS.colors.midGray,
        }}>
          {product.categoria}
        </span>
        {product.badge && <Badge label={product.badge} />}
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.1rem',
        fontWeight: 600,
        color: DS.colors.charcoal,
        lineHeight: 1.3,
        margin: 0,
      }}>
        {product.nombre}
      </h3>

      {/* Price block */}
      <div style={{
        background: DS.colors.sandLight,
        borderRadius: '8px',
        padding: '12px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            color: DS.colors.midGray,
            textTransform: 'uppercase' as const,
            marginBottom: '2px',
          }}>
            Menudeo / Mayoreo
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.3rem',
              fontWeight: 700,
              color: DS.colors.charcoal,
            }}>
              ${product.menudeo}
            </span>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1rem',
              fontWeight: 400,
              color: DS.colors.golden,
            }}>
              ${product.mayoreo}
            </span>
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={() => { onAdd(); setPressed(true); setTimeout(() => setPressed(false), 600); }}
          style={{
            background: pressed ? DS.colors.golden : DS.colors.charcoal,
            color: DS.colors.white,
            border: 'none',
            borderRadius: '4px',
            padding: '10px 18px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 150ms, transform 150ms',
            transform: pressed ? 'scale(0.95)' : 'scale(1)',
          }}
        >
          {pressed ? '✓' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COCCIÓN STEPS
───────────────────────────────────────────── */
function CoccionSection() {
  const steps = [
    { num: '01', icon: <Snowflake size={20} />, title: 'Sin Descongelación', body: 'Directo del congelador al aceite. El frío preserva la estructura de la masa.' },
    { num: '02', icon: <Flame size={20} />,    title: 'Temperatura Exacta',  body: 'Fritura: 180°C hasta dorado uniforme. Air fryer: 200°C por 8–10 min + rocío de aceite.' },
    { num: '03', icon: <Clock size={20} />,    title: '2 Min en Rejilla',    body: '2 minutos de reposo sobre rejilla (no papel). El vapor escapa y la masa alcanza máxima crocancia.' },
  ];
  return (
    <section id="coccion" style={{ padding: '64px 16px', background: DS.colors.charcoal }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginBottom: '8px' }}>Instrucciones</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: DS.colors.white, marginBottom: '40px', lineHeight: 1.1 }}>
          El Ritual del Crunch.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
          {steps.map(s => (
            <div key={s.num} style={{
              display: 'flex', gap: '20px', alignItems: 'flex-start',
              background: DS.colors.darkGray, borderRadius: '12px', padding: '24px',
            }}>
              <div style={{ color: DS.colors.golden, flexShrink: 0, marginTop: '2px' }}>{s.icon}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: DS.colors.golden, letterSpacing: '0.1em' }}>{s.num}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: DS.colors.white }}>{s.title}</span>
                </div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: DS.colors.sandDark, lineHeight: 1.6, margin: 0, fontWeight: 300 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Home() {
  const { cart, addToCart, getCartSubtotal } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategoryData.products
  .filter(p => {
    const isFresco = p.nombre.toLowerCase().includes('fresco');
    const isPrecocido = p.nombre.toLowerCase().includes('precocido');
    
    // Si elegimos "Crudos", mostramos lo que no sea precocido
    if (prepMode === 'fresco') return !isPrecocido;
    // Si elegimos "Precocidos", mostramos lo que no sea fresco
    if (prepMode === 'precocido') return !isFresco;
    return true;
  })
  .map((product) => (
    <ProductCard key={product.id} product={product} />
  ))
]
  const [searchTerm, setSearchTerm] = useState('');

  const categoryNames = ['Todos', ...CATEGORIES.map(c => c.name)];
}}>
const [prepMode, setPrepMode] = useState<'fresco' | 'precocido'>('fresco');
<div style={{
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  marginBottom: '40px',
  gap: '12px'
  <div style={{
    display: 'flex',
    background: DS.colors.lightGray,
    padding: '4px',
    borderRadius: '14px',
    border: `1px solid ${DS.colors.border}`,
    position: 'relative',
    width: '280px',
    height: '48px'
  }}>
    {/* Fondo Deslizable (Indicador) */}
    <div style={{
      position: 'absolute',
      top: '4px',
      bottom: '4px',
      left: prepMode === 'fresco' ? '4px' : '50%',
      width: 'calc(50% - 4px)',
      background: DS.colors.golden,
      borderRadius: '10px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1,
      boxShadow: '0 2px 8px rgba(184, 134, 11, 0.2)'
    }} />

    {/* Opción: Fresco */}
    <button
      onClick={() => setPrepMode('fresco')}
      style={{
        flex: 1, border: 'none', background: 'none', cursor: 'pointer', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', fontWeight: 600,
        color: prepMode === 'fresco' ? DS.colors.white : DS.colors.midGray,
        transition: 'color 0.3s', textTransform: 'uppercase' as const, letterSpacing: '0.05em'
      }}
    >
      <Snowflake size={14} /> Crudos
    </button>

    {/* Opción: Precocido */}
    <button
      onClick={() => setPrepMode('precocido')}
      style={{
        flex: 1, border: 'none', background: 'none', cursor: 'pointer', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', fontWeight: 600,
        color: prepMode === 'precocido' ? DS.colors.white : DS.colors.midGray,
        transition: 'color 0.3s', textTransform: 'uppercase' as const, letterSpacing: '0.05em'
      }}
    >
      <Flame size={14} /> Precocidos
    </button>
  </div>

  {/* Texto Explicativo Dinámico */}
  <p style={{
    fontFamily: "'Lato', sans-serif",
    fontSize: '0.75rem',
    color: DS.colors.midGray,
    fontStyle: 'italic'
  }}>
    {prepMode === 'fresco' 
      ? "❄️ Línea Técnica: Requiere fritura profunda para el acabado hojaldrado original."
      : "🔥 Línea Express: Pre-fritos artesanalmente. Ideales para Air Fryer u Horno."
    }
  </p>
</div>
  const filteredProducts = ALL_PRODUCTS.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || p.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const subtotal = getCartSubtotal();
  const shipping = 120;
  const total = subtotal + shipping;

  return (
    <>
      {/* GOOGLE FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Cormorant+Garamond:wght@300;400;600&family=Lato:wght@300;400;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${DS.colors.lightGray}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${DS.colors.sandLight}; }
        ::-webkit-scrollbar-thumb { background: ${DS.colors.sandDark}; border-radius: 3px; }
      `}</style>

      <main style={{ minHeight: '100vh', background: DS.colors.lightGray, paddingBottom: '160px', fontFamily: "'Lato', sans-serif" }}>

        {/* ── HEADER ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 60,
          background: 'rgba(250,250,248,0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${DS.colors.border}`,
          height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px',
        }}>
          {/* Menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{
              background: DS.colors.charcoal,
              border: 'none', borderRadius: '8px',
              padding: '10px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 150ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = DS.colors.golden)}
            onMouseLeave={e => (e.currentTarget.style.background = DS.colors.charcoal)}
          >
            <Menu size={22} color={DS.colors.white} strokeWidth={2.5} />
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo-crumafood.png" alt="Crumafood" style={{ height: '36px', width: 'auto' }} />
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700, fontSize: '1.25rem',
              color: DS.colors.charcoal, letterSpacing: '-0.02em',
            }}>
              CRUMAFOOD
            </span>
          </div>

          {/* Cart */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: DS.colors.charcoal,
            color: DS.colors.white,
            borderRadius: '999px',
            padding: '8px 14px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.7rem', fontWeight: 500,
            letterSpacing: '0.05em',
          }}>
            <ShoppingBag size={14} />
            {cart.length}
          </div>
        </header>

        {/* ── HERO BANNER ── */}
        <div style={{
          background: DS.colors.charcoal,
          padding: '40px 16px',
          textAlign: 'center' as const,
        }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginBottom: '12px' }}>
            Toluca, México · Cadena de frío garantizada
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700, color: DS.colors.white,
            lineHeight: 1.05, letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}>
            La Ciencia del Sabor,<br />el Arte de la Masa.
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: DS.colors.sandDark, fontSize: '0.95rem' }}>
            Tequeños · Empanadas · Discos · Masas
          </p>
        </div>

        {/* ── SEARCH ── */}
        <div style={{ padding: '16px', background: DS.colors.white, borderBottom: `1px solid ${DS.colors.border}` }}>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: DS.colors.midGray }} size={16} />
            <input
              type="text"
              placeholder="¿Qué se te antoja hoy?"
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '12px 12px 12px 42px',
                background: DS.colors.sandLight,
                border: `1.5px solid ${DS.colors.border}`,
                borderRadius: '8px',
                fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', fontWeight: 400,
                color: DS.colors.charcoal,
                outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = DS.colors.golden)}
              onBlur={e => (e.target.style.borderColor = DS.colors.border)}
            />
          </div>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div style={{
          display: 'flex', overflowX: 'auto' as const, gap: '8px',
          padding: '12px 16px', background: DS.colors.white,
          borderBottom: `1px solid ${DS.colors.border}`,
          scrollbarWidth: 'none' as const,
        }}>
          {categoryNames.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '8px 16px',
                borderRadius: '4px',
                border: `1.5px solid ${activeCategory === cat ? DS.colors.charcoal : DS.colors.border}`,
                background: activeCategory === cat ? DS.colors.charcoal : 'transparent',
                color: activeCategory === cat ? DS.colors.white : DS.colors.charcoal,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.65rem', letterSpacing: '0.08em',
                textTransform: 'uppercase' as const, fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 150ms',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── MAYOREO BANNER ── */}
        <div style={{
          margin: '16px', borderRadius: '12px',
          background: `linear-gradient(135deg, ${DS.colors.golden} 0%, ${DS.colors.goldenLight} 100%)`,
          padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: DS.colors.charcoal, textTransform: 'uppercase' as const, opacity: 0.8 }}>Precio especial</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontWeight: 600, color: DS.colors.charcoal }}>5+ paquetes = precio mayoreo</p>
          </div>
          <span style={{ fontSize: '1.5rem' }}>🏪</span>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
          padding: '0 16px 16px',
        }}>
          {filteredProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={() => addToCart({ ...p, precio_menudeo: p.menudeo, precio_mayoreo: p.mayoreo })}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center' as const, padding: '60px 16px', color: DS.colors.midGray }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem' }}>Sin resultados</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', marginTop: '8px' }}>Intenta con otro término</p>
          </div>
        )}

        {/* ── COCCIÓN ── */}
        <CoccionSection />

        {/* ── SIDEBAR MENU ── */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          transition: 'opacity 300ms',
        }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(44,44,44,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsMenuOpen(false)}
          />
          <aside style={{
            position: 'absolute', insetBlock: 0, left: 0, width: '300px',
            background: DS.colors.white,
            padding: '40px 32px',
            display: 'flex', flexDirection: 'column' as const,
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
            boxShadow: '8px 0 40px rgba(44,44,44,0.2)',
          }}>
            {/* Close */}
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.midGray }}
            >
              <X size={28} />
            </button>

            {/* Logo */}
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `1px solid ${DS.colors.border}` }}>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.3rem', color: DS.colors.charcoal, letterSpacing: '-0.02em' }}>CRUMAFOOD</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginTop: '4px' }}>La Ciencia del Sabor</p>
            </div>

            {/* Auth */}
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `1px solid ${DS.colors.border}` }}>
              <SignedOut>
                <SignInButton mode="modal">
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  }}>
                    <div style={{ background: DS.colors.sandLight, padding: '10px', borderRadius: '50%' }}>
                      <UserCircle size={24} color={DS.colors.midGray} />
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: DS.colors.charcoal }}>Iniciar Sesión</span>
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <UserButton afterSignOutUrl="/" />
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: DS.colors.charcoal }}>Mi Cuenta</span>
                </div>
              </SignedIn>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: DS.colors.midGray, textTransform: 'uppercase' as const, marginBottom: '8px' }}>Catálogo</p>
              {categoryNames.map(cat => (
                <button
  key={cat}
  onClick={() => { setActiveCategory(cat); setIsMenuOpen(false); }}
  style={{
    textAlign: 'left' as const, 
    border: 'none', 
    cursor: 'pointer',
    padding: '10px 12px', 
    borderRadius: '6px',
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.3rem', 
    fontWeight: activeCategory === cat ? 600 : 400,
    color: activeCategory === cat ? DS.colors.golden : DS.colors.charcoal,
    background: activeCategory === cat ? DS.colors.sandLight : 'transparent',
    transition: 'all 150ms',
  }}>
                
                  {cat}
                </button>
              ))}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${DS.colors.border}` }}>
                <a href="#coccion" onClick={() => setIsMenuOpen(false)} style={{
                  display: 'block', padding: '10px 12px',
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem',
                  letterSpacing: '0.08em', color: DS.colors.midGray,
                  textDecoration: 'none', textTransform: 'uppercase' as const,
                }}>
                  Cómo Cocinar
                </a>
              </div>
            </nav>
          </aside>
        </div>

        {/* ── CART DRAWER ── */}
        {cart.length > 0 && (
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            background: DS.colors.white,
            borderTop: `1px solid ${DS.colors.border}`,
            borderRadius: '24px 24px 0 0',
            padding: '24px 20px',
            boxShadow: '0 -20px 60px rgba(44,44,44,0.15)',
            zIndex: 50,
            maxWidth: '600px', margin: '0 auto',
          }}>
            {/* Price row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
              <div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: DS.colors.midGray, textTransform: 'uppercase' as const }}>
                  {cart.length} producto{cart.length > 1 ? 's' : ''} · Envío incl.
                </p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: DS.colors.charcoal, lineHeight: 1 }}>
                  ${total} <span style={{ fontSize: '0.9rem', fontWeight: 400, color: DS.colors.midGray }}>MXN</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' as const }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: DS.colors.golden, letterSpacing: '0.05em' }}>❄️ envío congelado</p>
              </div>
            </div>

            {/* CTA */}
            <SignedIn>
              <button style={{
                width: '100%', padding: '16px',
                background: DS.colors.charcoal, color: DS.colors.white,
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem',
                letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: 500,
                transition: 'background 150ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = DS.colors.golden)}
              onMouseLeave={e => (e.currentTarget.style.background = DS.colors.charcoal)}
              >
                Continuar al Pago
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{
                  width: '100%', padding: '16px',
                  background: DS.colors.golden, color: DS.colors.white,
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: 500,
                }}>
                  Inicia sesión para pagar
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer style={{
          background: DS.colors.charcoal,
          padding: '40px 16px',
          textAlign: 'center' as const,
          marginTop: cart.length > 0 ? '160px' : '0',
        }}>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: DS.colors.white, marginBottom: '6px' }}>CRUMAFOOD</p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: DS.colors.golden, textTransform: 'uppercase' as const }}>La Ciencia del Sabor, el Arte de la Masa.</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: DS.colors.midGray, marginTop: '16px' }}>Toluca, Estado de México · © 2025 Crumafood</p>
        </footer>

      </main>
    </>
  );
    }
