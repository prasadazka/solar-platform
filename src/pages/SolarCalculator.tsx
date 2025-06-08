import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Zap, 
  Home, 
  DollarSign, 
  Leaf, 
  TrendingUp,
  Sun,
  Battery,
  MapPin,
  ArrowRight,
  Download,
  Share,
  ArrowLeft
} from 'lucide-react';
import { useThemeStore } from '../store';
import { SolarCalculatorInput, SolarCalculatorResult } from '../types';
import Toast from '../components/Toast';

const SolarCalculator: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SolarCalculatorInput>({
    monthlyBill: 0,
    roofArea: 0,
    location: '',
    electricityRate: 0.18, // Default SAR per kWh
    systemType: 'grid-tied'
  });
  const [results, setResults] = useState<SolarCalculatorResult | null>(null);

  // Toast state
  const [toast, setToast] = useState<{
    isOpen: boolean;
    title: string;
    message?: string;
    type?: 'success' | 'warning' | 'info' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showToast = (title: string, message?: string, type: 'success' | 'warning' | 'info' | 'error' = 'info') => {
    setToast({ isOpen: true, title, message, type });
  };

  // Navigation handlers
  const handleGetQuotes = () => {
    // Save calculation results to local storage for quote request
    if (results) {
      localStorage.setItem('solarCalculation', JSON.stringify({
        formData,
        results,
        timestamp: new Date().toISOString()
      }));
      navigate('/quotes/request');
    }
  };

  const handleDownloadReport = () => {
    // Generate and download PDF report
    const reportData = {
      formData,
      results,
      generatedAt: new Date().toISOString()
    };
    
    // In a real app, this would generate a PDF
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `solar-calculation-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShareResults = () => {
    if (navigator.share && results) {
      navigator.share({
        title: language === 'en' ? 'My Solar Calculation Results' : 'نتائج حساب الطاقة الشمسية',
        text: language === 'en' 
          ? `I can save ${results.annualSavings.toLocaleString()} SAR annually with a ${results.systemSize}kW solar system!`
          : `يمكنني توفير ${results.annualSavings.toLocaleString()} ريال سنوياً مع نظام طاقة شمسية ${results.systemSize} كيلووات!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const shareText = language === 'en' 
        ? `Check out my solar calculation: ${results?.systemSize}kW system, ${results?.annualSavings.toLocaleString()} SAR annual savings!`
        : `انظر إلى حساب الطاقة الشمسية: نظام ${results?.systemSize} كيلووات، توفير ${results?.annualSavings.toLocaleString()} ريال سنوياً!`;
      
      navigator.clipboard.writeText(shareText);
      showToast(
        language === 'en' ? 'Results Copied!' : 'تم النسخ!',
        language === 'en' ? 'Results copied to clipboard' : 'تم نسخ النتائج للحافظة',
        'success'
      );
    }
  };

  const cities = [
    { value: 'riyadh', label: language === 'en' ? 'Riyadh' : 'الرياض', sunHours: 7.2 },
    { value: 'jeddah', label: language === 'en' ? 'Jeddah' : 'جدة', sunHours: 6.8 },
    { value: 'dammam', label: language === 'en' ? 'Dammam' : 'الدمام', sunHours: 6.9 },
    { value: 'mecca', label: language === 'en' ? 'Mecca' : 'مكة', sunHours: 6.7 },
    { value: 'medina', label: language === 'en' ? 'Medina' : 'المدينة', sunHours: 7.0 },
    { value: 'tabuk', label: language === 'en' ? 'Tabuk' : 'تبوك', sunHours: 7.5 },
  ];

  const systemTypes = [
    {
      value: 'grid-tied',
      label: language === 'en' ? 'Grid-Tied' : 'مربوط بالشبكة',
      description: language === 'en' ? 'Connected to electricity grid with net metering' : 'متصل بشبكة الكهرباء مع العداد الذكي',
      icon: Zap
    },
    {
      value: 'off-grid',
      label: language === 'en' ? 'Off-Grid' : 'منفصل عن الشبكة',
      description: language === 'en' ? 'Independent system with battery storage' : 'نظام مستقل مع تخزين البطارية',
      icon: Battery
    },
    {
      value: 'hybrid',
      label: language === 'en' ? 'Hybrid' : 'مختلط',
      description: language === 'en' ? 'Grid-tied with battery backup' : 'مربوط بالشبكة مع احتياطي البطارية',
      icon: Home
    }
  ];

  const handleInputChange = (field: keyof SolarCalculatorInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateSolarSystem = () => {
    setLoading(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const selectedCity = cities.find(city => city.value === formData.location);
      const sunHours = selectedCity?.sunHours || 7.0;
      
      // Basic solar calculations
      const monthlyConsumption = formData.monthlyBill / formData.electricityRate; // kWh
      const dailyConsumption = monthlyConsumption / 30;
      const systemSize = Math.ceil(dailyConsumption / sunHours); // kW
      
      // Financial calculations
      const systemCostPerKW = 4500; // SAR per kW (simplified)
      const totalCost = systemSize * systemCostPerKW;
      const annualProduction = systemSize * sunHours * 365;
      const annualSavings = annualProduction * formData.electricityRate;
      const paybackPeriod = totalCost / annualSavings;
      const monthlyPayment = totalCost / 24; // 24 months BNPL
      
      // Environmental impact
      const co2ReductionPerKWh = 0.5; // kg CO2 per kWh
      const annualCO2Reduction = (annualProduction * co2ReductionPerKWh) / 1000; // tons
      
      // ROI calculation
      const systemLifetime = 25; // years
      const totalLifetimeSavings = annualSavings * systemLifetime;
      const roiPercentage = ((totalLifetimeSavings - totalCost) / totalCost) * 100;

      const calculationResults: SolarCalculatorResult = {
        systemSize,
        annualSavings,
        paybackPeriod,
        co2Reduction: annualCO2Reduction,
        totalCost,
        monthlyPayment,
        roiPercentage
      };

      setResults(calculationResults);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const resetCalculator = () => {
    setStep(1);
    setFormData({
      monthlyBill: 0,
      roofArea: 0,
      location: '',
      electricityRate: 0.18,
      systemType: 'grid-tied'
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Back to Dashboard */}
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
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl dark:shadow-emerald-500/25">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold gradient-text mb-4">
              {language === 'en' ? 'Solar Calculator' : 'حاسبة الطاقة الشمسية'}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {language === 'en' 
                ? 'Calculate your solar system size and savings potential'
                : 'احسب حجم نظام الطاقة الشمسية وإمكانية التوفير'
              }
            </p>

            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-8">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNum 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-8 h-1 mx-2 transition-all duration-300 ${
                      step > stepNum ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Basic Information' : 'المعلومات الأساسية'}
            </h2>

            <div className="space-y-6">
              {/* Monthly Bill */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Monthly Electricity Bill (SAR)' : 'فاتورة الكهرباء الشهرية (ريال)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.monthlyBill || ''}
                    onChange={(e) => handleInputChange('monthlyBill', Number(e.target.value))}
                    className="input-field pl-12 rtl:pl-4 rtl:pr-12"
                    placeholder={language === 'en' ? 'Enter your monthly bill' : 'أدخل فاتورتك الشهرية'}
                  />
                  <DollarSign className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Roof Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Available Roof Area (m²)' : 'مساحة السطح المتاحة (متر مربع)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.roofArea || ''}
                    onChange={(e) => handleInputChange('roofArea', Number(e.target.value))}
                    className="input-field pl-12 rtl:pl-4 rtl:pr-12"
                    placeholder={language === 'en' ? 'Enter roof area' : 'أدخل مساحة السطح'}
                  />
                  <Home className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'City' : 'المدينة'}
                </label>
                <div className="relative">
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="input-field pl-12 rtl:pl-4 rtl:pr-12 appearance-none"
                  >
                    <option value="">
                      {language === 'en' ? 'Select your city' : 'اختر مدينتك'}
                    </option>
                    {cities.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                  <MapPin className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Electricity Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Electricity Rate (SAR/kWh)' : 'تعرفة الكهرباء (ريال/كيلوواط ساعة)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.electricityRate}
                    onChange={(e) => handleInputChange('electricityRate', Number(e.target.value))}
                    className="input-field pl-12 rtl:pl-4 rtl:pr-12"
                  />
                  <Zap className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'en' ? 'Default: 0.18 SAR/kWh (SEC residential rate)' : 'افتراضي: 0.18 ريال/كيلوواط ساعة (تعرفة سكنية)'}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!formData.monthlyBill || !formData.roofArea || !formData.location}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 rtl:space-x-reverse"
              >
                <span>{language === 'en' ? 'Next' : 'التالي'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: System Type */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'System Type' : 'نوع النظام'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {systemTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.value}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.systemType === type.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400'
                    }`}
                    onClick={() => handleInputChange('systemType', type.value)}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                        formData.systemType === type.value
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      
                      <h3 className={`font-semibold mb-2 ${
                        formData.systemType === type.value
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {type.label}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {type.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                <span>{language === 'en' ? 'Back' : 'السابق'}</span>
              </button>
              
              <button
                onClick={calculateSolarSystem}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Calculator className="w-5 h-5" />
                <span>{language === 'en' ? 'Calculate' : 'احسب'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
              <Sun className="w-8 h-8 text-white animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Calculating Your Solar System...' : 'جاري حساب نظام الطاقة الشمسية...'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Please wait while we analyze your requirements' : 'يرجى الانتظار بينما نحلل متطلباتك'}
            </p>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Results Header */}
            <div className="card p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Your Solar System Analysis' : 'تحليل نظام الطاقة الشمسية'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Based on your requirements, here\'s what we recommend:'
                  : 'بناءً على متطلباتك، إليك ما نوصي به:'
                }
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {results.systemSize} kW
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'System Size' : 'حجم النظام'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {results.annualSavings.toLocaleString()} SAR
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Annual Savings' : 'التوفير السنوي'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {results.co2Reduction.toFixed(1)} tons
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'CO₂ Reduction/Year' : 'تقليل الكربون/سنة'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {results.roiPercentage.toFixed(0)}%
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? '25-Year ROI' : 'عائد الاستثمار 25 سنة'}
                </p>
              </motion.div>
            </div>

            {/* Financial Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  {language === 'en' ? 'Financial Summary' : 'الملخص المالي'}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Total System Cost' : 'إجمالي تكلفة النظام'}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {results.totalCost.toLocaleString()} SAR
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Monthly BNPL Payment' : 'الدفعة الشهرية المؤجلة'}
                    </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {results.monthlyPayment.toLocaleString()} SAR
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Payback Period' : 'فترة الاسترداد'}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {results.paybackPeriod.toFixed(1)} {language === 'en' ? 'years' : 'سنة'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Annual Savings' : 'التوفير السنوي'}
                    </span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {results.annualSavings.toLocaleString()} SAR
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* BNPL Options */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  {language === 'en' ? 'BNPL Payment Options' : 'خيارات الدفع المؤجل'}
                </h3>
                
                <div className="space-y-4">
                  {[18, 24, 30].map((months) => {
                    const monthlyPayment = results.totalCost / months;
                    return (
                      <div key={months} className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400 transition-colors duration-200 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              {months} {language === 'en' ? 'Months' : 'شهر'}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {language === 'en' ? 'Monthly Payment:' : 'الدفعة الشهرية:'}
                            </p>
                          </div>
                          <div className="text-right rtl:text-left">
                            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                              {monthlyPayment.toLocaleString()} SAR
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              0% {language === 'en' ? 'Interest' : 'فائدة'}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button 
                onClick={handleGetQuotes}
                className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <span>{language === 'en' ? 'Get Quotes from Vendors' : 'احصل على عروض أسعار'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={handleDownloadReport}
                className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Download className="w-5 h-5" />
                <span>{language === 'en' ? 'Download Report' : 'تحميل التقرير'}</span>
              </button>
              
              <button 
                onClick={handleShareResults}
                className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Share className="w-5 h-5" />
                <span>{language === 'en' ? 'Share Results' : 'مشاركة النتائج'}</span>
              </button>
              
              <button 
                onClick={resetCalculator}
                className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <Calculator className="w-5 h-5" />
                <span>{language === 'en' ? 'New Calculation' : 'حساب جديد'}</span>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Toast Notifications */}
        <Toast
          isOpen={toast.isOpen}
          onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          language={language}
        />
      </div>
    </div>
  );
};

export default SolarCalculator;
