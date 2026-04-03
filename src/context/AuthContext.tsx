import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { User, UserRole, AuthContextType } from '../types';
import * as authService from '../services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getCurrentUser(token);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
          console.error('Failed to load user:', error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: userData, token: newToken } = await authService.login(email, password);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      return userData; // Return user data
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
      const response = await authService.register(email, password, name, role);
      
      // If admin registration requires approval, don't set token
      if (response.requiresApproval) {
        return response; // Return response without setting token
      }

      const { user: userData, token: newToken } = response;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      return response; // Return user data
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
