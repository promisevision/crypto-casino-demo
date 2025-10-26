'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export default function Toast({
  isOpen,
  onClose,
  message,
  type = 'info',
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/20 border-green-500/50',
          text: 'text-green-200',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case 'error':
        return {
          bg: 'bg-red-500/20 border-red-500/50',
          text: 'text-red-200',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      default:
        return {
          bg: 'bg-primary/20 border-primary/50',
          text: 'text-primary-200',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };

  const styles = getStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className="fixed top-4 left-1/2 z-50 max-w-md w-full px-4"
        >
          <div className={`${styles.bg} ${styles.text} border rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm flex items-center gap-3`}>
            <div className="flex-shrink-0">{styles.icon}</div>
            <p className="flex-1 font-medium">{message}</p>
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-70 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
