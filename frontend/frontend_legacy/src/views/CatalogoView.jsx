import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CatalogoView = ({ productos, addToCart }) => {
  const [categoriaActual, setCategoriaActual] = useState('Todos');

  // Obtenemos las categorías únicas de los productos
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];

  // Filtramos
  const productosFiltrados = categoriaActual === 'Todos' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaActual);

  return (
    <div className="catalog-layout">
      {/* SIDEBAR VERTICAL TOTAL */}
      <aside className="sidebar-full d-none d-md-block">
        <div className="mb-5">
          <h4 className="fw-bold text-success">EcoMarket</h4>
          <p className="small text-muted">Tienda Orgánica</p>
        </div>
        
        <p className="small text-muted text-uppercase fw-bold mb-3" style={{letterSpacing: '1px'}}>Categorías</p>
        <div className="nav flex-column">
          {categorias.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategoriaActual(cat)}
              className={`category-btn ${categoriaActual === cat ? 'active' : ''}`}
            >
              {cat === 'Todos' ? '✨ Todos los productos' : cat}
            </button>
          ))}
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1 p-4 p-md-5 bg-light">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="fw-bold mb-1">{categoriaActual}</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item text-success">Catálogo</li>
                <li className="breadcrumb-item active">{categoriaActual}</li>
              </ol>
            </nav>
          </div>
          <span className="badge bg-white text-dark shadow-sm border px-3 py-2 rounded-pill">
            {productosFiltrados.length} Productos
          </span>
        </div>

        <div className="row g-4">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="col-sm-6 col-xl-4 animate__animated animate__fadeInUp">
              <div className="card card-pro h-100 border-0 shadow-sm p-3">
                <div className="position-relative">
                  <Link to={`/producto/${prod.id}`}>
                    <img 
                      src={prod.imagen} 
                      className="rounded-4 w-100" 
                      style={{height: '240px', objectFit: 'cover'}} 
                      alt={prod.nombre} 
                    />
                  </Link>
                  <div className="position-absolute top-0 end-0 p-2">
                    <span className="badge bg-glass text-dark shadow-sm rounded-pill px-3">
                      ${prod.precio.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="card-body px-0 pb-0 d-flex flex-column">
                  <small className="text-success fw-bold text-uppercase" style={{fontSize: '0.7rem'}}>{prod.categoria}</small>
                  <h6 className="fw-bold mb-3 text-dark">{prod.nombre}</h6>
                  <button 
                    onClick={() => addToCart(prod)} 
                    className="btn btn-pro-success w-100 py-2 mt-auto"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};