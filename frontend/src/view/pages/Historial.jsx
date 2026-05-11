import { useOrder } from "@/global/OrderGlobal";
import { useNavigate } from "react-router-dom";
import { useUser } from "./global/UsuarioGlobal";

export default function Historial() {
  const { orders, crearOrden } = useOrder();
  const { user } = useUser();
  const navigate = useNavigate();

  const misOrdenes = orders.filter(
    o => o.userEmail === user.email
  );

  if (misOrdenes.length === 0) {
    return (
      <div className="historial-container">
        <p>No hay compras registradas</p>
      </div>
    );
  }

  const repetirCompra = (order) => {
    crearOrden({
      productos: order.productos,
      total: order.total,
      envioTipo: order.envioTipo,
      pagoMetodo: order.pagoMetodo,
      direccion: order.direccion,
      telefono: order.telefono
    });

    navigate("/confirmacion");
  };

  return (
    <div className="historial-container">

      <h2 className="historial-title">
        🧾 Historial de compras
      </h2>

      {misOrdenes.map(order => (
        <div key={order.id} className="historial-card">

          {/* HEADER */}
          <div className="historial-info">
            <div>
              <span>ID:</span> {order.id}
            </div>

            <div>
              <span>Estado:</span>{" "}
              <span className="historial-estado">
                {order.estado}
              </span>
            </div>

            <div>
              <span>Fecha:</span>{" "}
              {new Date(order.fecha).toLocaleString()}
            </div>

            <div>
              <span>Pago:</span> {order.pagoMetodo}
            </div>

            <div>
              <span>Envío:</span> {order.envioTipo}
            </div>
          </div>

          {/* TOTAL */}
          <div className="historial-total">
            Total: ${order.total}
          </div>

          {/* ACCIONES */}
          <div className="historial-actions">
            <button
              className="historial-btn outline"
              onClick={() => repetirCompra(order)}
            >
              Ver boleta
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}
