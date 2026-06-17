import React from "react";
import "../Css//Nosotros.css";

export default function Nosotros() {
  return (
    <div className="nosotros-page">
      <div className="nosotros-card">

        <h2 className="nosotros-title">Sobre Nosotros</h2>

        <div className="nosotros-content-box">

          <p className="nosotros-content">
            EcoMarket está dedicada a la venta de productos naturales,
            ecológicos y sustentables para el hogar y el cuidado personal.
          </p>

          <ul className="nosotros-list">
            <li>
              <i className="bi bi-leaf"></i>
              Apoyamos a productores de marcas naturales y ecológicas.
            </li>

            <li>
              <i className="bi bi-recycle"></i>
              Promovemos prácticas sustentables y envases reciclables.
            </li>

            <li>
              <i className="bi bi-heart"></i>
              Creemos en el comercio justo y el impacto social positivo.
            </li>
          </ul>

          <p className="nosotros-content">
            ¿Quieres formar parte de la comunidad?
            <a href="mailto:juntos@ecomarket.cl" className="nosotros-mail">
              juntos@ecomarket.cl
            </a>
          </p>

        </div>

        <h3 className="nosotros-subtitle">Nuestras tiendas</h3>

        <p className="nosotros-city">
          Estamos en: <strong>Santiago</strong>
        </p>

        <div className="nosotros-map">
          <iframe
            title="Mapa EcoMarket"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6659.509591576818!2d-70.62401919944858!3d-33.42963657209288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf62a2cb75c3%3A0x6c84dd8e2bc13a00!2sAv.%20Providencia%201234%2C%207500571%20Providencia%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1768952456996!5m2!1ses!2scl"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h4 className="nosotros-subtitle-small">Sucursales de atención</h4>

        <ul className="nosotros-branches">
          <li><b>Santiago:</b> Av. Providencia 1234, Providencia | Tel: +56 9 1234 5678</li>
          <li><b>Concepción:</b> Barros Arana 789 | Tel: +56 41 245 1111</li>
        </ul>

        <div className="nosotros-footer-box">
          Sucursal virtual: Atención en todo Chile · Plataforma segura · Comunidad agrícola nacional
        </div>

      </div>
    </div>
  );
}
