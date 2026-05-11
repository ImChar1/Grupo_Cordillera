import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ProductoDetailView = ({ productos, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const producto = productos.find((p) => p.id === parseInt(id || "0"));
  
  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="container py-5">
      {/* Contenido de la vista */}
      <h1>{producto.nombre}</h1>
    </div>
  );
};