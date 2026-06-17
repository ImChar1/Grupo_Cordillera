import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

// ── Paleta ────────────────────────────────────────────────────────────────────
const C = {
  bg:      '#F7F4EF',
  bgSide:  '#EFEBE4',
  white:   '#FFFFFF',
  ink:     '#1A1A18',
  green:   '#2D6A4F',
  green2:  '#40916C',
  muted:   '#8A8680',
  light:   '#B5AFA7',
  border:  '#E5E0D8',
  borderD: '#DDD8D0',
};

const CATEGORY_ACCENTS = {
  'Dormitorio':  '#8B7355',
  'Sala':        '#2D6A4F',
  'Cocina':      '#C17D3C',
  'Baño':        '#4A7C9E',
  'Jardín':      '#5A7A4A',
  'Iluminación': '#B8860B',
  'Textiles':    '#9B6B8A',
  'Todos':       '#2D6A4F',
};
const accentOf = (cat) => CATEGORY_ACCENTS[cat] || '#2D6A4F';

// Imágenes hero por categoría
const CATEGORY_HERO = {
  'Todos':       'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
  'Dormitorio':  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
  'Sala':        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80',
  'Cocina':      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
  'Baño':        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
  'Jardín':      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
  'Iluminación': 'https://images.unsplash.com/photo-1513506003901-1e6a35eb26d0?w=1200&q=80',
  'Textiles':    'https://images.unsplash.com/photo-1594461960891-ba5f671aff3d?w=1200&q=80',
};

const heroImg = (cat) => CATEGORY_HERO[cat] || CATEGORY_HERO['Todos'];

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div style={{ background: C.white, borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
    <div style={{ width: '100%', height: 260, background: 'linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
    <div style={{ padding: '20px 20px 24px' }}>
      <div style={{ width: '40%', height: 10, borderRadius: 99, background: '#e8e4de', marginBottom: 10 }} />
      <div style={{ width: '75%', height: 16, borderRadius: 99, background: '#ede9e3', marginBottom: 20 }} />
      <div style={{ width: '100%', height: 40, borderRadius: 8, background: '#e8e4de' }} />
    </div>
  </div>
);

// ── ProductCard ───────────────────────────────────────────────────────────────
const ProductCard = ({ prod, onAdd, featured = false }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);
  const accent = accentOf(prod.categoria);

  const handleAdd = () => {
    onAdd(prod);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        boxShadow: hovered
          ? '0 16px 48px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.28s ease, transform 0.28s ease',
      }}
    >
      {featured && (
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 5,
          background: accent, color: '#fff',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', borderRadius: 99, padding: '4px 10px',
          fontFamily: 'Inter, sans-serif',
        }}>Destacado</div>
      )}

      <Link to={`/producto/${prod.id}`} style={{ display: 'block', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={prod.imagen || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=480&q=80'}
          alt={prod.nombre}
          style={{
            width: '100%', height: 260, objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.42s ease',
          }}
        />
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
          borderRadius: 99, padding: '5px 14px',
          fontSize: 13, fontWeight: 700, color: C.ink,
          fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        }}>
          ${prod.precio ? prod.precio.toLocaleString('es-CL') : '0'}
        </div>
      </Link>

      {/* Franja de categoría */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: accent,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.32s ease', zIndex: 10,
      }} />

      <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accent, fontFamily: 'Inter, sans-serif', marginBottom: 6 }}>
          {prod.categoria}
        </span>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 15, fontWeight: 600, color: C.ink, fontFamily: 'Inter, sans-serif', lineHeight: 1.4, flex: 1 }}>
          {prod.nombre}
        </h3>
        <button
          onClick={handleAdd}
          style={{
            background: added ? C.green : hovered ? C.ink : C.bg,
            color: added || hovered ? '#fff' : C.ink,
            border: 'none', borderRadius: 8, padding: '10px 0', width: '100%',
            fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.04em', cursor: 'pointer',
            transition: 'background 0.22s ease, color 0.22s ease',
          }}
        >
          {added ? '✓ Agregado' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  );
};

