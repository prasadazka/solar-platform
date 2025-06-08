import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Phone, ArrowRight } from 'lucide-react';
import { useThemeStore } from '../../store';

const BNPLApplicationSuccess: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/dashboard'), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Application Submitted!' : 'تم إرسال الطلب!'}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {language === 'en' 
              ? 'Your BNPL financing application has been successfully submitted'
              : 'تم إرسال طلب التمويل المؤجل بنجاح'
            }
          </p>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
              {language === 'en' ? 'Application Reference' : 'رقم مرجع الطلب'}
            </h3>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              BNPL-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BNPLApplicationSuccess;