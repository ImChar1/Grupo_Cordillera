import React from 'react';
import { faShoppingCart, faSearch, faLeaf, faUsers, faUser, faRightToBracket, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from 'react-router-dom';

export const NavbarComponent = ({ isLogged, user, logout, cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/img/logo-claro.png" style={{ width: 100 }} alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* BARRA DE BÚSQUEDA */}
          <form className="search-box me-auto">
            <button className="btn-search" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
              className="search-input"
              type="search"
              placeholder="¿Qué estás buscando?"
            />
          </form>

          <ul className="navbar-nav align-items-center">

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

            {/* CARRITO */}
            <li className="nav-item me-3">
              <Link className="nav-link position-relative" to="/carrito">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* PERFIL DROPDOWN */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                <FontAwesomeIcon icon={faUser} /> {isLogged ? user?.nombre : "Cuenta"}
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
                      <button className="dropdown-item" onClick={handleLogout}>
                        Cerrar Sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        <FontAwesomeIcon icon={faRightToBracket} /> Iniciar Sesión
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/registro">
                        <FontAwesomeIcon icon={faUserCheck} /> Registrarse
                      </Link>
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
};