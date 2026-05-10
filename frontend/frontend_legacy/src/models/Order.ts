import { CartItem } from './Producto';

export type EstadoOrden = 'reservado' | 'confirmado' | 'preparando' | 'despachado' | 'entregado';
export type TipoEnvio = 'retiro' | 'envio' | null;

export interface Orden {
  id: number;
  userEmail: string;
  productos: CartItem[];
  total: number;
  envioTipo: TipoEnvio;
  pagoMetodo: string | null;
  direccion?: string;
  telefono?: string;
  estado: EstadoOrden;
  fecha: string;
}