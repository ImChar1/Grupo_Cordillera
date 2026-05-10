import React from 'react';
import { Link } from 'react-router-dom';

export const HomeView: React.FC = () => {
  return (
    <div className="home-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="badge bg-success mb-3 px-3 py-2 rounded-pill">ESTRENO 2026</span>
            <h1 className="display-2 fw-bold mb-4">Sustentabilidad en cada detalle.</h1>
            <p className="lead mb-5 opacity-75">No es solo cosmética, es el futuro de tu piel y del planeta. Productos 100% orgánicos con despacho en 24h.</p>
            <div className="d-flex gap-3">
              <Link to="/catalogo" className="btn btn-light btn-lg rounded-pill px-5 fw-bold">Comprar Ahora</Link>
              <Link to="/nosotros" className="btn btn-outline-light btn-lg rounded-pill px-5">Nuestra Historia</Link>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block text-end">
             <img src="/images/hero-bundle.png" alt="Eco" className="img-fluid animate__animated animate__fadeInRight" style={{maxHeight: '500px'}} />
          </div>
        </div>
      </div>
    </div>
  );
};