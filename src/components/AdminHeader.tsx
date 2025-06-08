import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import { useThemeStore } from '../store';

interface AdminHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, description, children }) => {
  const { language } = useThemeStore();

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Back to Dashboard Button */}
      <motion.button
        onClick={handleBackToDashboard}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center space-x-2 rtl:space-x-reverse mb-6 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <LayoutDashboard className="w-5 h-5" />
        <span className="font-medium">
          {language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}
        </span>
      </motion.button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        
        {children && (
          <div className="mt-4 md:mt-0">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminHeader;