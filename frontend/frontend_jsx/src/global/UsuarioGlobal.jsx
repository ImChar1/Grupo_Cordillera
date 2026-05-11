import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: ""
  });

  const [isLogged, setIsLogged] = useState(false);

  // Mantener sesión
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setIsLogged(true);
    }
  }, []);

  const login = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    setIsLogged(true);
  };

  const logout = () => {
    setUser({
      nombre: "",
      email: "",
      direccion: "",
      telefono: ""
    });
    setIsLogged(false);
    localStorage.removeItem("auth");
  };

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, isLogged, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
