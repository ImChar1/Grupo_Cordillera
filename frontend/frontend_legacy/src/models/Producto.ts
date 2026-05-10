export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  categoria: string;
  beneficios: string[];
}