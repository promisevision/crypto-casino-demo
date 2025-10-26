'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';

interface NewsArticle {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  rating: number;
  author: string;
  publishedAt: string;
  sentTo: number;
}

interface ModalState {
  isOpen: boolean;
  type: 'confirm' | 'alert' | 'success' | 'error';
  title: string;
  message: string;
  onConfirm?: () => void;
}

interface ToastState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: '',
  });
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: '',
    type: 'info',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchNews();
    }
  }, [status]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (
    title: string,
    message: string,
    type: 'confirm' | 'success' | 'error' = 'confirm',
    onConfirm?: () => void
  ) => {
    setModal({ isOpen: true, title, message, type, onConfirm });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ isOpen: true, message, type });
  };

  const handleDeleteNews = (newsId: string, newsTitle: string) => {
    showModal(
      'Delete News Article',
      `Are you sure you want to delete "${newsTitle}"? This action cannot be undone.`,
      'confirm',
      () => confirmDeleteNews(newsId)
    );
  };

  const confirmDeleteNews = async (newsId: string) => {
    try {
      const response = await fetch(`/api/news?id=${newsId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        showToast('News article deleted successfully', 'success');
        fetchNews(); // Refresh the list
      } else {
        showToast(data.error || 'Failed to delete news article', 'error');
      }
    } catch (error) {
      showToast('Network error. Please try again.', 'error');
    }
  };

  const handleEditNews = (newsId: string) => {
    router.push(`/admin/edit/${newsId}`);
  };

  const toggleReadMore = (articleId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const isExpanded = (articleId: string) => expandedCards.has(articleId);

  // Show loading only when session is loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Casino News
          </h1>
          <p className="text-xl text-gray-300">
            Stay updated with the latest crypto casino reviews and bonuses
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-light border border-white/10 rounded-2xl p-12 text-center"
          >
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-5xl">📰</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No News Yet</h3>
              <p className="text-gray-400 text-lg">No articles have been published yet</p>
            </div>
            {session.user.role === 'admin' && (
              <button
                onClick={() => router.push('/admin/publish')}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition"
              >
                📝 Publish First Article
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-light border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/20 group flex flex-col"
                style={{ aspectRatio: '1 / 1.5' }}
              >
                {/* Image - Fixed Height */}
                <div className="relative w-full" style={{ height: '40%' }}>
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x240/1e293b/6366f1?text=Casino+News';
                    }}
                  />

                  {/* Admin Actions - Overlay on Image */}
                  {session.user.role === 'admin' && (
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      <button
                        onClick={() => handleEditNews(article.id)}
                        className="p-2 bg-dark/80 backdrop-blur-sm text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteNews(article.id, article.title)}
                        className="p-2 bg-dark/80 backdrop-blur-sm text-red-400 hover:bg-red-500/20 rounded-lg transition"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>

                {/* Content - Fixed Height */}
                <div className="flex flex-col p-4" style={{ height: '60%' }}>
                  {/* Title - Fixed Height */}
                  <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition" style={{ minHeight: '3.5rem' }}>
                    {article.title}
                  </h2>

                  {/* Rating - No Border */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-lg">
                        {star <= article.rating ? '⭐' : '☆'}
                      </span>
                    ))}
                    <span className="ml-2 text-gray-300 text-sm font-semibold">
                      {article.rating}/5
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 mb-3"></div>

                  {/* Content with Read More - Scrollable */}
                  <div className="flex-1 overflow-hidden relative">
                    {!isExpanded(article.id) ? (
                      // Collapsed state with Read more inline
                      <div className="text-gray-300 text-sm">
                        <span
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 6,
                            overflow: 'hidden',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {article.content}
                        </span>
                        {article.content.length > 150 && (
                          <>
                            {' '}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleReadMore(article.id);
                              }}
                              className="text-primary text-sm font-semibold hover:text-primary-dark transition inline float-right"
                            >
                              Read more
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      // Expanded state with Read less inline at bottom
                      <div
                        className="text-gray-300 text-sm overflow-y-scroll scrollbar-hide pr-2"
                        style={{
                          height: '100%',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}
                      >
                        {article.content}
                        {' '}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleReadMore(article.id);
                          }}
                          className="text-primary text-sm font-semibold hover:text-primary-dark transition inline float-right"
                        >
                          Read less
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-white/5">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Modal and Toast */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
      <Toast
        isOpen={toast.isOpen}
        onClose={() => setToast({ ...toast, isOpen: false })}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
}
