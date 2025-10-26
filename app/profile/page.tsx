'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchSubscriptionStatus();
    }
  }, [status, router]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setIsSubscribed(data.isSubscribed || false);
    } catch (err) {
      console.error('Failed to fetch subscription status:', err);
    }
  };

  const handleSubscriptionToggle = async () => {
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/profile/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscribe: !isSubscribed,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubscribed(!isSubscribed);
        setMessage(data.message);
        setIsError(false);
      } else {
        setMessage(data.error || 'Failed to update subscription');
        setIsError(true);
      }
    } catch (err) {
      setMessage('Network error. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Profile & Settings</h1>

          {/* Profile Card */}
          <div className="bg-dark-light border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {getInitials(session.user.name)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{session.user.name}</h2>
                <p className="text-gray-400">{session.user.email}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {session.user.role === 'admin' ? '👑 Administrator' : '👤 User'}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-dark-light border border-white/10 rounded-2xl p-8 mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">Newsletter Subscription</h3>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-300 mb-2">
                  Get the latest casino news and reviews delivered to your inbox
                </p>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    isSubscribed
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {isSubscribed ? '✓ Subscribed' : '✗ Not Subscribed'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubscriptionToggle}
                disabled={loading}
                className={`px-6 py-3 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubscribed
                    ? 'bg-red-500/20 border border-red-500/50 text-red-200 hover:bg-red-500/30'
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                }`}
              >
                {loading ? 'Updating...' : isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              </button>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  isError
                    ? 'bg-red-500/20 border border-red-500/50 text-red-200'
                    : 'bg-green-500/20 border border-green-500/50 text-green-200'
                }`}
              >
                {message}
              </div>
            )}

            {isSubscribed && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>📧 You're subscribed!</strong><br />
                  You'll receive emails when new casino reviews are published. You can unsubscribe at any time.
                </p>
              </div>
            )}
          </div>

          {/* Privacy Info */}
          <div className="bg-dark-light border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Privacy & Data</h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">🔒</span>
                <div>
                  <p className="font-semibold mb-1">Your data is secure</p>
                  <p className="text-sm text-gray-400">
                    We use industry-standard encryption to protect your personal information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">📧</span>
                <div>
                  <p className="font-semibold mb-1">Email preferences</p>
                  <p className="text-sm text-gray-400">
                    We only send emails about new casino reviews. No spam, ever.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-primary text-xl">⚖️</span>
                <div>
                  <p className="font-semibold mb-1">GDPR Compliant</p>
                  <p className="text-sm text-gray-400">
                    Your data is processed in accordance with GDPR regulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Read our{' '}
                <a href="/privacy" className="text-primary hover:text-primary-dark underline">
                  Privacy Policy
                </a>
                {' and '}
                <a href="/terms" className="text-primary hover:text-primary-dark underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
