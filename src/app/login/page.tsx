import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent-orange mb-2">Welcome to LibDash</h1>
          <p className="text-gray-400">Sign in to access your dashboard</p>
        </div>

        <div className="card bg-background-lighter">
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 