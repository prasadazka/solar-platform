import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from 'lucide-react';

interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  duration?: number;
  language: 'en' | 'ar';
}

const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  duration = 4000,
  language
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const getIconAndColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          iconColor: 'text-green-600 dark:text-green-400',
          titleColor: 'text-green-900 dark:text-green-100'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          titleColor: 'text-yellow-900 dark:text-yellow-100'
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          iconColor: 'text-red-600 dark:text-red-400',
          titleColor: 'text-red-900 dark:text-red-100'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          iconColor: 'text-blue-600 dark:text-blue-400',
          titleColor: 'text-blue-900 dark:text-blue-100'
        };
    }
  };

  const { icon: Icon, bgColor, iconColor, titleColor } = getIconAndColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: language === 'ar' ? 50 : -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -50, x: language === 'ar' ? 50 : -50 }}
          className={`fixed top-6 ${language === 'ar' ? 'left-6' : 'right-6'} z-50 max-w-sm w-full`}
        >
          <div className={`${bgColor} border rounded-2xl shadow-2xl backdrop-blur-sm p-4`}>
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${titleColor} text-sm`}>
                  {title}
                </h4>
                {message && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {message}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;