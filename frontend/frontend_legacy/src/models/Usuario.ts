export type RolUsuario = 'ADMIN' | 'GERENTE_REGIONAL' | 'SOPORTE' | 'CAJERO';

export interface Usuario {
  id: string | number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  rol: RolUsuario;           
  sucursalId?: number;       
  activo: boolean;           
}