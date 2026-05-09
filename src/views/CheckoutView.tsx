import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckoutView: React.FC<any> = ({ total, cart, clearCart }) => {
  const navigate = useNavigate();

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ultima_boleta', JSON.stringify({
      items: cart,
      total: Number(total),
      fecha: new Date().toLocaleString()
    }));
    clearCart();
    navigate('/confirmacion');
  };

  return (
    <div style={styles.page}>
      <div style={styles.grid}>

        {/* ── IZQUIERDA: formulario ── */}
        <div style={styles.formCol}>

          <div style={styles.header}>
            <h1 style={styles.title}>Finalizar compra.</h1>
            <p style={styles.subtitle}>Revisa tu pedido y completa los detalles de envío.</p>
          </div>

          <form onSubmit={handlePagar} style={styles.form}>

            {/* Envío */}
            <section style={styles.section}>
              <p style={styles.sectionLabel}>Información de envío</p>
              <div style={styles.inputGrid}>
                <input style={styles.input} type="text"  placeholder="Nombre"                    required />
                <input style={styles.input} type="text"  placeholder="Apellido"                   required />
                <input style={{...styles.input, ...styles.inputFull}} type="text" placeholder="Dirección de calle y número" required />
                <input style={styles.input} type="text"  placeholder="Ciudad / Comuna"             required />
                <input style={styles.input} type="tel"   placeholder="Teléfono"                   required />
              </div>
            </section>

            {/* Pago */}
            <section style={styles.section}>
              <p style={styles.sectionLabel}>Método de pago</p>

              <label style={styles.payOption}>
                <input type="radio" name="pago" defaultChecked style={{ accentColor: '#198754' }} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <span style={styles.payLabel}>Tarjeta de Crédito o Débito</span>
              </label>

              <label style={styles.payOption}>
                <input type="radio" name="pago" style={{ accentColor: '#198754' }} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                </svg>
                <span style={{ ...styles.payLabel, color: '#6c757d' }}>Transferencia bancaria</span>
              </label>

              <div style={{ ...styles.inputGrid, marginTop: '16px' }}>
                <input style={{...styles.input, ...styles.inputFull}} type="text" placeholder="Número de tarjeta" required />
                <input style={styles.input} type="text" placeholder="Caducidad (MM/AA)" required />
                <input style={styles.input} type="text" placeholder="CVV" required />
              </div>
            </section>

            <button type="submit" style={styles.btn}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#157347';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#198754';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              Confirmar y pagar →
            </button>
          </form>
        </div>

        {/* ── DERECHA: resumen ── */}
        <aside style={styles.summary}>
          <p style={styles.sectionLabel}>Resumen del pedido</p>

          <div style={styles.productList}>
            {cart.map((item: any) => (
              <div key={item.id} style={styles.productRow}>
                <div style={styles.productLeft}>
                  <div style={styles.thumbWrap}>
                    <img src={item.imagen} alt={item.nombre}
                      style={styles.thumb} />
                    <span style={styles.badge}>{item.cantidad}</span>
                  </div>
                  <span style={styles.productName}>{item.nombre}</span>
                </div>
                <span style={styles.productPrice}>
                  ${(item.precio * item.cantidad).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={styles.totalRow}>
            <span style={styles.totalMuted}>Subtotal</span>
            <span style={styles.totalMuted}>${Number(total).toLocaleString()}</span>
          </div>
          <div style={styles.totalRow}>
            <span style={styles.totalMuted}>Envío</span>
            <span style={styles.freeTag}>Gratis</span>
          </div>

          <div style={{ ...styles.divider, marginTop: '12px' }} />

          <div style={{ ...styles.totalRow, marginTop: '14px' }}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalAmount}>${Number(total).toLocaleString()}</span>
          </div>

          <p style={styles.legal}>
            Al confirmar, aceptas los términos y condiciones de EcoMarket.
            La transacción es segura y encriptada.
          </p>

          {/* Sellos de confianza */}
          <div style={styles.trustRow}>
            {['🔒 Pago seguro', '✅ Encriptado', '📦 Envío gratis'].map(t => (
              <span key={t} style={styles.trustTag}>{t}</span>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};

/* ── Estilos en objeto (sin clases externas) ── */
const INPUT_BASE: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid #e5e5e7',
  borderRadius: '10px',
  fontSize: '0.9rem',
  background: '#fafafa',
  color: '#1d1d1f',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
  fontFamily: 'inherit',
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f5f5f7',
    padding: '48px 40px',
  },
  grid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '48px',
    alignItems: 'start',
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  header: {
    borderBottom: '1px solid #e5e5e7',
    paddingBottom: '24px',
  },
  title: {
    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: '#1d1d1f',
    margin: '0 0 6px',
  },
  subtitle: {
    color: '#6e6e73',
    fontSize: '1rem',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    background: '#ffffff',
    border: '1px solid #e5e5e7',
    borderRadius: '18px',
    padding: '28px 32px',
  },
  sectionLabel: {
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: '#6e6e73',
    margin: '0 0 18px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0f0f0',
  },
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  input: INPUT_BASE,
  inputFull: {
    gridColumn: '1 / -1',
  },
  payOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '13px 16px',
    border: '1.5px solid #e5e5e7',
    borderRadius: '12px',
    marginBottom: '8px',
    cursor: 'pointer',
    background: '#fafafa',
    transition: 'border-color .2s',
  },
  payLabel: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#1d1d1f',
  },
  btn: {
    width: '100%',
    padding: '15px',
    background: '#198754',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '0.95rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    cursor: 'pointer',
    transition: 'background .2s, transform .2s, box-shadow .2s',
    boxShadow: '0 4px 16px rgba(25,135,84,.25)',
    fontFamily: 'inherit',
  },

  /* Summary */
  summary: {
    position: 'sticky',
    top: '24px',
    background: '#ffffff',
    border: '1px solid #e5e5e7',
    borderRadius: '20px',
    padding: '28px',
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '20px',
  },
  productRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  thumbWrap: {
    position: 'relative',
    flexShrink: 0,
  },
  thumb: {
    width: '46px',
    height: '46px',
    objectFit: 'cover',
    borderRadius: '10px',
    border: '1px solid #e5e5e7',
    background: '#f5f5f7',
  },
  badge: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    background: '#1d1d1f',
    color: '#fff',
    fontSize: '0.6rem',
    fontWeight: 600,
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#1d1d1f',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  productPrice: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#1d1d1f',
    marginLeft: '12px',
    flexShrink: 0,
  },
  divider: {
    height: '1px',
    background: '#f0f0f0',
    margin: '0 0 12px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  totalMuted: {
    fontSize: '0.875rem',
    color: '#6e6e73',
  },
  freeTag: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#198754',
    background: '#e9f7ef',
    padding: '3px 10px',
    borderRadius: '20px',
  },
  totalLabel: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1d1d1f',
  },
  totalAmount: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#1d1d1f',
    letterSpacing: '-0.02em',
  },
  legal: {
    fontSize: '0.72rem',
    color: '#9a9a9a',
    marginTop: '20px',
    lineHeight: 1.5,
  },
  trustRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '14px',
  },
  trustTag: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: '#6e6e73',
    background: '#f5f5f7',
    border: '1px solid #e5e5e7',
    padding: '4px 10px',
    borderRadius: '20px',
  },
};