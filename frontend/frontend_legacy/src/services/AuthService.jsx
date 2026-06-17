// Apuntamos al API Gateway (8080), él se encargará de enrutarlo al ms-usuarios (8082) internamente
const API_URL = 'http://localhost:8080/api/v1/usuarios';

export const AuthService = {
  login: async (credentials) => {
    try {
      // 🔥 Ahora hacemos un POST real a nuestro nuevo endpoint
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      }); 

      // Si el backend nos manda un 401 (Credenciales inválidas), lo capturamos
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Error en la autenticación");
      }
      
      // Si pasa, el backend nos devuelve los datos reales del usuario
      const usuarioEncontrado = await res.json();
      
      // Mantenemos la estructura de token simulado para no romper tu Frontend actual
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