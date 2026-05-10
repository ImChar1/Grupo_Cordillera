import React from 'react';

export const NosotrosView: React.FC = () => (
  <div className="container py-5 text-center">
    <h1 className="fw-bold mb-4">Sobre EcoMarket</h1>
    <p className="lead">Somos una tienda comprometida con el medio ambiente y tu bienestar.</p>
    <div className="row mt-5">
      <div className="col-md-4"><h3>🌿 Natural</h3><p>Ingredientes 100% orgánicos.</p></div>
      <div className="col-md-4"><h3>♻️ Eco-Friendly</h3><p>Envases biodegradables.</p></div>
      <div className="col-md-4"><h3>🐾 Cruelty Free</h3><p>No testeamos en animales.</p></div>
    </div>
  </div>
);