import React from "react";
import "../Css/Footer.css";

function Footer() {
  return (
    <footer className="footer bg-success text-white pt-4">

      <div className="container">
        <div className="row">

          {/* LOGO + FRASE */}
          <div className="col-md-4 text-center text-md-start mb-3">
            <img
              src="/images/Logo-Oscuro.png"
              alt="EcoMarket"
              className="footer-logo mb-2"
            />
            <p className="footer-text">
              Lo natural para tu hogar, lo mejor para el planeta.
            </p>
          </div>

          {/* CONTACTO */}
          <div className="col-md-4 text-center mb-3">
            <h6 className="footer-title">Contacto</h6>
            <p>
              <i className="bi bi-telephone-fill"></i> +56 9 1234 5678
            </p>
            <p>
              <i className="bi bi-envelope-fill"></i> contacto@ecomarket.cl
            </p>
            <p>
              <i className="bi bi-geo-alt-fill"></i> Santiago, Chile
            </p>
          </div>

          {/* MÉTODOS DE PAGO */}
          <div className="col-md-4 text-center text-md-end mb-3">
            <h6 className="footer-title">Métodos de pago</h6>

            <div className="footer-pagos">
              <i className="bi bi-credit-card"></i>
              <i className="bi bi-credit-card-2-front"></i>
              <i className="bi bi-cash-stack"></i>
            </div>

            <p className="footer-small">
              Crédito · Débito · Efectivo
            </p>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="text-center footer-copy">
          EcoMarket® © 2026 — Todos los derechos reservados
        </div>
      </div>

    </footer>
  );
}

export default Footer;
