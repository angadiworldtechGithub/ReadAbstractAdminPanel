import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useLocalStorageState("jwt_token", {
    defaultValue: "",
  });

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
