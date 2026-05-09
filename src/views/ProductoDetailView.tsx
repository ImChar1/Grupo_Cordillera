import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// IMPORTANTE: Asegúrate de que diga "export const" y NO "export default"
export const ProductoDetailView: React.FC<any> = ({ productos, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // El resto del código que ya teníamos...
  const producto = productos.find((p: any) => p.id === parseInt(id || "0"));
  
  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="container py-5">
      {/* Contenido de la vista */}
      <h1>{producto.nombre}</h1>
    </div>
  );
};