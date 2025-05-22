'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import AuthService, { AuthResponse, LoginCredentials, ApiError } from '@/lib/api/auth';

// Define the auth context type
type AuthContextType = {
  user: AuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (userData: { name: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  // Register function (handles both API call and state updates)
  const register = async (userData: { name: string; email: string; password: string; password_confirmation: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.register(userData);
      if (response.status) {
        await login({ email: userData.email, password: userData.password });
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function (similar to register)
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.login(credentials);
      setUser(response.user);
      if (credentials.remember) {
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(response.user));
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Value exposed to consumers
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for easy access to the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
}