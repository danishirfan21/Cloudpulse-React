import { useState, useCallback } from 'react';
import { Toast } from '../components/common/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string) => {
      addToast({ type: 'success', message });
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string) => {
      addToast({ type: 'error', message });
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message: string) => {
      addToast({ type: 'info', message });
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message: string) => {
      addToast({ type: 'warning', message });
    },
    [addToast]
  );

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
