import { useState, useEffect } from 'react';

export const useCartViewModel = () => {
  const [cart, setCart] = useState([]);

  // Cargar carrito al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === producto.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Base siempre empieza en 1
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  const updateCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return removeFromCart(id);
    setCart(prevCart =>
      prevCart.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item)
    );
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // TOTAL SEGURO (Evita el NaN forzando números)
  const total = cart.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cant = Number(item.cantidad) || 0;
    return acc + (precio * cant);
  }, 0);

  return { cart, total, addToCart, removeFromCart, updateCantidad, clearCart };
};