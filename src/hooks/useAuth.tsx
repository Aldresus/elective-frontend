import { createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { DecodedAccessToken } from "@/entities/login";
import { jwtDecode } from "jwt-decode";

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

  const [, setUser] = useLocalStorage<DecodedAccessToken>("user");

  const isAuthenticated = !!token;

  const logout = useCallback(async () => {
    setToken(null);
    setUser({} as DecodedAccessToken);
  }, [setToken]);

  const login = useCallback(
    async (token: string | null) => {
      if (!token) {
        setToken(null);
        setUser({} as DecodedAccessToken);

        return;
      }

      setToken(token);

      const decoded = jwtDecode<DecodedAccessToken>(token);

      setUser(decoded);
    },
    [setToken, setUser]
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
