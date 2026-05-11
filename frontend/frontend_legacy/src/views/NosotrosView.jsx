import React from "react";
import "../views/style/Nosotros.css";

export const NosotrosView = () => (
  <div className="nosotros-page">
    <div className="nosotros-card">

      <h2 className="nosotros-title">Sobre Nosotros</h2>

      <div className="nosotros-content-box">

        <p className="nosotros-content">
          Grupo Cordillera está dedicada al sector del retail y la comercialización
          de artículos para el hogar y soluciones tecnológicas a nivel nacional.
        </p>

        <ul className="nosotros-list">
          <li>
            <i className="bi bi-bar-chart-line"></i>
            Apoyamos a la alta gerencia con nuestra Plataforma de Monitoreo Inteligente.
          </li>
          <li>
            <i className="bi bi-gear"></i>
            Promovemos la eficiencia operativa procesando grandes volúmenes de información.
          </li>
          <li>
            <i className="bi bi-people"></i>
            Creemos en conectar a las familias con los mejores productos para su día a día.
          </li>
        </ul>

        <p className="nosotros-content">
          ¿Quieres formar parte de nuestra red corporativa?{" "}
          <a href="mailto:contacto@grupocordillera.cl" className="nosotros-mail">
            contacto@grupocordillera.cl
          </a>
        </p>

      </div>

      {/* Pilares */}
      <div className="row mt-4 text-center">
        <div className="col-md-4"><h3>📊 Inteligencia</h3><p>Monitoreo en tiempo real.</p></div>
        <div className="col-md-4"><h3>⚙️ Eficiencia</h3><p>Operaciones optimizadas.</p></div>
        <div className="col-md-4"><h3>🤝 Compromiso</h3><p>Conectamos familias y productos.</p></div>
      </div>

      <h3 className="nosotros-subtitle">Nuestra presencia</h3>

      <p className="nosotros-city">
        Estamos en: <strong>Principales ciudades del país</strong>
      </p>

      <div className="nosotros-map">
        <iframe
          title="Mapa Grupo Cordillera"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.9!2d-70.6093!3d-33.4172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf5c7b87d0c1%3A0x1f0c5a2e!2sAv.%20Nueva%20Tajamar%20481%2C%20Las%20Condes%2C%20Santiago!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <h4 className="nosotros-subtitle-small">Sucursales de atención</h4>

      <ul className="nosotros-branches">
        <li><b>Santiago (Casa Matriz):</b> Av. Nueva Tajamar 481, Las Condes | Tel: +56 2 2345 6789</li>
        <li><b>Concepción:</b> Barros Arana 1020, Concepción | Tel: +56 41 222 3333</li>
        <li><b>Viña del Mar:</b> Av. Libertad 500, Viña del Mar | Tel: +56 32 211 2222</li>
      </ul>

      <div className="nosotros-footer-box">
        Plataforma Inteligente: Análisis de datos en tiempo real · Toma de decisiones estratégicas · Desempeño organizacional optimizado
      </div>

    </div>
  </div>
);