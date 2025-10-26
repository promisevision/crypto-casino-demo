'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PublishPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    content: '',
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || 'Failed to publish news');
      } else {
        setIsError(false);
        setMessage(`News published successfully! Sent to ${data.sent} subscribers.`);
        // Reset form
        setFormData({
          title: '',
          imageUrl: '',
          content: '',
          rating: 5,
        });
      }
    } catch (error) {
      setIsError(true);
      setMessage('Network error. Please try again.');
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

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Publish News Article</h1>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition"
            >
              ← Back to Dashboard
            </button>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            {/* Article Details */}
            <div className="bg-dark-light border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Article Content</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Article Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., New Bitcoin Casino Launched with Exclusive Bonuses"
                    required
                    className="w-full px-4 py-3 bg-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="text-4xl transition-all hover:scale-110"
                      >
                        {star <= formData.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                    <span className="ml-4 text-gray-300 text-lg font-semibold">
                      {formData.rating} / 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Featured Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/casino-image.jpg"
                    required
                    className="w-full px-4 py-3 bg-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Enter a direct URL to the image (must start with https://)
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-semibold">Article Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write the main content of your article here. Describe the casino, games, bonuses, and what makes it special..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Preview Card */}
            {formData.title && (
              <div className="bg-dark-light border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
                <div className="max-w-sm mx-auto">
                  <div className="bg-dark rounded-2xl overflow-hidden flex flex-col" style={{ aspectRatio: '1 / 1.5' }}>
                    {/* Image - 40% */}
                    <div className="relative w-full" style={{ height: '40%' }}>
                      {formData.imageUrl ? (
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x240/1e293b/6366f1?text=Image+Preview';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Content - 60% */}
                    <div className="flex flex-col p-4" style={{ height: '60%' }}>
                      {/* Title */}
                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-2" style={{ minHeight: '3.5rem' }}>
                        {formData.title}
                      </h4>

                      {/* Rating - No Border */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-lg">
                            {star <= formData.rating ? '⭐' : '☆'}
                          </span>
                        ))}
                        <span className="ml-2 text-gray-300 text-sm font-semibold">
                          {formData.rating}/5
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-white/10 mb-3"></div>

                      {/* Content Preview */}
                      <div className="flex-1 overflow-hidden">
                        <p className="text-gray-300 text-sm line-clamp-4">
                          {formData.content || 'Article content will appear here...'}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-white/5">
                        <span>Preview</span>
                        <span>•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? '📧 Publishing & Sending...' : '📧 Publish & Send to All Subscribers'}
            </button>

            <p className="text-center text-gray-400 text-sm">
              This will publish the news article and send it immediately to all subscribed users via email
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
