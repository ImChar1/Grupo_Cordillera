import React from 'react';

export const PerfilView: React.FC = () => (
  <div className="container py-5">
    <div className="card p-4 shadow-sm border-0 rounded-4">
      <h2 className="fw-bold mb-3">Mi Perfil</h2>
      <p><strong>Nombre:</strong> Usuario EcoMarket</p>
      <p><strong>Email:</strong> usuario@eco.cl</p>
      <button className="btn btn-outline-success rounded-pill mt-3">Editar Datos</button>
    </div>
  </div>
);