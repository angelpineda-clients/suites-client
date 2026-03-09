import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAxios } from "../axios/AxiosProvider";
import { useUserStore } from "@/store/user";
import { handleLocalStorage } from "@/helpers/handleLocalStorage";
import { IUser } from "@/interfaces/models/IUser";

type AuthContextValue = {
  logout: () => void;
  isAuthenticated: boolean;
  getAccessToken: () => string;
  accessToken: string;
  setAuthTokens: (_accessToken: string, _refreshToken: string) => void;
  isLoading: boolean;
};

type RefreshResponse = {
  auth: {
    access_token: string;
    refresh_token: string;
  };
  user: IUser & {
    roles?: Array<{ name: string } | string>;
  };
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const { setAxiosToken } = useAxios();
  const [accessToken, setAccessToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setUser = useUserStore((state) => state.setUser);

  const setAuthTokens = useCallback(
    (nextAccessToken: string, nextRefreshToken: string) => {
      setAccessToken(nextAccessToken);

      const hasTokens = Boolean(nextAccessToken && nextRefreshToken);

      setIsAuthenticated(hasTokens);

      if (hasTokens) {
        setAxiosToken(nextAccessToken);
      }

      handleLocalStorage.setItem("token", nextRefreshToken);
    },
    [setAxiosToken]
  );

  const getAccessToken = useCallback(() => accessToken, [accessToken]);

  const logout = useCallback(() => {
    handleLocalStorage.removeItem("token");

    setAccessToken("");
    setIsAuthenticated(false);
  }, []);

  const normalizeRoles = useCallback((roles: RefreshResponse["user"]["roles"]): string[] => {
    if (!Array.isArray(roles)) return [];

    return roles
      .map((role) => {
        const currentRole = role as unknown;
        if (typeof currentRole === "string") return currentRole;
        if (isNamedRole(currentRole)) return currentRole.name;
        return "";
      })
      .filter(Boolean);
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      if (accessToken) {
        setIsAuthenticated(true);
        setAxiosToken(accessToken);
        return;
      }

      const storedToken = handleLocalStorage.getItem("token");
      const refreshTokenValue = typeof storedToken === "string" ? storedToken : null;

      if (!refreshTokenValue) {
        setIsAuthenticated(false);
        return;
      }

      const response = await axios.post<RefreshResponse, RefreshResponse>(`/refresh`, {
        refresh_token: refreshTokenValue,
      });

      const { access_token, refresh_token } = response.auth;

      setAuthTokens(access_token, refresh_token);

      setUser({
        ...response.user,
        roles: normalizeRoles(response.user.roles),
      });
    } catch (error: unknown) {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, logout, normalizeRoles, setAuthTokens, setAxiosToken, setUser]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({
      logout,
      setAuthTokens,
      getAccessToken,
      accessToken,
      isAuthenticated,
      isLoading,
    }),
    [accessToken, getAccessToken, isAuthenticated, isLoading, logout, setAuthTokens]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

function isNamedRole(role: unknown): role is { name: string } {
  return (
    role !== null &&
    typeof role === "object" &&
    "name" in role &&
    typeof (role as { name?: unknown }).name === "string"
  );
}