// ── BannerHero ────────────────────────────────────────────────────────────────
const BannerHero = ({ categoria, count }) => {
  const accent = accentOf(categoria);
  return (
    <div style={{
      position: 'relative', borderRadius: 20, overflow: 'hidden',
      marginBottom: 40, height: 220,
    }}>
      <img
        src={heroImg(categoria)}
        alt={categoria}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(26,26,24,0.72) 0%, rgba(26,26,24,0.18) 100%)',
      }} />
      <div style={{ position: 'absolute', inset: 0, padding: '32px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 3, background: accent, borderRadius: 99 }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Grupo Cordillera
          </span>
        </div>
        <h1 style={{
          fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 600,
          color: '#fff', margin: '0 0 8px 0', lineHeight: 1.1,
        }}>
          {categoria === 'Todos' ? 'Toda la colección' : categoria}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', fontSize: 13, margin: 0 }}>
          {count} productos disponibles
        </p>
      </div>
    </div>
  );
};

// ── SearchBar ─────────────────────────────────────────────────────────────────
const SearchBar = ({ value, onChange, total, orden, onOrden }) => (
  <div style={{
    display: 'flex', gap: 12, alignItems: 'center',
    marginBottom: 32, flexWrap: 'wrap',
  }}>
    <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: C.muted, pointerEvents: 'none' }}>
        ⌕
      </span>
      <input
        type="text"
        placeholder="Buscar producto…"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', boxSizing: 'border-box',
          padding: '10px 16px 10px 38px',
          border: `1px solid ${C.border}`, borderRadius: 10,
          fontSize: 13, fontFamily: 'Inter, sans-serif', color: C.ink,
          background: C.white, outline: 'none',
          transition: 'border-color 0.18s',
        }}
        onFocus={e => { e.target.style.borderColor = C.green; }}
        onBlur={e => { e.target.style.borderColor = C.border; }}
      />
    </div>

    <select
      value={orden}
      onChange={e => onOrden(e.target.value)}
      style={{
        padding: '10px 16px', border: `1px solid ${C.border}`,
        borderRadius: 10, fontSize: 13, fontFamily: 'Inter, sans-serif',
        color: C.ink, background: C.white, cursor: 'pointer', outline: 'none',
      }}
    >
      <option value="default">Ordenar: por defecto</option>
      <option value="precio-asc">Precio: menor a mayor</option>
      <option value="precio-desc">Precio: mayor a menor</option>
      <option value="nombre-asc">Nombre: A → Z</option>
    </select>

    <span style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 99, padding: '6px 18px',
      fontSize: 12, fontWeight: 600, color: C.muted,
      letterSpacing: '0.04em', whiteSpace: 'nowrap',
    }}>
      {total} productos
    </span>
  </div>
);

// ── FeaturedBanner (promocional) ─────────────────────────────────────────────
const PromoBanner = () => (
  <div style={{
    background: C.ink, borderRadius: 16, padding: '32px 40px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    margin: '48px 0 40px', flexWrap: 'wrap', gap: 20,
  }}>
    <div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.green2, margin: '0 0 8px 0' }}>
        Oferta de temporada
      </p>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#fff', margin: '0 0 8px 0', lineHeight: 1.2 }}>
        Hasta 30% en productos<br />seleccionados de Hogar
      </h2>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
        Válido hasta el 31 de julio · Solo stock disponible
      </p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {['30%', '20%', '15%'].map((d, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.07)', borderRadius: 10,
            padding: '12px 16px', textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.10)',
          }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{d}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>dto.</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── TrustBar ──────────────────────────────────────────────────────────────────
