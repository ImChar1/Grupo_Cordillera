import React, { useState } from "react";
import { Link } from "react-router-dom";

export const CardProducto = ({ producto, onAdd }) => {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  // Funciones para sumar y restar localmente en la card
  const aumentar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const disminuir = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAdd = () => {
    onAdd(cantidad); // Llama a la función que viene del padre
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      <Link to={`/producto/${producto.id}`}>
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} style={{ height: "200px", objectFit: "cover" }} />
      </Link>

      <div className="card-body d-flex flex-column p-3">
        <h6 className="fw-bold">{producto.nombre}</h6>
        <p className="text-success fw-bold h5">${producto.precio}</p>
       
        {/* SELECTOR DE CANTIDAD CORREGIDO */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <button
            type="button"
            className="btn btn-sm btn-outline-success rounded-circle"
            onClick={(e) => { e.preventDefault(); disminuir(); }}
            style={{ width: "32px", height: "32px", padding: "0" }}
          > - </button>
         
          <span className="fw-bold">{cantidad}</span>
         
          <button
            type="button"
            className="btn btn-sm btn-outline-success rounded-circle"
            onClick={(e) => { e.preventDefault(); aumentar(); }}
            style={{ width: "32px", height: "32px", padding: "0" }}
          > + </button>
        </div>

        <button
          className={`btn w-100 mt-auto py-2 fw-bold ${agregado ? "btn-outline-success" : "btn-success"}`}
          onClick={handleAdd}
          disabled={producto.stock === 0}
        >
          {agregado ? "✓ Agregado" : "🛒 Añadir"}
        </button>
      </div>
    </div>
  );
};