import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { NavbarComponent } from './components/NavbarComponent';
import { FooterComponent } from './components/FooterComponent';
import { HomeView } from './views/HomeView';
import { CatalogoView } from './views/CatalogoView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { CarritoView } from './views/CarritoView';
import { CheckoutView } from './views/CheckoutView';
import { ProductoDetailView } from './views/ProductoDetailView';
import { ConfirmacionView } from './views/ConfirmacionView';
import { NosotrosView } from './views/NosotrosView';
import { PerfilView } from './views/PerfilView';
import { HistorialView } from './views/HistorialView';

import { useCartViewModel } from './viewmodels/useCartViewModel';
import { useUserViewModel } from './viewmodels/useUserViewModel';
import { ProductoService } from './services/ProductService'; // ✅ nuevo service

const App = () => {
  const { cart, total, addToCart, removeFromCart, updateCantidad, clearCart } = useCartViewModel();
  const { user, isLogged, login, logout } = useUserViewModel();
  const [globalLoading, setGlobalLoading] = useState(false);
  const [productos, setProductos] = useState([]); // ✅ ahora es estado
  const location = useLocation();

  // ✅ Carga productos desde el backend al montar la app
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await ProductoService.getAll();
        setProductos(data);
      } catch (e) {
        console.error('Error al cargar productos:', e);
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    setGlobalLoading(true);
    const timer = setTimeout(() => setGlobalLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="app-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      <NavbarComponent
        isLogged={isLogged}
        user={user}
        logout={logout}
        cartCount={cartCount}
      />

      {globalLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 9999, opacity: 0.8 }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/catalogo" element={<CatalogoView addToCart={addToCart} productos={productos} />} />
          <Route path="/nosotros" element={<NosotrosView />} />
          <Route path="/producto/:id" element={<ProductoDetailView productos={productos} addToCart={addToCart} />} />
          <Route path="/login" element={!isLogged ? <LoginView onLogin={login} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLogged ? <RegisterView /> : <Navigate to="/" />} />
          <Route path="/perfil" element={isLogged ? <PerfilView /> : <Navigate to="/login" />} />
          <Route path="/historial" element={isLogged ? <HistorialView /> : <Navigate to="/login" />} />
          <Route path="/carrito" element={<CarritoView cart={cart} total={total} removeFromCart={removeFromCart} updateCantidad={updateCantidad} clearCart={clearCart} />} />
          <Route path="/checkout" element={isLogged ? <CheckoutView total={total} cart={cart} clearCart={clearCart} /> : <Navigate to="/login" />} />
          <Route path="/confirmacion" element={<ConfirmacionView />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <FooterComponent />
    </div>
  );
}

export default App;