import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Paleta (coherente con CatalogoView) ───────────────────────────────────────
const C = {
  bg:     '#F7F4EF',
  ink:    '#1A1A18',
  green:  '#2D6A4F',
  green2: '#40916C',
  muted:  '#8A8680',
  light:  '#B5AFA7',
  border: '#E5E0D8',
  white:  '#FFFFFF',
};

// ── Categorías con imagen ────────────────────────────────────────────────────
const CATS = [
  { label: 'Dormitorio',  img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80', accent: '#8B7355' },
  { label: 'Sala',        img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80', accent: '#2D6A4F' },
  { label: 'Cocina',      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', accent: '#C17D3C' },
  { label: 'Jardín',      img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', accent: '#5A7A4A' },
  { label: 'Iluminación', img: 'https://images.unsplash.com/photo-1513506003901-1e6a35eb26d0?w=600&q=80', accent: '#B8860B' },
  { label: 'Textiles',    img: 'https://images.unsplash.com/photo-1594461960891-ba5f671aff3d?w=600&q=80', accent: '#9B6B8A' },
];

// ── Editorial collections ─────────────────────────────────────────────────────
const COLLECTIONS = [
  {
    title: 'Colección Otoño',
    sub: 'Texturas cálidas para la temporada',
    img: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80',
    size: 'large',
  },
  {
    title: 'Cocinas Minimalistas',
    sub: 'Orden y forma en armonía',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    size: 'small',
  },
  {
    title: 'Terraza & Jardín',
    sub: 'Extiende tu hogar al exterior',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    size: 'small',
  },
];

// ── Hook: contador animado ────────────────────────────────────────────────────
const useCount = (target, duration = 1600, active = false) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
};

// ── StatItem ──────────────────────────────────────────────────────────────────
const StatItem = ({ value, suffix, label, active }) => {
  const count = useCount(value, 1400, active);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, fontWeight: 600, color: C.ink, lineHeight: 1 }}>
        {count.toLocaleString('es-CL')}{suffix}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.muted, marginTop: 8, letterSpacing: '0.04em' }}>
        {label}
      </div>
    </div>
  );
};

// ── CatCard ───────────────────────────────────────────────────────────────────
const CatCard = ({ cat }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/catalogo?cat=${cat.label}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', position: 'relative', borderRadius: 14,
        overflow: 'hidden', textDecoration: 'none', flexShrink: 0,
        width: 180,
        boxShadow: hov ? '0 12px 32px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.07)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.26s ease, transform 0.26s ease',
      }}
    >
      <img
        src={cat.img} alt={cat.label}
        style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block',
          transform: hov ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.4s ease' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(0deg, rgba(26,26,24,0.72) 0%, rgba(26,26,24,0.05) 55%)`,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px',
      }}>
        <div style={{ width: 24, height: 2, background: cat.accent, borderRadius: 99, marginBottom: 7,
          transform: hov ? 'scaleX(1.6)' : 'scaleX(1)', transformOrigin: 'left', transition: 'transform 0.3s ease' }} />
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
          {cat.label}
        </div>
      </div>
    </Link>
  );
};

// ── CollectionCard ────────────────────────────────────────────────────────────
const CollectionCard = ({ col, large = false }) => {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/catalogo"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', position: 'relative', borderRadius: 16,
        overflow: 'hidden', textDecoration: 'none',
        height: large ? 480 : 228,
        boxShadow: hov ? '0 16px 48px rgba(0,0,0,0.14)' : '0 2px 12px rgba(0,0,0,0.07)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'box-shadow 0.28s ease, transform 0.28s ease',
      }}
    >
      <img src={col.img} alt={col.title} style={{
        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.44s ease',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(26,26,24,0.68) 0%, rgba(26,26,24,0.06) 60%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: large ? '28px 32px' : '20px 22px' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: C.green2, marginBottom: 8 }}>Colección</div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: large ? 28 : 18,
          fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: 8 }}>{col.title}</div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{col.sub}</div>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6,
          opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.24s ease, transform 0.24s ease' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>
            Ver colección
          </span>
          <span style={{ color: C.green2, fontSize: 14 }}>→</span>
        </div>
      </div>
    </Link>
  );
};

