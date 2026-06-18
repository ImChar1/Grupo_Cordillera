// ============================================================
// UsuariosService.jsx
// Cubre los 7 endpoints de gestión de usuarios del ms-usuarios
// Todos pasan por el API Gateway en puerto 8080
// ============================================================

const API_URL = 'http://localhost:8080/api/v1/usuarios';

export const UsuariosService = {

  // ─── 1. OBTENER TODOS LOS USUARIOS ACTIVOS ────────────────
  // GET /api/v1/usuarios
  // Devuelve solo los empleados con activo=true (trabajadores actuales)
  getActivos: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener los usuarios activos.');
    return await res.json();
  },

  // ─── 2. BUSCAR USUARIO POR ID ─────────────────────────────
  // GET /api/v1/usuarios/:id
  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Usuario con id ${id} no encontrado.`);
    return await res.json();
  },

  // ─── 3. CREAR NUEVO USUARIO ───────────────────────────────
  // POST /api/v1/usuarios
  // Body: { username, password, nombreCompleto, email, rut?, rol, sucursal? }
  // El backend encripta la password antes de guardar
  crear: async (nuevoUsuario) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Error al crear el usuario.');
    }
    return await res.json();
  },

  // ─── 4. ACTUALIZAR USUARIO EXISTENTE ──────────────────────
  // PUT /api/v1/usuarios
  // Body: { id, nombreCompleto, email, rol, sucursal, password? }
  // Solo enviar password si el admin quiere cambiarla, si no: omitir o enviar ""
  actualizar: async (usuarioActualizado) => {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioActualizado),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Error al actualizar el usuario.');
    }
    return await res.json();
  },

  // ─── 5. DESACTIVAR USUARIO (BORRADO LÓGICO) ───────────────
  // DELETE /api/v1/usuarios/:id
  // No borra el registro de la BD, solo pone activo=false
  // Úsalo cuando un empleado renuncia o es despedido
  desactivar: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Error al desactivar el usuario con id ${id}.`);
    return await res.text(); // El backend devuelve un string de confirmación
  },

  // ─── 6. FILTRAR EMPLEADOS POR SUCURSAL ────────────────────
  // GET /api/v1/usuarios/sucursal/:sucursal
  // Devuelve solo activos de esa sede
  // Ejemplo: getEmpleadosPorSucursal('SantiagoCentro')
  getEmpleadosPorSucursal: async (sucursal) => {
    const res = await fetch(`${API_URL}/sucursal/${encodeURIComponent(sucursal)}`);
    if (!res.ok) throw new Error(`Error al obtener empleados de la sucursal: ${sucursal}`);
    return await res.json();
  },

  // ─── 7. FILTRAR EMPLEADOS POR SUCURSAL Y ROL ──────────────
  // GET /api/v1/usuarios/sucursal/:sucursal/rol/:rol
  // Ejemplo: getEmpleadosPorSucursalYRol('SantiagoCentro', 'CAJERO')
  getEmpleadosPorSucursalYRol: async (sucursal, rol) => {
    const res = await fetch(
      `${API_URL}/sucursal/${encodeURIComponent(sucursal)}/rol/${encodeURIComponent(rol)}`
    );
    if (!res.ok) {
      throw new Error(`Error al filtrar por sucursal "${sucursal}" y rol "${rol}".`);
    }
    return await res.json();
  },
};