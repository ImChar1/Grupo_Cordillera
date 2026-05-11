import React from "react";
import Bienvenida from "../organismos/bienvenida";
import CarouselPrincipal from "../organismos/carousel";
import CardNosotros from "../moleculas/cardNosotros";
import { Link } from "react-router-dom";
import "../Css/style.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  return (
    <>
      <CarouselPrincipal />

      {/* TEXTO HERO */}
      <div className="home-hero-text text-center py-4">
        <h1>Productos naturales para tu hogar</h1>
        <p>Cuida tu cuerpo y el planeta con EcoMarket</p>

        <Link to="/catalogo" className="btn btn-success mt-2">
          <FontAwesomeIcon icon={faBars} />Ver catálogo
        </Link>
      </div>

      <div className="container">
        <Bienvenida />
        <CardNosotros />
      </div>
    </>
  );
}



export default Home;
