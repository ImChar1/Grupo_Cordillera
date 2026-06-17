export default function Boleta({ order }) {

  return (
    <div className="boleta">

      <h3>🧾 Boleta</h3>

      <p><b>N° Pedido:</b> {order.id}</p>
      <p><b>Fecha:</b> {new Date(order.fecha).toLocaleString()}</p>
      <p><b>Cliente:</b> {order.userEmail}</p>

      <hr />

      <ul>
        {order.productos.map(p => (
          <li key={p.id}>
            {p.nombre} x {p.cantidad} — ${p.precio * p.cantidad}
          </li>
        ))}
      </ul>

      <hr />

      <p><b>Pago:</b> {order.pagoMetodo}</p>
      <p><b>Envío:</b> {order.envioTipo}</p>

      <h4>Total: ${order.total}</h4>

    </div>
  )
}
