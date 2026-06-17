// Apuntamos al API Gateway (8080), él se encargará de enrutarlo al ms-usuarios (8082) internamente
const API_URL = 'http://localhost:8080/api/v1/usuarios';

export const AuthService = {
  login: async (credentials) => {
    try {
      const res = await fetch(API_URL); 
      if (!res.ok) throw new Error("Error en la autenticación");
      const usuarios = await res.json();
      
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