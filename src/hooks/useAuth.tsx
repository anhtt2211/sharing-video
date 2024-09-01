'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import { ITokenPayload } from '@/interfaces/auth.interface';

// Define the shape of the user context value
interface AuthContextType {
  user: ITokenPayload | null;
  setUser: (user: ITokenPayload | null) => void;
}

// Create the context with a null default value
export const AuthContext = createContext<AuthContextType | null>(null);

// The AuthProvider component that wraps around the part of our app that needs access to auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ITokenPayload | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
