// URL relativa — Nginx hace el proxy a api-gateway:8080 internamente
const API_URL = '/api/v1/usuarios';

export const UsuariosService = {

  // 1. Todos los usuarios activos
  getActivos: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener los usuarios activos.');
    return await res.json();
  },

  // 2. Buscar por ID
  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Usuario con id ${id} no encontrado.`);
    return await res.json();
  },

  // 3. Crear nuevo usuario
  crear: async (nuevoUsuario) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    });
    if (!res.ok) {
      let errorText;
      try {
        const errJson = await res.json();
        errorText = errJson.message || errJson.error || 'Error al crear el usuario.';
      } catch {
        errorText = await res.text();
      }
      throw new Error(errorText);
    }
    return await res.json();
  },

  // 4. Actualizar usuario existente
  actualizar: async (usuarioActualizado) => {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioActualizado),
    });
    if (!res.ok) {
      let errorText;
      try {
        const errJson = await res.json();
        errorText = errJson.message || errJson.error || 'Error al actualizar el usuario.';
      } catch {
        errorText = await res.text();
      }
      throw new Error(errorText);
    }
    return await res.json();
  },

  // 5. Desactivar usuario (borrado lógico)
  desactivar: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Error al desactivar el usuario con id ${id}.`);
    return await res.text();
  },

  // 6. Filtrar por sucursal
  getEmpleadosPorSucursal: async (sucursal) => {
    const res = await fetch(`${API_URL}/sucursal/${encodeURIComponent(sucursal)}`);
    if (!res.ok) throw new Error(`Error al obtener empleados de la sucursal: ${sucursal}`);
    return await res.json();
  },

  // 7. Filtrar por sucursal y rol
  getEmpleadosPorSucursalYRol: async (sucursal, rol) => {
    const res = await fetch(
      `${API_URL}/sucursal/${encodeURIComponent(sucursal)}/rol/${encodeURIComponent(rol)}`
    );
    if (!res.ok) throw new Error(`Error al filtrar por sucursal "${sucursal}" y rol "${rol}".`);
    return await res.json();
  },
};