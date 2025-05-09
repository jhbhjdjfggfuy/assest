import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import UserMenu from './user-menu';
import Image from 'next/image';
import { FiMenu, FiX, FiHome, FiSearch, FiPlusCircle } from 'react-icons/fi';

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 hover:text-accent transition-colors"
          >
            <Image
              src="/logo-white.png"
              alt="ASSETXCHANGE"
              width={40}
              height={40}
              className="w-auto h-8"
              priority
            />
            <span className="font-heading text-2xl font-bold">
              ASSETXCHANGE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/properties" 
              className="flex items-center space-x-2 hover:text-accent transition-colors py-2"
            >
              <FiSearch className="w-5 h-5" />
              <span>Browse</span>
            </Link>
            <Link 
              href="/properties/new" 
              className="flex items-center space-x-2 hover:text-accent transition-colors py-2"
            >
              <FiPlusCircle className="w-5 h-5" />
              <span>List Property</span>
            </Link>
            {session ? (
              <UserMenu userEmail={session.user.email!} />
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth/login" 
                  className="hover:text-accent transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-primary-dark rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Hidden by default */}
      <div className="lg:hidden">
        <div className="px-4 pt-2 pb-4 space-y-2 bg-primary-dark">
          <Link 
            href="/properties" 
            className="flex items-center space-x-2 hover:bg-primary/50 rounded-lg px-3 py-2 transition-colors"
          >
            <FiSearch className="w-5 h-5" />
            <span>Browse</span>
          </Link>
          <Link 
            href="/properties/new" 
            className="flex items-center space-x-2 hover:bg-primary/50 rounded-lg px-3 py-2 transition-colors"
          >
            <FiPlusCircle className="w-5 h-5" />
            <span>List Property</span>
          </Link>
          {session ? (
            <div className="pt-2 border-t border-primary/20">
              <UserMenu userEmail={session.user.email!} />
            </div>
          ) : (
            <div className="pt-2 border-t border-primary/20 space-y-2">
              <Link 
                href="/auth/login" 
                className="block hover:bg-primary/50 rounded-lg px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="block bg-white text-primary px-3 py-2 rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}