const TrustBar = () => {
  const items = [
    { icon: '🚚', title: 'Envío gratis', sub: 'En compras sobre $50.000' },
    { icon: '↩️', title: 'Devolución fácil', sub: '30 días sin preguntas' },
    { icon: '🔒', title: 'Pago seguro', sub: 'Webpay y transferencia' },
    { icon: '🏡', title: 'Asesoría de hogar', sub: 'Lunes a sábado 9–18 h' },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 1, background: C.border, borderRadius: 16, overflow: 'hidden',
      margin: '56px 0 0',
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          background: C.white, padding: '24px 20px',
          display: 'flex', alignItems: 'flex-start', gap: 14,
        }}>
          <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{it.icon}</span>
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 3 }}>{it.title}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{it.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── CategoryQuickNav ──────────────────────────────────────────────────────────
const CategoryQuickNav = ({ categorias, current, onSelect }) => (
  <div style={{
    display: 'flex', gap: 8, flexWrap: 'wrap',
    marginBottom: 32,
  }}>
    {categorias.map(cat => {
      const active = cat === current;
      const accent = accentOf(cat);
      return (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            background: active ? accent : C.white,
            color: active ? '#fff' : C.muted,
            border: `1px solid ${active ? accent : C.border}`,
            borderRadius: 99, padding: '6px 16px',
            fontSize: 12, fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            letterSpacing: '0.02em',
          }}
        >
          {cat}
        </button>
      );
    })}
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────
export const CatalogoView = ({ productos, addToCart }) => {
  const [categoriaActual, setCategoriaActual] = useState('Todos');
  const [busqueda, setBusqueda]               = useState('');
  const [orden, setOrden]                     = useState('default');
  const mainRef = useRef(null);

  const isEmpty = !productos || !Array.isArray(productos) || productos.length === 0;

  const categorias = isEmpty
    ? ['Todos']
    : ['Todos', ...new Set(productos.filter(p => p?.categoria).map(p => p.categoria))];

  // Filtrado + búsqueda + ordenamiento
  const productosFiltrados = useMemo(() => {
    if (isEmpty) return [];
    let list = categoriaActual === 'Todos'
      ? productos
      : productos.filter(p => p?.categoria === categoriaActual);

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      list = list.filter(p => p.nombre?.toLowerCase().includes(q) || p.categoria?.toLowerCase().includes(q));
    }

    switch (orden) {
      case 'precio-asc':  return [...list].sort((a, b) => (a.precio || 0) - (b.precio || 0));
      case 'precio-desc': return [...list].sort((a, b) => (b.precio || 0) - (a.precio || 0));
      case 'nombre-asc':  return [...list].sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
      default:            return list;
    }
  }, [productos, categoriaActual, busqueda, orden, isEmpty]);

  // Destacados: los 3 más caros de la categoría actual
  const destacados = useMemo(() => {
    if (isEmpty || categoriaActual !== 'Todos') return [];
    return [...productos]
      .filter(p => p?.precio)
      .sort((a, b) => b.precio - a.precio)
      .slice(0, 3);
  }, [productos, categoriaActual, isEmpty]);

  const handleCategoria = (cat) => {
    setCategoriaActual(cat);
    setBusqueda('');
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .prod-card-anim { animation: fadeUp 0.36s ease both; }
        .cat-btn {
          display: block; width: 100%; text-align: left;
          background: none; border: none; padding: 9px 14px; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 500;
          color: #8A8680; cursor: pointer; transition: background 0.18s, color 0.18s;
          letter-spacing: 0.01em;
        }
        .cat-btn:hover { background: #EDE9E3; color: #1A1A18; }
        .cat-btn.active { background: #1A1A18; color: #F7F4EF; font-weight: 600; }
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .catalog-root { flex-direction: column !important; }
          .catalog-sidebar { display: none !important; }
          .catalog-main { padding: 24px 20px !important; }
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="catalog-root" style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif' }}>

        {/* ── SIDEBAR ── */}
        <aside className="catalog-sidebar" style={{
          width: 240, minWidth: 240, background: C.bgSide,
          borderRight: `1px solid ${C.border}`, padding: '48px 24px',
          display: 'flex', flexDirection: 'column',
          position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
        }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: C.ink, margin: '0 0 4px 0', lineHeight: 1.2 }}>
              Grupo Cordillera
            </h2>
            <p style={{ fontSize: 12, color: C.muted, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Hogar & Confort
            </p>
          </div>

          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.light, marginBottom: 10, padding: '0 14px' }}>
              Categorías
            </p>
            {categorias.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${categoriaActual === cat ? 'active' : ''}`}
                onClick={() => handleCategoria(cat)}
              >
                {cat === 'Todos' ? 'Todos los productos' : cat}
                {cat !== 'Todos' && (
                  <span style={{
                    float: 'right', width: 8, height: 8, borderRadius: '50%',
                    background: accentOf(cat), display: 'inline-block', marginTop: 4,
                    opacity: categoriaActual === cat ? 1 : 0.45,
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Filtro de precio rápido en sidebar */}
          <div style={{ marginTop: 32, padding: '20px 14px', background: C.white, borderRadius: 12, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.light, margin: '0 0 12px 0' }}>
              Ordenar por precio
            </p>
            {[
              { label: 'Menor a mayor', val: 'precio-asc' },
              { label: 'Mayor a menor', val: 'precio-desc' },
            ].map(op => (
              <button
                key={op.val}
                onClick={() => setOrden(orden === op.val ? 'default' : op.val)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: orden === op.val ? C.green : 'none',
                  color: orden === op.val ? '#fff' : C.muted,
                  border: `1px solid ${orden === op.val ? C.green : C.border}`,
                  borderRadius: 6, padding: '7px 12px', marginBottom: 6,
                  fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                  fontWeight: 500, transition: 'all 0.18s',
                }}
              >
                {op.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 32, borderTop: `1px solid ${C.borderD}` }}>
            <p style={{ fontSize: 11, color: C.light, lineHeight: 1.6, fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>
              "Cada espacio cuenta una historia."
            </p>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main ref={mainRef} className="catalog-main" style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

          {/* Banner hero de categoría */}
          <BannerHero categoria={categoriaActual} count={isEmpty ? 0 : productosFiltrados.length} />

          {/* Quick nav de categorías (chips) */}
          {!isEmpty && (
            <CategoryQuickNav
              categorias={categorias}
              current={categoriaActual}
              onSelect={handleCategoria}
            />
          )}

          {/* Barra de búsqueda + orden */}
          {!isEmpty && (
            <SearchBar
              value={busqueda}
              onChange={setBusqueda}
              total={productosFiltrados.length}
              orden={orden}
              onOrden={setOrden}
            />
          )}

          {/* ── SECCIÓN DESTACADOS (solo en "Todos") ── */}
          {!isEmpty && destacados.length > 0 && (
            <section style={{ marginBottom: 52 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 3, height: 24, background: C.green, borderRadius: 99 }} />
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: C.ink, margin: 0 }}>
                  Productos destacados
                </h2>
                <div style={{ flex: 1, height: 1, background: C.border, marginLeft: 8 }} />
              </div>
              <div className="featured-grid">
                {destacados.map((prod, i) => (
                  <div key={prod.id} className="prod-card-anim" style={{ animationDelay: `${i * 0.08}s` }}>
                    <ProductCard prod={prod} onAdd={addToCart} featured />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── BANNER PROMOCIONAL (solo en "Todos") ── */}
          {!isEmpty && categoriaActual === 'Todos' && <PromoBanner />}

          {/* ── GRID PRINCIPAL ── */}
          {!isEmpty && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div style={{ width: 3, height: 24, background: accentOf(categoriaActual), borderRadius: 99 }} />
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: C.ink, margin: 0 }}>
                  {categoriaActual === 'Todos' ? 'Toda la colección' : categoriaActual}
                </h2>
                <div style={{ flex: 1, height: 1, background: C.border, marginLeft: 8 }} />
              </div>

              {productosFiltrados.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: C.light }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, marginBottom: 12 }}>
                    {busqueda ? `Sin resultados para "${busqueda}"` : 'Sin productos en esta categoría'}
                  </p>
                  <button
                    onClick={() => { setCategoriaActual('Todos'); setBusqueda(''); }}
                    style={{ background: 'none', border: 'none', color: C.green, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
                  >
                    Ver todo el catálogo →
                  </button>
                </div>
              ) : (
                <div className="catalog-grid">
                  {productosFiltrados.map((prod, i) => (
                    <div key={prod.id} className="prod-card-anim" style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}>
                      <ProductCard prod={prod} onAdd={addToCart} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Estado cargando */}
          {isEmpty && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div className="catalog-grid" style={{ width: '100%' }}>
                {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
              </div>
              <p style={{ fontSize: 13, color: C.light }}>Conectando con el inventario en :8080…</p>
            </div>
          )}

          {/* ── TRUST BAR ── */}
          {!isEmpty && <TrustBar />}

        </main>
      </div>
    </>
  );
};