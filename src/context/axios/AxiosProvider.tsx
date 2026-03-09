import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

type AxiosContextValue = {
  setAxiosToken: (value: string) => void;
};

type ErrorPayload =
  | string
  | Record<string, unknown>
  | {
      errors?: string | Record<string, unknown>;
    };

const AxiosContext = createContext<AxiosContextValue | undefined>(undefined);

interface AxiosProviderProps {
  children: React.ReactNode;
}

export default function AxiosProvider({ children }: AxiosProviderProps) {
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

    const requestInterceptor = axios.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response.data,
      (error: unknown) => {
        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          toast.error("Unexpected error occurred");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const setAxiosToken = useCallback((value: string) => {
    if (value) {
      axios.defaults.headers.common.Authorization = `Bearer ${value}`;
      return;
    }

    delete axios.defaults.headers.common.Authorization;
  }, []);

  const value = useMemo<AxiosContextValue>(
    () => ({
      setAxiosToken,
    }),
    [setAxiosToken]
  );

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
}

export const useAxios = () => {
  const context = useContext(AxiosContext);

  if (!context) {
    throw new Error("useAxios must be used within AxiosProvider");
  }

  return context;
};

function handleAxiosError(error: AxiosError<ErrorPayload>) {
  const payload = error.response?.data;
  const nestedErrors =
    typeof payload === "object" && payload !== null && "errors" in payload
      ? (payload as { errors?: unknown }).errors
      : undefined;

  const errorPayload = nestedErrors ?? payload;

  if (!errorPayload) {
    toast.error("Request failed");
    return;
  }

  if (typeof errorPayload === "string") {
    toast.error(errorPayload);
    return;
  }

  const errorEntries = Object.entries(errorPayload);

  errorEntries.forEach(([field, messages]) => {
    if (Array.isArray(messages)) {
      messages.forEach((message) => {
        if (typeof message === "string") {
          toast.error(`${field}: ${message}`);
        }
      });
      return;
    }

    if (typeof messages === "string") {
      toast.error(`${field}: ${messages}`);
    }
  });
}
