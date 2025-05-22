'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthService, { LoginCredentials, ApiError } from '@/lib/api/auth';

// Define the form schema with Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(true);

  // Add this useEffect to test connection on component mount
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        setIsTestingConnection(true);
        const isConnected = await AuthService.testConnection();
        if (!isConnected) {
          setError('Unable to connect to the backend server. Please make sure it is running at http://localhost:8000');
        }
      } catch (err) {
        console.error('Connection test error:', err);
        setError('Failed to connect to the backend server. Please check if it is running at http://localhost:8000');
      } finally {
        setIsTestingConnection(false);
      }
    };

    testBackendConnection();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Attempting login with:', {
        email: data.email,
        remember: data.remember,
        // Don't log the password
      });

      const credentials: LoginCredentials = {
        email: data.email,
        password: data.password,
        remember: data.remember,
      };

      const result = await AuthService.login(credentials);
      console.log('Login successful:', { user: result.user });

      // Store user data
      localStorage.setItem('user', JSON.stringify(result.user));

      // Redirect to dashboard on successful login
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      const apiError = err as ApiError;
      
      // Show more detailed error message
      let errorMessage = apiError.message;
      if (apiError.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check if the backend is running at http://localhost:8000';
      } else if (apiError.errors) {
        // Show field-specific errors if available
        const fieldErrors = Object.entries(apiError.errors)
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('\n');
        errorMessage = fieldErrors || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isTestingConnection && (
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 text-sm">
          Testing connection to backend...
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`input-field w-full ${errors.email ? 'border-red-500' : ''}`}
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`input-field w-full ${errors.password ? 'border-red-500' : ''}`}
          placeholder="Enter your password"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-700 bg-background text-accent-orange focus:ring-accent-orange"
            {...register('remember')}
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-accent-orange hover:text-accent-yellow transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading || isTestingConnection}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Signing in...
          </>
        ) : isTestingConnection ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Testing connection...
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            Sign In
          </>
        )}
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-accent-orange hover:text-accent-yellow transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
} 