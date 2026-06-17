import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ── Paleta coherente con HomeView y CarritoView ───────────────────────────────
const C = {
  bg:     '#F7F4EF',
  ink:    '#1A1A18',
  green:  '#2D6A4F',
  green2: '#40916C',
  muted:  '#8A8680',
  light:  '#B5AFA7',
  border: '#E5E0D8',
  white:  '#FFFFFF',
  greenBg:'#EEF7F2',
};

// ── Icono de check ────────────────────────────────────────────────────────────
const CheckCircle = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
    stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ── Formateador de precios CLP ────────────────────────────────────────────────
const fmt = (n) =>
  Number(n).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

// ── Barra de progreso de pasos ────────────────────────────────────────────────
const StepBar = () => {
  const steps = ['Carrito', 'Pago', 'Confirmado'];
  return (
    <div style={{
      display: 'flex',
      borderRadius: 12,
      overflow: 'hidden',
      border: `1px solid ${C.border}`,
      marginBottom: 32,
    }}>
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 && <div style={{ width: 1, background: C.border, flexShrink: 0 }} />}
          <div style={{
            flex: 1, padding: '12px 8px', textAlign: 'center',
            background: C.greenBg,
          }}>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.08em', marginBottom: 3, color: C.green,
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              fontWeight: 600, color: C.green,
            }}>
              {label}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

// ── Fila de metadato ──────────────────────────────────────────────────────────
const MetaRow = ({ label, value }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6,
  }}>
    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.muted }}>
      {label}
    </span>
    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: C.ink }}>
      {value}
    </span>
  </div>
);

// ── Componente principal ──────────────────────────────────────────────────────
export const ConfirmacionView = () => {
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('ultima_boleta');
    if (data) setBoleta(JSON.parse(data));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .conf-card { animation: fadeUp 0.55s ease both; }
      `}</style>

      <div style={{
        background: C.bg,
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
      }}>
        <div
          className="conf-card"
          style={{
            background: C.white,
            borderRadius: 24,
            border: `1px solid ${C.border}`,
            padding: '48px 44px',
            maxWidth: 500,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Barra de pasos */}
          <StepBar />

          {/* Ícono de éxito */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: C.greenBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <CheckCircle />
          </div>

          {/* Eyebrow + título */}
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: C.muted, marginBottom: 10,
          }}>
            Pedido confirmado
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(22px, 4vw, 30px)',
            fontWeight: 600, color: C.ink,
            margin: '0 0 10px 0', lineHeight: 1.15,
          }}>
            ¡Tu compra está en camino!
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14,
            color: C.muted, lineHeight: 1.65, marginBottom: 32,
          }}>
            Gracias por elegir Grupo Cordillera. Tu pedido llegará
            en las próximas{' '}
            <strong style={{ color: C.ink, fontWeight: 600 }}>48 horas</strong>.
          </p>

          {/* Boleta */}
          {boleta && (
            <div style={{
              background: C.bg, borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: '22px', textAlign: 'left',
              marginBottom: 28,
            }}>
              {/* Metadatos */}
              <MetaRow label="N° de orden"      value={`#${boleta.nroPedido}`} />
              <MetaRow label="Fecha"            value={boleta.fecha} />
              {boleta.metodoPago && (
                <MetaRow label="Método de pago" value={boleta.metodoPago} />
              )}

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '14px 0' }} />

              {/* Ítems */}
              {boleta.items.map((it) => (
                <div key={it.id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '5px 0',
                }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.ink }}>
                    {it.nombre}{' '}
                    <span style={{ color: C.muted }}>×{it.cantidad}</span>
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: C.ink }}>
                    {fmt(it.precio * it.cantidad)}
                  </span>
                </div>
              ))}

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '14px 0' }} />

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  fontWeight: 700, color: C.ink,
                }}>
                  Total pagado
                </span>
                <span style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 26, fontWeight: 600, color: C.green,
                }}>
                  {fmt(boleta.total)}
                </span>
              </div>
            </div>
          )}

          {/* CTA */}
          <Link
            to="/"
            style={{
              display: 'block', width: '100%', padding: '16px',
              background: C.green, color: C.white,
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none',
              borderRadius: 99, textAlign: 'center',
              boxShadow: '0 4px 20px rgba(45,106,79,0.28)',
              transition: 'background 0.2s, transform 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.green2; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.green;  e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Volver al inicio →
          </Link>
        </div>
      </div>
    </>
  );
};