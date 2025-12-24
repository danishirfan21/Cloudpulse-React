import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

const ToastNotification: React.FC<ToastProps> = ({
  id,
  type,
  message,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      color: '#00d084',
      bg: '#00d08420',
    },
    error: {
      icon: AlertCircle,
      color: '#ff4757',
      bg: '#ff475720',
    },
    warning: {
      icon: AlertCircle,
      color: '#ffa502',
      bg: '#ffa50220',
    },
    info: {
      icon: Info,
      color: '#1e90ff',
      bg: '#1e90ff20',
    },
  };

  const { icon: Icon, color, bg } = config[type];

  return (
    <div
      className="flex items-center gap-3 bg-[#1a1f29] border rounded-lg p-4 shadow-lg min-w-[300px] animate-slide-in"
      style={{ borderColor: color }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-[#242933] rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastNotification key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastNotification;
