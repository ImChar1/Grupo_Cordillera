import { Producto } from './Producto';

export interface Pedido {
  id: string;
  fecha: string;
  total: number;
  productos: { producto: Producto; cantidad: number }[];
  estado: 'pendiente' | 'completado' | 'enviado';
}