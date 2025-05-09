import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './login-form';
import Link from 'next/link';
import Image from 'next/image';

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
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
              Welcome Back
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Sign in to continue to ASSETXCHANGE
            </p>
          </div>

          <LoginForm />

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <Image
                  src="/google-icon.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <Image
                  src="/microsoft-icon.png"
                  alt="Microsoft"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Microsoft
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image and Text */}
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-8">
        <div className="max-w-md text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Trade Assets with Confidence
          </h3>
          <p className="text-lg opacity-90">
            Join thousands of users who trust ASSETXCHANGE for secure and reliable asset trading.
          </p>
          <div className="mt-8">
            <Image
              src="/trading-illustration.svg"
              alt="Trading Illustration"
              width={400}
              height={400}
              className="mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}