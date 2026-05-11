import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CarritoView = ({ cart, total, removeFromCart, updateCantidad, clearCart }) => {
  const navigate = useNavigate();

  return (
    <div className="container-pro">
      <h2 className="mb-5 fw-bold"><i className="bi bi-cart3"></i> Tu Carrito de Compras</h2>
      
      {cart.length === 0 ? (
        <div className="card-pro text-center p-5">
          <div style={{ fontSize: '4rem' }}>🛒</div>
          <p className="text-muted mt-3">Tu carrito está vacío actualmente.</p>
          <button className="btn-pro-success mx-auto mt-2" onClick={() => navigate('/')}>
            Volver a la tienda
          </button>
        </div>
      ) : (
        <div className="row g-4">
          
          {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
          <div className="col-lg-8">
            <div className="card-pro">
              {cart.map((p) => (
                <div key={p.id} className="carrito-item-pro">
                  <img src={p.imagen} alt={p.nombre} />
                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-bold">{p.nombre}</h6>
                    <small className="text-muted d-block mb-1">Unidad: ${p.precio}</small>
                    <button className="btn btn-sm btn-outline-danger p-1 border-0" onClick={() => removeFromCart(p.id)} title="Eliminar">
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <label className="small text-muted">Cant:</label>
                    <input 
                      type="number" 
                      className="form-control text-center" 
                      style={{ width: '65px', borderRadius: '8px' }}
                      min="1"
                      value={p.cantidad}
                      onChange={(e) => updateCantidad(p.id, Number(e.target.value))}
                    />
                  </div>
                  <div className="text-end ps-3" style={{ minWidth: '100px' }}>
                    <span className="fw-bold text-success">${p.precio * p.cantidad}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-link text-muted mt-3 p-0 text-decoration-none small" onClick={clearCart}>
               Vaciar carrito
            </button>
          </div>

          {/* COLUMNA DERECHA: RESUMEN DE PAGO */}
          <div className="col-lg-4">
            <div className="card-pro p-4 sticky-top" style={{ top: '20px' }}>
              <h5 className="fw-bold mb-4">Resumen</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cart.length} productos)</span>
                <span>${total}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Envío</span>
                <span className="text-success fw-bold">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="h5 fw-normal">Total a pagar</span>
                <span className="total-pro">${total}</span>
              </div>
              <button 
                className="btn-pro-success btn-lg w-100 py-3" 
                onClick={() => navigate('/checkout')}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};