// ── Por qué nosotros ──────────────────────────────────────────────────────────
const WHY = [
  { icon: '🌿', title: 'Sustentabilidad real', body: 'Proveedores certificados. Packaging 100% reciclable. Sin greenwashing.' },
  { icon: '🚚', title: 'Despacho en 48 h', body: 'A todo Chile. Gratis sobre $50.000. Seguimiento en tiempo real.' },
  { icon: '🏡', title: 'Asesoría de decoración', body: 'Un especialista contigo de lunes a sábado, sin costo adicional.' },
  { icon: '↩️', title: '30 días de garantía', body: 'Si no quedas conforme, lo retiramos y te devolvemos el 100%.' },
];

// ── Componente principal ──────────────────────────────────────────────────────
export const HomeView = () => {
  const statsRef  = useRef(null);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .hv-fadein  { animation: fadeIn  0.8s ease both; }
        .hv-fadeup1 { animation: fadeUp  0.7s 0.15s ease both; }
        .hv-fadeup2 { animation: fadeUp  0.7s 0.30s ease both; }
        .hv-fadeup3 { animation: fadeUp  0.7s 0.45s ease both; }
        .why-card:hover .why-icon { transform: scale(1.15); }
        .why-icon { transition: transform 0.22s ease; display: inline-block; }
        @media (max-width: 768px) {
          .hero-headline { font-size: 38px !important; }
          .cats-scroll { gap: 12px !important; }
          .cats-scroll > * { width: 140px !important; }
          .coll-grid { grid-template-columns: 1fr !important; }
          .coll-grid > div:first-child { grid-row: auto !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div style={{ background: C.bg, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>

        {/* ══════════════════════════════════════════════
            HERO — pantalla completa
        ══════════════════════════════════════════════ */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 560, display: 'flex', alignItems: 'flex-end' }}>
          {/* Imagen de fondo */}
          <div className="hv-fadein" style={{ position: 'absolute', inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85"
              alt="Sala de estar Grupo Cordillera"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(26,26,24,0.72) 0%, rgba(26,26,24,0.25) 55%, rgba(26,26,24,0.08) 100%)',
            }} />
          </div>

          {/* Contenido hero */}
          <div style={{ position: 'relative', zIndex: 2, padding: '0 7vw 9vh', maxWidth: 780 }}>
            {/* Eyebrow */}
            <div className="hv-fadeup1" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 28, height: 2, background: C.green2, borderRadius: 99 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
                Grupo Cordillera · Hogar & Confort
              </span>
            </div>

            {/* Headline — firma: "conciencia" en itálica serif verde */}
            <h1 className="hero-headline hv-fadeup2" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 600, color: '#fff',
              lineHeight: 1.08, margin: '0 0 28px 0', letterSpacing: '-0.01em',
            }}>
              Innovación para tu hogar,{' '}
              <em style={{ fontStyle: 'italic', color: C.green2, fontWeight: 400 }}>conciencia</em>{' '}
              para tu mundo.
            </h1>

            <p className="hv-fadeup3" style={{
              fontFamily: 'Inter, sans-serif', fontSize: 17,
              color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, margin: '0 0 40px 0', maxWidth: 520,
            }}>
              La mayor variedad en tecnología y hogar, con despacho rápido a todo Chile.
              Diseñado para durar, elegido para vivir.
            </p>

            <div className="hv-fadeup3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/catalogo" style={{
                background: C.green, color: '#fff',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                letterSpacing: '0.04em', textDecoration: 'none',
                padding: '14px 36px', borderRadius: 99,
                boxShadow: '0 4px 24px rgba(45,106,79,0.45)',
                transition: 'background 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#40916C'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Explorar catálogo
              </Link>
              <Link to="/nosotros" style={{
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                letterSpacing: '0.04em', textDecoration: 'none',
                padding: '14px 36px', borderRadius: 99,
                border: '1px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
              >
                Nuestra historia
              </Link>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: 32, right: '7vw', zIndex: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.25)', animation: 'fadeIn 1s 1s ease both' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.14em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
              scroll
            </span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CATEGORÍAS — scroll horizontal
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '72px 7vw 64px', background: C.bg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: C.muted, margin: '0 0 8px 0' }}>
                Navega por espacio
              </p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, color: C.ink, margin: 0 }}>
                ¿Qué estás buscando?
              </h2>
            </div>
            <Link to="/catalogo" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
              color: C.green, textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              Ver todo →
            </Link>
          </div>

          <div className="cats-scroll" style={{
            display: 'flex', gap: 16, overflowX: 'auto',
            paddingBottom: 8,
            scrollbarWidth: 'none',
          }}>
            {CATS.map(cat => <CatCard key={cat.label} cat={cat} />)}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            STATS — con contador animado
        ══════════════════════════════════════════════ */}
        <section ref={statsRef} style={{ background: C.ink, padding: '64px 7vw' }}>
          <div className="stats-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
            borderLeft: `3px solid ${C.green}`, paddingLeft: 40,
          }}>
            <StatItem value={4800}  suffix="+" label="Clientes satisfechos" active={statsOn} />
            <StatItem value={620}   suffix="+"  label="Productos disponibles" active={statsOn} />
            <StatItem value={15}    suffix="+"  label="Años en el mercado" active={statsOn} />
            <StatItem value={98}    suffix="%"  label="Recomendaría Cordillera" active={statsOn} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            COLECCIONES EDITORIALES
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '72px 7vw 64px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: C.muted, margin: '0 0 8px 0' }}>
                Curado para ti
              </p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600, color: C.ink, margin: 0 }}>
                Colecciones de temporada
              </h2>
            </div>
            <Link to="/catalogo" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
              color: C.green, textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
              Ver catálogo →
            </Link>
          </div>

          <div className="coll-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: 16,
          }}>
            <div style={{ gridRow: '1 / 3' }}>
              <CollectionCard col={COLLECTIONS[0]} large />
            </div>
            <div><CollectionCard col={COLLECTIONS[1]} /></div>
            <div><CollectionCard col={COLLECTIONS[2]} /></div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            POR QUÉ NOSOTROS
        ══════════════════════════════════════════════ */}
        <section style={{ padding: '72px 7vw 64px', background: '#EFEBE4', borderTop: `1px solid ${C.border}` }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: C.muted, margin: '0 0 8px 0' }}>
              Nuestra promesa
            </p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600, color: C.ink, margin: '0 auto', maxWidth: 440, lineHeight: 1.2 }}>
              Por qué miles de hogares eligen Cordillera
            </h2>
          </div>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {WHY.map((w, i) => (
              <div key={i} className="why-card" style={{
                background: C.white, borderRadius: 16,
                padding: '28px 24px', border: `1px solid ${C.border}`,
                transition: 'box-shadow 0.22s, transform 0.22s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.09)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div className="why-icon" style={{ fontSize: 30, marginBottom: 16 }}>{w.icon}</div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                  color: C.ink, margin: '0 0 8px 0' }}>{w.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.muted,
                  lineHeight: 1.65, margin: 0 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════ */}
        <section style={{
          padding: '80px 7vw',
          background: `linear-gradient(135deg, #1A2E24 0%, #2D6A4F 100%)`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: C.green2, margin: '0 0 16px 0' }}>
            Empieza hoy
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 600, color: '#fff', margin: '0 0 16px 0', maxWidth: 560, lineHeight: 1.2 }}>
            Tu hogar está a un paso de ser exactamente como lo imaginaste.
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.52)',
            margin: '0 0 40px 0', maxWidth: 420, lineHeight: 1.7 }}>
            Más de 620 productos. Despacho en 48 h. Garantía 30 días.
          </p>
          <Link to="/catalogo" style={{
            background: '#fff', color: C.green,
            fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
            letterSpacing: '0.04em', textDecoration: 'none',
            padding: '15px 48px', borderRadius: 99,
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)'; }}
          >
            Ver todo el catálogo
          </Link>
        </section>

      </div>
    </>
  );
};