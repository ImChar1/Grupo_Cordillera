import React from 'react';
import { Link } from 'react-router-dom';

export const HomeView = () => {
  return (
    <div className="home-hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="badge bg-success mb-3 px-3 py-2 rounded-pill">ESTRENO 2026</span>
            <h1 className="display-2 fw-bold mb-4">Innovación para tu hogar, conciencia para tu mundo.</h1>
            <p className="lead mb-5 opacity-75">No es solo comercio, es el futuro de tu entorno y del planeta. La mayor variedad en tecnología y hogar, con despacho rápido a todo Chile.</p>
            <div className="d-flex gap-3">
              <Link to="/catalogo" className="btn btn-light btn-lg rounded-pill px-5 fw-bold">Comprar Ahora</Link>
              <Link to="/nosotros" className="btn btn-outline-light btn-lg rounded-pill px-5">Nuestra Historia</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};