import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserViewModel } from './useUserViewModel';

describe('useUserViewModel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia sin usuario logueado cuando localStorage está vacío', () => {
    const { result } = renderHook(() => useUserViewModel());

    expect(result.current.user).toBeNull();
    expect(result.current.isLogged).toBe(false);
  });

  it('recupera el usuario desde localStorage si ya existía una sesión', () => {
    const usuarioGuardado = { id: 1, username: 'nasty', rol: 'ADMIN' };
    localStorage.setItem('user', JSON.stringify(usuarioGuardado));

    const { result } = renderHook(() => useUserViewModel());

    expect(result.current.user).toEqual(usuarioGuardado);
    expect(result.current.isLogged).toBe(true);
  });

  it('login() guarda el usuario en el estado y en localStorage', () => {
    const { result } = renderHook(() => useUserViewModel());
    const nuevoUsuario = { id: 2, username: 'zahid', rol: 'VENDEDOR' };

    act(() => {
      result.current.login(nuevoUsuario);
    });

    expect(result.current.user).toEqual(nuevoUsuario);
    expect(result.current.isLogged).toBe(true);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(nuevoUsuario);
  });

  it('logout() limpia el estado y localStorage', () => {
    const { result } = renderHook(() => useUserViewModel());

    act(() => {
      result.current.login({ id: 3, username: 'daniel' });
    });
    expect(result.current.isLogged).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isLogged).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
  });
});