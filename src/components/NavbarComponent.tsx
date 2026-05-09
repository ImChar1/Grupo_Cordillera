import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isLogged: boolean;
  user: any;
  logout: () => void;
  cartCount: number;
}

export const NavbarComponent: React.FC<NavbarProps> = ({ isLogged, user, logout, cartCount }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-success" style={{ fontSize: '1.5rem' }} to="/">
          🌿 EcoMarket
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Catálogo</Link>
            </li>
            
            <li className="nav-item me-3">
              <Link className="nav-link position-relative" to="/carrito">
                <i className="bi bi-cart3" style={{ fontSize: '1.2rem' }}></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {isLogged ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3 small">Hola, <strong>{user?.nombre}</strong></span>
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm rounded-pill px-3">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-success btn-sm rounded-pill px-4" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};