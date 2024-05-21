import axios from "axios";
import type { PropsWithChildren } from "react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  accountId: string | null;
  setAccountId: Dispatch<SetStateAction<string | null>>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [accountId, setAccountId] = useState<string | null>(
    localStorage.getItem("accountId")
  );
  const isLoggedIn = useMemo(() => !!token && !!accountId, [token, accountId]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }

    if (accountId) {
      axios.defaults.headers.common["x-account-id"] = accountId;
      localStorage.setItem("accountId", accountId);
    } else {
      delete axios.defaults.headers.common["x-account-id"];
      localStorage.removeItem("accountId");
    }
  }, [token, accountId]);

  const context = {
    token,
    setToken,
    accountId,
    setAccountId,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };

export default AuthProvider;
