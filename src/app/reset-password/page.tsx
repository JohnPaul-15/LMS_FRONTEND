import { KeyRound } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent-orange mb-2">Reset Password</h1>
          <p className="text-gray-400">
            Enter your new password below
          </p>
        </div>

        <div className="card bg-background-lighter">
          <form className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                id="password"
                type="password"
                className="input-field w-full"
                placeholder="Enter new password"
                required
              />
              <p className="mt-1 text-sm text-gray-400">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="input-field w-full"
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <KeyRound className="w-5 h-5" />
              Reset Password
            </button>
          </form>
        </div>

        {/* Success Message (hidden by default) */}
        <div className="mt-4 p-4 bg-green-500/10 text-green-500 rounded-lg text-center hidden">
          <p className="font-medium">Password reset successful!</p>
          <p className="text-sm mt-1">
            You can now sign in with your new password
          </p>
        </div>
      </div>
    </div>
  );
} 