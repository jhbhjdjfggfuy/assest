import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterForm from './register-form';
import Link from 'next/link';
import Image from 'next/image';

export default async function RegisterPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Join ASSETXCHANGE
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Create an account to start trading assets securely
            </p>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center text-sm text-gray-600">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary hover:text-primary/80 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:text-primary/80 font-medium">
              Privacy Policy
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Features and Benefits */}
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-8">
        <div className="max-w-md text-white">
          <h3 className="text-3xl font-bold mb-8">
            Why Choose ASSETXCHANGE?
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Secure Trading</h4>
                <p className="text-white/80">
                  Advanced security measures to protect your assets and transactions
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Easy Transactions</h4>
                <p className="text-white/80">
                  Streamlined process for buying, selling, and trading assets
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
                <p className="text-white/80">
                  Round-the-clock customer support to assist you with any queries
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Image
              src="/trading-illustration.svg"
              alt="Trading Illustration"
              width={400}
              height={300}
              className="mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}