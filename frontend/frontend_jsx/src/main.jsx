import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

// Proveedores de Contexto Global
import { CartProvider } from "./global/CarritoContext";
import { UserProvider } from "./global/UsuarioGlobal";
import { OrderProvider } from "./global/OrderGlobal";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* El orden de los proveedores es correcto */}
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);