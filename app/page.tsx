"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useCart } from './hooks/useCart';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {
  Menu, X, UserCircle, Search, ShoppingBag, Snowflake, Flame, Clock,
  Truck, Star, ChevronDown, ChevronUp, Plus, Minus, MessageCircle,
  Award, Thermometer, Package,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const DS = {
  colors: {
    sand:        '#E8DCC8',
    sandLight:   '#F4EFE6',
    sandDark:    '#C9B99A',
    golden:      '#B8860B',
    goldenLight: '#D4A017',
    charcoal:    '#2C2C2C',
    darkGray:    '#3E3E3E',
    midGray:     '#6B6B6B',
    lightGray:   '#F0EDE8',
    white:       '#FAFAF8',
    border:      '#D6D3CC',
    surface:     '#F4EFE6',
    green:       '#25D366',
  },
};

/* ─────────────────────────────────────────────
   TIPOS
───────────────────────────────────────────── */
type Producto = {
  id: string;
  nombre: string;
  description: string;
  piezas: number;
  badge?: string | null;
  menudeo: number;
  mayoreo: number;
  image: string;
};

type Subcategoria = {
  name: string;
  description: string;
  productIds: string[];
};

type Categoria = {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  subcategories?: Subcategoria[];
  products: Producto[];
};

