import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../data/productos";
import { faCartArrowDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../global/CarritoContext";

export default function Producto() {
  const { id } = useParams()
  const producto = productos.find(p => p.id === parseInt(id))
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

  if (!producto) return <p>Producto no encontrado</p>

  return (
    <div className="container my-5">
      <div className="row">

        <div className="col-md-5">
          <img
            src={producto.imagen}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-7">
          <h2>{producto.nombre}</h2>
          <h4 className="text-success">${producto.precio}</h4>
          <p className="text-muted">{producto.descripcion}</p>

          <p><strong>Stock:</strong> {producto.stock}</p>

          <h6>Beneficios:</h6>
          <ul>
            {producto.beneficios.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

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
  )
}
