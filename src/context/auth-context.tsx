import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: {
    id: string;
    nome: string;
    email: string;
    tipo: "admin" | "cliente";
  } | null;
  login: (user: {
    id: string;
    nome: string;
    email: string;
    tipo: "admin" | "cliente";
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextProps["user"]>(null);

  useEffect(() => {
    const dadosUsuario = localStorage.getItem("usuario");
    if (dadosUsuario) {
      setUser(JSON.parse(dadosUsuario));
    }
  }, []);

  const login = (user: {
    id: string;
    nome: string;
    email: string;
    tipo: "admin" | "cliente";
  }) => {
    console.log(user);
    localStorage.setItem("usuario", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
