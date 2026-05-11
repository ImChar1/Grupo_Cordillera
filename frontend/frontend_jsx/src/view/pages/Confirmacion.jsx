import { useOrder } from "./global/OrderGlobal";
import Tracking from "./components/organisms/Tracking";
import Boleta from "./components/organisms/Boleta";
import { useNavigate } from "react-router-dom";


export default function Confirmacion() {
  const { currentOrder, limpiarOrdenActual } = useOrder();
  const navigate = useNavigate();

  if (!currentOrder) {
    return (
      <div className="confirmacion-container">
        <p>No hay pedido activo</p>
      </div>
    );
  }

  const volverInicio = () => {
    limpiarOrdenActual();
    navigate("/");
  };

  return (
    <div className="confirmacion-container">

      {/* TÍTULO */}
      <h2 className="confirmacion-title">
        <i className="bi bi-check-circle-fill confirmacion-icon"></i>
        Pedido confirmado
      </h2>

      {/* TRACKING (línea temporal) */}
      <Tracking
        estado={currentOrder.estado}
        envioTipo={currentOrder.envioTipo}
      />

      {/* BOLETA */}
      <Boleta order={currentOrder} />

      {/* RESUMEN */}
      <div className="confirmacion-card">
        <div><span>ID Pedido:</span> {currentOrder.id}</div>
        <div><span>Total:</span> ${currentOrder.total}</div>
        <div><span>Pago:</span> {currentOrder.pagoMetodo}</div>
        <div><span>Envío:</span> {currentOrder.envioTipo}</div>
      </div>

      {/* INFO EXTRA */}
      <div className="confirmacion-info">
        {currentOrder.envioTipo === "retiro" && (
          <p>🏬 Pedido reservado para retiro en sucursal</p>
        )}

        {currentOrder.pagoMetodo === "debito" && (
          <p>💳 Pago realizado con tarjeta de débito</p>
        )}
      </div>

      {/* ACCIÓN */}
      <button
        className="confirmacion-btn"
        onClick={volverInicio}
      >
        Volver al inicio
      </button>

    </div>
  );
}
