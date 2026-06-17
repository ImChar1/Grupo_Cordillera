import React from 'react';
import { Link } from 'react-router-dom';

// ── Paleta coherente con el resto de vistas ───────────────────────────────────
const C = {
  bg:      '#F7F4EF',
  ink:     '#1A1A18',
  green:   '#2D6A4F',
  green2:  '#40916C',
  muted:   '#8A8680',
  light:   '#B5AFA7',
  border:  '#E5E0D8',
  white:   '#FFFFFF',
  greenBg: '#EEF7F2',
  body:    '#4A4845',
};

// ── Ícono SVG genérico ────────────────────────────────────────────────────────
const Icon = ({ d, color = C.green, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

// ── Pilares ───────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    bg: C.greenBg,
    color: C.green,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Inteligencia de datos',
    body: 'Plataforma de monitoreo en tiempo real que apoya la toma de decisiones de la alta gerencia.',
  },
  {
    bg: '#F0EAE2',
    color: '#8B7355',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Eficiencia operativa',
    body: 'Procesamos grandes volúmenes de información para que cada operación funcione sin fricción.',
  },
  {
    bg: '#EAF0FA',
    color: '#3A6EA5',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3A6EA5" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Compromiso familiar',
    body: 'Creemos en conectar familias con los mejores productos para su vida cotidiana.',
  },
];

// ── Sucursales ────────────────────────────────────────────────────────────────
const BRANCHES = [
  { city: 'Santiago — Casa Matriz', addr: 'Av. Nueva Tajamar 481, Las Condes', tel: '+56 2 2345 6789' },
  { city: 'Concepción',             addr: 'Barros Arana 1020, Concepción',     tel: '+56 41 222 3333' },
  { city: 'Viña del Mar',           addr: 'Av. Libertad 500, Viña del Mar',    tel: '+56 32 211 2222' },
];

// ── Estadísticas ──────────────────────────────────────────────────────────────
const STATS = [
  { num: '4.800+', label: 'Clientes satisfechos' },
  { num: '620+',   label: 'Productos disponibles' },
  { num: '15+',    label: 'Años en el mercado' },
  { num: '98%',    label: 'Recomendaría Cordillera' },
];

// ── Sub-componentes ───────────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
    <div style={{ width: 20, height: 2, background: C.green2, borderRadius: 99 }} />
    <span style={{
      fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: light ? 'rgba(255,255,255,0.6)' : C.muted,
    }}>
      {children}
    </span>
  </div>
);

const SectionHeading = ({ children, style }) => (
  <h2 style={{
    fontFamily: 'Playfair Display, serif',
    fontSize: 'clamp(22px, 3.5vw, 32px)',
    fontWeight: 600, color: C.ink,
    margin: 0, lineHeight: 1.2,
    ...style,
  }}>
    {children}
  </h2>
);

