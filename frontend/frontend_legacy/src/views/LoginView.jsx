import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/AuthService'; // 🔥 IMPORTAMOS EL SERVICIO DE API

// ── Paleta (coherente con HomeView / NavbarComponent / FooterComponent) ────
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

export const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // 🔥 NUEVO: Para mostrar errores del backend
  const navigate = useNavigate();

  // 🔥 NUEVO: Función handleSubmit conectada al backend real
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Limpiamos errores anteriores

    if (email && password) {
      try {
        // Hacemos la petición POST al Gateway (8080)
        const response = await AuthService.login({ email, password });
        
        // Si el backend responde 200 OK, pasamos los datos reales y redirigimos
        onLogin(response.user);
        navigate('/');
      } catch (error) {
        // Si el backend tira un 401 (Credenciales inválidas), lo mostramos en pantalla
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 88px)', background: C.bg, fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap');

        .cordi-field { margin-bottom: 26px; }
        .cordi-field label {
          display: block; font-size: 12px; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: ${C.muted}; margin-bottom: 9px;
        }
        .cordi-field input {
          width: 100%; font-family: 'Inter', sans-serif; font-size: 15px;
          color: ${C.ink}; background: transparent; border: none;
          border-bottom: 1.5px solid ${C.border}; padding: 10px 2px;
          outline: none; transition: border-color 0.22s ease;
        }
        .cordi-field input::placeholder { color: ${C.light}; }
        .cordi-field input:focus { border-bottom-color: ${C.green2}; }

        .cordi-pw-toggle {
          position: absolute; right: 2px; top: 50%; transform: translateY(-6px);
          background: none; border: none; cursor: pointer; color: ${C.muted};
          font-size: 14px; padding: 6px; transition: color 0.2s ease;
        }
        .cordi-pw-toggle:hover { color: ${C.green}; }

        .cordi-submit {
          width: 100%; font-family: 'Inter', sans-serif; font-size: 13.5px;
          font-weight: 700; letter-spacing: 0.05em; color: #fff;
          background: ${C.green}; border: none; cursor: pointer;
          padding: 15px 0; border-radius: 99px; margin-top: 8px;
          box-shadow: 0 4px 16px rgba(45,106,79,0.28);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cordi-submit:hover { background: ${C.green2}; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(45,106,79,0.34); }

        .cordi-text-link {
          position: relative; color: ${C.green}; font-weight: 700; text-decoration: none;
        }
        .cordi-text-link::after {
          content: ''; position: absolute; left: 0; bottom: -2px;
          width: 100%; height: 1.5px; background: ${C.green2};
          transform: scaleX(0); transform-origin: left; transition: transform 0.22s ease;
        }
        .cordi-text-link:hover::after { transform: scaleX(1); }

        @media (max-width: 900px) {
          .cordi-login-image { display: none !important; }
          .cordi-login-form { flex-basis: 100% !important; }
        }
      `}</style>

      {/* ── PANEL IZQUIERDO — IMAGEN EDITORIAL (desktop) ─────────────── */}
      <div className="cordi-login-image" style={{ flexBasis: '46%', position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=85"
          alt="Hogar Grupo Cordillera"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(26,26,24,0.35) 0%, rgba(26,26,24,0.15) 40%, rgba(26,26,24,0.82) 100%)',
        }} />

        <Link to="/" style={{ position: 'absolute', top: 36, left: 40, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 11,
            background: `linear-gradient(135deg, ${C.green} 0%, ${C.green2} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <img src="/img/logo-claro.png" alt="Grupo Cordillera" style={{ height: 22, width: 'auto', objectFit: 'contain' }} />
          </div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: '#fff' }}>
            Grupo <em style={{ fontStyle: 'italic', color: C.green2, fontWeight: 500 }}>Cordillera</em>
          </span>
        </Link>

        <div style={{ position: 'absolute', bottom: 56, left: 40, right: 40, maxWidth: 420 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.green2, margin: '0 0 14px 0' }}>
            Hogar & confort
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600, color: '#fff', lineHeight: 1.25, margin: 0 }}>
            Cada hogar cuenta una <em style={{ fontStyle: 'italic', color: C.green2, fontWeight: 400 }}>historia</em>. Que la tuya empiece aquí.
          </h2>
        </div>
      </div>

      {/* ── PANEL DERECHO — FORMULARIO ───────────────────────────────── */}
      <div className="cordi-login-form" style={{ flexBasis: '54%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 8vw' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, margin: '0 0 12px 0' }}>
            Bienvenido de nuevo
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 600, color: C.ink, margin: '0 0 10px 0' }}>
            Inicia sesión
          </h1>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, margin: '0 0 28px 0' }}>
            Ingresa tus datos para continuar con tu pedido y tu cuenta.
          </p>

          {/* 🔥 BLOQUE DE ERROR: Aparece si el backend nos rechaza */}
          {errorMsg && (
            <div style={{ background: '#fdeded', color: '#ef5350', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px', fontWeight: '500', border: '1px solid #ef5350' }}>
              Error: {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cordi-field">
              <label htmlFor="login-email">Correo electrónico</label>
              <input
                id="login-email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="cordi-field" style={{ position: 'relative' }}>
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: 28 }}
              />
              <button
                type="button"
                className="cordi-pw-toggle"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <button type="submit" className="cordi-submit">
              Entrar
            </button>
          </form>

          <p style={{ marginTop: 28, fontSize: 14, color: C.muted, textAlign: 'center' }}>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="cordi-text-link">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};