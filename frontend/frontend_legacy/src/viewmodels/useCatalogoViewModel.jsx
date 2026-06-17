import { useState, useEffect, useMemo } from 'react';
import { ProductoService } from '../services/ProductoService';

export const useCatalogoViewModel = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [ordenPrecio, setOrdenPrecio] = useState("normal");

  // ✅ Carga productos desde el backend al montar
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await ProductoService.getAll();
        setProductos(data);
      } catch (e) {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const productosFiltrados = useMemo(() => {
    let lista = categoriaActiva === "todos"
      ? [...productos]
      : productos.filter(p => p.categoria === categoriaActiva);

    if (ordenPrecio === "asc") lista.sort((a, b) => a.precio - b.precio);
    if (ordenPrecio === "desc") lista.sort((a, b) => b.precio - a.precio);

    return lista;
  }, [productos, categoriaActiva, ordenPrecio]);

  return {
    productosFiltrados,
    loading,
    error,
    categoriaActiva,
    setCategoriaActiva,
    ordenPrecio,
    setOrdenPrecio,
  };
};