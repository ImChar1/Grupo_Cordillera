


import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faLeaf, faArrowUp } from '@fortawesome/free-solid-svg-icons';

// ── Paleta (idéntica a HomeView / NavbarComponent, una sola identidad) ──────
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

const SITE_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Nuestro catálogo', to: '/catalogo' },
];

const Eyebrow = ({ children }) => (
  <h6 style={{
    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: C.green2, margin: '0 0 22px 0',
  }}>
    {children}
  </h6>
);

export const FooterComponent = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative',
      background: C.ink,
      paddingTop: 64,
      fontFamily: 'Inter, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap');

        .footer-link {
          position: relative;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.22s ease, padding-left 0.22s ease;
          display: inline-block;
        }
        .footer-link::before {
          content: '—';
          position: absolute;
          left: -18px; opacity: 0;
          color: ${C.green2};
          transition: opacity 0.22s ease, left 0.22s ease;
        }
        .footer-link:hover {
          color: #fff;
          padding-left: 18px;
        }
        .footer-link:hover::before {
          opacity: 1; left: 0;
        }

        .footer-contact-row { transition: transform 0.22s ease; }
        .footer-contact-row:hover { transform: translateX(3px); }
        .footer-icon-box {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          color: ${C.green2}; font-size: 13px; flex-shrink: 0;
          transition: background 0.22s ease, color 0.22s ease;
        }
        .footer-contact-row:hover .footer-icon-box {
          background: ${C.green}; color: #fff;
        }

        .footer-top-btn {
          background: ${C.bg};
          color: ${C.green};
          border: none; cursor: pointer;
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.28);
          transition: background 0.22s ease, color 0.22s ease, transform 0.22s ease;
        }
        .footer-top-btn:hover {
          background: ${C.green}; color: #fff; transform: translateY(-3px);
        }

        @media (max-width: 820px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; row-gap: 40px !important; }
          .footer-brand-col { grid-column: 1 / 3 !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-brand-col { grid-column: 1 / 2 !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
        }
      `}</style>

      {/* ── BOTÓN VOLVER ARRIBA — pestaña sobre la costura ─────────── */}
      <button
        onClick={scrollToTop}
        className="footer-top-btn"
        title="Volver arriba"
        style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}
      >
        <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: 14 }} />
      </button>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 7vw' }}>

        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr', gap: 48,
          paddingBottom: 56,
        }}>

          {/* COLUMNA 1 — IDENTIDAD DE MARCA */}
          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: `linear-gradient(135deg, ${C.green} 0%, ${C.green2} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <img src="/img/logo-claro.png" alt="Grupo Cordillera" style={{ height: 24, width: 'auto', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, color: '#fff', lineHeight: 1 }}>
                Grupo <em style={{ fontStyle: 'italic', color: C.green2, fontWeight: 500 }}>Cordillera</em>
              </span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.75,
              margin: 0, maxWidth: 360,
            }}>
              Uniendo la última tecnología para el hogar con una firme conciencia ecológica.
              Llevamos el futuro sustentable directo a tu puerta, en todo Chile.
            </p>
          </div>

          {/* COLUMNA 2 — NAVEGACIÓN */}
          <div>
            <Eyebrow>Explora el sitio</Eyebrow>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SITE_LINKS.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3 — CONTACTO */}
          <div>
            <Eyebrow>Atención al cliente</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="footer-contact-row" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="footer-icon-box">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Santiago, Chile</span>
              </div>

              <a
                href="mailto:soporte@gcordillera.cl"
                className="footer-contact-row"
                style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
              >
                <div className="footer-icon-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>soporte@gcordillera.cl</span>
              </a>
            </div>
          </div>

        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

        {/* BARRA INFERIOR DE CRÉDITOS */}
        <div className="footer-bottom" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px 0', fontSize: 13, color: 'rgba(255,255,255,0.4)',
        }}>
          <div>
            © {new Date().getFullYear()} <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Grupo Cordillera</span>. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <FontAwesomeIcon icon={faLeaf} style={{ color: C.green2, fontSize: 12 }} />
            <span>Desarrollado con conciencia ambiental</span>
          </div>
        </div>
      </div>
    </footer>
  );
};