import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/Catalogo.css";
import { faCartArrowDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../global/CarritoContext";

export default function ProductoCard({ producto }) {

  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const { addToCart } = useCart();

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
    addToCart(producto, cantidad);
    setAgregado(true);

    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <div className="producto-card d-flex">
      <div className="card h-100 w-100 shadow-sm border-0 d-flex flex-column">

        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
        />

        <div className="card-body d-flex flex-column">

          <h6 className="fw-bold">
            <Link
              to={`/producto/${producto.id}`}
              className="text-decoration-none text-dark"
            >
              {producto.nombre}
            </Link>
          </h6>

          <span className="text-muted small">{producto.categoria}</span>
          <span className="h6 mt-2">${producto.precio}</span>

          <span className="small text-muted">
            Stock: {producto.stock}
          </span>

          {/* Selector cantidad */}
          <div className="d-flex align-items-center gap-2 mt-2">
            <button
              className="btn btn-outline-success rounded-circle"
              onClick={disminuir}
              style={{ width: "35px", height: "35px", padding: "0" }}
            >
              -
            </button>

            <span>{cantidad}</span>

            <button
              className="btn btn-outline-success rounded-circle"
              onClick={aumentar}
              style={{ width: "35px", height: "35px", padding: "0" }}
            >
              +
            </button>
          </div>

          <br />

          {/* Botón carrito */}
          <button
            className={`btn btn-sm mt-auto ${agregado ? "btn-outline-success" : "btn-success"}`} onClick={handleAdd} disabled={producto.stock === 0}>
            <FontAwesomeIcon icon={agregado ? faCheck : faCartArrowDown} />{" "}
            {agregado ? "Agregado" : "Añadir al carrito"}
          </button>

        </div>
      </div>
    </div>
  );
}
