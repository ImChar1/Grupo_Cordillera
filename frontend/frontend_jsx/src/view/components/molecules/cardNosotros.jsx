import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import "../Css/style.css";

function CardNosotros() {
  return (
    <section className="nosotros-home">
      <div className="nosotros-overlay">

        <div className="nosotros-content">
          <h2>Sobre Nosotros</h2>

          <p>
            <strong>EcoMarket</strong> es una empresa dedicada a la venta de
            productos naturales, ecológicos y sustentables para el hogar y el
            cuidado personal.
          </p>

          <ul>
            <li>🌱 Apoyo a productores responsables</li>
            <li>♻️ Envases reciclables y prácticas sustentables</li>
            <li>🤝 Comercio justo y compromiso social</li>
          </ul>

          <Link to="/nosotros" className="btn btn-outline-light mt-3">
            <FontAwesomeIcon icon={faUsers} /> Conoce más
          </Link>
        </div>

      </div>
    </section>
  );
}

export default CardNosotros;
