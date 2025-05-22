'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthService, { ApiError } from '@/lib/api/auth';

// Define the form schema with Zod
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions'
  })
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      terms: false,
    },
  });

  // Test backend connection on component mount
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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const { terms, ...registerData } = data;
      const response = await AuthService.register(registerData);

      if (response.status) {
        // Redirect to login page on successful registration
        router.push('/login?registered=true');
      }
    } catch (err) {
      console.error('Registration error:', err);
      const apiError = err as ApiError;
      
      let errorMessage = apiError.message;
      if (apiError.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check if the backend is running at http://localhost:8000';
      } else if (apiError.errors) {
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent-orange mb-2">Create Account</h1>
          <p className="text-gray-400">Join LibDash and start managing your library</p>
        </div>

        <div className="card bg-background-lighter">
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className={`input-field w-full ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your full name"
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

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
                placeholder="Create a password"
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-400">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                className={`input-field w-full ${errors.password_confirmation ? 'border-red-500' : ''}`}
                placeholder="Confirm your password"
                {...register('password_confirmation')}
              />
              {errors.password_confirmation && (
                <p className="mt-1 text-sm text-red-500">{errors.password_confirmation.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-700 bg-background text-accent-orange focus:ring-accent-orange ${errors.terms ? 'border-red-500' : ''}`}
                {...register('terms')}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="text-accent-orange hover:text-accent-yellow transition-colors"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-accent-orange hover:text-accent-yellow transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || isTestingConnection}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : isTestingConnection ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Testing connection...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-accent-orange hover:text-accent-yellow transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 