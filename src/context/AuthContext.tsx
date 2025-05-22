'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService, { LoginCredentials } from '@/lib/api/auth';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; password_confirmation: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to safely access localStorage
const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await AuthService.login(credentials);
      if (response.user) {
        setUser(response.user);
        // Store in localStorage only on client side
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token || '');
        }
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: { name: string; email: string; password: string; password_confirmation: string }) => {
    try {
      const response = await AuthService.register(userData);
      if (response.user) {
        setUser(response.user);
        // Store in localStorage only on client side
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token || '');
        }
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      // Clear localStorage only on client side
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 