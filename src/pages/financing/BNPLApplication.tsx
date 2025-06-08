import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useThemeStore } from '../../store';

// Form Components
const PersonalInfoForm: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {language === 'en' ? 'Personal Information' : 'المعلومات الشخصية'}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder={language === 'en' ? 'Full Name' : 'الاسم الكامل'}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <input
        type="text"
        placeholder={language === 'en' ? 'National ID' : 'رقم الهوية'}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
  </div>
);

const EmploymentForm: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {language === 'en' ? 'Employment Information' : 'معلومات العمل'}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder={language === 'en' ? 'Employer Name' : 'اسم جهة العمل'}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
      <input
        type="number"
        placeholder={language === 'en' ? 'Monthly Salary (SAR)' : 'الراتب الشهري (ريال)'}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
  </div>
);

const FinancialForm: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {language === 'en' ? 'Financial Information' : 'المعلومات المالية'}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
        <option>{language === 'en' ? 'Select Bank' : 'اختر البنك'}</option>
        <option value="alrajhi">{language === 'en' ? 'Al Rajhi Bank' : 'مصرف الراجحي'}</option>
        <option value="riyad">{language === 'en' ? 'Riyad Bank' : 'بنك الرياض'}</option>
      </select>
      <input
        type="text"
        placeholder={language === 'en' ? 'IBAN' : 'الآيبان'}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>
  </div>
);
const PropertyForm: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {language === 'en' ? 'Property Information' : 'معلومات العقار'}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
        <option value="villa">{language === 'en' ? 'Villa' : 'فيلا'}</option>
        <option value="apartment">{language === 'en' ? 'Apartment' : 'شقة'}</option>
      </select>
      <textarea
        placeholder={language === 'en' ? 'Property Address' : 'عنوان العقار'}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        rows={3}
      />
    </div>
  </div>
);

const ReviewForm: React.FC<{ 
  language: 'en' | 'ar'; 
  handleSubmit: () => void; 
  isSubmitting: boolean; 
}> = ({ language, handleSubmit, isSubmitting }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {language === 'en' ? 'Review & Submit' : 'المراجعة والإرسال'}
    </h2>
    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
      <h3 className="font-medium text-emerald-900 dark:text-emerald-100 mb-4">
        {language === 'en' ? 'Application Summary' : 'ملخص الطلب'}
      </h3>
      <p className="text-emerald-700 dark:text-emerald-300">
        {language === 'en' 
          ? 'Please review your information before submitting.'
          : 'يرجى مراجعة معلوماتك قبل الإرسال.'
        }
      </p>
    </div>
    <button 
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="w-full btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
    >
      {isSubmitting ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{language === 'en' ? 'Submitting...' : 'جاري الإرسال...'}</span>
        </>
      ) : (
        <span>{language === 'en' ? 'Submit Application' : 'إرسال الطلب'}</span>
      )}
    </button>
  </div>
);
// Main Component
const BNPLApplication: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get quote data from navigation state
  const quoteData = location.state || {};
  const { loanAmount = 85000, vendorName, monthlyPayment = 3542 } = quoteData;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/financing/application-success', {
        state: { 
          ...quoteData,
          applicationData: {
            loanAmount,
            monthlyPayment,
            vendorName
          }
        }
      });
    } catch (error) {
      console.error('Application submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={() => navigate('/financing')}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Financing' : 'العودة للتمويل'}</span>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              {language === 'en' ? 'BNPL Application' : 'طلب التمويل المؤجل'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Apply for solar financing' : 'تقدم للحصول على تمويل الطاقة الشمسية'}
            </p>
          </div>

          {/* Quote Summary (if coming from accepted quote) */}
          {vendorName && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                {language === 'en' ? 'Selected Quote Summary' : 'ملخص العرض المختار'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    {language === 'en' ? 'Vendor' : 'المورد'}
                  </p>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                    {vendorName}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    {language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}
                  </p>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                    {loanAmount.toLocaleString()} SAR
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    {language === 'en' ? 'Monthly Payment' : 'الدفعة الشهرية'}
                  </p>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                    {monthlyPayment.toLocaleString()} SAR
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4 rtl:space-x-reverse">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${
                    currentStep >= step
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? `Step ${currentStep} of 5` : `الخطوة ${currentStep} من 5`}
            </span>
          </div>

          {/* Current Step Content */}
          {currentStep === 1 && <PersonalInfoForm language={language} />}
          {currentStep === 2 && <EmploymentForm language={language} />}
          {currentStep === 3 && <FinancialForm language={language} />}
          {currentStep === 4 && <PropertyForm language={language} />}
          {currentStep === 5 && <ReviewForm language={language} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`btn-secondary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {language === 'en' ? 'Previous' : 'السابق'}
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              disabled={currentStep === 5}
              className={`btn-primary ${currentStep === 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {language === 'en' ? 'Next' : 'التالي'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BNPLApplication;