// frontend8/LMS_FRONTEND/lib/api/auth.ts

import { API_CONFIG } from './config';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

class AuthService {
  private baseUrl = API_CONFIG.BASE_URL;

  // Test backend connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/status`, {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
        credentials: 'include',
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Helper method to handle API requests
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = new Headers(API_CONFIG.DEFAULT_HEADERS);

    // Add auth token if it exists
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    // Add any additional headers from options
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => headers.append(key, value));
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => headers.append(key, value));
      } else {
        Object.entries(options.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value);
        });
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Important for cookies/session
    });

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
      throw error;
    }

    return data;
  }

  // Register a new user
  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Store token based on remember preference
    if (credentials.remember) {
      localStorage.setItem('token', response.token);
    } else {
      sessionStorage.setItem('token', response.token);
    }

    return response;
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } finally {
      // Clear auth data regardless of API response
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }

  // Get current user
  async getCurrentUser(): Promise<AuthResponse['user']> {
    return this.request('/auth/me');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
  }
}

export default new AuthService();