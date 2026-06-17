import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ── Paleta coherente con HomeView ─────────────────────────────────────────────
const C = {
  bg:     '#F7F4EF',
  ink:    '#1A1A18',
  green:  '#2D6A4F',
  green2: '#40916C',
  muted:  '#8A8680',
  light:  '#B5AFA7',
  border: '#E5E0D8',
  white:  '#FFFFFF',
  bgSoft: '#FDFCFA',
};

// ── Icono de candado ──────────────────────────────────────────────────────────
const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ── Icono de papelera ─────────────────────────────────────────────────────────
const TrashIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" />
  </svg>
);

// ── Icono de check ────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ── Formateador de precios CLP ────────────────────────────────────────────────
const fmt = (n) =>
  n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

// ── Tarjeta de ítem del carrito ───────────────────────────────────────────────
const CartItem = ({ item, onRemove, onUpdateQty }) => {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '22px 24px',
        borderBottom: `1px solid ${C.border}`,
        background: hov ? C.bgSoft : C.white,
        transition: 'background 0.2s ease',
      }}
    >
      {/* Imagen */}
      <img
        src={item.imagen}
        alt={item.nombre}
        style={{
          width: 76,
          height: 76,
          borderRadius: 12,
          objectFit: 'cover',
          flexShrink: 0,
          border: `1px solid ${C.border}`,
        }}
      />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 600,
          color: C.ink,
          marginBottom: 4,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {item.nombre}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.muted, marginBottom: 10 }}>
          Unidad: {fmt(item.precio)}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: C.light,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'color 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#C0392B'; }}
          onMouseLeave={e => { e.currentTarget.style.color = C.light; }}
        >
          <TrashIcon /> Eliminar
        </button>
      </div>

      {/* Selector de cantidad */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <button
          onClick={() => onUpdateQty(item.id, Math.max(1, item.cantidad - 1))}
          style={{
            width: 34, height: 34, border: 'none', background: C.bg,
            color: C.ink, fontSize: 16, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.border; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.bg; }}
        >
          −
        </button>
        <div style={{
          width: 36, textAlign: 'center',
          fontSize: 13, fontWeight: 600, color: C.ink,
          borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`,
          height: 34, lineHeight: '34px',
        }}>
          {item.cantidad}
        </div>
        <button
          onClick={() => onUpdateQty(item.id, item.cantidad + 1)}
          style={{
            width: 34, height: 34, border: 'none', background: C.bg,
            color: C.ink, fontSize: 16, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.border; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.bg; }}
        >
          +
        </button>
      </div>

      {/* Precio total del ítem */}
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 17, fontWeight: 600, color: C.green,
        minWidth: 100, textAlign: 'right', flexShrink: 0,
      }}>
        {fmt(item.precio * item.cantidad)}
      </div>
    </div>
  );
};

// ── Vista principal del Carrito ───────────────────────────────────────────────
export const CarritoView = ({ cart, total, removeFromCart, updateCantidad, clearCart }) => {
  const navigate = useNavigate();
  const itemCount = cart.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');
        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr !important; }
          .cart-sidebar { position: static !important; }
        }
        @media (max-width: 540px) {
          .cart-item-qty { display: none !important; }
        }
      `}</style>

      <div style={{
        background: C.bg,
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        padding: '48px 7vw 80px',
      }}>

        {/* Encabezado */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: 10,
          }}>
            <div style={{ width: 20, height: 2, background: C.green2, borderRadius: 99 }} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted,
            }}>
              Tu selección
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 600, color: C.ink, margin: 0,
          }}>
            Carrito de compras
          </h1>
        </div>

        {/* Estado vacío */}
        {cart.length === 0 ? (
          <div style={{
            background: C.white, borderRadius: 20, border: `1px solid ${C.border}`,
            padding: '80px 40px', textAlign: 'center', maxWidth: 480, margin: '0 auto',
          }}>
            <div style={{ fontSize: 52, marginBottom: 20 }}>🛒</div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600,
              color: C.ink, marginBottom: 10,
            }}>
              Tu carrito está vacío
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.muted, marginBottom: 32, lineHeight: 1.65 }}>
              Aún no has agregado productos. Explora nuestro catálogo y encuentra lo que necesitas.
            </p>
            <Link
              to="/catalogo"
              style={{
                display: 'inline-block',
                background: C.green, color: C.white,
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                letterSpacing: '0.04em', textDecoration: 'none',
                padding: '14px 36px', borderRadius: 99,
                boxShadow: '0 4px 20px rgba(45,106,79,0.3)',
                transition: 'background 0.2s, transform 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.green2; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div
            className="cart-layout"
            style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}
          >
            {/* ─── Lista de productos ─── */}
            <div>
              <div style={{
                background: C.white,
                borderRadius: 18,
                border: `1px solid ${C.border}`,
                overflow: 'hidden',
              }}>
                {cart.map((item, i) => (
                  <div key={item.id} style={{ borderBottom: i === cart.length - 1 ? 'none' : undefined }}>
                    <CartItem
                      item={item}
                      onRemove={removeFromCart}
                      onUpdateQty={updateCantidad}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={clearCart}
                style={{
                  marginTop: 14, fontFamily: 'Inter, sans-serif',
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: C.light,
                  cursor: 'pointer', border: 'none', background: 'none',
                  display: 'flex', alignItems: 'center', gap: 6, padding: 0,
                  transition: 'color 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = C.muted; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.light; }}
              >
                <TrashIcon /> Vaciar carrito
              </button>
            </div>

            {/* ─── Sidebar de resumen ─── */}
            <div
              className="cart-sidebar"
              style={{
                background: C.white, borderRadius: 18,
                border: `1px solid ${C.border}`, padding: '28px 26px',
                position: 'sticky', top: 24,
              }}
            >
              {/* Badge despacho gratis */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: '#EEF7F2', color: C.green,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '4px 12px',
                borderRadius: 99, marginBottom: 20,
              }}>
                <CheckIcon /> Despacho gratis incluido
              </div>

              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 20, fontWeight: 600, color: C.ink, marginBottom: 22,
              }}>
                Resumen
              </h2>

              {/* Filas de detalle */}
              {[
                { label: `Subtotal (${itemCount} ${itemCount === 1 ? 'producto' : 'productos'})`, value: fmt(total) },
                { label: 'Despacho', value: 'Gratis', green: true },
                { label: 'Tiempo estimado', value: '48 h' },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 12,
                }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: C.muted }}>
                    {row.label}
                  </span>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                    color: row.green ? C.green : C.ink,
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '16px 0' }} />

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.ink, fontWeight: 500 }}>
                  Total a pagar
                </span>
                <span style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 30, fontWeight: 600, color: C.ink,
                }}>
                  {fmt(total)}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%', padding: '16px',
                  background: C.green, color: C.white,
                  fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                  letterSpacing: '0.05em', border: 'none', borderRadius: 99,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(45,106,79,0.3)',
                  transition: 'background 0.2s, transform 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.green2; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Finalizar compra →
              </button>

              {/* Sello de seguridad */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                marginTop: 14, fontFamily: 'Inter, sans-serif',
                fontSize: 11, color: C.light, letterSpacing: '0.04em',
              }}>
                <LockIcon /> Pago 100% seguro · SSL encriptado
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};