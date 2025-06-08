import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  DollarSign,
  CheckCircle,
  Send,
  Save
} from 'lucide-react';
import { useThemeStore, useAuthStore, useQuoteStore } from '../../store';

const VendorQuoteResponse: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { getQuoteRequestById, submitVendorQuote } = useQuoteStore();

  // Get the actual quote request
  const quoteRequest = getQuoteRequestById(requestId || '');

  const [quoteData, setQuoteData] = useState({
    systemSize: quoteRequest?.systemSize || Math.ceil((quoteRequest?.monthlyBill || 800) / 70), // Estimate: 70 SAR per kW monthly
    totalPrice: 0,
    monthlyPayment: 0,
    installationWeeks: 2,
    warranty: 25,
    equipmentBrand: 'LONGi Solar',
    panelType: 'Monocrystalline',
    inverterType: 'String Inverter',
    highlights: [
      'Premium Tier 1 Panels',
      '25 Year Warranty',
      'Smart Monitoring',
      'Professional Installation'
    ],
    terms: language === 'en' 
      ? 'Standard installation terms and conditions apply. All equipment covered by manufacturer warranty.'
      : 'تنطبق شروط وأحكام التركيب القياسية. جميع المعدات مغطاة بضمان الشركة المصنعة.',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
    paymentTerms: 'bnpl_24'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-calculate pricing when system size changes
  useEffect(() => {
    const pricePerKW = 6500; // Base price per kW
    const totalPrice = quoteData.systemSize * pricePerKW;
    const monthlyPayment = Math.round(totalPrice / 24); // 24 months BNPL

    setQuoteData(prev => ({
      ...prev,
      totalPrice,
      monthlyPayment
    }));
  }, [quoteData.systemSize]);

  const handleSubmit = async () => {
    if (!quoteRequest || !user) {
      alert(language === 'en' ? 'Error: Missing request or user data' : 'خطأ: بيانات الطلب أو المستخدم مفقودة');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create vendor quote response
      const vendorQuote = {
        vendorId: user.id,
        vendorName: user.name || 'Solar Solutions KSA',
        vendorRating: 4.8,
        vendorPhone: '+966 12 345 6789',
        vendorEmail: user.email,
        requestId: quoteRequest.id,
        systemSize: quoteData.systemSize,
        totalPrice: quoteData.totalPrice,
        pricePerKW: Math.round(quoteData.totalPrice / quoteData.systemSize),
        monthlyPayment: quoteData.monthlyPayment,
        installationTimeframe: quoteData.installationWeeks,
        warranty: quoteData.warranty,
        installationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        equipmentBrand: quoteData.equipmentBrand,
        panelType: quoteData.panelType,
        inverterType: quoteData.inverterType,
        highlights: quoteData.highlights,
        terms: quoteData.terms,
        validUntil: quoteData.validUntil,
        includedServices: [
          'System Design',
          'Installation',
          'Testing & Commissioning',
          '3 Years Maintenance'
        ],
        paymentTerms: quoteData.paymentTerms,
        vendorInfo: {
          phone: '+966 12 345 6789',
          email: user.email,
          address: 'King Fahd Road, Jeddah 21462',
          licenseNumber: 'SEC-2023-001',
          experience: '8 years',
          specializations: ['Residential Solar', 'Commercial Systems', 'Energy Storage']
        }
      };

      // Submit to store
      submitVendorQuote(vendorQuote);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page
      navigate('/vendor/quotes/success', {
        state: {
          customerName: quoteRequest.customerName,
          quoteData: vendorQuote
        }
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert(language === 'en' ? 'Error submitting quote. Please try again.' : 'خطأ في إرسال العرض. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no quote request found, show error
  if (!quoteRequest) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Quote Request Not Found' : 'طلب العرض غير موجود'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {language === 'en' 
              ? 'The quote request you are looking for does not exist or has been removed.'
              : 'طلب العرض الذي تبحث عنه غير موجود أو تم حذفه.'
            }
          </p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            {language === 'en' ? 'Return to Dashboard' : 'العودة للوحة التحكم'}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text mb-4">
              {language === 'en' ? 'Quote Response' : 'رد على العرض'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Respond to customer quote request with your best offer'
                : 'رد على طلب العرض من العميل بأفضل عرض لديك'
              }
            </p>
          </div>
        </motion.div>
        {/* Customer Request Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Customer Request' : 'طلب العميل'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Customer' : 'العميل'}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {quoteRequest.customerName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Property Type' : 'نوع العقار'}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                {quoteRequest.propertyType}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Monthly Bill' : 'الفاتورة الشهرية'}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{quoteRequest.monthlyBill} SAR</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Location' : 'الموقع'}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {quoteRequest.propertyAddress}, {quoteRequest.city}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Budget Range' : 'نطاق الميزانية'}
              </p>
              <p className="font-medium text-emerald-600">{quoteRequest.budget} SAR</p>
            </div>
          </div>

          {quoteRequest.description && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {language === 'en' ? 'Additional Notes' : 'ملاحظات إضافية'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                {quoteRequest.description}
              </p>
            </div>
          )}
        </motion.div>
        {/* Quote Response Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Your Quote Response' : 'رد العرض الخاص بك'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'System Size (kW)' : 'حجم النظام (كيلووات)'} *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={quoteData.systemSize}
                  onChange={(e) => setQuoteData({...quoteData, systemSize: Number(e.target.value)})}
                  className="input-field"
                  placeholder="12"
                  min="1"
                  max="50"
                  step="0.5"
                />
              </div>
            </div>

            {/* Total Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Total Price (SAR)' : 'السعر الإجمالي (ريال)'} *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={quoteData.totalPrice}
                  onChange={(e) => setQuoteData({...quoteData, totalPrice: Number(e.target.value)})}
                  className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                  placeholder="78000"
                  min="1000"
                  step="1000"
                />
              </div>
            </div>
            {/* Monthly Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Monthly Payment (SAR)' : 'الدفعة الشهرية (ريال)'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={quoteData.monthlyPayment}
                  onChange={(e) => setQuoteData({...quoteData, monthlyPayment: Number(e.target.value)})}
                  className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                  placeholder="3250"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'en' ? 'Based on 24-month BNPL plan' : 'بناءً على خطة BNPL لمدة 24 شهراً'}
              </p>
            </div>

            {/* Installation Timeframe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Installation Timeframe (Weeks)' : 'مدة التركيب (أسابيع)'} *
              </label>
              <select
                value={quoteData.installationWeeks}
                onChange={(e) => setQuoteData({...quoteData, installationWeeks: Number(e.target.value)})}
                className="input-field"
              >
                <option value={1}>{language === 'en' ? '1 Week' : 'أسبوع واحد'}</option>
                <option value={2}>{language === 'en' ? '2 Weeks' : 'أسبوعان'}</option>
                <option value={3}>{language === 'en' ? '3 Weeks' : '3 أسابيع'}</option>
                <option value={4}>{language === 'en' ? '4 Weeks' : '4 أسابيع'}</option>
                <option value={6}>{language === 'en' ? '6 Weeks' : '6 أسابيع'}</option>
                <option value={8}>{language === 'en' ? '8 Weeks' : '8 أسابيع'}</option>
              </select>
            </div>
            {/* Warranty Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Warranty Period (Years)' : 'فترة الضمان (سنوات)'} *
              </label>
              <select
                value={quoteData.warranty}
                onChange={(e) => setQuoteData({...quoteData, warranty: Number(e.target.value)})}
                className="input-field"
              >
                <option value={10}>10 {language === 'en' ? 'Years' : 'سنوات'}</option>
                <option value={15}>15 {language === 'en' ? 'Years' : 'سنة'}</option>
                <option value={20}>20 {language === 'en' ? 'Years' : 'سنة'}</option>
                <option value={25}>25 {language === 'en' ? 'Years' : 'سنة'}</option>
                <option value={30}>30 {language === 'en' ? 'Years' : 'سنة'}</option>
              </select>
            </div>

            {/* Equipment Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Equipment Brand' : 'ماركة المعدات'} *
              </label>
              <select
                value={quoteData.equipmentBrand}
                onChange={(e) => setQuoteData({...quoteData, equipmentBrand: e.target.value})}
                className="input-field"
              >
                <option value="">{language === 'en' ? 'Select brand' : 'اختر الماركة'}</option>
                <option value="LONGi Solar">LONGi Solar</option>
                <option value="JinkoSolar">JinkoSolar</option>
                <option value="Trina Solar">Trina Solar</option>
                <option value="Canadian Solar">Canadian Solar</option>
                <option value="JA Solar">JA Solar</option>
                <option value="Risen Energy">Risen Energy</option>
                <option value="First Solar">First Solar</option>
              </select>
            </div>
          </div>
          {/* Key Features */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
              {language === 'en' ? 'Key Features & Highlights' : 'المميزات والنقاط البارزة'}
            </label>
            <div className="space-y-3">
              {quoteData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-emerald-800 dark:text-emerald-300">{highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Quote Summary' : 'ملخص العرض'}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'System Size' : 'حجم النظام'}</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{quoteData.systemSize} kW</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Price' : 'السعر الإجمالي'}</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{quoteData.totalPrice.toLocaleString()} SAR</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly Payment' : 'الدفعة الشهرية'}</span>
                <p className="font-medium text-emerald-600">{quoteData.monthlyPayment.toLocaleString()} SAR</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Installation' : 'التركيب'}</span>
                <p className="font-medium text-gray-900 dark:text-gray-100">{quoteData.installationWeeks} {language === 'en' ? 'weeks' : 'أسابيع'}</p>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                // Save draft functionality
                alert(language === 'en' ? 'Quote draft saved!' : 'تم حفظ مسودة العرض!');
              }}
              className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <Save className="w-5 h-5" />
              <span>{language === 'en' ? 'Save Draft' : 'حفظ مسودة'}</span>
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse flex-1"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>
                {isSubmitting 
                  ? (language === 'en' ? 'Submitting...' : 'جاري الإرسال...')
                  : (language === 'en' ? 'Submit Quote' : 'إرسال العرض')
                }
              </span>
            </button>
          </div>
        </motion.div>

        {/* Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800"
        >
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
            {language === 'en' ? 'Quote Guidelines' : 'إرشادات العرض'}
          </h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
            <li>• {language === 'en' ? 'Maximum price: 8000 SAR per kW' : 'الحد الأقصى للسعر: 8000 ريال لكل كيلووات'}</li>
            <li>• {language === 'en' ? 'Platform commission: 10% + 5% discount applied' : 'عمولة المنصة: 10% + خصم 5% مطبق'}</li>
            <li>• {language === 'en' ? 'Competitive pricing increases acceptance rates' : 'التسعير التنافسي يزيد معدلات القبول'}</li>
            <li>• {language === 'en' ? 'Include detailed specifications and warranties' : 'تضمين المواصفات التفصيلية والضمانات'}</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorQuoteResponse;