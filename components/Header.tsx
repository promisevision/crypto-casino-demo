'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!session) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Crypto Casino Hub
            </Link>

            <div className="flex gap-4">
              <Link
                href="/auth/signin"
                className="px-6 py-2 text-gray-300 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Crypto Casino Hub
          </Link>

          <div className="flex items-center gap-6">
            {/* Admin Link */}
            {session.user.role === 'admin' && (
              <Link
                href="/admin"
                className="text-gray-300 hover:text-white transition flex items-center gap-2"
              >
                <span>👑</span>
                <span>Admin</span>
              </Link>
            )}

            {/* User Avatar Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition"
              >
                {/* Avatar Circle */}
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(session.user.name)}
                </div>
                {/* User Name */}
                <span className="text-white font-medium hidden md:block">
                  {session.user.name}
                </span>
                {/* Dropdown Arrow */}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-dark-light border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-white font-semibold">{session.user.name}</p>
                    <p className="text-gray-400 text-sm truncate">{session.user.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {session.user.role === 'admin' ? '👑 Administrator' : '👤 User'}
                    </p>
                  </div>

                  <div className="py-2">
                    {session.user.role === 'admin' ? (
                      <>
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="mr-2">👑</span>
                          Admin Dashboard
                        </Link>
                        <Link
                          href="/admin/publish"
                          className="block px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <span className="mr-2">📝</span>
                          Publish News
                        </Link>
                      </>
                    ) : (
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="mr-2">👤</span>
                        Profile & Settings
                      </Link>
                    )}

                    <div className="border-t border-white/10 my-2"></div>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-red-300 hover:bg-red-500/10 hover:text-red-200 transition"
                    >
                      <span className="mr-2">🚪</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