/* ─────────────────────────────────────────────
   CATÁLOGO COMPLETO
───────────────────────────────────────────── */
const CATEGORIES: Categoria[] = [

  /* ── TEQUEÑOS ── */
  {
    id: 'tequenos',
    name: 'Tequeños',
    subtitle: 'La Firma de Crumafood',
    emoji: '🧀',
    subcategories: [
      {
        name: 'Línea Tradicional',
        description: 'Nuestra medida estándar (8 cm). Masa crujiente con relleno generoso de queso. Paquete de 25 piezas.',
        productIds: ['teq-q-f', 'teq-q-p'],
      },
      {
        name: 'Línea Sabores de Autor',
        description: 'Reinventamos el clásico de 8 cm para paladares extraordinarios. Paquete de 25 piezas.',
        productIds: ['teq-piz-f', 'teq-piz-p', 'teq-choc-f', 'teq-choc-p', 'teq-guay-f', 'teq-guay-p'],
      },
      {
        name: 'Línea Party',
        description: 'El alma de cualquier celebración (5 cm). Diseñados para devorar en un bocado. Paquete de 50 piezas.',
        productIds: ['party-q-f', 'party-q-p', 'party-piz-f', 'party-piz-p', 'party-choc-f', 'party-choc-p', 'party-guay-f', 'party-guay-p'],
      },
    ],
    products: [
      // Tradicional 8 cm
      { id: 'teq-q-f',     nombre: 'Queso (8 cm) — Listo para Freír',              description: 'Masa técnica laminada con queso fresco. Freír a 180 °C directo del congelador.',             piezas: 25, menudeo: 302, mayoreo: 281, image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=400&q=80' },
      { id: 'teq-q-p',     nombre: 'Queso (8 cm) — Air Fryer / Horno',             description: 'Pre-fritos artesanalmente. Listos en 8 min al Air Fryer o 12 min al horno.',                piezas: 25, menudeo: 322, mayoreo: 300, image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=400&q=80' },
      // Autor 8 cm
      { id: 'teq-piz-f',   nombre: 'Pizza (8 cm) — Listo para Freír',              description: 'Salsa pomodoro, orégano y queso fundido artesanal en masa laminada.',                       piezas: 25, menudeo: 350, mayoreo: 320, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
      { id: 'teq-piz-p',   nombre: 'Pizza (8 cm) — Air Fryer / Horno',             description: 'Sabor italiano en minutos. Pre-frito artesanalmente.',                                      piezas: 25, menudeo: 370, mayoreo: 340, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
      { id: 'teq-choc-f',  nombre: 'Doble Chocolate (8 cm) — Listo para Freír',    description: 'Relleno de chocolate premium. El postre perfecto en formato tequeño.',                     piezas: 25, menudeo: 380, mayoreo: 350, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80' },
      { id: 'teq-choc-p',  nombre: 'Doble Chocolate (8 cm) — Air Fryer / Horno',   description: 'Chocolate fundido listo al momento. Ideal como postre o merienda.',                       piezas: 25, menudeo: 400, mayoreo: 370, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80' },
      { id: 'teq-guay-f',  nombre: 'Guayaba y Queso (8 cm) — Listo para Freír',    description: 'Equilibrio perfecto entre dulce y salado. Guayaba premium con queso fresco.',             piezas: 25, menudeo: 372, mayoreo: 346, image: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?w=400&q=80' },
      { id: 'teq-guay-p',  nombre: 'Guayaba y Queso (8 cm) — Air Fryer / Horno',   description: 'El balance dulce-salado listo al instante. Pre-frito artesanalmente.',                   piezas: 25, menudeo: 392, mayoreo: 365, image: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?w=400&q=80' },
      // Party 5 cm
      { id: 'party-q-f',     nombre: 'Party Queso (5 cm) — Listo para Freír',      description: 'Mini tequeño tradicional. Perfecto para eventos y reuniones.',                            piezas: 50, menudeo: 210, mayoreo: 190, image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=400&q=80' },
      { id: 'party-q-p',     nombre: 'Party Queso (5 cm) — Air Fryer / Horno',     description: 'Mini tequeño pre-frito. Listo en minutos para tu evento.',                               piezas: 50, menudeo: 230, mayoreo: 210, image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?w=400&q=80' },
      { id: 'party-piz-f',   nombre: 'Party Pizza (5 cm) — Listo para Freír',      description: 'Mini bocado de pizza en masa laminada artesanal.',                                       piezas: 50, menudeo: 240, mayoreo: 220, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
      { id: 'party-piz-p',   nombre: 'Party Pizza (5 cm) — Air Fryer / Horno',     description: 'Pizza en un bocado, lista al instante.',                                                 piezas: 50, menudeo: 260, mayoreo: 240, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
      { id: 'party-choc-f',  nombre: 'Party Chocolate (5 cm) — Listo para Freír',  description: 'Mini postre de chocolate para sorprender a tus invitados.',                              piezas: 50, menudeo: 250, mayoreo: 230, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80' },
      { id: 'party-choc-p',  nombre: 'Party Chocolate (5 cm) — Air Fryer / Horno', description: 'Chocolate instantáneo en tamaño mini. Perfecto para buffet dulce.',                     piezas: 50, menudeo: 270, mayoreo: 250, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80' },
      { id: 'party-guay-f',  nombre: 'Party Guayaba (5 cm) — Listo para Freír',    description: 'Mini bocado de guayaba y queso para tu celebración.',                                   piezas: 50, menudeo: 240, mayoreo: 220, image: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?w=400&q=80' },
      { id: 'party-guay-p',  nombre: 'Party Guayaba (5 cm) — Air Fryer / Horno',   description: 'Dulzura artesanal lista al momento. Bocado festivo.',                                   piezas: 50, menudeo: 260, mayoreo: 240, image: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?w=400&q=80' },
    ],
  },

  /* ── EMPANADAS ── */
  {
    id: 'empanadas',
    name: 'Empanadas',
    subtitle: 'Formato Clásico',
    emoji: '🫓',
    subcategories: [
      {
        name: 'Línea Tradicional',
        description: 'Empanada clásica de queso con masa hojaldrada artesanal. Paquete de 25 piezas.',
        productIds: ['emp-q-f', 'emp-q-p'],
      },
      {
        name: 'Línea Sabores de Autor',
        description: 'Rellenos premium con ingredientes de calidad y nuestra masa técnica. Paquete de 25 piezas.',
        productIds: ['emp-jq-f','emp-jq-p','emp-tq-f','emp-tq-p','emp-chq-f','emp-chq-p','emp-pq-f','emp-pq-p','emp-pl-f','emp-pl-p'],
      },
      {
        name: 'Línea Party',
        description: 'Empanadas de tamaño bocado, perfectas para eventos y catering. Paquete de 50 piezas.',
        productIds: ['emp-party-q-f','emp-party-q-p','emp-party-jq-f','emp-party-jq-p','emp-party-tq-f','emp-party-tq-p','emp-party-chq-f','emp-party-chq-p','emp-party-pq-f','emp-party-pq-p','emp-party-pl-f','emp-party-pl-p'],
      },
    ],
    products: [
      // Tradicional
      { id: 'emp-q-f',  nombre: 'Queso — Listo para Freír',    description: 'Relleno generoso de queso fundido artesanal en masa hojaldrada. Freír a 180 °C.',      piezas: 25, menudeo: 446, mayoreo: 415, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-q-p',  nombre: 'Queso — Air Fryer / Horno',   description: 'Empanada pre-frita artesanalmente. Lista en minutos, queso fundido al instante.',       piezas: 25, menudeo: 466, mayoreo: 433, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      // Sabores de Autor
      { id: 'emp-jq-f',  nombre: 'Jamón con Queso — Listo para Freír',             description: 'Clásico indispensable. Jamón de calidad y queso fundido en masa artesanal.',         piezas: 25, menudeo: 512, mayoreo: 476, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-jq-p',  nombre: 'Jamón con Queso — Air Fryer / Horno',            description: 'Pre-frita artesanalmente. Jamón y queso listos al instante.',                       piezas: 25, menudeo: 532, mayoreo: 495, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-tq-f',  nombre: 'Tocino con Queso — Listo para Freír',            description: 'Combinación ahumada y cremosa. Tocino artesanal con queso fundido.',               piezas: 25, menudeo: 512, mayoreo: 476, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-tq-p',  nombre: 'Tocino con Queso — Air Fryer / Horno',           description: 'El ahumado perfecto listo al momento. Pre-frita artesanalmente.',                  piezas: 25, menudeo: 532, mayoreo: 495, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-chq-f', nombre: 'Chorizo con Queso — Listo para Freír',           description: 'Intensidad y textura mexicana en cada bocado.',                                     piezas: 25, menudeo: 512, mayoreo: 476, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-chq-p', nombre: 'Chorizo con Queso — Air Fryer / Horno',          description: 'Sabor mexicano intenso listo al instante.',                                         piezas: 25, menudeo: 532, mayoreo: 495, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-pq-f',  nombre: 'Pastor con Queso — Listo para Freír',            description: 'El taco de pastor reinventado en masa hojaldrada artesanal.',                      piezas: 25, menudeo: 512, mayoreo: 476, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-pq-p',  nombre: 'Pastor con Queso — Air Fryer / Horno',           description: 'Sabor de pastor y queso fundido listo al momento.',                               piezas: 25, menudeo: 532, mayoreo: 495, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-pl-f',  nombre: 'Plátano Macho con Queso — Listo para Freír',     description: 'El toque dulce del plátano macho con queso en masa artesanal.',                  piezas: 25, menudeo: 512, mayoreo: 476, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-pl-p',  nombre: 'Plátano Macho con Queso — Air Fryer / Horno',    description: 'Dulzura y queso fundido listos al momento.',                                       piezas: 25, menudeo: 532, mayoreo: 495, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      // Party
      { id: 'emp-party-q-f',    nombre: 'Party Queso — Listo para Freír',                      description: 'Mini empanada de queso artesanal para eventos.',               piezas: 50, menudeo: 465, mayoreo: 432, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-q-p',    nombre: 'Party Queso — Air Fryer / Horno',                     description: 'Mini queso pre-frita, lista al momento.',                      piezas: 50, menudeo: 485, mayoreo: 450, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-jq-f',   nombre: 'Party Jamón con Queso — Listo para Freír',            description: 'Perfectas para catering y celebraciones.',                     piezas: 50, menudeo: 558, mayoreo: 519, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-jq-p',   nombre: 'Party Jamón con Queso — Air Fryer / Horno',           description: 'Jamón y queso en un bocado, lista al instante.',               piezas: 50, menudeo: 578, mayoreo: 537, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-tq-f',   nombre: 'Party Tocino con Queso — Listo para Freír',           description: 'Bocados crujientes con toque ahumado para tu evento.',         piezas: 50, menudeo: 558, mayoreo: 519, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-tq-p',   nombre: 'Party Tocino con Queso — Air Fryer / Horno',          description: 'Ahumado express en tamaño mini.',                              piezas: 50, menudeo: 578, mayoreo: 537, image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-chq-f',  nombre: 'Party Chorizo con Queso — Listo para Freír',          description: 'Mini bocado con carácter mexicano intenso.',                   piezas: 50, menudeo: 558, mayoreo: 519, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-chq-p',  nombre: 'Party Chorizo con Queso — Air Fryer / Horno',         description: 'Chorizo y queso listos al instante.',                          piezas: 50, menudeo: 578, mayoreo: 537, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-pq-f',   nombre: 'Party Pastor con Queso — Listo para Freír',           description: 'La esencia del pastor en formato mini.',                       piezas: 50, menudeo: 558, mayoreo: 519, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-pq-p',   nombre: 'Party Pastor con Queso — Air Fryer / Horno',          description: 'Pastor y queso listos al momento.',                            piezas: 50, menudeo: 578, mayoreo: 537, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-pl-f',   nombre: 'Party Plátano Macho con Queso — Listo para Freír',    description: 'Dulzura técnica en tamaño bocado para eventos.',               piezas: 50, menudeo: 558, mayoreo: 519, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
      { id: 'emp-party-pl-p',   nombre: 'Party Plátano Macho con Queso — Air Fryer / Horno',   description: 'Plátano y queso fundido listos al instante.',                  piezas: 50, menudeo: 578, mayoreo: 537, badge: 'mexicano', image: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e6?w=400&q=80' },
    ],
  },

  /* ── DISCOS DE MASA ── */
  {
    id: 'discos',
    name: 'Discos de Masa',
    subtitle: 'Tu Aliado en la Cocina',
    emoji: '⭕',
    products: [
      { id: 'disco-9',  nombre: 'Disco Nº 9 — Estándar', description: 'Masa hojaldrada técnica para fritura seca. Paquete de 12 piezas.',        piezas: 12, badge: null,      menudeo: 30,  mayoreo: 28,  image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
      { id: 'disco-14', nombre: 'Disco Nº 14 — Grande',  description: 'Diámetro ideal para empanadas de alto formato. Paquete de 12 piezas.',    piezas: 12, badge: 'popular', menudeo: 66,  mayoreo: 61,  image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
    ],
  },

  /* ── MASAS ── */
  {
    id: 'masas',
    name: 'Masas',
    subtitle: 'Calidad Profesional',
    emoji: '🫙',
    products: [
      { id: 'masa-estirada', nombre: 'Masa Estirada 500 g', description: 'Masa técnica lista para moldear tus creaciones.',           piezas: 1, badge: null, menudeo: 35, mayoreo: 33, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
      { id: 'm-piz',         nombre: 'Masa Pizza 1 kg',      description: 'Base profesional para pizzas de alta crocancia.',         piezas: 1, badge: null, menudeo: 60, mayoreo: 45, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
    ],
  },
];

const ALL_PRODUCTS = CATEGORIES.flatMap(cat =>
  cat.products.map(p => ({ ...p, categoria: cat.name }))
);

/* ─────────────────────────────────────────────
   BADGE
───────────────────────────────────────────── */
function Badge({ label }: { label: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    favorito: { bg: DS.colors.golden,   color: DS.colors.white },
    mexicano: { bg: DS.colors.sandDark, color: DS.colors.charcoal },
    popular:  { bg: DS.colors.charcoal, color: DS.colors.white },
    grande:   { bg: DS.colors.surface,  color: DS.colors.charcoal },
  };
  const s = map[label] ?? { bg: DS.colors.sand, color: DS.colors.charcoal };
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: '0.6rem',
      fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.12em',
      textTransform: 'uppercase' as const, padding: '3px 8px',
      borderRadius: '2px', fontWeight: 500,
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
  const isPrecio = product.nombre.toLowerCase().includes('air fryer');

  return (
    <div
      style={{
        background: DS.colors.white, border: `1px solid ${DS.colors.border}`,
        borderRadius: '12px', overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(44,44,44,0.07)',
        transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 300ms',
        display: 'flex', flexDirection: 'column' as const,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 48px rgba(44,44,44,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(44,44,44,0.07)';
      }}
    >
      {/* Imagen */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: DS.colors.sandLight }}>
        <img
          src={product.image}
          alt={product.nombre}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        {/* Chip de modo */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: isPrecio ? DS.colors.golden : DS.colors.charcoal,
          color: DS.colors.white, borderRadius: '4px',
          padding: '3px 8px', fontSize: '0.58rem',
          fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {isPrecio ? '🔥 Air Fryer / Horno' : '❄️ Para Freír'}
        </div>
        {product.badge && (
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <Badge label={product.badge} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column' as const, gap: '10px', flex: 1 }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.05rem', fontWeight: 600, color: DS.colors.charcoal,
          lineHeight: 1.3, margin: 0,
        }}>
          {product.nombre.replace(/ — (Listo para Freír|Air Fryer \/ Horno)/, '')}
        </h3>

        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.82rem', color: DS.colors.midGray, lineHeight: 1.5, margin: 0 }}>
          {product.description}
        </p>

        {/* Piezas */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          background: DS.colors.sandLight, borderRadius: '4px',
          padding: '3px 8px', alignSelf: 'flex-start' as const,
        }}>
          <Package size={11} color={DS.colors.golden} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: DS.colors.midGray, letterSpacing: '0.05em' }}>
            {product.piezas} {product.piezas === 1 ? 'pieza' : 'piezas'} por paquete
          </span>
        </div>

        {/* Precio + Botón */}
        <div style={{
          background: DS.colors.sandLight, borderRadius: '8px', padding: '10px 12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto',
        }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.52rem', letterSpacing: '0.1em', color: DS.colors.midGray, textTransform: 'uppercase' as const, marginBottom: '2px' }}>
              Menudeo / Mayoreo
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: DS.colors.charcoal }}>
                ${product.menudeo}
              </span>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.95rem', fontWeight: 400, color: DS.colors.golden }}>
                ${product.mayoreo}
              </span>
            </div>
          </div>
          <button
            onClick={() => { onAdd(); setPressed(true); setTimeout(() => setPressed(false), 600); }}
            style={{
              background: pressed ? DS.colors.golden : DS.colors.charcoal,
              color: DS.colors.white, border: 'none', borderRadius: '4px',
              padding: '9px 14px', fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              fontWeight: 500, cursor: 'pointer',
              transition: 'background 150ms, transform 150ms',
              transform: pressed ? 'scale(0.95)' : 'scale(1)',
            }}
          >
            {pressed ? '✓' : '+ Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SEARCH AUTOCOMPLETE
───────────────────────────────────────────── */
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length < 2) { setSuggestions([]); setOpen(false); return; }
    const matches = ALL_PRODUCTS
      .map(p => p.nombre.replace(/ — (Listo para Freír|Air Fryer \/ Horno)/, '').trim())
      .filter((n, i, arr) => arr.indexOf(n) === i)
      .filter(n => n.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 6);
    setSuggestions(matches);
    setOpen(matches.length > 0);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
      <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: DS.colors.midGray, zIndex: 1 }} size={16} />
      <input
        type="text"
        value={value}
        placeholder="¿Qué se te antoja hoy?"
        onChange={e => onChange(e.target.value)}
        onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
        style={{
          width: '100%', padding: '12px 12px 12px 42px',
          background: DS.colors.sandLight, border: `1.5px solid ${DS.colors.border}`,
          borderRadius: open ? '8px 8px 0 0' : '8px',
          fontFamily: "'Lato', sans-serif", fontSize: '0.9rem',
          color: DS.colors.charcoal, outline: 'none', boxSizing: 'border-box' as const,
          transition: 'border-color 150ms',
        }}
        onFocusCapture={e => (e.target.style.borderColor = DS.colors.golden)}
        onBlur={e => (e.target.style.borderColor = DS.colors.border)}
      />
      {value && (
        <button
          onClick={() => { onChange(''); setOpen(false); }}
          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.midGray }}
        >
          <X size={14} />
        </button>
      )}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: DS.colors.white, border: `1.5px solid ${DS.colors.golden}`,
          borderTop: 'none', borderRadius: '0 0 8px 8px',
          boxShadow: '0 8px 24px rgba(44,44,44,0.12)', zIndex: 50, overflow: 'hidden',
        }}>
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => { onChange(s); setOpen(false); }}
              style={{
                padding: '10px 16px', cursor: 'pointer',
                fontFamily: "'Lato', sans-serif", fontSize: '0.88rem',
                color: DS.colors.charcoal,
                borderBottom: i < suggestions.length - 1 ? `1px solid ${DS.colors.border}` : 'none',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = DS.colors.sandLight)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <Search size={12} color={DS.colors.golden} />
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SUBCATEGORY SECTION
───────────────────────────────────────────── */
function SubcategorySection({
  category, prepMode, searchTerm, onAdd,
}: {
  category: Categoria;
  prepMode: 'freir' | 'airfryer';
  searchTerm: string;
  onAdd: (p: typeof ALL_PRODUCTS[0]) => void;
}) {
  const productMap = Object.fromEntries(
    category.products.map(p => [p.id, { ...p, categoria: category.name }])
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '40px', padding: '0 16px 24px' }}>
      {category.subcategories!.map(sub => {
        const products = sub.productIds
          .map(id => productMap[id])
          .filter(Boolean)
          .filter(p => {
            const isAirFryer = p.nombre.toLowerCase().includes('air fryer');
            if (prepMode === 'freir')    return !isAirFryer;
            if (prepMode === 'airfryer') return isAirFryer;
            return true;
          })
          .filter(p =>
            searchTerm === '' || p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
          );

        if (products.length === 0) return null;

        return (
          <div key={sub.name}>
            <div style={{ marginBottom: '16px', paddingBottom: '10px', borderBottom: `1px solid ${DS.colors.border}` }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginBottom: '4px' }}>
                {sub.name}
              </p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.82rem', color: DS.colors.midGray, fontStyle: 'italic' }}>
                {sub.description}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {products.map(p => (
                <ProductCard key={p.id} product={p} onAdd={() => onAdd(p)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CART DRAWER
───────────────────────────────────────────── */
function CartDrawer({
  open, onClose, cart, onIncrement, onDecrement, onRemove, total,
}: {
  open: boolean;
  onClose: () => void;
  cart: any[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  total: number;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 110,
          background: 'rgba(44,44,44,0.5)', backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 300ms',
        }}
      />
      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
        background: DS.colors.white, zIndex: 120,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
        display: 'flex', flexDirection: 'column' as const,
        boxShadow: '-20px 0 60px rgba(44,44,44,0.15)',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${DS.colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: DS.colors.charcoal }}>Tu Pedido</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: DS.colors.midGray, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              {cart.length === 0 ? 'Vacío' : `${cart.length} producto${cart.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.midGray }}>
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto' as const, padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center' as const, padding: '60px 0', color: DS.colors.midGray }}>
              <ShoppingBag size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.2rem' }}>Tu carrito está vacío</p>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.85rem', marginTop: '6px' }}>Agrega productos para comenzar</p>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={item.id} style={{
                background: DS.colors.sandLight, borderRadius: '10px', padding: '12px',
                display: 'flex', gap: '12px', alignItems: 'flex-start',
              }}>
                <img src={item.image} alt={item.nombre} style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.95rem', fontWeight: 600, color: DS.colors.charcoal, lineHeight: 1.3, marginBottom: '4px' }}>
                    {item.nombre.replace(/ — (Listo para Freír|Air Fryer \/ Horno)/, '')}
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', fontWeight: 700, color: DS.colors.golden }}>
                    ${(item.precio_menudeo * (item.qty || 1)).toLocaleString()} MXN
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: DS.colors.white, borderRadius: '6px', padding: '4px 6px', border: `1px solid ${DS.colors.border}` }}>
                    <button onClick={() => onDecrement(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.charcoal, display: 'flex', padding: 0 }}><Minus size={12} /></button>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' as const }}>{item.qty || 1}</span>
                    <button onClick={() => onIncrement(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.charcoal, display: 'flex', padding: 0 }}><Plus size={12} /></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.midGray, fontSize: '0.65rem', fontFamily: "'IBM Plex Mono', monospace" }}>
                    eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: `1px solid ${DS.colors.border}` }}>
            {/* Info envío */}
            <div style={{ background: DS.colors.sandLight, borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Truck size={12} color={DS.colors.golden} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: DS.colors.golden, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Envío a toda la República</span>
              </div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.78rem', color: DS.colors.midGray }}>Salidas los lunes y martes · Entrega en 3–5 días hábiles</p>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', color: DS.colors.midGray, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Subtotal</span>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: DS.colors.charcoal }}>${total.toLocaleString()} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: DS.colors.midGray }}>MXN</span></span>
            </div>
            {total < 1200 && (
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', color: '#B45309', background: '#FEF3C7', borderRadius: '6px', padding: '6px 10px', marginBottom: '10px' }}>
                ⚠️ Compra mínima $1,200 MXN. Te faltan ${(1200 - total).toLocaleString()} MXN.
              </p>
            )}

            <SignedIn>
              <button
                disabled={total < 1200}
                style={{
                  width: '100%', padding: '14px',
                  background: total >= 1200 ? DS.colors.charcoal : DS.colors.midGray,
                  color: DS.colors.white, border: 'none', borderRadius: '8px',
                  cursor: total >= 1200 ? 'pointer' : 'not-allowed',
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: 500,
                  transition: 'background 150ms',
                }}
                onMouseEnter={e => { if (total >= 1200) (e.currentTarget.style.background = DS.colors.golden); }}
                onMouseLeave={e => { if (total >= 1200) (e.currentTarget.style.background = DS.colors.charcoal); }}
              >
                Continuar al Pago →
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{
                  width: '100%', padding: '14px',
                  background: DS.colors.golden, color: DS.colors.white,
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontWeight: 500,
                }}>
                  Inicia sesión para pagar
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   ¿POR QUÉ CRUMAFOOD?
───────────────────────────────────────────── */
function PorQueSection() {
  const items = [
    { icon: <Award size={28} />, title: 'Masa Artesanal', body: 'Cada pieza se elabora con técnicas de laminado que garantizan la textura hojaldrada y crujiente que nos distingue. Sin conservadores, sin atajos.' },
    { icon: <Thermometer size={28} />, title: 'Cadena de Frío', body: 'Desde nuestra cocina hasta tu puerta, mantenemos la cadena de frío intacta. Enviamos exclusivamente los lunes y martes para que tu pedido llegue en perfecto estado.' },
    { icon: <Truck size={28} />, title: 'Envíos Nacionales', body: 'Entregamos en toda la República Mexicana. Tu pedido llega en 3 a 5 días hábiles, listo para ir directo al congelador.' },
  ];
  return (
    <section style={{ padding: '64px 16px', background: DS.colors.white }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginBottom: '8px', textAlign: 'center' as const }}>Nuestra promesa</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, color: DS.colors.charcoal, textAlign: 'center' as const, marginBottom: '40px', lineHeight: 1.15 }}>
          ¿Por qué Crumafood?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {items.map(item => (
            <div key={item.title} style={{ background: DS.colors.sandLight, borderRadius: '16px', padding: '28px 24px', border: `1px solid ${DS.colors.border}` }}>
              <div style={{ color: DS.colors.golden, marginBottom: '14px' }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', fontWeight: 600, color: DS.colors.charcoal, marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.88rem', color: DS.colors.midGray, lineHeight: 1.65, fontWeight: 300 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIOS
───────────────────────────────────────────── */
function TestimoniosSection() {
  const reviews = [
    { name: 'Gabriela M.', ciudad: 'CDMX', texto: 'Los tequeños de guayaba son una adicción. Los pedí para una reunión y todos me pidieron el contacto. ¡Llegaron perfectamente congelados!', stars: 5 },
    { name: 'Carlos R.', ciudad: 'Monterrey', texto: 'Excelente calidad y la masa es realmente diferente a lo que encuentras en el mercado. El empaque llegó intacto y frío. Ya hice mi segundo pedido.', stars: 5 },
    { name: 'Sofía L.', ciudad: 'Guadalajara', texto: 'Los pedí party para el cumpleaños de mi hijo y fueron un éxito total. Se hacen en el air fryer en 8 minutos. Facilísimos y riquísimos.', stars: 5 },
    { name: 'Andrés P.', ciudad: 'Puebla', texto: 'Las empanadas de pastor con queso son increíbles. La cadena de frío funcionó perfecto, llegaron como si los hubieran preparado ese día.', stars: 5 },
  ];
  return (
    <section style={{ padding: '64px 16px', background: DS.colors.lightGray }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginBottom: '8px', textAlign: 'center' as const }}>Lo que dicen nuestros clientes</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, color: DS.colors.charcoal, textAlign: 'center' as const, marginBottom: '40px', lineHeight: 1.15 }}>
          Opiniones Reales
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {reviews.map(r => (
            <div key={r.name} style={{ background: DS.colors.white, borderRadius: '14px', padding: '24px', border: `1px solid ${DS.colors.border}`, display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} size={14} fill={DS.colors.golden} color={DS.colors.golden} />
                ))}
              </div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.88rem', color: DS.colors.darkGray, lineHeight: 1.65, fontStyle: 'italic', flex: 1 }}>"{r.texto}"</p>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontWeight: 600, color: DS.colors.charcoal }}>{r.name}</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: DS.colors.midGray, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{r.ciudad}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: '¿Cómo se almacenan los productos?', a: 'Todos nuestros productos deben conservarse en congelación a -18 °C o menos. Al recibirlos, pásalos directamente al congelador. No los descongeles antes de cocinarlos; se cocinan directo del congelador para preservar la textura hojaldrada.' },
    { q: '¿Cuánto duran en el congelador?', a: 'En condiciones óptimas de congelación (-18 °C), los productos tienen una vida útil de hasta 3 meses. Te recomendamos consumirlos antes de esa fecha para disfrutar la máxima calidad.' },
    { q: '¿Se pueden hornear en lugar de freír?', a: 'Los productos "Air Fryer / Horno" están diseñados exactamente para eso: 200 °C en air fryer por 8–10 minutos con un ligero rocío de aceite, o 200 °C en horno convencional por 14–16 minutos. Los productos "Listo para Freír" se recomiendan en fritura profunda a 180 °C para el mejor resultado, aunque también pueden hornearse.' },
    { q: '¿Hacen pedidos especiales para eventos?', a: '¡Claro que sí! Contamos con precios de mayoreo para pedidos de 5 paquetes o más. Para eventos grandes, bodas, catering o pedidos personalizados, escríbenos directo por WhatsApp y con gusto te atendemos.' },
    { q: '¿Cuál es la compra mínima?', a: 'La compra mínima es de $1,200 MXN. Los envíos se realizan los lunes y martes para garantizar la cadena de frío durante todo el trayecto.' },
    { q: '¿Qué pasa si mi pedido llega en mal estado?', a: 'Si hay algún problema con tu pedido, lo resolvemos. Escríbenos por WhatsApp con una foto del producto y te damos solución inmediata: reposición o reembolso, sin complicaciones.' },
  ];
  return (
    <section style={{ padding: '64px 16px', background: DS.colors.white }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginBottom: '8px', textAlign: 'center' as const }}>Preguntas frecuentes</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 700, color: DS.colors.charcoal, textAlign: 'center' as const, marginBottom: '40px', lineHeight: 1.15 }}>
          FAQ
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: `1px solid ${DS.colors.border}`, borderRadius: '10px', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                style={{
                  width: '100%', padding: '16px 20px', background: openIdx === i ? DS.colors.sandLight : DS.colors.white,
                  border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.05rem',
                  fontWeight: 600, color: DS.colors.charcoal, textAlign: 'left' as const, transition: 'background 150ms',
                }}
              >
                {faq.q}
                {openIdx === i ? <ChevronUp size={18} color={DS.colors.golden} /> : <ChevronDown size={18} color={DS.colors.midGray} />}
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 20px 18px', background: DS.colors.sandLight }}>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', color: DS.colors.midGray, lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Política de devolución */}
        <div style={{ marginTop: '24px', background: DS.colors.sandLight, borderRadius: '10px', padding: '16px 20px', border: `1px solid ${DS.colors.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.4rem' }}>🛡️</span>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.88rem', color: DS.colors.charcoal, lineHeight: 1.6 }}>
            <strong>Política de devolución:</strong> Si hay algún problema con tu pedido, lo resolvemos. Escríbenos por WhatsApp con una foto y te damos solución de inmediato.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COCCIÓN SECTION
───────────────────────────────────────────── */
function CoccionSection() {
  const steps = [
    { num: '01', icon: <Snowflake size={20} />, title: 'Sin Descongelación', body: 'Directo del congelador al aceite o al Air Fryer. El frío preserva la estructura de la masa y garantiza el crunch perfecto.' },
    { num: '02', icon: <Flame size={20} />,     title: 'Temperatura Exacta',  body: 'Fritura profunda: 180 °C hasta dorado uniforme. Air Fryer: 200 °C por 8–10 min con rocío de aceite. Horno: 200 °C por 14–16 min.' },
    { num: '03', icon: <Clock size={20} />,     title: '2 Min en Rejilla',    body: '2 minutos de reposo sobre rejilla (no papel). El vapor escapa y la masa alcanza su máxima crocancia.' },
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
            <div key={s.num} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: DS.colors.darkGray, borderRadius: '12px', padding: '24px' }}>
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
   WHATSAPP FLOTANTE
───────────────────────────────────────────── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/527271234567?text=Hola%2C%20me%20interesa%20hacer%20un%20pedido%20de%20Crumafood"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 200,
        width: '56px', height: '56px', borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        transition: 'transform 200ms, box-shadow 200ms', textDecoration: 'none',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(37,211,102,0.5)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)';
      }}
    >
      <MessageCircle size={26} color="white" fill="white" />
    </a>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Home() {
  const { cart, addToCart, getCartSubtotal, incrementItem, decrementItem, removeFromCart } = useCart();
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [isCartOpen, setIsCartOpen]         = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm]         = useState('');
  const [prepMode, setPrepMode]             = useState<'freir' | 'airfryer'>('freir');

  const categoryNames     = ['Todos', ...CATEGORIES.map(c => c.name)];
  const activeCategoryObj = CATEGORIES.find(c => c.name === activeCategory);
  const useSubcategoryView = !!activeCategoryObj?.subcategories;

  const filteredProducts = ALL_PRODUCTS
    .filter(p => {
      const isAirFryer = p.nombre.toLowerCase().includes('air fryer');
      if (prepMode === 'freir')    return !isAirFryer;
      if (prepMode === 'airfryer') return isAirFryer;
      return true;
    })
    .filter(p => {
      const matchesSearch   = searchTerm === '' || p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || p.categoria === activeCategory;
      return matchesSearch && matchesCategory;
    });

  const subtotal = getCartSubtotal();
  const shipping = 120;
  const total    = subtotal + shipping;

  const handleAdd = (p: typeof ALL_PRODUCTS[0]) =>
    addToCart({ ...p, precio_menudeo: p.menudeo, precio_mayoreo: p.mayoreo });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Cormorant+Garamond:wght@300;400;600&family=Lato:wght@300;400;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${DS.colors.lightGray}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${DS.colors.sandLight}; }
        ::-webkit-scrollbar-thumb { background: ${DS.colors.sandDark}; border-radius: 3px; }
      `}</style>

      <main style={{ minHeight: '100vh', background: DS.colors.lightGray, fontFamily: "'Lato', sans-serif" }}>

        {/* ── HEADER ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 60,
          background: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${DS.colors.border}`,
          height: '72px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 16px',
        }}>
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{ background: DS.colors.charcoal, border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'background 150ms' }}
            onMouseEnter={e => (e.currentTarget.style.background = DS.colors.golden)}
            onMouseLeave={e => (e.currentTarget.style.background = DS.colors.charcoal)}
          >
            <Menu size={22} color={DS.colors.white} strokeWidth={2.5} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo-crumafood.png" alt="Crumafood" style={{ height: '36px', width: 'auto' }} />
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.25rem', color: DS.colors.charcoal, letterSpacing: '-0.02em' }}>
              CRUMAFOOD
            </span>
          </div>

          {/* Cart button — siempre visible */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: DS.colors.charcoal, color: DS.colors.white,
              borderRadius: '999px', padding: '8px 14px', border: 'none', cursor: 'pointer',
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem',
              fontWeight: 500, letterSpacing: '0.05em', transition: 'background 150ms',
              position: 'relative',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = DS.colors.golden)}
            onMouseLeave={e => (e.currentTarget.style.background = DS.colors.charcoal)}
          >
            <ShoppingBag size={14} />
            {cart.length > 0 ? (
              <span style={{
                background: DS.colors.golden, color: DS.colors.white,
                borderRadius: '50%', width: '18px', height: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6rem', fontWeight: 700,
              }}>
                {cart.length}
              </span>
            ) : 'Carrito'}
          </button>
        </header>

        {/* ── HERO ── */}
        <div style={{ background: DS.colors.charcoal, padding: '48px 16px', textAlign: 'center' as const }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginBottom: '12px' }}>
            Toluca, México · Cadena de frío garantizada
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem,6vw,3.5rem)', fontWeight: 700, color: DS.colors.white, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            La Ciencia del Sabor,<br />el Arte de la Masa.
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: DS.colors.sandDark, fontSize: '0.95rem', marginBottom: '24px' }}>
            Tequeños · Empanadas · Discos · Masas
          </p>
          {/* Info envío rápida */}
          <div style={{ display: 'inline-flex', gap: '24px', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
            {[
              { icon: '🚚', text: 'Envíos lunes y martes' },
              { icon: '📦', text: '3–5 días hábiles' },
              { icon: '🛡️', text: 'Compra mínima $1,200 MXN' },
            ].map(i => (
              <div key={i.text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.9rem' }}>{i.icon}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.58rem', color: DS.colors.sandDark, letterSpacing: '0.06em' }}>{i.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ¿POR QUÉ CRUMAFOOD? ── */}
        <PorQueSection />

        {/* ── SEARCH ── */}
        <div style={{ padding: '16px', background: DS.colors.white, borderBottom: `1px solid ${DS.colors.border}` }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {/* ── CATEGORY TABS ── */}
        <div style={{ display: 'flex', overflowX: 'auto' as const, gap: '8px', padding: '12px 16px', background: DS.colors.white, borderBottom: `1px solid ${DS.colors.border}`, scrollbarWidth: 'none' as const }}>
          {categoryNames.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0, padding: '8px 16px', borderRadius: '4px',
                border: `1.5px solid ${activeCategory === cat ? DS.colors.charcoal : DS.colors.border}`,
                background: activeCategory === cat ? DS.colors.charcoal : 'transparent',
                color: activeCategory === cat ? DS.colors.white : DS.colors.charcoal,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
                letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                fontWeight: 500, cursor: 'pointer', transition: 'all 150ms',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── BANNER MAYOREO ── */}
        <div style={{ margin: '16px', borderRadius: '12px', background: `linear-gradient(135deg, ${DS.colors.golden} 0%, ${DS.colors.goldenLight} 100%)`, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: DS.colors.charcoal, textTransform: 'uppercase' as const, opacity: 0.8 }}>Precio especial</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontWeight: 600, color: DS.colors.charcoal }}>5+ paquetes = precio mayoreo automático</p>
          </div>
          <span style={{ fontSize: '1.5rem' }}>🏪</span>
        </div>

        {/* ── TOGGLE PARA FREÍR / AIR FRYER ── */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', marginBottom: '32px', gap: '12px', padding: '0 16px' }}>
          <div style={{ display: 'flex', background: DS.colors.lightGray, padding: '4px', borderRadius: '14px', border: `1px solid ${DS.colors.border}`, position: 'relative', width: '300px', height: '48px' }}>
            <div style={{
              position: 'absolute', top: '4px', bottom: '4px',
              left: prepMode === 'freir' ? '4px' : '50%',
              width: 'calc(50% - 4px)', background: DS.colors.golden,
              borderRadius: '10px', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              zIndex: 1, boxShadow: '0 2px 8px rgba(184,134,11,0.2)',
            }} />
            <button onClick={() => setPrepMode('freir')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', fontWeight: 600, color: prepMode === 'freir' ? DS.colors.white : DS.colors.midGray, transition: 'color 0.3s', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
              <Snowflake size={13} /> Para Freír
            </button>
            <button onClick={() => setPrepMode('airfryer')} style={{ flex: 1, border: 'none', background: 'none', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.62rem', fontWeight: 600, color: prepMode === 'airfryer' ? DS.colors.white : DS.colors.midGray, transition: 'color 0.3s', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
              <Flame size={13} /> Air Fryer / Horno
            </button>
          </div>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', color: DS.colors.midGray, fontStyle: 'italic', textAlign: 'center' as const }}>
            {prepMode === 'freir'
              ? '❄️ Línea Técnica: Fritura profunda a 180 °C directo del congelador para el acabado hojaldrado original.'
              : '🔥 Línea Express: Pre-fritos artesanalmente. Listos en minutos en Air Fryer u Horno.'}
          </p>
        </div>

        {/* ── PRODUCTOS ── */}
        {useSubcategoryView ? (
          <SubcategorySection category={activeCategoryObj!} prepMode={prepMode} searchTerm={searchTerm} onAdd={handleAdd} />
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', padding: '0 16px 16px' }}>
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} onAdd={() => handleAdd(p)} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center' as const, padding: '60px 16px', color: DS.colors.midGray }}>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem' }}>Sin resultados para "{searchTerm}"</p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.9rem', marginTop: '8px' }}>Intenta con otro término o revisa todas las categorías</p>
              </div>
            )}
          </>
        )}

        {/* ── COCCIÓN ── */}
        <CoccionSection />

        {/* ── ¿POR QUÉ? ── ya está arriba, aquí van Testimonios y FAQ */}
        <TestimoniosSection />
        <FaqSection />

        {/* ── SIDEBAR ── */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, opacity: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? 'auto' : 'none', transition: 'opacity 300ms' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,44,44,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setIsMenuOpen(false)} />
          <aside style={{ position: 'absolute', insetBlock: 0, left: 0, width: '300px', background: DS.colors.white, padding: '40px 32px', display: 'flex', flexDirection: 'column' as const, transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)', boxShadow: '8px 0 40px rgba(44,44,44,0.2)', overflowY: 'auto' as const }}>
            <button onClick={() => setIsMenuOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: DS.colors.midGray }}>
              <X size={28} />
            </button>
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `1px solid ${DS.colors.border}` }}>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '1.3rem', color: DS.colors.charcoal }}>CRUMAFOOD</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: DS.colors.golden, textTransform: 'uppercase' as const, marginTop: '4px' }}>La Ciencia del Sabor</p>
            </div>
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: `1px solid ${DS.colors.border}` }}>
              <SignedOut>
                <SignInButton mode="modal">
                  <button style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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
            <nav style={{ display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.2em', color: DS.colors.midGray, textTransform: 'uppercase' as const, marginBottom: '8px' }}>Catálogo</p>
              {categoryNames.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setIsMenuOpen(false); }} style={{ textAlign: 'left' as const, border: 'none', cursor: 'pointer', padding: '10px 12px', borderRadius: '6px', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', fontWeight: activeCategory === cat ? 600 : 400, color: activeCategory === cat ? DS.colors.golden : DS.colors.charcoal, background: activeCategory === cat ? DS.colors.sandLight : 'transparent', transition: 'all 150ms' }}>
                  {cat}
                </button>
              ))}
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${DS.colors.border}`, display: 'flex', flexDirection: 'column' as const, gap: '4px' }}>
                <a href="#coccion" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', padding: '10px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.08em', color: DS.colors.midGray, textDecoration: 'none', textTransform: 'uppercase' as const }}>Cómo Cocinar</a>
                <a href="https://wa.me/527271234567" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.08em', color: '#25D366', textDecoration: 'none', textTransform: 'uppercase' as const }}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </nav>
          </aside>
        </div>

        {/* ── CART DRAWER ── */}
        <CartDrawer
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onIncrement={(id) => incrementItem?.(id)}
          onDecrement={(id) => decrementItem?.(id)}
          onRemove={(id) => removeFromCart?.(id)}
          total={total}
        />

        {/* ── FOOTER ── */}
        <footer style={{ background: DS.colors.charcoal, padding: '48px 16px', textAlign: 'center' as const }}>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, color: DS.colors.white, marginBottom: '6px' }}>CRUMAFOOD</p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: DS.colors.golden, textTransform: 'uppercase' as const }}>La Ciencia del Sabor, el Arte de la Masa.</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.8rem', color: DS.colors.midGray, marginTop: '16px' }}>Toluca, Estado de México · © 2026 Crumafood</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', color: DS.colors.midGray, marginTop: '8px' }}>Envíos lunes y martes · Compra mínima $1,200 MXN · República Mexicana</p>
        </footer>

      </main>

      {/* ── WHATSAPP FLOTANTE ── */}
      <WhatsAppButton />
    </>
  );
       }
