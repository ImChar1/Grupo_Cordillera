import { useUser } from "../global/UsuarioGlobal";
import { useOrder } from "../global/OrderGlobal";
import { useCart } from "../global/CarritoContext";
import { useNavigate } from "react-router-dom";
import "../Css/Checkout.css";
import { useState } from "react";

const ENVIO_PRECIOS = {
  estandar: 2990,
  express: 5990,
  retiro: 0
};

export default function Checkout() {
  const { user } = useUser();
  const { setEnvio } = useOrder();
  const { carrito, total } = useCart();
  const navigate = useNavigate();

  const [envio, setEnvioLocal] = useState(null);

  const costoEnvio = envio ? ENVIO_PRECIOS[envio] : 0;
  const totalFinal = total + costoEnvio;

  const handleIrAPago = () => {

    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    if (!user.direccion || !user.telefono) {
      const irPerfil = window.confirm(
        "Para continuar necesitas completar tu dirección y teléfono.\n\n¿Quieres ir a tu perfil ahora?"
      );

      if (irPerfil) navigate("/perfil");
      return;
    }

    if (!envio) {
      alert("Debes seleccionar un tipo de envío");
      return;
    }

    setEnvio(envio);
    navigate("/pago");
  };

  return (
    <div className="checkout-container">

      <h2>Checkout</h2>

      {/* PRODUCTOS */}
      <div className="checkout-section">
        <h3>Productos a pagar</h3>

        {carrito.map(p => (
          <div key={p.id} className="checkout-producto">
            <span className="nombre">{p.nombre}</span>
            <span className="cantidad">x{p.cantidad}</span>
            <span className="precio">${p.precio * p.cantidad}</span>
          </div>
        ))}

        <div className="checkout-linea">
          <span>Subtotal productos</span>
          <span>${total}</span>
        </div>
      </div>

      {/* ENVÍO */}
      <div className="checkout-section">
        <h3>Tipo de envío</h3>

        <label className={`envio-option ${envio === "estandar" ? "active" : ""}`}>
          <input
            type="radio"
            name="envio"
            value="estandar"
            onChange={() => setEnvioLocal("estandar")}
          />
          🚛 Estándar (3–5 días) — $2.990
        </label>

        <label className={`envio-option ${envio === "express" ? "active" : ""}`}>
          <input
            type="radio"
            name="envio"
            value="express"
            onChange={() => setEnvioLocal("express")}
          />
          🚚 Express (24 hrs) — $5.990
        </label>

        <label className={`envio-option ${envio === "retiro" ? "active" : ""}`}>
          <input
            type="radio"
            name="envio"
            value="retiro"
            onChange={() => setEnvioLocal("retiro")}
          />
          🏬 Retiro en sucursal — Gratis
        </label>
      </div>

      {/* RESUMEN */}
      <div className="checkout-resumen">

        <div className="checkout-linea">
          <span>Subtotal productos</span>
          <span>${total}</span>
        </div>

        <div className="checkout-linea">
          <span>Costo envío</span>
          <span>${costoEnvio}</span>
        </div>

        <div className="checkout-total">
          <span>Total a pagar</span>
          <span>${totalFinal}</span>
        </div>

        <div className="checkout-datos">
          <p><b>Dirección:</b> {user.direccion}</p>
          <p><b>Teléfono:</b> {user.telefono}</p>
        </div>

        <button className="checkout-btn" onClick={handleIrAPago}>
          Continuar a pago
        </button>

      </div>

    </div>
  );
}
