import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle,
  Clock,
  Users,
  FileText,
  ArrowRight,
  Home,
  Bell,
  Calendar
} from 'lucide-react';
import { useThemeStore } from '../../store';

const QuoteSuccess: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Quote Request Submitted!' : 'تم إرسال طلب العرض!'}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {language === 'en' 
              ? 'Your request has been sent to certified solar contractors in your area.'
              : 'تم إرسال طلبك إلى مقاولي الطاقة الشمسية المعتمدين في منطقتك.'
            }
          </p>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
              {language === 'en' ? 'What happens next?' : 'ما الذي سيحدث بعد ذلك؟'}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div className="text-left rtl:text-right">
                  <h3 className="font-medium text-emerald-900 dark:text-emerald-100">
                    {language === 'en' ? 'Contractor Review (2-4 hours)' : 'مراجعة المقاولين (2-4 ساعات)'}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    {language === 'en' 
                      ? 'Certified contractors will review your requirements'
                      : 'سيقوم المقاولون المعتمدون بمراجعة متطلباتك'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div className="text-left rtl:text-right">
                  <h3 className="font-medium text-emerald-900 dark:text-emerald-100">
                    {language === 'en' ? 'Receive Quotes (24-48 hours)' : 'استلام العروض (24-48 ساعة)'}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    {language === 'en' 
                      ? 'You\'ll receive 3-5 competitive quotes from qualified contractors'
                      : 'ستتلقى 3-5 عروض تنافسية من مقاولين مؤهلين'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div className="text-left rtl:text-right">
                  <h3 className="font-medium text-emerald-900 dark:text-emerald-100">
                    {language === 'en' ? 'Compare & Choose' : 'قارن واختر'}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    {language === 'en' 
                      ? 'Compare quotes and select the best contractor for your project'
                      : 'قارن العروض واختر أفضل مقاول لمشروعك'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Quick Response' : 'استجابة سريعة'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Expect first quotes within 24 hours'
                : 'توقع أول العروض خلال 24 ساعة'
              }
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <Users className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Certified Contractors' : 'مقاولون معتمدون'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'All contractors are verified and licensed'
                : 'جميع المقاولين موثقون ومرخصون'
              }
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Detailed Quotes' : 'عروض مفصلة'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Complete pricing and project details'
                : 'تسعير كامل وتفاصيل المشروع'
              }
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => navigate('/quotes')}
            className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <FileText className="w-5 h-5" />
            <span>{language === 'en' ? 'View My Quotes' : 'عرض عروضي'}</span>
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Home className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
          </button>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300">
            <Bell className="w-5 h-5" />
            <span className="text-sm">
              {language === 'en' 
                ? 'We\'ll notify you via email and SMS when quotes arrive'
                : 'سنخطرك عبر البريد الإلكتروني والرسائل النصية عند وصول العروض'
              }
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteSuccess;