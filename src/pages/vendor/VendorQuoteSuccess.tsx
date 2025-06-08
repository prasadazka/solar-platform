import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckCircle,
  ArrowLeft,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Clock,
  Award,
  Home
} from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorQuoteSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useThemeStore();

  const { customerName } = location.state || {
    customerName: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد'
  };
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            {language === 'en' ? 'Quote Submitted Successfully!' : 'تم إرسال العرض بنجاح!'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-2"
          >
            {language === 'en' 
              ? `Your quote has been sent to ${customerName}`
              : `تم إرسال عرضك إلى ${customerName}`
            }
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 dark:text-gray-400"
          >
            {language === 'en' 
              ? 'The customer will be notified via email and SMS'
              : 'سيتم إشعار العميل عبر البريد الإلكتروني والرسائل النصية'
            }
          </motion.p>
        </motion.div>
        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'What happens next?' : 'ما الذي سيحدث بعد ذلك؟'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'Customer Notification' : 'إشعار العميل'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Customer receives your quote immediately'
                  : 'يستلم العميل عرضك فوراً'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'Review Period' : 'فترة المراجعة'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Customer compares quotes and makes decision'
                  : 'يقارن العميل العروض ويتخذ القرار'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'Acceptance' : 'القبول'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'If accepted, project moves to execution'
                  : 'في حالة القبول، ينتقل المشروع للتنفيذ'
                }
              </p>
            </div>
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
            onClick={() => navigate('/dashboard')}
            className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <Home className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
          </button>
          
          <button
            onClick={() => navigate('/vendor/quotes')}
            className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{language === 'en' ? 'View All Quotes' : 'عرض جميع العروض'}</span>
          </button>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            {language === 'en' ? 'Pro Tips for Better Acceptance Rates:' : 'نصائح للحصول على معدلات قبول أفضل:'}
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
            <li>• {language === 'en' ? 'Respond quickly to new quote requests' : 'استجب بسرعة لطلبات العروض الجديدة'}</li>
            <li>• {language === 'en' ? 'Provide competitive pricing within market rates' : 'قدم أسعار تنافسية ضمن معدلات السوق'}</li>
            <li>• {language === 'en' ? 'Include detailed specifications and warranties' : 'تضمين المواصفات التفصيلية والضمانات'}</li>
            <li>• {language === 'en' ? 'Follow up with customers professionally' : 'تابع مع العملاء بشكل احترافي'}</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorQuoteSuccess;