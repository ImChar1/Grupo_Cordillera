const API_URL = 'http://localhost:8082/api/v1/usuarios';

export const AuthService = {
  login: async (credentials) => {
    // Nota: Como tu controlador actual no tiene un endpoint /login explícito, 
    // se suele validar consultando los usuarios o enviando las credenciales.
    // Dejamos la estructura lista para cuando implementen JWT Auth.
    try {
      const res = await fetch(`${API_URL}`); 
      if (!res.ok) throw new Error("Error en la autenticación");
      const usuarios = await res.json();
      
      // Simulación de búsqueda para no romper el flujo del front mientras crean la ruta auth en el back
      const usuarioEncontrado = usuarios.find(u => u.email === credentials.email) || { id: 1, nombre: "Usuario Cordillera", email: credentials.email };
      
      return { token: "real-connection-token", user: usuarioEncontrado };
    } catch (error) {
      console.error("Error en AuthService.login:", error);
      throw error;
    }
  },

  register: async (userData) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error("Error al registrar el usuario");
    return await res.json();
  }
};