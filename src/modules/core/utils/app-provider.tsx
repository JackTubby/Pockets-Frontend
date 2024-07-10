import axios, { AxiosInstance } from "axios";
import type { PropsWithChildren } from "react";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

// axios default configurations
axios.defaults.baseURL = import.meta.env.DEBUG ? "http://localhost:3002" : import.meta.env.VITE_API_ENDPOINT;
axios.defaults.timeout = 600000;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

interface AppContextType {
  api: AxiosInstance;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  accountId: string | null;
  setAccountId: Dispatch<SetStateAction<string | null>>;
  isLoggedIn: boolean;
}

// AppContext to create a context for the application to store the token, setToken, accountId, setAccountId, and isLoggedIn
const AppContext = createContext<AppContextType | undefined>(undefined);

// AppProvider component to wrap the entire application with the context provider and axios instance configuration
// This will allow the entire application to access the axios instance and the context values
// The context values are the token, setToken, accountId, setAccountId, and isLoggedIn
const AppProvider = (props: PropsWithChildren) => {
  const { children } = props; // children are the components wrapped by the AppProvider

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [accountId, setAccountId] = useState<string | null>(localStorage.getItem("accountId"));
  const isLoggedIn = useMemo(() => !!token && !!accountId, [token, accountId]);

  // Memoize setters to prevent unnecessary re-renders
  const handleSetToken = useCallback((token: string | null) => {
    setToken(token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, []);

  const handleSetAccountId = useCallback((accountId: string | null) => {
    setAccountId(accountId);
    if (accountId) {
      axios.defaults.headers.common["x-account-id"] = accountId;
      localStorage.setItem("accountId", accountId);
    } else {
      delete axios.defaults.headers.common["x-account-id"];
      localStorage.removeItem("accountId");
    }
  }, []);

  useEffect(() => {
    handleSetToken(token);
    handleSetAccountId(accountId);
  }, [token, accountId, handleSetToken, handleSetAccountId]);

  const context = {
    api: axios,
    token,
    setToken: handleSetToken,
    accountId,
    setAccountId: handleSetAccountId,
    isLoggedIn,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, axios, useAppContext };

export default AppProvider;
