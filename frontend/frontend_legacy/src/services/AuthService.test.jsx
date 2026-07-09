import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './AuthService';

describe('AuthService', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('login', () => {
    it('devuelve token y usuario "safe" (sin password) cuando las credenciales son correctas', async () => {
      const usuarioBackend = {
        id: 1,
        username: 'carlos123',
        nombreCompleto: 'Carlos Pérez',
        email: 'carlos@cordillera.cl',
        rut: '11.111.111-1',
        rol: 'VENDEDOR',
        sucursal: 'Casa Matriz',
        activo: true,
        password: 'hash_no_deberia_llegar_al_front',
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
        '/api/v1/usuarios/login',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'carlos@cordillera.cl', password: '12345' }),
        })
      );

      expect(resultado.token).toBe('session-token');
      expect(resultado.user).toEqual({
        id: 1,
        username: 'carlos123',
        nombreCompleto: 'Carlos Pérez',
        email: 'carlos@cordillera.cl',
        rut: '11.111.111-1',
        rol: 'VENDEDOR',
        sucursal: 'Casa Matriz',
        activo: true,
      });

      // El objeto "safe" nunca debe filtrar la contraseña al front
      expect(resultado.user.password).toBeUndefined();
    });

    it('lanza un error con el mensaje del backend cuando las credenciales son inválidas', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        text: async () => 'Credenciales inválidas.',
      });

      await expect(
        AuthService.login({ email: 'nadie@cordillera.cl', password: 'mala' })
      ).rejects.toThrow('Credenciales inválidas.');
    });

    it('usa un mensaje por defecto si el backend no entrega texto de error', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        text: async () => '',
      });

      await expect(
        AuthService.login({ email: 'x@x.cl', password: 'x' })
      ).rejects.toThrow('Credenciales inválidas. Verifica tu correo y contraseña.');
    });
  });

  describe('register', () => {
    it('genera un username único a partir del email y envía el payload correcto', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 5, username: 'nasty_12345' }),
      });

      await AuthService.register({
        email: 'nasty@cordillera.cl',
        password: 'claveSecreta123',
        nombreCompleto: 'Nasty Astudillo',
      });

      const [url, options] = global.fetch.mock.calls[0];
      const bodyEnviado = JSON.parse(options.body);

      expect(url).toBe('/api/v1/usuarios');
      expect(bodyEnviado.username).toMatch(/^nasty_\d{5}$/);
      expect(bodyEnviado.rol).toBe('TRABAJADOR'); // valor por defecto
      expect(bodyEnviado.sucursal).toBe('Casa Matriz'); // valor por defecto
      expect(bodyEnviado.activo).toBe(true);
    });

    it('usa el mensaje de error del JSON del backend cuando el registro falla (ej: email duplicado)', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'El correo electrónico ya está registrado' }),
      });

      await expect(
        AuthService.register({ email: 'repetido@cordillera.cl', password: '123' })
      ).rejects.toThrow('El correo electrónico ya está registrado');
    });

    it('usa el texto plano de la respuesta si el backend no devuelve JSON válido', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => { throw new Error('no es JSON'); },
        text: async () => 'Error interno del servidor',
      });

      await expect(
        AuthService.register({ email: 'x@x.cl', password: '123' })
      ).rejects.toThrow('Error interno del servidor');
    });
  });
});