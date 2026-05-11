import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterView = () => {
  const navigate = useNavigate();
  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-4 shadow border-0 rounded-4" style={{maxWidth: '400px', width: '100%'}}>
        <h2 className="fw-bold mb-4 text-center">Registro</h2>
        <input type="text" className="form-control mb-3" placeholder="Nombre completo" />
        <input type="email" className="form-control mb-3" placeholder="Correo" />
        <input type="password" className="form-control mb-4" placeholder="Contraseña" />
        <button className="btn btn-success w-100 rounded-pill py-2 fw-bold" onClick={() => navigate('/login')}>Registrarse</button>
      </div>
    </div>
  );
};