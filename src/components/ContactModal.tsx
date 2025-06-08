import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MessageCircle, MapPin, Building, AlertTriangle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  language: 'en' | 'ar';
  onShowToast?: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, vendorName, language, onShowToast }) => {
  // Enhanced vendor contact information
  const vendorInfo = {
    phone: '+966 12 345 6789',
    email: 'info@solarsolutions.sa',
    address: 'King Fahd Road, Jeddah 21462',
    licenseNumber: 'SEC-2023-001',
    rating: 4.8
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Contact Vendor' : 'تواصل مع المقاول'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {vendorName}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                    <span className="text-gray-600 dark:text-gray-300">{vendorInfo.rating}/5.0 Rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={`tel:${vendorInfo.phone}`}
                    className="flex items-center justify-center space-x-3 rtl:space-x-reverse w-full p-4 border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 transform hover:scale-105"
                    onClick={() => {
                      onShowToast?.(
                        language === 'en' ? 'Calling Vendor' : 'جاري الاتصال',
                        language === 'en' ? `Initiating call to ${vendorName}...` : `جاري الاتصال بـ ${vendorName}...`,
                        'info'
                      );
                      onClose();
                    }}
                  >
                    <Phone className="w-6 h-6 text-emerald-600" />
                    <div className="text-left rtl:text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'en' ? 'Call Now' : 'اتصل الآن'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{vendorInfo.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${vendorInfo.email}`}
                    className="flex items-center justify-center space-x-3 rtl:space-x-reverse w-full p-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 transform hover:scale-105"
                    onClick={() => {
                      onShowToast?.(
                        language === 'en' ? 'Email Composer' : 'محرر البريد',
                        language === 'en' ? 'Opening email application...' : 'جاري فتح تطبيق البريد الإلكتروني...',
                        'info'
                      );
                      onClose();
                    }}
                  >
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div className="text-left rtl:text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'en' ? 'Send Email' : 'إرسال إيميل'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{vendorInfo.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <MapPin className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {language === 'en' ? 'Office Address' : 'عنوان المكتب'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{vendorInfo.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        {language === 'en' 
                          ? 'Always verify vendor credentials and licenses before proceeding with any payments.'
                          : 'تحقق دائماً من بيانات اعتماد المقاول والتراخيص قبل المتابعة بأي مدفوعات.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;