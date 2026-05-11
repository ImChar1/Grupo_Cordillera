import React, { useState, useMemo } from "react";
import ProductoCard from "../moleculas/ProductoCard";
import productos from "../data/productos";
import { useCart } from "../global/CarritoContext";
import "../Css/Catalogo.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categorias = [
  "Shampoo",
  "Acondicionador",
  "Crema de manos",
  "Protector solar",
  "Hidratante corporal",
  "Hidratante facial",
  "Humectante",
  "Parche",
  "Perfume Árabe",
  "Sérum"
];

export default function Catalogo() {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [ordenPrecio, setOrdenPrecio] = useState("normal");
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const { addToCart } = useCart();

  const productosFiltrados = useMemo(() => {
    let lista =
      categoriaActiva === "todos"
        ? [...productos]
        : productos.filter(p => p.categoria === categoriaActiva);

    if (ordenPrecio === "asc") {
      lista.sort((a, b) => a.precio - b.precio);
    }

    if (ordenPrecio === "desc") {
      lista.sort((a, b) => b.precio - a.precio);
    }

    return lista;
  }, [categoriaActiva, ordenPrecio]);

  return (
    <div className="catalogo-layout">

      {/* BOTÓN FILTROS MOBILE */}
      <button className="btn btn-success filtro-toggle" onClick={() => setFiltrosAbiertos(prev => !prev)}>
        <FontAwesomeIcon icon={faBars} /> Filtros
      </button>

      {/* ASIDE FILTROS */}
      <aside className={`catalogo-filtros ${filtrosAbiertos ? "open" : "closed"}`}>

        <button
          className="btn btn-outline-success filtro-close"
          onClick={() => setFiltrosAbiertos(false)}
        >
          <FontAwesomeIcon icon={faXmark} /> Cerrar
        </button>

        <h5 className="filtro-title">Categorías</h5>

        <div className="filtro-categorias">
          {categorias.map(cat => (
            <button key={cat} className={`filtro-btn ${categoriaActiva === cat ? "active" : ""}`}  onClick={() => { setCategoriaActiva(cat); setFiltrosAbiertos(false); }} > {cat}
            </button>
          ))}

          <button className={`filtro-btn ${categoriaActiva === "todos" ? "active" : ""}`} onClick={() => { setCategoriaActiva("todos"); setFiltrosAbiertos(false); }} > Ver todos </button>
        </div>

        {/* ORDENAR POR PRECIO */}
        <h5 className="filtro-title">Ordenar por precio</h5>

        <div className="filtro-orden">
          <button className={`filtro-btn ${ordenPrecio === "asc" ? "active" : ""}`} onClick={() => { setOrdenPrecio("asc"); setFiltrosAbiertos(false); }} > Menor a mayor </button>

          <button className={`filtro-btn ${ordenPrecio === "desc" ? "active" : ""}`} onClick={() => { setOrdenPrecio("desc"); setFiltrosAbiertos(false); }} >Mayor a menor</button>

          <button className={`filtro-btn ${ordenPrecio === "normal" ? "active" : ""}`} onClick={() => { setOrdenPrecio("normal"); setFiltrosAbiertos(false);  }} > Orden normal </button>
        </div>
      </aside>

      {/* PRODUCTOS */}
      <section className="catalogo-productos"> {productosFiltrados.map(producto => (
          <ProductoCard key={producto.id} producto={producto} /> ))}</section>

    </div>
  );
}
