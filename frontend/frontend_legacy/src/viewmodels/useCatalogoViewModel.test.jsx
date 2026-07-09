import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useCatalogoViewModel } from './useCatalogoViewModel';
import { ProductoService } from '../services/ProductoService';

vi.mock('../services/ProductoService', () => ({
  ProductoService: {
    getAll: vi.fn(),
  },
}));

const productosMock = [
  { id: 1, nombre: 'Lavadora', categoria: 'Línea Blanca', precio: 300000 },
  { id: 2, nombre: 'Sofá', categoria: 'Muebles', precio: 500000 },
  { id: 3, nombre: 'Secadora', categoria: 'Línea Blanca', precio: 200000 },
];

describe('useCatalogoViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('inicia en loading=true y carga los productos del backend', async () => {
    ProductoService.getAll.mockResolvedValueOnce(productosMock);

    const { result } = renderHook(() => useCatalogoViewModel());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.productosFiltrados).toEqual(productosMock);
    expect(result.current.error).toBeNull();
  });

  it('setea un mensaje de error si ProductoService.getAll falla', async () => {
    ProductoService.getAll.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCatalogoViewModel());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Error al cargar productos');
    expect(result.current.productosFiltrados).toEqual([]);
  });

  it('filtra por categoría cuando categoriaActiva no es "todos"', async () => {
    ProductoService.getAll.mockResolvedValueOnce(productosMock);
    const { result } = renderHook(() => useCatalogoViewModel());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setCategoriaActiva('Línea Blanca');
    });

    expect(result.current.productosFiltrados).toEqual([
      productosMock[0],
      productosMock[2],
    ]);
  });

  it('ordena de menor a mayor precio cuando ordenPrecio es "asc"', async () => {
    ProductoService.getAll.mockResolvedValueOnce(productosMock);
    const { result } = renderHook(() => useCatalogoViewModel());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setOrdenPrecio('asc');
    });

    expect(result.current.productosFiltrados.map(p => p.id)).toEqual([3, 1, 2]);
  });

  it('ordena de mayor a menor precio cuando ordenPrecio es "desc"', async () => {
    ProductoService.getAll.mockResolvedValueOnce(productosMock);
    const { result } = renderHook(() => useCatalogoViewModel());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setOrdenPrecio('desc');
    });

    expect(result.current.productosFiltrados.map(p => p.id)).toEqual([2, 1, 3]);
  });

  it('combina filtro de categoría + orden de precio a la vez', async () => {
    ProductoService.getAll.mockResolvedValueOnce(productosMock);
    const { result } = renderHook(() => useCatalogoViewModel());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setCategoriaActiva('Línea Blanca');
      result.current.setOrdenPrecio('desc');
    });

    // Solo Línea Blanca (Lavadora 300k, Secadora 200k), ordenados desc
    expect(result.current.productosFiltrados.map(p => p.id)).toEqual([1, 3]);
  });
});