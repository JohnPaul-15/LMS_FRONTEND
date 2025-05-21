'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-background-lighter rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-accent-orange opacity-20" />
          </div>
          <h1 className="text-2xl font-bold text-accent-orange mb-4">Something went wrong!</h1>
          <p className="text-gray-400 mb-8">
            We apologize for the inconvenience. Please try again later.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <AlertTriangle className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="text-accent-orange hover:text-accent-yellow transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 