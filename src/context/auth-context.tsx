import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: {
    jwt: string;
    username: string;
    documentId: string;
    email: string;
    isAdmin: boolean;
    id: number;
  } | null;
  login: (user: {
    jwt: string;
    username: string;
    documentId: string;
    email: string;
    isAdmin: boolean;
    id: number;
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
    jwt: string;
    username: string;
    documentId: string;
    email: string;
    isAdmin: boolean;
    id: number;
  }) => {
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
