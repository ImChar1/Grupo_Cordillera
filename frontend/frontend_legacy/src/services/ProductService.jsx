const productosData = [
  {
    id: 1,
    nombre: "Acondicionador Johnson´s",
    precio: 4990,
    descripcion: "Acondicionador natural para el cabello Johnson´s 400ml",
    imagen: "/images/acondicionador.jpg",
    stock: 12,
    categoria: "Acondicionador",
    beneficios: ["Hidratación profunda", "Suavidad y brillo", "Fórmula natural"]
  },
  {
    id: 2,
    nombre: "Crema Beuty Secret",
    precio: 990,
    descripcion: "Crema para manos natural Beauty Secret 50ml",
    imagen: "/images/Cremamano.jpg",
    stock: 20,
    categoria: "Crema de manos",
    beneficios: ["Hidratación intensiva", "Reparación de piel seca"]
  },
  {
    id: 3,
    nombre: "Protector solar Hawaiian Tropic",
    precio: 13190,
    descripcion: "Protector solar Hawaiian Tropic 240ml",
    imagen: "/images/Bloqueador.jpg",
    stock: 15,
    categoria: "Protector solar",
    beneficios: ["Protección UV", "Hidratación"]
  },
  {
    id: 4,
    nombre: "Shampoo Dove",
    precio: 3500,
    descripcion: "Shampoo Dove reconstrucción completa 400ml",
    imagen: "/images/shampoo.jpg",
    stock: 25,
    categoria: "Shampoo",
    beneficios: ["Limpieza profunda", "Reparación"]
  }
];

export const ProductService = {
  getProducts: () => productosData,
  getProductById: (id) => {
    return productosData.find(p => p.id === id);
  }
};