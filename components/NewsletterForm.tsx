'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, consent }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || 'Something went wrong');
      } else {
        setIsError(false);
        setMessage(data.message);
        setEmail('');
        setConsent(false);
      }
    } catch (error) {
      setIsError(true);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
          />
          <label htmlFor="consent" className="text-sm text-gray-300">
            I agree to receive marketing emails and accept the{' '}
            <a href="/privacy" className="text-primary hover:text-primary-dark underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Subscribing...' : 'Get Exclusive Bonuses'}
        </button>

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
      </div>
    </form>
  );
}
