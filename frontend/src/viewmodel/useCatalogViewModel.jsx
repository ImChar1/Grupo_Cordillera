// src/viewmodels/useCatalogoViewModel.jsx
import { useState, useMemo } from 'react';
import { PRODUCTOS_MOCK } from '../models/ProductData';

export const useCatalogoViewModel = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [ordenPrecio, setOrdenPrecio] = useState("normal");
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const productosFiltrados = useMemo(() => {
    let lista = categoriaActiva === "todos"
      ? [...PRODUCTOS_MOCK]
      : PRODUCTOS_MOCK.filter(p => p.categoria === categoriaActiva);

    if (ordenPrecio === "asc") lista.sort((a, b) => a.precio - b.precio);
    if (ordenPrecio === "desc") lista.sort((a, b) => b.precio - a.precio);

    return lista;
  }, [categoriaActiva, ordenPrecio]);

  return {
    productosFiltrados,
    categoriaActiva,
    setCategoriaActiva,
    ordenPrecio,
    setOrdenPrecio,
    filtrosAbiertos,
    setFiltrosAbiertos
  };
};