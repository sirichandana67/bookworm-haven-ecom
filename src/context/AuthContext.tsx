
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => false,
  register: () => false,
  logout: () => {},
});

// Mock users for demo purposes
const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" as const },
  { id: "2", name: "Regular User", email: "user@example.com", password: "user123", role: "user" as const },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("bookworm_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        localStorage.removeItem("bookworm_user");
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Create a safe user object (without password)
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      
      setCurrentUser(safeUser);
      localStorage.setItem("bookworm_user", JSON.stringify(safeUser));
      return true;
    }
    
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }

    // In a real app, this would make an API request to create a new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      password,
      role: "user" as const,
    };

    // Update the mock users (in a real app, this would be done on the server)
    mockUsers.push(newUser);

    // Create a safe user object (without password)
    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    setCurrentUser(safeUser);
    localStorage.setItem("bookworm_user", JSON.stringify(safeUser));
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("bookworm_user");
  };

  const isAuthenticated = currentUser !== null;
  const isAdmin = currentUser?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
