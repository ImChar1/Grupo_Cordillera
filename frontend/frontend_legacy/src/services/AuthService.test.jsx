import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './AuthService';

const API_URL = 'http://localhost:8080/api/v1/usuarios';

describe('AuthService', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('login', () => {
    it('devuelve token simulado y el usuario tal como lo entrega el backend', async () => {
      const usuarioBackend = {
        id: 1,
        username: 'carlos123',
        email: 'carlos@cordillera.cl',
        rol: 'VENDEDOR',
        activo: true,
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => usuarioBackend,
      });

      const resultado = await AuthService.login({
        email: 'carlos@cordillera.cl',
        password: '12345',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'carlos@cordillera.cl', password: '12345' }),
        }
      );

      expect(resultado.token).toBe('real-connection-token');
      expect(resultado.user).toEqual(usuarioBackend);
    });

    it('lanza el error tal cual lo entrega el backend cuando las credenciales son inválidas', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        text: async () => 'Credenciales inválidas.',
      });

      await expect(
        AuthService.login({ email: 'nadie@cordillera.cl', password: 'mala' })
      ).rejects.toThrow('Credenciales inválidas.');
    });

    it('usa el mensaje por defecto "Error en la autenticación" si el backend no entrega texto', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        text: async () => '',
      });

      await expect(
        AuthService.login({ email: 'x@x.cl', password: 'x' })
      ).rejects.toThrow('Error en la autenticación');
    });

    it('re-lanza el error si fetch falla por red (ej: backend caído)', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      await expect(
        AuthService.login({ email: 'x@x.cl', password: 'x' })
      ).rejects.toThrow('Failed to fetch');
    });
  });

  describe('register', () => {
    it('envía el payload tal cual fue recibido, sin transformarlo', async () => {
      const userData = {
        username: 'nasty',
        email: 'nasty@cordillera.cl',
        password: 'claveSecreta123',
        nombreCompleto: 'Nasty Astudillo',
      };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 5, ...userData }),
      });

      await AuthService.register(userData);

      expect(global.fetch).toHaveBeenCalledWith(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    });

    it('lanza "Error al registrar el usuario" cuando el backend responde con error', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        AuthService.register({ email: 'repetido@cordillera.cl', password: '123' })
      ).rejects.toThrow('Error al registrar el usuario');
    });
  });
});