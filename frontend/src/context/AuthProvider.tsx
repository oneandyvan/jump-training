import {
  useState,
  useCallback,
  type ReactNode,
} from "react";

import { AuthContext } from "./AuthContext";
import type { User } from "./types.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() => {
    const userJson = localStorage.getItem("user");

    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  });

  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem("authToken");
  });

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  const setToken = useCallback((newToken: string | null) => {
    setTokenState(newToken);

    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setUser, setToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};