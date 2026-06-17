import { useNavigate } from "react-router-dom"
import { useCart } from "../global/CarritoContext"
import "../Css/style.css"

export default function Carrito() {

  const { cart, removeFromCart, updateCantidad, clearCart } = useCart()
  const navigate = useNavigate()   

  const total = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  return (
    <div className="carrito container py-4">
      <div>

        <h2 className="mb-4">🛒 Carrito de compras</h2>

        {cart.length === 0 ? (
          <p className="text-muted">Tu carrito está vacío</p>
        ) : (
          <>
            {cart.map(p => (
              <div key={p.id} className="carrito-item">

                <img src={p.imagen} alt={p.nombre} />

                <div className="info">
                  <h6>{p.nombre}</h6>
                  <span className="precio">${p.precio}</span>
                </div>

                <input
                  type="number"
                  min="1"
                  value={p.cantidad}
                  onChange={e => updateCantidad(p.id, Number(e.target.value))}
                />

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(p.id)}
                >
                  ✕
                </button>

              </div>
            ))}

            <div className="carrito-footer">
              <strong>Subtotal: ${total}</strong>

              <div className="acciones">
                <button className="btn btn-outline-warning" onClick={clearCart}>
                  Vaciar carrito
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => navigate("/checkout")}
                >
                  Ir a checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

  )
}
