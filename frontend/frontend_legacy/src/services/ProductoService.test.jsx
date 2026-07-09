import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductoService } from './ProductoService';

const API_URL = '/api/v1/productos';

describe('ProductoService', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('getAll', () => {
    it('devuelve la lista de productos', async () => {
      const productos = [{ id: 1, nombre: 'Lavadora' }, { id: 2, nombre: 'Sofá' }];
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => productos });

      const resultado = await ProductoService.getAll();

      expect(global.fetch).toHaveBeenCalledWith(API_URL);
      expect(resultado).toEqual(productos);
    });

    it('lanza error si la petición falla', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(ProductoService.getAll()).rejects.toThrow('Error fetching productos');
    });
  });

  describe('getById', () => {
    it('devuelve el producto correspondiente al id', async () => {
      const producto = { id: 3, nombre: 'Televisor' };
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => producto });

      const resultado = await ProductoService.getById(3);

      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/3`);
      expect(resultado).toEqual(producto);
    });

    it('lanza error si el producto no existe', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(ProductoService.getById(999)).rejects.toThrow('Error fetching producto');
    });
  });

  describe('create', () => {
    it('envía el nuevo producto por POST y devuelve la respuesta', async () => {
      const nuevoProducto = { nombre: 'Refrigerador', sku: 'LB-REF-001' };
      const productoCreado = { id: 20, ...nuevoProducto };
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => productoCreado });

      const resultado = await ProductoService.create(nuevoProducto);

      expect(global.fetch).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      });
      expect(resultado).toEqual(productoCreado);
    });

    it('lanza error si la creación falla (ej: SKU duplicado)', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(ProductoService.create({ sku: 'REPETIDO' })).rejects.toThrow(
        'Error creando producto'
      );
    });
  });

  describe('update', () => {
    it('envía el producto actualizado por PUT', async () => {
      const productoActualizado = { id: 4, nombre: 'Nombre Nuevo' };
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => productoActualizado });

      const resultado = await ProductoService.update(productoActualizado);

      expect(global.fetch).toHaveBeenCalledWith(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado),
      });
      expect(resultado).toEqual(productoActualizado);
    });

    it('lanza error si la actualización falla', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(ProductoService.update({ id: 999 })).rejects.toThrow(
        'Error actualizando producto'
      );
    });
  });

  describe('delete', () => {
    it('hace DELETE y devuelve el texto de confirmación del backend', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true, text: async () => 'Producto desactivado' });

      const resultado = await ProductoService.delete(8);

      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/8`, { method: 'DELETE' });
      expect(resultado).toBe('Producto desactivado');
    });

    it('lanza error si la eliminación falla', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(ProductoService.delete(8)).rejects.toThrow('Error eliminando producto');
    });
  });
});