// URL relativa — Nginx hace el proxy a api-gateway:8080 internamente
const API_URL = '/api/v1/usuarios';

export const AuthService = {

  // ─── LOGIN ────────────────────────────────────────────────
  // POST /api/v1/usuarios/login
  login: async (credentials) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || 'Credenciales inválidas. Verifica tu correo y contraseña.');
    }

    const usuario = await res.json();

    const usuarioSafe = {
      id:             usuario.id,
      username:       usuario.username,
      nombreCompleto: usuario.nombreCompleto,
      email:          usuario.email,
      rut:            usuario.rut,
      rol:            usuario.rol,
      sucursal:       usuario.sucursal,
      activo:         usuario.activo,
    };

    return { token: 'session-token', user: usuarioSafe };
  },

  // ─── REGISTRO ─────────────────────────────────────────────
  // POST /api/v1/usuarios
  register: async (userData) => {
    const baseUsername = userData.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    const username = `${baseUsername}_${Date.now().toString().slice(-5)}`;

    const payload = {
      username,
      password:       userData.password,
      nombreCompleto: userData.nombreCompleto,
      email:          userData.email,
      rut:            userData.rut || null,
      rol:            userData.rol || 'TRABAJADOR',
      sucursal:       userData.sucursal || 'Casa Matriz',
      activo:         true,
    };

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorText;
      try {
        const errJson = await res.json();
        errorText = errJson.message || errJson.error || 'Error al registrar el usuario.';
      } catch {
        errorText = await res.text();
      }
      throw new Error(errorText || 'Error al registrar el usuario. Intenta con otro correo.');
    }

    return await res.json();
  },
};