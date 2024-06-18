import { createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
}

const AuthContext = createContext<AuthContext | null>(null);

const key = "tanstack.auth.token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken]: [string | null, (token: string | null) => void] =
    useLocalStorage(key);

  const isAuthenticated = !!token;

  const logout = useCallback(async () => {
    setToken(null);
  }, [setToken]);

  const login = useCallback(
    async (token: string | null) => {
      token ? setToken(token) : localStorage.removeItem(key);
    },
    [setToken]
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
