import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="ASSETXCHANGE Logo"
            width={180}
            height={40}
            className="mx-auto"
            priority
          />
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <FiMail className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Check your email
        </h2>
        
        <div className="space-y-4 mb-8">
          <p className="text-gray-600">
            We've sent a verification link to your email address.
            Please check your inbox and click the link to verify your account.
          </p>
          <p className="text-sm text-gray-500">
            If you don't see the email, check your spam folder.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Resend verification email
          </button>

          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Return to login
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link
              href="/contact"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}