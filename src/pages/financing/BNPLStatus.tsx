import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { useThemeStore } from '../../store';

const BNPLStatus: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();

  const mockApplication = {
    referenceNumber: 'BNPL-2024-ABC123XYZ',
    requestedAmount: 85000,
    status: 'under_review',
    submittedDate: '2024-06-01'
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              {language === 'en' ? 'BNPL Application Status' : 'حالة طلب التمويل المؤجل'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Track your financing application' : 'تتبع طلب التمويل'}
            </p>
          </div>
        </motion.div>

        {/* Application Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Application Under Review' : 'الطلب قيد المراجعة'}
            </h2>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-mono">
              {mockApplication.referenceNumber}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {language === 'en' ? 'Requested Amount' : 'المبلغ المطلوب'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mockApplication.requestedAmount.toLocaleString()} SAR
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {language === 'en' ? 'Status' : 'الحالة'}
              </p>
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {language === 'en' ? 'Under Review' : 'قيد المراجعة'}
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {language === 'en' ? 'Submitted' : 'تاريخ الإرسال'}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {new Date(mockApplication.submittedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              {language === 'en' ? 'Next Steps' : 'الخطوات التالية'}
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              {language === 'en' 
                ? 'We are currently reviewing your application and conducting a credit assessment. You will receive an update within 1-2 business days.'
                : 'نحن نراجع طلبك حالياً ونجري تقييماً ائتمانياً. ستتلقى تحديثاً خلال 1-2 يوم عمل.'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BNPLStatus;