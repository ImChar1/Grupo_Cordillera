import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './App.css' // Ajusta esto si tus CSS quedaron en otra ubicación
import './index.css'

import NavBarPrincipal from "@/view/components/organisms/navbar.jsx"
import Footer from "@/view/components/organisms/footer.jsx"
import Home from '@/view/pages/Home.jsx' 
import Catalogo from '@/view/pages/Catalogo'
import Carrito from '@/view/pages/Carrito'
import Nosotros from '@/view/pages/Nosotros'
import Producto from './view/pages/Producto'
import Checkout from './view/pages/Checkout'
import Pago from './view/pages/Pago'
import Confirmacion from './view/pages/Confirmacion'
import Perfil from './view/pages/Auth/Perfil' // Ruta corregida
import Historial from './view/pages/Historial'
import Login from './view/pages/Auth/Login'
import Register from "./view/pages/Auth/Register"
import VerBoleta from './view/pages/VerBoleta'
// ViewModels y Servicios
import { useCartViewModel } from './viewmodel/useCartViewModel';
import { useUserViewModel } from './viewmodel/useUserViewModel';
import { ProductService } from './services/ProductService';

const App = () => {
  const { cart, total, addToCart, removeFromCart, updateCantidad, clearCart } = useCartViewModel();
  const { user, isLogged, login, logout } = useUserViewModel();
  const [globalLoading, setGlobalLoading] = useState(false);
  const location = useLocation();

  // Efecto para simular carga al cambiar de ruta
  useEffect(() => {
    setGlobalLoading(true);
    const timer = setTimeout(() => setGlobalLoading(false), 600); // Carga rápida entre páginas
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const productos = ProductService.getProducts();
  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="app-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      <NavbarComponent 
        isLogged={isLogged} 
        user={user} 
        logout={logout} 
        cartCount={cartCount} 
      />
      
      {/* Overlay de carga global */}
      {globalLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 9999, opacity: 0.8 }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <main className="flex-grow-1">
        <Routes>
          {/* Landing Page (Home) */}
          <Route path="/" element={<HomeView />} />
          
          {/* El Catálogo ahora en su propia ruta */}
          <Route path="/catalogo" element={<CatalogoView addToCart={addToCart} productos={productos} />} />
          
          <Route path="/nosotros" element={<NosotrosView />} />
          
          <Route path="/producto/:id" element={
            <ProductoDetailView productos={productos} addToCart={addToCart} />
          } />

          <Route path="/login" element={!isLogged ? <LoginView onLogin={login} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLogged ? <RegisterView /> : <Navigate to="/" />} />
          
          <Route path="/perfil" element={isLogged ? <PerfilView /> : <Navigate to="/login" />} />
          <Route path="/historial" element={isLogged ? <HistorialView /> : <Navigate to="/login" />} />

          <Route path="/carrito" element={
            <CarritoView 
              cart={cart} 
              total={total} 
              removeFromCart={removeFromCart} 
              updateCantidad={updateCantidad} 
              clearCart={clearCart} 
            />
          } />

          <Route path="/checkout" element={
            isLogged ? 
            <CheckoutView total={total} cart={cart} clearCart={clearCart} /> : 
            <Navigate to="/login" />
          } />

          <Route path="/confirmacion" element={<ConfirmacionView />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <FooterComponent />
    </div>
  );
}

export default App;