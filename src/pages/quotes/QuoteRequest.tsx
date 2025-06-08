import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useThemeStore, useAuthStore, useQuoteStore } from '../../store';

const QuoteRequest: React.FC = () => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { submitQuoteRequest } = useQuoteStore();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    propertyType: 'residential',
    address: '',
    city: 'Jeddah',
    monthlyBill: 0,
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    budget: '',
    description: ''
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const submitQuote = async () => {
    if (!user) {
      alert(language === 'en' ? 'Please login to submit a quote request' : 'يرجى تسجيل الدخول لإرسال طلب عرض');
      return;
    }

    setLoading(true);
    
    try {
      // Create quote request
      const quoteRequestData = {
        userId: user.id,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        propertyType: formData.propertyType as 'residential' | 'commercial' | 'industrial',
        propertyAddress: formData.address,
        city: formData.city,
        monthlyBill: formData.monthlyBill,
        budget: formData.budget,
        description: formData.description
      };

      // Submit to quote store
      const requestId = submitQuoteRequest(quoteRequestData);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page with request ID
      navigate('/quotes/success', {
        state: {
          requestId,
          customerName: quoteRequestData.customerName
        }
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);
      alert(language === 'en' ? 'Error submitting request. Please try again.' : 'خطأ في إرسال الطلب. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/quotes')}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Quotes' : 'العودة للعروض'}</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              {language === 'en' ? 'Request Solar Quote' : 'طلب عرض طاقة شمسية'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Get personalized quotes from verified contractors'
                : 'احصل على عروض مخصصة من مقاولين معتمدين'
              }
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Property Details' : 'تفاصيل العقار'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Property Type' : 'نوع العقار'}
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                    className="input-field"
                  >
                    <option value="residential">{language === 'en' ? 'Residential' : 'سكني'}</option>
                    <option value="commercial">{language === 'en' ? 'Commercial' : 'تجاري'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'City' : 'المدينة'}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="input-field"
                  >
                    <option value="Riyadh">{language === 'en' ? 'Riyadh' : 'الرياض'}</option>
                    <option value="Jeddah">{language === 'en' ? 'Jeddah' : 'جدة'}</option>
                    <option value="Dammam">{language === 'en' ? 'Dammam' : 'الدمام'}</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Property Address' : 'عنوان العقار'}
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="input-field"
                    placeholder={language === 'en' ? 'Enter property address' : 'أدخل عنوان العقار'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Monthly Electricity Bill (SAR)' : 'فاتورة الكهرباء الشهرية (ريال)'}
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyBill: Number(e.target.value) }))}
                    className="input-field"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'First Name' : 'الاسم الأول'}
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="input-field"
                    placeholder={language === 'en' ? 'Enter first name' : 'أدخل الاسم الأول'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Last Name' : 'اسم العائلة'}
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="input-field"
                    placeholder={language === 'en' ? 'Enter last name' : 'أدخل اسم العائلة'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="input-field"
                    placeholder={language === 'en' ? 'Enter email' : 'أدخل البريد الإلكتروني'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Phone' : 'رقم الهاتف'}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="input-field"
                    placeholder="+966 50 123 4567"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Budget & Preferences' : 'الميزانية والتفضيلات'}
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Budget Range (SAR)' : 'نطاق الميزانية (ريال)'}
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  className="input-field"
                >
                  <option value="">{language === 'en' ? 'Select budget' : 'اختر الميزانية'}</option>
                  <option value="50,000-100,000">50,000 - 100,000</option>
                  <option value="100,000-200,000">100,000 - 200,000</option>
                  <option value="200,000+">{language === 'en' ? '200,000+' : '200,000+'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Additional Requirements (Optional)' : 'متطلبات إضافية (اختياري)'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="input-field resize-none"
                  placeholder={language === 'en' 
                    ? 'Tell us about any specific requirements, preferred brands, or installation preferences...'
                    : 'أخبرنا عن أي متطلبات خاصة أو علامات تجارية مفضلة أو تفضيلات تركيب...'
                  }
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  {language === 'en' ? 'What happens next?' : 'ما التالي؟'}
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• {language === 'en' ? 'Contractors will review your request' : 'سيراجع المقاولون طلبك'}</li>
                  <li>• {language === 'en' ? 'You\'ll receive quotes within 24-48 hours' : 'ستتلقى عروضاً خلال 24-48 ساعة'}</li>
                  <li>• {language === 'en' ? 'Compare and choose the best option' : 'قارن واختر الخيار الأفضل'}</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{language === 'en' ? 'Previous' : 'السابق'}</span>
              </button>
            )}
            
            <div className="flex-1"></div>
            
            {step < 3 ? (
              <button
                onClick={nextStep}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <span>{language === 'en' ? 'Next' : 'التالي'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={submitQuote}
                disabled={loading}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
                <span>
                  {loading ? (language === 'en' ? 'Submitting...' : 'جاري الإرسال...') : (language === 'en' ? 'Submit' : 'إرسال')}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuoteRequest;