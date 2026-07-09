import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuariosService } from '../services/UsuariosService';

// ── Paleta ────────────────────────────────────────────────────────────
const C = {
  bg:      '#F7F4EF',
  ink:     '#1A1A18',
  green:   '#2D6A4F',
  green2:  '#40916C',
  greenBg: '#E8F5EE',
  muted:   '#8A8680',
  light:   '#B5AFA7',
  border:  '#E5E0D8',
  white:   '#FFFFFF',
  red:     '#C0392B',
  redBg:   '#FDECEC',
  amber:   '#B45309',
  amberBg: '#FEF3C7',
  sidebarW: 220,
};

const ROLES      = ['ADMIN', 'GERENTE_REGIONAL', 'CAJERO', 'VENDEDOR', 'SOPORTE', 'TRABAJADOR'];
const SUCURSALES = ['Casa Matriz', 'SantiagoCentro', 'Providencia', 'Maipú', 'Puente Alto'];

// ── Badge de rol ──────────────────────────────────────────────────────
const RolBadge = ({ rol }) => {
  const colors = {
    ADMIN:            { bg: '#E8F5EE', color: '#2D6A4F' },
    GERENTE_REGIONAL: { bg: '#EDE9FE', color: '#6D28D9' },
    CAJERO:           { bg: '#FEF3C7', color: '#B45309' },
    VENDEDOR:         { bg: '#DBEAFE', color: '#1D4ED8' },
    SOPORTE:          { bg: '#FCE7F3', color: '#9D174D' },
    TRABAJADOR:       { bg: '#F3F4F6', color: '#374151' },
  };
  const s = colors[rol] || colors.TRABAJADOR;
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
      padding: '3px 10px', borderRadius: 99, whiteSpace: 'nowrap',
    }}>
      {rol}
    </span>
  );
};

// ── Toast ─────────────────────────────────────────────────────────────
const Toast = ({ msg }) => {
  if (!msg) return null;
  const ok = msg.startsWith('✅');
  return (
    <div style={{
      position: 'fixed', top: 24, right: 24, zIndex: 3000,
      background: C.white, borderRadius: 10, padding: '14px 20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.14)', fontSize: 14,
      fontWeight: 600, color: C.ink, maxWidth: 360,
      borderLeft: `4px solid ${ok ? C.green : C.red}`,
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'slideIn .25s ease',
    }}>
      {msg}
    </div>
  );
};

// ── Modal genérico ────────────────────────────────────────────────────
const Modal = ({ title, subtitle, onClose, children, size = 480 }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(26,26,24,0.6)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  }}>
    <div style={{
      background: C.white, borderRadius: 18, width: '100%', maxWidth: size,
      boxShadow: '0 32px 80px rgba(0,0,0,0.22)',
      maxHeight: '92vh', overflowY: 'auto',
    }}>
      {/* Header del modal */}
      <div style={{
        padding: '28px 32px 20px',
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
      }}>
        <div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, fontWeight: 700, color: C.ink, margin: 0 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: C.muted, margin: '4px 0 0' }}>{subtitle}</p>
          )}
        </div>
        <button onClick={onClose} style={{
          background: C.bg, border: 'none', cursor: 'pointer',
          width: 32, height: 32, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: C.muted, flexShrink: 0,
          transition: 'background .15s',
        }}>×</button>
      </div>
      <div style={{ padding: '24px 32px 32px' }}>
        {children}
      </div>
    </div>
  </div>
);

// ── Campo de formulario ───────────────────────────────────────────────
const Field = ({ label, children, col }) => (
  <div style={{ marginBottom: 18, gridColumn: col }}>
    <label style={{
      display: 'block', fontSize: 11, fontWeight: 700,
      letterSpacing: '0.07em', textTransform: 'uppercase',
      color: C.muted, marginBottom: 7,
    }}>
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%', fontFamily: 'Inter, sans-serif', fontSize: 14,
  color: C.ink, background: C.bg, border: `1.5px solid ${C.border}`,
  borderRadius: 9, padding: '10px 13px', outline: 'none',
  boxSizing: 'border-box', transition: 'border-color 0.2s',
};

