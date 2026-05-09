export const AuthService = {
  login: async (credentials: any) => {
    // Aquí irá el fetch al backend después
    console.log("Login con:", credentials);
    return { token: "fake-jwt-token", user: { id: 1, nombre: "User Test", email: credentials.email } };
  },
  register: async (userData: any) => {
    console.log("Registro de:", userData);
    return { success: true };
  }
};