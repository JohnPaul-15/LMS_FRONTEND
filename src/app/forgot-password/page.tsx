import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent-orange mb-2">Forgot Password</h1>
          <p className="text-gray-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <div className="card bg-background-lighter">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="input-field w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <Link
                href="/login"
                className="text-accent-orange hover:text-accent-yellow transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Success Message (hidden by default) */}
        <div className="mt-4 p-4 bg-green-500/10 text-green-500 rounded-lg text-center hidden">
          <p className="font-medium">Reset link sent!</p>
          <p className="text-sm mt-1">
            Check your email for instructions to reset your password
          </p>
        </div>
      </div>
    </div>
  );
} 