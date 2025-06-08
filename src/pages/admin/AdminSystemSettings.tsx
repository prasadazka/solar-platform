import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Shield, 
  DollarSign, 
  Percent, 
  Globe, 
  Bell, 
  Mail, 
  Phone, 
  Database, 
  Server, 
  Lock, 
  Key, 
  FileText, 
  Users, 
  Building, 
  CreditCard, 
  Zap, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Save, 
  RefreshCw, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  EyeOff,
  Copy,
  RotateCcw,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useThemeStore } from '../../store';
import AdminHeader from '../../components/AdminHeader';

interface ConfigSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface PlatformConfig {
  // Pricing Configuration
  maxPricePerKWP: number;
  commissionRate: number;
  discountRate: number;
  vatRate: number;
  
  // Payment Configuration
  paymentMethods: string[];
  minLoanAmount: number;
  maxLoanAmount: number;
  defaultInterestRate: number;
  loanTermOptions: number[];
  
  // Business Rules
  maxQuotesPerDay: number;
  quoteValidityDays: number;
  projectCompletionDeadline: number;
  
  // Regional Settings
  supportedCities: string[];
  defaultLanguage: string;
  defaultCurrency: string;
  timeZone: string;
  
  // Compliance Settings
  kycRequired: boolean;
  amlCheckRequired: boolean;
  samaCompliance: boolean;
  nafathIntegration: boolean;
  
  // System Settings
  maintenanceMode: boolean;
  apiRateLimit: number;
  sessionTimeout: number;
  dataRetentionDays: number;
}

