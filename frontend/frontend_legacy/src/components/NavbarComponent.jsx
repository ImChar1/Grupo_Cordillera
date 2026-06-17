import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// ── Paleta (idéntica a HomeView, para mantener una sola identidad de marca) ──
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

const NAV_LINKS = [
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Catálogo', to: '/catalogo' },
];

export const NavbarComponent = ({ isLogged, user, logout, cartCount }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  // Bloquea el scroll del body mientras el panel mobile está abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/catalogo?buscar=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const initial = (user?.name || user?.nombre || '').trim().charAt(0).toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap');

        .cordi-nav-link {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: ${C.ink};
          padding: 6px 2px;
          transition: color 0.2s ease;
        }
        .cordi-nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 100%; height: 2px;
          background: ${C.green2};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s ease;
        }
        .cordi-nav-link:hover { color: ${C.green}; }
        .cordi-nav-link:hover::after { transform: scaleX(1); }

        .cordi-icon-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          color: ${C.ink};
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .cordi-icon-btn:hover { background: rgba(45,106,79,0.08); color: ${C.green}; }

        .cordi-cta {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-decoration: none;
          color: #fff;
          background: ${C.green};
          padding: 10px 26px;
          border-radius: 99px;
          box-shadow: 0 4px 16px rgba(45,106,79,0.28);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
          border: none;
          cursor: pointer;
        }
        .cordi-cta:hover { background: ${C.green2}; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(45,106,79,0.34); }

        .cordi-search-input {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          border: none;
          outline: none;
          background: transparent;
          color: ${C.ink};
          width: 100%;
        }
        .cordi-search-input::placeholder { color: ${C.light}; font-style: italic; }

        .cordi-hamburger span {
          display: block;
          width: 20px; height: 2px;
          background: ${C.ink};
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.2s ease;
        }

        @media (max-width: 900px) {
          .cordi-desktop-only { display: none !important; }
        }
        @media (min-width: 901px) {
          .cordi-mobile-only { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(247,244,239,0.94)' : 'rgba(247,244,239,0.8)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${C.border}`,
        boxShadow: scrolled ? '0 8px 28px rgba(26,26,24,0.07)' : 'none',
        transition: 'box-shadow 0.3s ease, padding 0.3s ease',
        padding: scrolled ? '10px 0' : '16px 0',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 7vw',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>

          {/* ── LOGO ─────────────────────────────────────────────── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: `linear-gradient(135deg, ${C.green} 0%, ${C.green2} 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(45,106,79,0.3)', flexShrink: 0,
            }}>
              <img src="/img/logo-claro.png" alt="Grupo Cordillera" style={{ height: 24, width: 'auto', objectFit: 'contain' }} />
            </div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, color: C.ink, lineHeight: 1, whiteSpace: 'nowrap' }}>
              Grupo <em style={{ fontStyle: 'italic', color: C.green2, fontWeight: 500 }}>Cordillera</em>
            </span>
          </Link>

          {/* ── LINKS (desktop) ──────────────────────────────────── */}
          <div className="cordi-desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} className="cordi-nav-link">{link.label}</Link>
            ))}
          </div>

          {/* ── BUSCADOR (desktop, se expande al hacer click) ───── */}
          <form
            className="cordi-desktop-only"
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              flex: searchOpen ? '1 1 260px' : '0 0 auto',
              maxWidth: searchOpen ? 280 : 38,
              borderBottom: searchOpen ? `1.5px solid ${C.green2}` : '1.5px solid transparent',
              padding: '6px 2px', transition: 'all 0.32s ease', overflow: 'hidden',
            }}
          >
            <button
              type={searchOpen ? 'submit' : 'button'}
              className="cordi-icon-btn"
              onClick={() => !searchOpen && setSearchOpen(true)}
              aria-label="Buscar"
              style={{ flexShrink: 0 }}
            >
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: 14 }} />
            </button>
            {searchOpen && (
              <input
                ref={searchInputRef}
                className="cordi-search-input"
                type="search"
                placeholder="Buscar productos..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => { if (!searchValue) setSearchOpen(false); }}
              />
            )}
          </form>

          {/* ── CARRITO ──────────────────────────────────────────── */}
          <Link to="/carrito" className="cordi-icon-btn" style={{ position: 'relative', textDecoration: 'none', flexShrink: 0 }} aria-label="Carrito">
            <FontAwesomeIcon icon={faShoppingBag} style={{ fontSize: 16 }} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2,
                minWidth: 16, height: 16, padding: '0 4px',
                borderRadius: 99, background: C.green,
                color: '#fff', fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter, sans-serif', border: `2px solid ${C.bg}`,
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* ── AUTH (desktop) ───────────────────────────────────── */}
          <div className="cordi-desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {isLogged ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: C.light, color: C.ink,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 13,
                  }}>
                    {initial || <FontAwesomeIcon icon={faUser} style={{ fontSize: 12 }} />}
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: C.ink, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name || user?.nombre || 'Mi cuenta'}
                  </span>
                </div>
                <button onClick={handleLogout} className="cordi-icon-btn" aria-label="Cerrar sesión">
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: 14 }} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="cordi-nav-link" style={{ textTransform: 'none', letterSpacing: '0.01em', fontWeight: 600 }}>
                  Iniciar sesión
                </Link>
                <Link to="/register" className="cordi-cta">Registrarse</Link>
              </>
            )}
          </div>

          {/* ── HAMBURGUESA (mobile) ─────────────────────────────── */}
          <button
            className="cordi-mobile-only cordi-icon-btn cordi-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Abrir menú"
            style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}
          >
            <span style={{ transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>

        </div>
      </nav>

      {/* ── PANEL MOBILE A PANTALLA COMPLETA ─────────────────────── */}
      <div className="cordi-mobile-only" style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99,
        background: C.bg,
        transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'auto' : 'none',
        transition: 'transform 0.36s ease, opacity 0.3s ease',
        padding: '84px 8vw 40px',
        overflowY: 'auto',
      }}>
        <form onSubmit={handleSearchSubmit} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          border: `1.5px solid ${C.border}`, borderRadius: 99,
          padding: '10px 18px', marginBottom: 36,
        }}>
          <FontAwesomeIcon icon={faSearch} style={{ fontSize: 14, color: C.muted }} />
          <input
            className="cordi-search-input"
            type="search"
            placeholder="Buscar productos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 48 }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.to} to={link.to}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 600,
                color: C.ink, textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ height: 1, background: C.border, marginBottom: 32 }} />

        {isLogged ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: C.light, color: C.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18,
              }}>
                {initial || <FontAwesomeIcon icon={faUser} />}
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600, color: C.ink }}>
                {user?.name || user?.nombre || 'Mi cuenta'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
                color: C.ink, background: 'transparent', border: `1.5px solid ${C.border}`,
                borderRadius: 99, padding: '12px 0', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Link
              to="/register" onClick={() => setMobileOpen(false)}
              className="cordi-cta"
              style={{ textAlign: 'center', padding: '14px 0' }}
            >
              Registrarse
            </Link>
            <Link
              to="/login" onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
                color: C.ink, textAlign: 'center', textDecoration: 'none',
                border: `1.5px solid ${C.border}`, borderRadius: 99, padding: '14px 0',
              }}
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </>
  );
};