import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartViewModel } from './useCartViewModel';

const producto1 = { id: 1, nombre: 'Lavadora', precio: 100000 };
const producto2 = { id: 2, nombre: 'Televisor', precio: 250000 };

describe('useCartViewModel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia vacío y con total 0 cuando no hay carrito guardado', () => {
    const { result } = renderHook(() => useCartViewModel());

    expect(result.current.cart).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it('recupera el carrito guardado en localStorage al montar', () => {
    localStorage.setItem('cart', JSON.stringify([{ ...producto1, cantidad: 2 }]));

    const { result } = renderHook(() => useCartViewModel());

    expect(result.current.cart).toEqual([{ ...producto1, cantidad: 2 }]);
  });

  it('addToCart agrega un producto nuevo con cantidad 1', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1);
    });

    expect(result.current.cart).toEqual([{ ...producto1, cantidad: 1 }]);
  });

  it('addToCart incrementa la cantidad si el producto ya existe en el carrito', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1);
    });
    act(() => {
      result.current.addToCart(producto1);
    });

    expect(result.current.cart).toEqual([{ ...producto1, cantidad: 2 }]);
  });

  it('updateCantidad cambia la cantidad de un producto existente', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1);
    });
    act(() => {
      result.current.updateCantidad(producto1.id, 5);
    });

    expect(result.current.cart[0].cantidad).toBe(5);
  });

  it('updateCantidad elimina el producto si la nueva cantidad es menor a 1', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1);
    });
    act(() => {
      result.current.updateCantidad(producto1.id, 0);
    });

    expect(result.current.cart).toEqual([]);
  });

  it('removeFromCart elimina solo el producto indicado', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1);
      result.current.addToCart(producto2);
    });
    act(() => {
      result.current.removeFromCart(producto1.id);
    });

    expect(result.current.cart).toEqual([{ ...producto2, cantidad: 1 }]);
  });

  it('clearCart deja el carrito vacío', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1);
      result.current.addToCart(producto2);
    });
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
  });

  it('total suma precio * cantidad de todos los productos', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1); // 100000 x1
      result.current.addToCart(producto2); // 250000 x1
      result.current.updateCantidad(producto1.id, 3); // 100000 x3
    });

    // (100000 * 3) + (250000 * 1) = 550000
    expect(result.current.total).toBe(550000);
  });

  it('total no se rompe (NaN) si precio o cantidad vienen como texto o undefined', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart({ id: 3, nombre: 'Producto raro', precio: '1000' });
    });

    expect(result.current.total).toBe(1000);
    expect(Number.isNaN(result.current.total)).toBe(false);
  });

  it('persiste el carrito en localStorage después de cada cambio', () => {
    const { result } = renderHook(() => useCartViewModel());

    act(() => {
      result.current.addToCart(producto1);
    });

    const guardado = JSON.parse(localStorage.getItem('cart'));
    expect(guardado).toEqual([{ ...producto1, cantidad: 1 }]);
  });
});