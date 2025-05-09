'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiUser, FiSettings, FiHelpCircle, FiLogOut, FiChevronDown } from 'react-icons/fi';

export default function UserMenu({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors">
          <FiUser className="w-5 h-5 mr-2" />
          <span className="truncate max-w-[150px]">{userEmail}</span>
          <FiChevronDown className="w-4 h-4 ml-2" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard"
                  className={`${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  } group flex items-center rounded-md px-3 py-2 text-sm transition-colors`}
                >
                  <FiSettings className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={`${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  } group flex items-center rounded-md px-3 py-2 text-sm transition-colors`}
                >
                  <FiUser className="w-5 h-5 mr-3" />
                  Profile Settings
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/help"
                  className={`${
                    active ? 'bg-primary text-white' : 'text-gray-900'
                  } group flex items-center rounded-md px-3 py-2 text-sm transition-colors`}
                >
                  <FiHelpCircle className="w-5 h-5 mr-3" />
                  Help Center
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-red-500 text-white' : 'text-red-500'
                  } group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors`}
                >
                  <FiLogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}