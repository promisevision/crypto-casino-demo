'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isSubscribed: boolean;
  createdAt: string;
}

interface ModalState {
  isOpen: boolean;
  type: 'confirm' | 'success' | 'error';
  title: string;
  message: string;
  onConfirm?: () => void;
}

interface ToastState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

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
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      showToast('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ isOpen: true, message, type });
  };

  const showModal = (
    title: string,
    message: string,
    type: 'confirm' | 'success' | 'error' = 'confirm',
    onConfirm?: () => void
  ) => {
    setModal({ isOpen: true, title, message, type, onConfirm });
  };

  const handleDeleteUser = (userId: string, userEmail: string) => {
    showModal(
      'Delete User',
      `Are you sure you want to delete ${userEmail}? This will also remove their subscription and cannot be undone.`,
      'confirm',
      () => confirmDeleteUser(userId)
    );
  };

  const confirmDeleteUser = async (userId: string) => {
    setDeleteLoading(userId);
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(users.filter(u => u.id !== userId));
        showToast('User deleted successfully', 'success');
      } else {
        showToast(data.error || 'Failed to delete user', 'error');
      }
    } catch (err) {
      showToast('An error occurred while deleting user', 'error');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const subscribedCount = users.filter(u => u.isSubscribed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition disabled:opacity-50 flex items-center gap-2"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-light border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Users</p>
                  <p className="text-4xl font-bold text-white">{totalUsers}</p>
                </div>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👥</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-light border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Subscribed</p>
                  <p className="text-4xl font-bold text-white">{subscribedCount}</p>
                </div>
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📧</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-light border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Admins</p>
                  <p className="text-4xl font-bold text-white">{adminCount}</p>
                </div>
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👑</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="bg-dark-light border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => router.push('/admin/publish')}
                className="px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition text-center flex items-center justify-center gap-2"
              >
                <span>📝</span>
                <span>Create & Publish News</span>
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition flex items-center justify-center gap-2"
              >
                <span>🏠</span>
                <span>View News Feed</span>
              </button>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-dark-light border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">All Users</h2>

            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Role</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Subscribed</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Created At</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-3 px-4 text-white">{user.name}</td>
                        <td className="py-3 px-4 text-gray-300">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-200'
                              : 'bg-blue-500/20 text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {user.isSubscribed ? (
                            <span className="text-green-400">✓ Yes</span>
                          ) : (
                            <span className="text-gray-500">✗ No</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {user.email !== session.user.email && (
                            <button
                              onClick={() => handleDeleteUser(user.id, user.email)}
                              disabled={deleteLoading === user.id}
                              className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-200 rounded hover:bg-red-500/30 transition text-sm disabled:opacity-50 flex items-center gap-1"
                            >
                              {deleteLoading === user.id ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-red-200 border-t-transparent rounded-full animate-spin"></div>
                                  <span>Deleting...</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  <span>Delete</span>
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No users found</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />

      {/* Toast */}
      <Toast
        isOpen={toast.isOpen}
        onClose={() => setToast({ ...toast, isOpen: false })}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
}
