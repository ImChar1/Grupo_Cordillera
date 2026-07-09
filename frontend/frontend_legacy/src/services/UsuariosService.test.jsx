import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UsuariosService } from './UsuariosService';

const API_URL = '/api/v1/usuarios';

describe('UsuariosService', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('getActivos', () => {
    it('devuelve la lista de usuarios activos', async () => {
      const usuarios = [{ id: 1, username: 'carlos' }, { id: 2, username: 'ana' }];
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => usuarios });

      const resultado = await UsuariosService.getActivos();

      expect(global.fetch).toHaveBeenCalledWith(API_URL);
      expect(resultado).toEqual(usuarios);
    });

    it('lanza error si la petición falla', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(UsuariosService.getActivos()).rejects.toThrow(
        'Error al obtener los usuarios activos.'
      );
    });
  });

  describe('getById', () => {
    it('devuelve el usuario correspondiente al id', async () => {
      const usuario = { id: 5, username: 'zahid' };
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => usuario });

      const resultado = await UsuariosService.getById(5);

      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/5`);
      expect(resultado).toEqual(usuario);
    });

    it('lanza error con el id incluido en el mensaje si no existe', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(UsuariosService.getById(999)).rejects.toThrow(
        'Usuario con id 999 no encontrado.'
      );
    });
  });

  describe('crear', () => {
    it('envía el nuevo usuario por POST y devuelve la respuesta', async () => {
      const nuevoUsuario = { username: 'nasty', email: 'nasty@cordillera.cl' };
      const usuarioCreado = { id: 10, ...nuevoUsuario };
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => usuarioCreado });

      const resultado = await UsuariosService.crear(nuevoUsuario);

      expect(global.fetch).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });
      expect(resultado).toEqual(usuarioCreado);
    });

    it('usa el mensaje del JSON de error del backend cuando falla (ej: email duplicado)', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'El correo ya está registrado' }),
      });

      await expect(UsuariosService.crear({ email: 'repetido@cordillera.cl' })).rejects.toThrow(
        'El correo ya está registrado'
      );
    });

    it('cae a texto plano si el backend no devuelve JSON válido', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => { throw new Error('no es JSON'); },
        text: async () => 'Error interno del servidor',
      });

      await expect(UsuariosService.crear({})).rejects.toThrow('Error interno del servidor');
    });
  });

  describe('actualizar', () => {
    it('envía el usuario actualizado por PUT', async () => {
      const usuarioActualizado = { id: 3, nombreCompleto: 'Nuevo Nombre' };
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => usuarioActualizado });

      const resultado = await UsuariosService.actualizar(usuarioActualizado);

      expect(global.fetch).toHaveBeenCalledWith(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioActualizado),
      });
      expect(resultado).toEqual(usuarioActualizado);
    });

    it('lanza el mensaje del backend cuando la actualización falla', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Usuario no encontrado' }),
      });

      await expect(UsuariosService.actualizar({ id: 999 })).rejects.toThrow(
        'Usuario no encontrado'
      );
    });
  });

  describe('desactivar', () => {
    it('hace DELETE y devuelve el texto de confirmación del backend', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true, text: async () => 'Usuario desactivado correctamente.' });

      const resultado = await UsuariosService.desactivar(7);

      expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/7`, { method: 'DELETE' });
      expect(resultado).toBe('Usuario desactivado correctamente.');
    });

    it('lanza error con el id incluido cuando falla la desactivación', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(UsuariosService.desactivar(7)).rejects.toThrow(
        'Error al desactivar el usuario con id 7.'
      );
    });
  });

  describe('getEmpleadosPorSucursal', () => {
    it('codifica correctamente la sucursal en la URL', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

      await UsuariosService.getEmpleadosPorSucursal('Santiago Centro');

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/sucursal/${encodeURIComponent('Santiago Centro')}`
      );
    });

    it('lanza error con la sucursal en el mensaje si falla', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(UsuariosService.getEmpleadosPorSucursal('Casa Matriz')).rejects.toThrow(
        'Error al obtener empleados de la sucursal: Casa Matriz'
      );
    });
  });

  describe('getEmpleadosPorSucursalYRol', () => {
    it('codifica sucursal y rol correctamente en la URL', async () => {
      global.fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

      await UsuariosService.getEmpleadosPorSucursalYRol('Santiago Centro', 'CAJERO');

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/sucursal/${encodeURIComponent('Santiago Centro')}/rol/${encodeURIComponent('CAJERO')}`
      );
    });

    it('lanza error con sucursal y rol en el mensaje si falla', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      await expect(
        UsuariosService.getEmpleadosPorSucursalYRol('Casa Matriz', 'GERENTE')
      ).rejects.toThrow('Error al filtrar por sucursal "Casa Matriz" y rol "GERENTE".');
    });
  });
});