// ── Vista principal ───────────────────────────────────────────────────────────
export const NosotrosView = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
      @media (max-width: 768px) {
        .nos-pillars  { grid-template-columns: 1fr !important; }
        .nos-story    { grid-template-columns: 1fr !important; }
        .nos-stats    { grid-template-columns: 1fr 1fr !important; }
        .nos-cta-strip{ flex-direction: column !important; text-align: center !important; }
        .nos-story-img{ height: 260px !important; }
      }
    `}</style>

    <div style={{ background: C.bg, fontFamily: 'Inter, sans-serif' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: 420, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85"
          alt="Oficinas Grupo Cordillera"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(26,26,24,0.75) 0%, rgba(26,26,24,0.2) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 7vw 52px', maxWidth: 680 }}>
          <Eyebrow light>Grupo Cordillera · Desde 2010</Eyebrow>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 600, color: '#fff',
            lineHeight: 1.1, margin: '0 0 14px 0',
          }}>
            Innovación que{' '}
            <em style={{ fontStyle: 'italic', color: C.green2, fontWeight: 400 }}>transforma</em>{' '}
            hogares.
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
            Líderes en retail de hogar y tecnología, con presencia en todo Chile y un equipo comprometido con el bienestar de las familias.
          </p>
        </div>
      </section>

      {/* ══ PILARES ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 7vw', background: C.bg }}>
        <Eyebrow>Quiénes somos</Eyebrow>
        <SectionHeading>Más de 15 años conectando<br />familias con lo que importa</SectionHeading>

        <div className="nos-pillars" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 48 }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={{
              background: C.white, borderRadius: 18,
              border: `1px solid ${C.border}`, padding: '28px 24px',
              transition: 'box-shadow 0.22s, transform 0.22s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: p.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 7 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HISTORIA ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 7vw', background: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="nos-story" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow>Nuestra historia</Eyebrow>
            <SectionHeading style={{ marginBottom: 24 }}>
              Nacimos en Santiago,<br />crecimos con Chile.
            </SectionHeading>
            <p style={{ fontSize: 15, color: C.body, lineHeight: 1.8, marginBottom: 16 }}>
              Grupo Cordillera nació con una convicción simple: que cada hogar chileno merece acceso a productos de calidad a precios justos. Desde nuestra primera tienda en Las Condes, expandimos nuestra presencia a lo largo del país.
            </p>
            <p style={{ fontSize: 15, color: C.body, lineHeight: 1.8, marginBottom: 24 }}>
              Hoy somos referentes en retail de hogar y tecnología, con una plataforma digital que complementa la experiencia presencial y lleva nuestro catálogo a cada rincón de Chile en 48 horas.
            </p>
            <a
              href="mailto:contacto@grupocordillera.cl"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: 700, color: C.green,
                textDecoration: 'none', letterSpacing: '0.04em',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              contacto@grupocordillera.cl
            </a>
          </div>
          <div className="nos-story-img" style={{ borderRadius: 20, overflow: 'hidden', height: 380 }}>
            <img
              src="https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=700&q=80"
              alt="Showroom Cordillera"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ══ ESTADÍSTICAS ══════════════════════════════════════════════════════ */}
      <section style={{ background: C.ink, padding: '56px 7vw' }}>
        <div className="nos-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          borderLeft: `3px solid ${C.green}`, paddingLeft: 36,
        }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 42, fontWeight: 600, color: C.white, lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 6, letterSpacing: '0.04em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SUCURSALES + MAPA ═════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 7vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <Eyebrow>Dónde encontrarnos</Eyebrow>
            <SectionHeading>Nuestras sucursales</SectionHeading>
          </div>
        </div>

        <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, overflow: 'hidden', marginBottom: 24 }}>
          {BRANCHES.map((b, i) => (
            <div key={b.city} style={{
              display: 'flex', gap: 20, padding: '22px 26px',
              borderBottom: i < BRANCHES.length - 1 ? `1px solid ${C.border}` : 'none',
              alignItems: 'flex-start',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green, flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 3 }}>{b.city}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.55 }}>{b.addr}<br />{b.tel}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.border}`, height: 280 }}>
          <iframe
            title="Mapa Grupo Cordillera"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d-70.6093!3d-33.4172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf5c7b87d0c1%3A0x1f0c5a2e!2sAv.%20Nueva%20Tajamar%20481%2C%20Las%20Condes%2C%20Santiago!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
            width="100%" height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ══ CTA FINAL ═════════════════════════════════════════════════════════ */}
      <section className="nos-cta-strip" style={{
        background: 'linear-gradient(135deg, #1A2E24 0%, #2D6A4F 100%)',
        padding: '64px 7vw',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 32, flexWrap: 'wrap',
      }}>
        <div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 600, color: '#fff',
            margin: '0 0 8px 0',
          }}>
            ¿Quieres ser parte<br />de nuestra red?
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Escríbenos y conversamos sobre oportunidades corporativas.
          </p>
        </div>
        <a
          href="mailto:contacto@grupocordillera.cl"
          style={{
            background: C.white, color: C.green,
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
            letterSpacing: '0.05em', border: 'none', borderRadius: 99,
            padding: '14px 36px', textDecoration: 'none',
            whiteSpace: 'nowrap', display: 'inline-block',
            transition: 'transform 0.18s, box-shadow 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          Contáctanos →
        </a>
      </section>

    </div>
  </>
);