// ── Formulario crear / editar ─────────────────────────────────────────
const UsuarioForm = ({ inicial, onGuardar, onCerrar, loading, modoEditar }) => {
  const [form, setForm] = useState(inicial || {
    nombreCompleto: '', email: '', username: '',
    password: '', rol: 'TRABAJADOR', sucursal: 'Casa Matriz', rut: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <form onSubmit={e => { e.preventDefault(); onGuardar(form); }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Nombre completo" col="1 / -1">
          <input style={inputStyle} value={form.nombreCompleto}
            onChange={e => set('nombreCompleto', e.target.value)} required placeholder="Juan Pérez" />
        </Field>

        <Field label="Correo electrónico" col="1 / -1">
          <input style={inputStyle} type="email" value={form.email}
            onChange={e => set('email', e.target.value)} required placeholder="juan@empresa.cl"
            disabled={modoEditar} />
        </Field>

        {!modoEditar && (
          <>
            <Field label="Username">
              <input style={inputStyle} value={form.username}
                onChange={e => set('username', e.target.value)} required placeholder="juan.perez" />
            </Field>
            <Field label="RUT (opcional)">
              <input style={inputStyle} value={form.rut}
                onChange={e => set('rut', e.target.value)} placeholder="12345678-9" />
            </Field>
          </>
        )}

        <Field label={modoEditar ? 'Nueva contraseña (vacío = sin cambio)' : 'Contraseña'} col="1 / -1">
          <input style={inputStyle} type="password"
            value={form.password || ''}
            onChange={e => set('password', e.target.value)}
            required={!modoEditar} placeholder="••••••••" />
        </Field>

        <Field label="Rol">
          <select style={inputStyle} value={form.rol} onChange={e => set('rol', e.target.value)}>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Sucursal">
          <select style={inputStyle} value={form.sucursal} onChange={e => set('sucursal', e.target.value)}>
            {SUCURSALES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* Separador */}
      <div style={{ height: 1, background: C.border, margin: '8px 0 20px' }} />

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="button" onClick={onCerrar} style={{
          flex: 1, padding: '12px 0', borderRadius: 99, border: `1.5px solid ${C.border}`,
          background: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 13, color: C.muted, cursor: 'pointer',
        }}>
          Cancelar
        </button>
        <button type="submit" disabled={loading} style={{
          flex: 2, padding: '12px 0', borderRadius: 99, border: 'none',
          background: C.green, fontFamily: 'Inter, sans-serif', fontWeight: 700,
          fontSize: 13, color: C.white, cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1, boxShadow: '0 4px 14px rgba(45,106,79,0.25)',
        }}>
          {loading ? 'Guardando...' : modoEditar ? 'Guardar cambios' : 'Crear empleado'}
        </button>
      </div>
    </form>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────
const navItems = [
  { id: 'empleados',  icon: '👥', label: 'Empleados'  },
  { id: 'sucursales', icon: '🏢', label: 'Sucursales' },
  { id: 'reportes',   icon: '📊', label: 'Reportes'   },
  { id: 'auditoria',  icon: '🔍', label: 'Auditoría'  },
];

const Sidebar = ({ activa, setActiva, user, onCerrarSesion }) => (
  <aside style={{
    width: C.sidebarW, minHeight: '100vh', background: C.ink,
    display: 'flex', flexDirection: 'column',
    position: 'fixed', top: 0, left: 0, zIndex: 800,
  }}>
    {/* Logo */}
    <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${C.green} 0%, ${C.green2} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: 16 }}>G</span>
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>Cordillera</div>
          <div style={{ color: C.green2, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin</div>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: '16px 12px' }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 8px 10px' }}>
        Panel
      </p>
      {navItems.map(item => {
        const isActive = activa === item.id;
        return (
          <button key={item.id} onClick={() => setActiva(item.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 9, border: 'none', cursor: 'pointer',
            marginBottom: 2, textAlign: 'left',
            background: isActive ? 'rgba(45,106,79,0.25)' : 'transparent',
            color: isActive ? C.green2 : 'rgba(255,255,255,0.55)',
            fontSize: 13, fontWeight: isActive ? 700 : 500,
            transition: 'all .15s',
            borderLeft: isActive ? `3px solid ${C.green2}` : '3px solid transparent',
          }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </nav>

    {/* Usuario */}
    <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
          {user?.nombreCompleto || 'Administrador'}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 2 }}>
          {user?.email}
        </div>
      </div>
      <button onClick={onCerrarSesion} style={{
        width: '100%', background: 'rgba(192,57,43,0.15)', color: '#e57373',
        border: '1px solid rgba(192,57,43,0.3)', borderRadius: 8,
        padding: '9px 0', fontSize: 12, fontWeight: 700, cursor: 'pointer',
        transition: 'background .15s',
      }}>
        Cerrar sesión
      </button>
    </div>
  </aside>
);

// ── KPI Card ──────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, accent }) => (
  <div style={{
    background: C.white, borderRadius: 14, padding: '22px 24px',
    border: `1px solid ${C.border}`,
    borderTop: `3px solid ${accent}`,
  }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>{label}</p>
    <p style={{ fontSize: 32, fontWeight: 800, color: C.ink, margin: '0 0 4px', lineHeight: 1 }}>{value}</p>
    {sub && <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{sub}</p>}
  </div>
);

// ── Vista de Empleados ────────────────────────────────────────────────
const EmpleadosSection = ({ user }) => {
  const [usuarios, setUsuarios]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError]                 = useState('');
  const [toast, setToast]                 = useState('');

  const [filtroSucursal, setFiltroSucursal] = useState('');
  const [filtroRol, setFiltroRol]           = useState('');
  const [busqueda, setBusqueda]             = useState('');

  const [modalCrear, setModalCrear]         = useState(false);
  const [modalEditar, setModalEditar]       = useState(null);
  const [modalConfirmar, setModalConfirmar] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const cargarUsuarios = useCallback(async () => {
    setLoading(true); setError('');
    try {
      let data;
      if (filtroSucursal && filtroRol) {
        data = await UsuariosService.getEmpleadosPorSucursalYRol(filtroSucursal, filtroRol);
      } else if (filtroSucursal) {
        data = await UsuariosService.getEmpleadosPorSucursal(filtroSucursal);
      } else {
        data = await UsuariosService.getActivos();
      }
      setUsuarios(data);
    } catch {
      setError('No se pudieron cargar los empleados. Verifica que el backend esté activo.');
    } finally {
      setLoading(false);
    }
  }, [filtroSucursal, filtroRol]);

  useEffect(() => { cargarUsuarios(); }, [cargarUsuarios]);

  const usuariosFiltrados = usuarios.filter(u =>
    !busqueda || u.nombreCompleto?.toLowerCase().includes(busqueda.toLowerCase()) || u.email?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleCrear = async (form) => {
    setActionLoading(true);
    try {
      await UsuariosService.crear(form);
      setModalCrear(false);
      showToast('✅ Empleado creado correctamente.');
      cargarUsuarios();
    } catch (e) { showToast(`❌ ${e.message}`); }
    finally { setActionLoading(false); }
  };

  const handleActualizar = async (form) => {
    setActionLoading(true);
    try {
      await UsuariosService.actualizar({ ...form, id: modalEditar.id });
      setModalEditar(null);
      showToast('✅ Empleado actualizado correctamente.');
      cargarUsuarios();
    } catch (e) { showToast(`❌ ${e.message}`); }
    finally { setActionLoading(false); }
  };

  const handleDesactivar = async () => {
    setActionLoading(true);
    try {
      await UsuariosService.desactivar(modalConfirmar);
      setModalConfirmar(null);
      showToast('✅ Empleado desactivado. Ya no puede iniciar sesión.');
      cargarUsuarios();
    } catch (e) { showToast(`❌ ${e.message}`); }
    finally { setActionLoading(false); }
  };

  // Estadísticas rápidas
  const porRol = ROLES.reduce((acc, r) => {
    acc[r] = usuarios.filter(u => u.rol === r).length;
    return acc;
  }, {});

  return (
    <>
      <Toast msg={toast} />

      {/* Header de sección */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, margin: '0 0 5px' }}>
            Gestión de personal
          </p>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.ink, margin: 0 }}>Empleados</h2>
        </div>
        <button onClick={() => setModalCrear(true)} style={{
          background: C.green, color: C.white, border: 'none', cursor: 'pointer',
          padding: '11px 22px', borderRadius: 99, fontFamily: 'Inter, sans-serif',
          fontWeight: 700, fontSize: 13, letterSpacing: '0.02em',
          boxShadow: '0 4px 14px rgba(45,106,79,0.28)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          + Nuevo empleado
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
        <KpiCard label="Total activos"     value={usuarios.length}          sub="empleados en sistema"           accent={C.green}  />
        <KpiCard label="Administradores"   value={porRol.ADMIN || 0}        sub="con acceso total"               accent="#6D28D9"  />
        <KpiCard label="Gerentes"          value={porRol.GERENTE_REGIONAL || 0} sub="regionales"                accent="#1D4ED8"  />
        <KpiCard label="Sucursales"        value={SUCURSALES.length}        sub="puntos de venta"                accent={C.amber}  />
      </div>

      {/* Barra de filtros */}
      <div style={{
        background: C.white, borderRadius: 12, padding: '14px 18px',
        border: `1px solid ${C.border}`, marginBottom: 20,
        display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <input
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="🔍  Buscar por nombre o email…"
          style={{ ...inputStyle, flex: '1 1 200px', padding: '8px 12px', fontSize: 13 }}
        />
        <select value={filtroSucursal} onChange={e => setFiltroSucursal(e.target.value)}
          style={{ ...inputStyle, width: 'auto', padding: '8px 12px', fontSize: 13 }}>
          <option value="">Todas las sucursales</option>
          {SUCURSALES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filtroRol} onChange={e => setFiltroRol(e.target.value)}
          style={{ ...inputStyle, width: 'auto', padding: '8px 12px', fontSize: 13 }}
          disabled={!filtroSucursal}>
          <option value="">Todos los roles</option>
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
        {(filtroSucursal || filtroRol || busqueda) && (
          <button onClick={() => { setFiltroSucursal(''); setFiltroRol(''); setBusqueda(''); }} style={{
            background: 'none', border: `1px solid ${C.border}`, borderRadius: 99,
            padding: '7px 14px', fontSize: 12, fontWeight: 600, color: C.muted, cursor: 'pointer',
          }}>
            Limpiar
          </button>
        )}
      </div>

      {/* Tabla */}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        {/* Sub-header de tabla */}
        <div style={{
          padding: '14px 20px', borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>
            {usuariosFiltrados.length} resultado{usuariosFiltrados.length !== 1 ? 's' : ''}
          </span>
          <button onClick={cargarUsuarios} style={{
            background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8,
            padding: '6px 12px', fontSize: 12, fontWeight: 600, color: C.muted, cursor: 'pointer',
          }}>
            ↻ Actualizar
          </button>
        </div>

        {error && (
          <div style={{ padding: '16px 20px', color: C.red, background: C.redBg, fontSize: 14, fontWeight: 500 }}>{error}</div>
        )}

        {loading ? (
          <div style={{ padding: 56, textAlign: 'center', color: C.muted, fontSize: 14 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>⏳</div>
            Cargando empleados…
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div style={{ padding: 56, textAlign: 'center', color: C.muted, fontSize: 14 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔍</div>
            No hay empleados que coincidan.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                  {['ID', 'Empleado', 'Email', 'Rol', 'Sucursal', 'Acciones'].map(h => (
                    <th key={h} style={{
                      padding: '11px 16px', textAlign: 'left', fontSize: 10,
                      fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                      color: C.muted, whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((u, i) => (
                  <tr key={u.id}
                    style={{ borderBottom: i < usuariosFiltrados.length - 1 ? `1px solid ${C.border}` : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 16px', color: C.light, fontWeight: 600, fontSize: 12 }}>
                      #{u.id}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>{u.nombreCompleto}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{u.username || '—'}</div>
                    </td>
                    <td style={{ padding: '14px 16px', color: C.muted, fontSize: 13 }}>{u.email}</td>
                    <td style={{ padding: '14px 16px' }}><RolBadge rol={u.rol} /></td>
                    <td style={{ padding: '14px 16px', color: C.muted, fontSize: 13 }}>{u.sucursal || '—'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setModalEditar(u)} style={{
                          background: C.greenBg, color: C.green, border: 'none',
                          borderRadius: 7, padding: '6px 13px', fontSize: 12,
                          fontWeight: 700, cursor: 'pointer',
                        }}>
                          Editar
                        </button>
                        <button onClick={() => setModalConfirmar(u.id)} style={{
                          background: C.redBg, color: C.red, border: 'none',
                          borderRadius: 7, padding: '6px 13px', fontSize: 12,
                          fontWeight: 700, cursor: 'pointer',
                        }}>
                          Desactivar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Crear */}
      {modalCrear && (
        <Modal
          title="Nuevo empleado"
          subtitle="Completa los datos para crear la cuenta del empleado."
          onClose={() => setModalCrear(false)}
        >
          <UsuarioForm onGuardar={handleCrear} onCerrar={() => setModalCrear(false)} loading={actionLoading} modoEditar={false} />
        </Modal>
      )}

      {/* Modal Editar */}
      {modalEditar && (
        <Modal
          title={`Editar empleado`}
          subtitle={modalEditar.nombreCompleto}
          onClose={() => setModalEditar(null)}
        >
          <UsuarioForm
            inicial={{ nombreCompleto: modalEditar.nombreCompleto, email: modalEditar.email, rol: modalEditar.rol, sucursal: modalEditar.sucursal || 'Casa Matriz', password: '' }}
            onGuardar={handleActualizar}
            onCerrar={() => setModalEditar(null)}
            loading={actionLoading}
            modoEditar={true}
          />
        </Modal>
      )}

      {/* Modal Confirmar Desactivar */}
      {modalConfirmar && (
        <Modal
          title="Desactivar empleado"
          subtitle="Esta acción se puede revertir desde la base de datos."
          onClose={() => setModalConfirmar(null)}
          size={420}
        >
          <div style={{
            background: C.redBg, border: `1px solid rgba(192,57,43,0.2)`,
            borderRadius: 10, padding: '16px 18px', marginBottom: 24,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>⚠️</span>
            <p style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, margin: 0 }}>
              El empleado <strong>{usuarios.find(u => u.id === modalConfirmar)?.nombreCompleto}</strong> perderá acceso inmediato al sistema.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setModalConfirmar(null)} style={{
              flex: 1, padding: '12px 0', borderRadius: 99,
              border: `1.5px solid ${C.border}`, background: 'none',
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13,
              color: C.muted, cursor: 'pointer',
            }}>
              Cancelar
            </button>
            <button onClick={handleDesactivar} disabled={actionLoading} style={{
              flex: 2, padding: '12px 0', borderRadius: 99, border: 'none',
              background: C.red, fontFamily: 'Inter, sans-serif', fontWeight: 700,
              fontSize: 13, color: C.white, cursor: actionLoading ? 'not-allowed' : 'pointer',
              opacity: actionLoading ? 0.7 : 1,
            }}>
              {actionLoading ? 'Desactivando…' : 'Sí, desactivar'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

// ── Placeholders para otras secciones ────────────────────────────────
const ComingSoon = ({ label, icon }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 360, color: C.muted }}>
    <span style={{ fontSize: 48, marginBottom: 16 }}>{icon}</span>
    <h3 style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>{label}</h3>
    <p style={{ fontSize: 14 }}>Sección en desarrollo.</p>
  </div>
);

// ══════════════════════════════════════════════════════════════════════
// VISTA PRINCIPAL
// ══════════════════════════════════════════════════════════════════════
export const AdminView = ({ user, onCerrarSesion }) => {
  const navigate = useNavigate();
  const [activa, setActiva] = useState('empleados');

  useEffect(() => {
    if (!user || user.rol !== 'ADMIN') navigate('/');
  }, [user, navigate]);

  if (!user || user.rol !== 'ADMIN') return null;

  const renderSeccion = () => {
    switch (activa) {
      case 'empleados':  return <EmpleadosSection user={user} />;
      case 'sucursales': return <ComingSoon label="Sucursales" icon="🏢" />;
      case 'reportes':   return <ComingSoon label="Reportes" icon="📊" />;
      case 'auditoria':  return <ComingSoon label="Auditoría" icon="🔍" />;
      default:           return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        * { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Sidebar */}
      <Sidebar activa={activa} setActiva={setActiva} user={user} onCerrarSesion={onCerrarSesion} />

      {/* Contenido principal */}
      <main style={{ marginLeft: C.sidebarW, flex: 1, padding: '40px 36px', minHeight: '100vh' }}>
        {renderSeccion()}
      </main>
    </div>
  );
};