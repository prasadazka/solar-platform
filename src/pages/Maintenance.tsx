import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';
import { useThemeStore } from '../store';

const Maintenance: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();

  const maintenanceHistory = [
    {
      id: 1,
      type: language === 'en' ? 'Routine Cleaning' : 'تنظيف دوري',
      date: '2024-05-15',
      status: 'completed',
      technician: 'Ahmed Al-Saudi'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
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

          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            {language === 'en' ? 'System Maintenance' : 'صيانة النظام'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' ? 'Schedule and track maintenance' : 'جدولة وتتبع الصيانة'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Next Service' : 'الخدمة التالية'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'July 15, 2024' : '15 يوليو 2024'}
            </p>
          </div>

          <div className="card p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'System Health' : 'صحة النظام'}
            </h3>
            <p className="text-sm text-green-600 dark:text-green-400">
              {language === 'en' ? 'Excellent' : 'ممتاز'}
            </p>
          </div>

          <div className="card p-6 text-center">
            <Wrench className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Last Service' : 'آخر صيانة'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'May 15, 2024' : '15 مايو 2024'}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Maintenance History' : 'تاريخ الصيانة'}
          </h2>

          <div className="space-y-4">
            {maintenanceHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.type}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {language === 'en' ? 'Technician:' : 'الفني:'} {item.technician}
                    </p>
                  </div>
                </div>
                <div className="text-right rtl:text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                    {language === 'en' ? 'Completed' : 'مكتمل'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Maintenance;