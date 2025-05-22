import axios, { AxiosInstance } from 'axios';

// Create an axios instance with default config
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true, // This is important for handling cookies/sessions
  });

  // Add a request interceptor to include the auth token
  client.interceptors.request.use(
    (config) => {
      // Get the token from localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      // If token exists, add it to the headers
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle common errors
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle specific error cases
        switch (error.response.status) {
          case 401:
            // Unauthorized - clear token and redirect to login
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
            break;
          case 403:
            // Forbidden - redirect to home
            if (typeof window !== 'undefined') {
              window.location.href = '/';
            }
            break;
          case 422:
            // Validation error - handled by the component
            break;
          default:
            // Other errors - handled by the component
            break;
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

// Create and export a single instance
export const apiClient = createApiClient(); 