import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-3xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent-orange mb-2">Privacy Policy</h1>
          <p className="text-gray-400">
            Last updated: March 10, 2024
          </p>
        </div>

        <div className="card bg-background-lighter space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Library usage data</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you important updates and notifications</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Other users of the system as necessary for library operations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-gray-300 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a
                href="mailto:privacy@libdash.com"
                className="text-accent-orange hover:text-accent-yellow transition-colors"
              >
                privacy@libdash.com
              </a>
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