import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-3xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent-orange mb-2">Terms of Service</h1>
          <p className="text-gray-400">
            Last updated: March 10, 2024
          </p>
        </div>

        <div className="card bg-background-lighter space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using LibDash, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing LibDash.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily use LibDash for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained in LibDash</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-gray-300 mb-4">
              As a user of LibDash, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide accurate and complete information when registering</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Use the system in compliance with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              Your use of LibDash is also governed by our{' '}
              <Link
                href="/privacy"
                className="text-accent-orange hover:text-accent-yellow transition-colors"
              >
                Privacy Policy
              </Link>
              , which outlines how we collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The materials on LibDash are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-800">
            <Link
              href="/register"
              className="btn-primary inline-flex items-center"
            >
              Back to Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 