const AdminSystemSettings: React.FC = () => {
  const { language } = useThemeStore();
  const [activeSection, setActiveSection] = useState('pricing');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock platform configuration
  const [config, setConfig] = useState<PlatformConfig>({
    maxPricePerKWP: 2000,
    commissionRate: 10,
    discountRate: 5,
    vatRate: 15,
    paymentMethods: ['credit_card', 'bank_transfer', 'digital_wallet'],
    minLoanAmount: 10000,
    maxLoanAmount: 1000000,
    defaultInterestRate: 8.5,
    loanTermOptions: [12, 18, 24, 30, 36],
    maxQuotesPerDay: 5,
    quoteValidityDays: 30,
    projectCompletionDeadline: 90,
    supportedCities: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Taif', 'Khobar', 'Yanbu'],
    defaultLanguage: 'ar',
    defaultCurrency: 'SAR',
    timeZone: 'Asia/Riyadh',
    kycRequired: true,
    amlCheckRequired: true,
    samaCompliance: true,
    nafathIntegration: true,
    maintenanceMode: false,
    apiRateLimit: 1000,
    sessionTimeout: 30,
    dataRetentionDays: 2555
  });

  const configSections: ConfigSection[] = [
    {
      id: 'pricing',
      title: language === 'en' ? 'Pricing & Commission' : 'التسعير والعمولة',
      icon: DollarSign,
      description: language === 'en' ? 'Configure pricing rules and commission rates' : 'تكوين قواعد التسعير ومعدلات العمولة'
    },
    {
      id: 'payments',
      title: language === 'en' ? 'Payment Settings' : 'إعدادات الدفع',
      icon: CreditCard,
      description: language === 'en' ? 'Payment methods and BNPL configuration' : 'طرق الدفع وتكوين التمويل المؤجل'
    },
    {
      id: 'business',
      title: language === 'en' ? 'Business Rules' : 'قواعد الأعمال',
      icon: Building,
      description: language === 'en' ? 'Platform business logic and constraints' : 'منطق الأعمال والقيود على المنصة'
    },
    {
      id: 'regional',
      title: language === 'en' ? 'Regional Settings' : 'الإعدادات الإقليمية',
      icon: Globe,
      description: language === 'en' ? 'Localization and regional preferences' : 'التوطين والتفضيلات الإقليمية'
    },
    {
      id: 'compliance',
      title: language === 'en' ? 'Compliance & Security' : 'الامتثال والأمان',
      icon: Shield,
      description: language === 'en' ? 'Regulatory compliance and security settings' : 'الامتثال التنظيمي وإعدادات الأمان'
    },
    {
      id: 'system',
      title: language === 'en' ? 'System Configuration' : 'تكوين النظام',
      icon: Server,
      description: language === 'en' ? 'Technical system settings and maintenance' : 'الإعدادات التقنية للنظام والصيانة'
    },
    {
      id: 'notifications',
      title: language === 'en' ? 'Notifications' : 'الإشعارات',
      icon: Bell,
      description: language === 'en' ? 'Email, SMS, and push notification settings' : 'إعدادات البريد الإلكتروني والرسائل النصية والإشعارات'
    },
    {
      id: 'apis',
      title: language === 'en' ? 'API & Integrations' : 'واجهات برمجة التطبيقات والتكامل',
      icon: Key,
      description: language === 'en' ? 'External API keys and integration settings' : 'مفاتيح واجهة برمجة التطبيقات الخارجية وإعدادات التكامل'
    }
  ];

  // Handle configuration changes
  const handleConfigChange = (key: keyof PlatformConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  // Handle array configuration changes
  const handleArrayConfigChange = (key: keyof PlatformConfig, action: 'add' | 'remove', value?: any) => {
    setConfig(prev => {
      const currentArray = prev[key] as any[];
      if (action === 'add' && value) {
        return { ...prev, [key]: [...currentArray, value] };
      } else if (action === 'remove' && value) {
        return { ...prev, [key]: currentArray.filter(item => item !== value) };
      }
      return prev;
    });
    setHasUnsavedChanges(true);
  };

  // Save configuration
  const handleSaveConfig = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setHasUnsavedChanges(false);
    setIsLoading(false);
    console.log('Configuration saved:', config);
  };

  // Reset configuration
  const handleResetConfig = () => {
    setHasUnsavedChanges(false);
    // Reset to default values
    console.log('Configuration reset');
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  // Render different configuration sections
  const renderConfigSection = () => {
    switch (activeSection) {
      case 'pricing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Pricing Configuration' : 'تكوين التسعير'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Maximum Price per KWP (SAR)' : 'الحد الأقصى للسعر لكل كيلوواط (ريال)'}
                  </label>
                  <input
                    type="number"
                    value={config.maxPricePerKWP}
                    onChange={(e) => handleConfigChange('maxPricePerKWP', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Maximum allowed price per kilowatt peak' : 'الحد الأقصى المسموح به للسعر لكل كيلوواط ذروة'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Platform Commission Rate (%)' : 'معدل عمولة المنصة (%)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.commissionRate}
                    onChange={(e) => handleConfigChange('commissionRate', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Commission charged to vendors per transaction' : 'العمولة المفروضة على الموردين لكل معاملة'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'User Discount Rate (%)' : 'معدل خصم المستخدم (%)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.discountRate}
                    onChange={(e) => handleConfigChange('discountRate', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Discount offered to end users' : 'الخصم المقدم للمستخدمين النهائيين'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'VAT Rate (%)' : 'معدل ضريبة القيمة المضافة (%)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.vatRate}
                    onChange={(e) => handleConfigChange('vatRate', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'VAT rate applied to transactions' : 'معدل ضريبة القيمة المضافة المطبق على المعاملات'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-medium text-blue-800 dark:text-blue-200">
                  {language === 'en' ? 'Pricing Formula' : 'معادلة التسعير'}
                </h4>
              </div>
              <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                {language === 'en' 
                  ? `Final Price = (Base Price + VAT ${config.vatRate}%) - User Discount ${config.discountRate}% + Platform Commission ${config.commissionRate}%`
                  : `السعر النهائي = (السعر الأساسي + ضريبة القيمة المضافة ${config.vatRate}%) - خصم المستخدم ${config.discountRate}% + عمولة المنصة ${config.commissionRate}%`
                }
              </p>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Payment Configuration' : 'تكوين الدفع'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Minimum Loan Amount (SAR)' : 'الحد الأدنى لمبلغ القرض (ريال)'}
                  </label>
                  <input
                    type="number"
                    value={config.minLoanAmount}
                    onChange={(e) => handleConfigChange('minLoanAmount', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Maximum Loan Amount (SAR)' : 'الحد الأقصى لمبلغ القرض (ريال)'}
                  </label>
                  <input
                    type="number"
                    value={config.maxLoanAmount}
                    onChange={(e) => handleConfigChange('maxLoanAmount', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Default Interest Rate (%)' : 'معدل الفائدة الافتراضي (%)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={config.defaultInterestRate}
                    onChange={(e) => handleConfigChange('defaultInterestRate', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                {language === 'en' ? 'Available Payment Methods' : 'طرق الدفع المتاحة'}
              </h4>
              <div className="space-y-2">
                {['credit_card', 'bank_transfer', 'digital_wallet', 'apple_pay', 'google_pay'].map((method) => (
                  <label key={method} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <input
                      type="checkbox"
                      checked={config.paymentMethods.includes(method)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleArrayConfigChange('paymentMethods', 'add', method);
                        } else {
                          handleArrayConfigChange('paymentMethods', 'remove', method);
                        }
                      }}
                      className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {language === 'en' ? 
                        method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) :
                        method === 'credit_card' ? 'بطاقة ائتمان' :
                        method === 'bank_transfer' ? 'تحويل بنكي' :
                        method === 'digital_wallet' ? 'محفظة رقمية' :
                        method === 'apple_pay' ? 'أبل باي' : 'جوجل باي'
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                {language === 'en' ? 'Loan Term Options (Months)' : 'خيارات مدة القرض (أشهر)'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {config.loanTermOptions.map((term) => (
                  <span key={term} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {term} {language === 'en' ? 'months' : 'شهر'}
                    <button
                      onClick={() => handleArrayConfigChange('loanTermOptions', 'remove', term)}
                      className="ml-2 rtl:ml-0 rtl:mr-2 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Plus className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                  {language === 'en' ? 'Add Term' : 'إضافة مدة'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Business Rules Configuration' : 'تكوين قواعد الأعمال'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Max Quotes Per Day (Per User)' : 'الحد الأقصى للعروض يومياً (لكل مستخدم)'}
                  </label>
                  <input
                    type="number"
                    value={config.maxQuotesPerDay}
                    onChange={(e) => handleConfigChange('maxQuotesPerDay', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Quote Validity (Days)' : 'صلاحية العرض (أيام)'}
                  </label>
                  <input
                    type="number"
                    value={config.quoteValidityDays}
                    onChange={(e) => handleConfigChange('quoteValidityDays', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Project Completion Deadline (Days)' : 'موعد إنجاز المشروع (أيام)'}
                  </label>
                  <input
                    type="number"
                    value={config.projectCompletionDeadline}
                    onChange={(e) => handleConfigChange('projectCompletionDeadline', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                  {language === 'en' ? 'Business Rule Impact' : 'تأثير قواعد الأعمال'}
                </h4>
              </div>
              <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                {language === 'en' 
                  ? 'Changes to business rules will affect user experience and vendor operations. Ensure proper testing before applying.'
                  : 'التغييرات في قواعد الأعمال ستؤثر على تجربة المستخدم وعمليات الموردين. تأكد من الاختبار المناسب قبل التطبيق.'
                }
              </p>
            </div>
          </div>
        );

      case 'regional':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Regional & Localization Settings' : 'الإعدادات الإقليمية والتوطين'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Default Language' : 'اللغة الافتراضية'}
                  </label>
                  <select
                    value={config.defaultLanguage}
                    onChange={(e) => handleConfigChange('defaultLanguage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="ar">{language === 'en' ? 'Arabic' : 'العربية'}</option>
                    <option value="en">{language === 'en' ? 'English' : 'الإنجليزية'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Default Currency' : 'العملة الافتراضية'}
                  </label>
                  <select
                    value={config.defaultCurrency}
                    onChange={(e) => handleConfigChange('defaultCurrency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="SAR">{language === 'en' ? 'Saudi Riyal (SAR)' : 'الريال السعودي'}</option>
                    <option value="USD">{language === 'en' ? 'US Dollar (USD)' : 'الدولار الأمريكي'}</option>
                    <option value="EUR">{language === 'en' ? 'Euro (EUR)' : 'اليورو'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Time Zone' : 'المنطقة الزمنية'}
                  </label>
                  <select
                    value={config.timeZone}
                    onChange={(e) => handleConfigChange('timeZone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="Asia/Riyadh">{language === 'en' ? 'Riyadh (UTC+3)' : 'الرياض (+3 GMT)'}</option>
                    <option value="UTC">{language === 'en' ? 'UTC' : 'التوقيت العالمي'}</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                {language === 'en' ? 'Supported Cities' : 'المدن المدعومة'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {config.supportedCities.map((city) => (
                  <div key={city} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-200">{city}</span>
                    <button
                      onClick={() => handleArrayConfigChange('supportedCities', 'remove', city)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-3 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Plus className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {language === 'en' ? 'Add City' : 'إضافة مدينة'}
              </button>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Compliance & Security Settings' : 'إعدادات الامتثال والأمان'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'KYC Required' : 'مطلوب التحقق من الهوية'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Require Know Your Customer verification for all users' : 'يتطلب التحقق من هوية العميل لجميع المستخدمين'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.kycRequired}
                      onChange={(e) => handleConfigChange('kycRequired', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'AML Check Required' : 'فحص مكافحة غسل الأموال مطلوب'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Enable Anti-Money Laundering checks' : 'تفعيل فحوصات مكافحة غسل الأموال'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.amlCheckRequired}
                      onChange={(e) => handleConfigChange('amlCheckRequired', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'SAMA Compliance' : 'امتثال مؤسسة النقد العربي السعودي'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Enable Saudi Arabian Monetary Authority compliance' : 'تفعيل امتثال مؤسسة النقد العربي السعودي'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.samaCompliance}
                      onChange={(e) => handleConfigChange('samaCompliance', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'NAFATH Integration' : 'تكامل نفاذ'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Enable Saudi digital identity verification via NAFATH' : 'تفعيل التحقق من الهوية الرقمية السعودية عبر نفاذ'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.nafathIntegration}
                      onChange={(e) => handleConfigChange('nafathIntegration', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h4 className="font-medium text-green-800 dark:text-green-200">
                  {language === 'en' ? 'Compliance Status' : 'حالة الامتثال'}
                </h4>
              </div>
              <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                {language === 'en' 
                  ? 'All compliance requirements are currently enabled and functioning properly.'
                  : 'جميع متطلبات الامتثال مفعلة حالياً وتعمل بشكل صحيح.'
                }
              </p>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'System Configuration' : 'تكوين النظام'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'API Rate Limit (requests/hour)' : 'حد معدل API (طلبات/ساعة)'}
                  </label>
                  <input
                    type="number"
                    value={config.apiRateLimit}
                    onChange={(e) => handleConfigChange('apiRateLimit', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Session Timeout (minutes)' : 'انتهاء صلاحية الجلسة (دقائق)'}
                  </label>
                  <input
                    type="number"
                    value={config.sessionTimeout}
                    onChange={(e) => handleConfigChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Data Retention (days)' : 'الاحتفاظ بالبيانات (أيام)'}
                  </label>
                  <input
                    type="number"
                    value={config.dataRetentionDays}
                    onChange={(e) => handleConfigChange('dataRetentionDays', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Maintenance Mode' : 'وضع الصيانة'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Enable maintenance mode to restrict platform access' : 'تفعيل وضع الصيانة لتقييد الوصول للمنصة'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.maintenanceMode}
                  onChange={(e) => handleConfigChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {config.maintenanceMode && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h4 className="font-medium text-red-800 dark:text-red-200">
                    {language === 'en' ? 'Maintenance Mode Active' : 'وضع الصيانة نشط'}
                  </h4>
                </div>
                <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {language === 'en' 
                    ? 'Platform is currently in maintenance mode. Users will see a maintenance page.'
                    : 'المنصة حالياً في وضع الصيانة. سيرى المستخدمون صفحة الصيانة.'
                  }
                </p>
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Notification Settings' : 'إعدادات الإشعارات'}
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                    {language === 'en' ? 'Email Notifications' : 'إشعارات البريد الإلكتروني'}
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'Welcome emails for new users' : 'رسائل ترحيب للمستخدمين الجدد'}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'Quote updates and confirmations' : 'تحديثات وتأكيدات العروض'}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'Payment reminders and confirmations' : 'تذكيرات وتأكيدات الدفع'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                    {language === 'en' ? 'SMS Notifications' : 'إشعارات الرسائل النصية'}
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'OTP verification codes' : 'رموز التحقق OTP'}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'Critical updates and alerts' : 'التحديثات والتنبيهات المهمة'}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'Marketing and promotional messages' : 'الرسائل التسويقية والترويجية'}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                    {language === 'en' ? 'Push Notifications' : 'الإشعارات الفورية'}
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'Real-time project updates' : 'تحديثات المشروع الفورية'}
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 rtl:space-x-reverse">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'New messages and communications' : 'الرسائل والاتصالات الجديدة'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'apis':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'API Keys & Integrations' : 'مفاتيح API والتكامل'}
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'Platform API Key' : 'مفتاح API للمنصة'}
                    </h4>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value="sk_live_51234567890abcdefghijklmnopqrstuvwxyz"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                    />
                    <button className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">NAFATH</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {language === 'en' ? 'Connected' : 'متصل'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {language === 'en' ? 'Saudi digital identity verification' : 'التحقق من الهوية الرقمية السعودية'}
                    </p>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center space-x-1 rtl:space-x-reverse">
                      <ExternalLink className="w-3 h-3" />
                      <span>{language === 'en' ? 'Manage' : 'إدارة'}</span>
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Stripe</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {language === 'en' ? 'Connected' : 'متصل'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {language === 'en' ? 'Payment processing platform' : 'منصة معالجة المدفوعات'}
                    </p>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center space-x-1 rtl:space-x-reverse">
                      <ExternalLink className="w-3 h-3" />
                      <span>{language === 'en' ? 'Manage' : 'إدارة'}</span>
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Saudi Post</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        {language === 'en' ? 'Pending' : 'معلق'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {language === 'en' ? 'Address verification service' : 'خدمة التحقق من العنوان'}
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center space-x-1 rtl:space-x-reverse">
                      <Plus className="w-3 h-3" />
                      <span>{language === 'en' ? 'Setup' : 'إعداد'}</span>
                    </button>
                  </div>

                  <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Twilio</h4>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {language === 'en' ? 'Connected' : 'متصل'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {language === 'en' ? 'SMS and communication services' : 'خدمات الرسائل النصية والاتصالات'}
                    </p>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center space-x-1 rtl:space-x-reverse">
                      <ExternalLink className="w-3 h-3" />
                      <span>{language === 'en' ? 'Manage' : 'إدارة'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AdminHeader
          title={language === 'en' ? 'System Settings' : 'إعدادات النظام'}
          description={language === 'en' 
            ? 'Configure platform settings, business rules, and system preferences'
            : 'تكوين إعدادات المنصة وقواعد الأعمال وتفضيلات النظام'
          }
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {hasUnsavedChanges && (
              <span className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center space-x-1 rtl:space-x-reverse">
                <AlertTriangle className="w-4 h-4" />
                <span>{language === 'en' ? 'Unsaved changes' : 'تغييرات غير محفوظة'}</span>
              </span>
            )}
            
            <button 
              onClick={handleResetConfig}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{language === 'en' ? 'Reset' : 'إعادة تعيين'}</span>
            </button>
            
            <button 
              onClick={handleSaveConfig}
              disabled={!hasUnsavedChanges || isLoading}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}</span>
            </button>
          </div>
        </AdminHeader>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-80"
          >
            <div className="card p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Configuration Sections' : 'أقسام التكوين'}
              </h3>
              
              <nav className="space-y-2">
                {configSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-200 dark:border-emerald-700'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Icon className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{section.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {hasUnsavedChanges && (
                <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {language === 'en' 
                        ? 'You have unsaved changes. Remember to save before leaving.'
                        : 'لديك تغييرات غير محفوظة. تذكر الحفظ قبل المغادرة.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <div className="card p-8">
              {renderConfigSection()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemSettings;