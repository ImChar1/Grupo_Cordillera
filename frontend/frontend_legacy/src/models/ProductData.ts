// src/models/ProductData.ts
import { Producto } from './Producto';

export const PRODUCTOS_MOCK: Producto[] = [
  {
    id: 1,
    nombre: "Acondicionador Johnson´s",
    precio: 4990,
    descripcion: "Acondicionador natural para el cabello Johnson´s 400ml",
    imagen: "/images/acondicionador.jpg",
    stock: 12,
    categoria: "Acondicionador",
    beneficios: ["Hidratación profunda", "Suavidad y brillo", "Fórmula natural", "Ingredientes naturales"],
  },
];