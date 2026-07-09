// ============================================================
// Usuario.ts — Modelo que refleja exactamente UsuarioModel.java
// ============================================================

export type RolUsuario =
  | 'ADMIN'
  | 'GERENTE_REGIONAL'
  | 'SOPORTE'
  | 'CAJERO'
  | 'TRABAJADOR'
  | 'VENDEDOR';

export interface Usuario {
  id: number;
  username: string;
  password?: string;          // Opcional: nunca se muestra en UI, solo se envía al crear/actualizar
  nombreCompleto: string;
  email: string;
  rut?: string;
  rol: RolUsuario;
  sucursal?: string;
  fechaRegistro?: string;     // LocalDateTime serializado como string ISO
  fechaUltimaConexion?: string;
  activo: boolean;
  creadoPor?: string;
}

// DTO para crear un usuario nuevo (POST /api/v1/usuarios)
export interface CrearUsuarioDTO {
  username: string;
  password: string;
  nombreCompleto: string;
  email: string;
  rut?: string;
  rol: RolUsuario;
  sucursal?: string;
  activo?: boolean;
  creadoPor?: string;
}

// DTO para actualizar un usuario (PUT /api/v1/usuarios)
export interface ActualizarUsuarioDTO {
  id: number;
  nombreCompleto: string;
  email: string;
  rol: RolUsuario;
  sucursal?: string;
  password?: string;          // Solo si se quiere cambiar la contraseña
}