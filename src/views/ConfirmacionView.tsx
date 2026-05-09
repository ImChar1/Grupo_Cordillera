import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ConfirmacionView: React.FC = () => {
  const navigate = useNavigate();
  const [boleta, setBoleta] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('ultima_boleta');
    if (data) {
      setBoleta(JSON.parse(data));
    }
  }, []);

  return (
    <div className="container py-5 text-center animate__animated animate__zoomIn">
      <div className="card card-pro p-5 shadow border-0 mx-auto" style={{maxWidth: '500px'}}>
        <div className="display-1 text-success mb-3">✅</div>
        <h2 className="fw-bold">¡Pago Confirmado!</h2>
        <p className="text-muted">Gracias por preferir EcoMarket.</p>

        {boleta && (
          <div className="bg-light p-3 rounded-4 my-4 text-start small">
            <p className="mb-1"><b>Orden:</b> #{boleta.nroPedido}</p>
            <p className="mb-1"><b>Fecha:</b> {boleta.fecha}</p>
            <hr/>
            {boleta.items.map((it: any) => (
              <div key={it.id} className="d-flex justify-content-between">
                <span>{it.nombre} (x{it.cantidad})</span>
                <span>${(it.precio * it.cantidad).toLocaleString()}</span>
              </div>
            ))}
            <hr/>
            <div className="d-flex justify-content-between fw-bold text-success h5">
              <span>Total:</span>
              <span>${boleta.total.toLocaleString()}</span>
            </div>
          </div>
        )}

        <button onClick={() => navigate('/')} className="btn btn-pro-success px-5">
          VOLVER AL INICIO
        </button>
      </div>
    </div>
  );
};