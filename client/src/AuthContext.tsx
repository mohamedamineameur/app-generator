// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { userService } from "./services/user.service";

interface AuthContextProps {
  isLoggedIn: boolean;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  refreshAuth: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = () => {
    userService().me()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
