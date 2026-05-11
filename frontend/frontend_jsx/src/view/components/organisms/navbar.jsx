import React from 'react';
import { faShoppingCart, faSearch, faLeaf, faUsers, faUser, faRightToBracket, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "../Css/style.css";
import { useCart } from "../global/CarritoContext";
import { useUser } from "../global/UsuarioGlobal";

function NavBarPrincipal() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, isLogged, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cantidadTotal = cart.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <img src="/images/Logo-Claro.png" style={{ width: 150 }} alt="Logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* IZQUIERDA */}
          <div className="nav-left">

            <form className="search-box">
              <button className="btn-search" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                className="search-input"
                type="search"
                placeholder="¿Qué estás buscando?"
              />
            </form>

            <Link to="/carrito" className="cart-link position-relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cantidadTotal > 0 && (
                <span className="badge rounded-pill bg-success">
                  {cantidadTotal}
                </span>
              )}
            </Link>

          </div>

          {/* DERECHA */}
          <ul className="navbar-nav nav-right">

            <li className="nav-item">
              <Link className="nav-link" to="/catalogo">
                <FontAwesomeIcon icon={faLeaf} /> Catálogo
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">
                <FontAwesomeIcon icon={faUsers} /> Nosotros
              </Link>
            </li>

            {/* PERFIL */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                <FontAwesomeIcon icon={faUser} /> {isLogged ? user.nombre : "Cuenta"}
              </span>

              <ul className="dropdown-menu dropdown-menu-end">
                {isLogged ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/perfil">Perfil</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/historial">Boleta</Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/Login"><FontAwesomeIcon icon={faRightToBracket} /> Iniciar Sesión</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/Registro"><FontAwesomeIcon icon={faUserCheck} /> Registrarse</Link>
                    </li>
                  </>
                )}
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarPrincipal;
