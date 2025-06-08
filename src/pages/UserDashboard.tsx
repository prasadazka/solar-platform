import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  TrendingUp, 
  Calendar, 
  Leaf, 
  DollarSign, 
  Battery,
  Sun,
  Home,
  Award,
  ArrowRight,
  Calculator,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Settings,
  Bell,
  Download,
  Eye,
  Plus,
  Star,
  X,
  CreditCard
} from 'lucide-react';
import { useThemeStore, useAuthStore } from '../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ContactModal from '../components/ContactModal';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from '../components/Toast';

const UserDashboard: React.FC = () => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  // User journey state - this would come from user profile/database in real app
  const [userState, setUserState] = useState<'new' | 'quote_pending' | 'project_active' | 'system_installed'>('new');
  
  // Multi-system states for detailed view
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  
  // Contact modal state
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean;
    vendorName: string;
  }>({ isOpen: false, vendorName: '' });

  // Payment plan modal state
  const [paymentPlanModal, setPaymentPlanModal] = useState<{
    isOpen: boolean;
    quote: any;
  }>({ isOpen: false, quote: null });

  // Confirmation modal state
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'success' | 'warning' | 'info' | 'danger';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'info'
  });

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
  
  // Mock user progress data
  const userProgress = {
    profileComplete: 85,
    documentsUploaded: true,
    emailVerified: true,
    phoneVerified: false,
    quotesReceived: 0,
    activeProject: null,
    systemInstalled: false
  };

  // Navigation handlers
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'calculator':
        navigate('/calculator');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'quotes':
        navigate('/quotes');
        break;
      case 'financing':
        navigate('/financing');
        break;
      case 'financing-status':
        navigate('/financing/status');
        break;
      case 'payments':
        navigate('/payments');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'maintenance':
        navigate('/maintenance');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  // Render dashboard based on user state
  const renderDashboardContent = () => {
    switch (userState) {
      case 'new':
        return renderNewUserDashboard();
      case 'quote_pending':
        return renderQuotePendingDashboard();
      case 'project_active':
        return renderProjectActiveDashboard();
      case 'system_installed':
        return renderInstalledSystemDashboard();
      default:
        return renderNewUserDashboard();
    }
  };

  // New User Dashboard - No solar system yet
  const renderNewUserDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'en' 
                  ? `Welcome to RABHAN, ${user?.name}!` 
                  : `مرحباً بك في رابحان، ${user?.name}!`
                }
              </h1>
              <p className="text-lg opacity-90 mb-6">
                {language === 'en' 
                  ? 'Start your solar journey and save up to 70% on electricity bills'
                  : 'ابدأ رحلتك مع الطاقة الشمسية ووفر حتى 70% من فواتير الكهرباء'
                }
              </p>
              <button 
                onClick={() => handleQuickAction('calculator')}
                className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Calculator className="w-5 h-5" />
                <span>{language === 'en' ? 'Calculate Solar Savings' : 'احسب وفورات الطاقة الشمسية'}</span>
              </button>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <Sun className="w-16 h-16 text-yellow-300" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Start Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div 
          onClick={() => handleQuickAction('calculator')}
          className="card p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {language === 'en' ? 'Solar Calculator' : 'حاسبة الطاقة الشمسية'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {language === 'en' 
              ? 'Calculate potential savings and system size for your property'
              : 'احسب الوفورات المحتملة وحجم النظام لعقارك'
            }
          </p>
          <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
            <span>{language === 'en' ? 'Start Calculation' : 'ابدأ الحساب'}</span>
            <ArrowRight className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
          </div>
        </div>

        <div 
          onClick={() => handleQuickAction('quotes')}
          className="card p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {language === 'en' ? 'Get Quotes' : 'احصل على عروض'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {language === 'en' 
              ? 'Request quotes from certified solar contractors'
              : 'اطلب عروض من مقاولي الطاقة الشمسية المعتمدين'
            }
          </p>
          <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <span>{language === 'en' ? 'Request Quotes' : 'اطلب عروض'}</span>
            <ArrowRight className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
          </div>
        </div>

        <div 
          onClick={() => handleQuickAction('financing')}
          className="card p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {language === 'en' ? 'BNPL Financing' : 'التمويل المؤجل'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            {language === 'en' 
              ? 'Learn about 0% interest financing options'
              : 'تعرف على خيارات التمويل بدون فوائد'
            }
          </p>
          <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
            <span>{language === 'en' ? 'Learn More' : 'اعرف المزيد'}</span>
            <ArrowRight className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </motion.div>

      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {language === 'en' ? 'Complete Your Profile' : 'أكمل ملفك الشخصي'}
          </h3>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {userProgress.profileComplete}%
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${userProgress.profileComplete}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Email Verified' : 'تم التحقق من البريد'}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Phone Verification' : 'التحقق من الهاتف'}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Documents Uploaded' : 'تم رفع المستندات'}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Property Details' : 'تفاصيل العقار'}
            </span>
          </div>
        </div>

        <button 
          onClick={() => handleQuickAction('profile')}
          className="btn-primary max-w-xs"
        >
          {language === 'en' ? 'Complete Profile' : 'أكمل الملف الشخصي'}
        </button>
      </motion.div>
    </div>
  );
  // Quote Pending Dashboard - Shows active quotes and comparison
  const renderQuotePendingDashboard = () => {
    const mockQuotes = [
      {
        id: 'q1',
        vendorName: 'Solar Solutions KSA',
        vendorRating: 4.8,
        systemSize: 12,
        totalPrice: 85000,
        monthlyPayment: 2400,
        installationDate: '2024-02-15',
        status: 'received',
        highlights: ['Premium Tier 1 Panels', '25-year warranty', 'Free maintenance 3 years']
      },
      {
        id: 'q2',
        vendorName: 'Green Energy Arabia',
        vendorRating: 4.6,
        systemSize: 12,
        totalPrice: 92000,
        monthlyPayment: 2600,
        installationDate: '2024-02-20',
        status: 'received',
        highlights: ['German inverters', 'Smart monitoring', '20-year guarantee']
      },
      {
        id: 'q3',
        vendorName: 'Sun Power Saudi',
        vendorRating: 4.9,
        systemSize: 12,
        totalPrice: 78000,
        monthlyPayment: 2200,
        installationDate: '2024-02-10',
        status: 'pending',
        highlights: ['Highest efficiency 22%', 'Battery option', 'SASO certified']
      }
    ];

    // Quote action handlers
    const handleAcceptQuote = (quote: any) => {
      // Show payment plan modal first
      setPaymentPlanModal({
        isOpen: true,
        quote: quote
      });
    };

    const handleContactVendor = (quote: any) => {
      // Open enhanced contact modal
      setContactModal({
        isOpen: true,
        vendorName: quote.vendorName
      });
    };

    return (
      <div className="space-y-8">
        {/* Quote Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="card p-6 text-center">
            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Total Quotes' : 'إجمالي العروض'}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">2</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Received' : 'مستلمة'}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Pending' : 'في الانتظار'}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <DollarSign className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">78K</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Best Price (SAR)' : 'أفضل سعر (ريال)'}
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/quotes')}
              className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <Eye className="w-5 h-5" />
              <span>{language === 'en' ? 'Compare Quotes' : 'قارن العروض'}</span>
            </button>
            
            <button 
              onClick={() => navigate('/quotes/request')}
              className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <Plus className="w-5 h-5" />
              <span>{language === 'en' ? 'Request More' : 'طلب المزيد'}</span>
            </button>

            <button 
              onClick={() => navigate('/payments/bnpl')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <CreditCard className="w-5 h-5" />
              <span>{language === 'en' ? 'My Payments' : 'مدفوعاتي'}</span>
            </button>
            
            <button className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <Download className="w-5 h-5" />
              <span>{language === 'en' ? 'Download All' : 'تحميل الجميع'}</span>
            </button>
          </div>
        </motion.div>

        {/* Quote Comparison Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {language === 'en' ? 'Received Quotes' : 'العروض المستلمة'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockQuotes.filter(q => q.status === 'received').map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {quote.vendorName}
                    </h4>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {quote.vendorRating}
                      </span>
                    </div>
                  </div>

                  {/* Price Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'en' ? 'Total Price' : 'السعر الإجمالي'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {quote.totalPrice.toLocaleString()} SAR
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {language === 'en' ? 'Monthly' : 'شهري'}
                      </p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {quote.monthlyPayment.toLocaleString()} SAR
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {quote.highlights.slice(0, 3).map((highlight, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 rtl:space-x-reverse pt-4">
                    <button 
                      onClick={() => handleAcceptQuote(quote)}
                      className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      {language === 'en' ? 'Accept Quote' : 'قبول العرض'}
                    </button>
                    
                    <button 
                      onClick={() => handleContactVendor(quote)}
                      className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-semibold transition-all duration-200"
                    >
                      {language === 'en' ? 'Contact Vendor' : 'تواصل مع المقاول'}
                    </button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <button 
                      onClick={() => navigate('/quotes')}
                      className="flex-1 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                    >
                      {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                    </button>
                    
                    <button 
                      onClick={() => window.open('#', '_blank')}
                      className="flex-1 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                    >
                      {language === 'en' ? 'Download Proposal' : 'تحميل المقترح'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderProjectActiveDashboard = () => {
    const projectData = {
      projectId: 'PROJ-2024-001',
      vendorName: 'Solar Solutions KSA',
      systemSize: 12,
      totalPrice: 85000,
      startDate: '2024-01-15',
      estimatedCompletion: '2024-02-15',
      currentPhase: 'installation',
      progress: 65
    };

    const milestones = [
      {
        id: 1,
        title: language === 'en' ? 'Contract Signed' : 'توقيع العقد',
        status: 'completed',
        date: '2024-01-15',
        description: language === 'en' ? 'Project contract finalized' : 'تم الانتهاء من عقد المشروع'
      },
      {
        id: 2,
        title: language === 'en' ? 'Site Survey' : 'مسح الموقع',
        status: 'completed',
        date: '2024-01-18',
        description: language === 'en' ? 'Technical site assessment completed' : 'تم الانتهاء من التقييم التقني للموقع'
      },
      {
        id: 3,
        title: language === 'en' ? 'Permits & Approvals' : 'التصاريح والموافقات',
        status: 'completed',
        date: '2024-01-25',
        description: language === 'en' ? 'All regulatory approvals obtained' : 'تم الحصول على جميع الموافقات التنظيمية'
      },
      {
        id: 4,
        title: language === 'en' ? 'Installation' : 'التركيب',
        status: 'active',
        date: '2024-02-01',
        description: language === 'en' ? 'Solar panels and equipment installation' : 'تركيب الألواح الشمسية والمعدات'
      },
      {
        id: 5,
        title: language === 'en' ? 'Grid Connection' : 'ربط الشبكة',
        status: 'pending',
        date: '2024-02-12',
        description: language === 'en' ? 'Utility grid connection and testing' : 'ربط الشبكة العامة والاختبار'
      },
      {
        id: 6,
        title: language === 'en' ? 'Final Inspection' : 'الفحص النهائي',
        status: 'pending',
        date: '2024-02-15',
        description: language === 'en' ? 'System commissioning and handover' : 'تشغيل النظام والتسليم'
      }
    ];

    const upcomingTasks = [
      {
        task: language === 'en' ? 'Panel installation completion' : 'إكمال تركيب الألواح',
        date: '2024-02-08',
        time: '09:00 AM'
      },
      {
        task: language === 'en' ? 'Electrical connections' : 'التوصيلات الكهربائية',
        date: '2024-02-10',
        time: '10:00 AM'
      },
      {
        task: language === 'en' ? 'System testing' : 'اختبار النظام',
        date: '2024-02-12',
        time: '02:00 PM'
      }
    ];

    return (
      <div className="space-y-8">
        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'Solar Installation Project' : 'مشروع تركيب الطاقة الشمسية'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Project ID:' : 'رقم المشروع:'} {projectData.projectId}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Contractor:' : 'المقاول:'} {projectData.vendorName}
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {projectData.progress}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Complete' : 'مكتمل'}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${projectData.progress}%` }}
            ></div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'System Size' : 'حجم النظام'}
              </h4>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {projectData.systemSize} kW
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Start Date' : 'تاريخ البداية'}
              </h4>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {new Date(projectData.startDate).toLocaleDateString()}
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Expected Completion' : 'تاريخ الانتهاء المتوقع'}
              </h4>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {new Date(projectData.estimatedCompletion).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Project Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Project Timeline' : 'الجدول الزمني للمشروع'}
          </h3>
          
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  milestone.status === 'completed' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    : milestone.status === 'active'
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : milestone.status === 'active' ? (
                    <Settings className="w-5 h-5 animate-spin" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {milestone.title}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(milestone.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks & Communication */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Upcoming Tasks' : 'المهام القادمة'}
            </h3>
            
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {task.task}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(task.date).toLocaleDateString()} at {task.time}
                    </p>
                  </div>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Communication Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Project Communication' : 'تواصل المشروع'}
            </h3>
            
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Users className="w-5 h-5" />
                <span>{language === 'en' ? 'Contact Project Manager' : 'تواصل مع مدير المشروع'}</span>
              </button>
              
              <button className="w-full btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <FileText className="w-5 h-5" />
                <span>{language === 'en' ? 'View Project Documents' : 'عرض مستندات المشروع'}</span>
              </button>
              
              <button className="w-full btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Calendar className="w-5 h-5" />
                <span>{language === 'en' ? 'Schedule Site Visit' : 'جدولة زيارة الموقع'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderInstalledSystemDashboard = () => {
    // Mock data for multiple solar systems
    const solarSystems = [
      {
        id: 'SYS-001',
        name: language === 'en' ? 'Main Residence System' : 'نظام المنزل الرئيسي',
        location: language === 'en' ? 'Rooftop - Main Building' : 'السطح - المبنى الرئيسي',
        size: 12,
        status: 'active',
        efficiency: 94,
        currentProduction: 850,
        dailyProduction: 9.2,
        monthlyProduction: 275,
        yearlyProduction: 3200,
        totalSavings: 8450,
        co2Saved: 2.8,
        installDate: '2023-08-15',
        lastMaintenance: '2024-05-15',
        warranty: 'Active - 24 years remaining',
        inverterStatus: 'Normal',
        devices: [
          { type: 'Solar Panels', count: 36, status: 'active', efficiency: 95 },
          { type: 'Inverter', count: 1, status: 'active', efficiency: 97 },
          { type: 'Monitoring System', count: 1, status: 'active', efficiency: 100 }
        ]
      },
      {
        id: 'SYS-002', 
        name: language === 'en' ? 'Guest House System' : 'نظام بيت الضيوف',
        location: language === 'en' ? 'Rooftop - Guest Building' : 'السطح - مبنى الضيوف',
        size: 6,
        status: 'active',
        efficiency: 91,
        currentProduction: 420,
        dailyProduction: 4.8,
        monthlyProduction: 142,
        yearlyProduction: 1650,
        totalSavings: 4200,
        co2Saved: 1.4,
        installDate: '2024-01-20',
        lastMaintenance: '2024-04-20',
        warranty: 'Active - 24.5 years remaining',
        inverterStatus: 'Normal',
        devices: [
          { type: 'Solar Panels', count: 18, status: 'active', efficiency: 92 },
          { type: 'Inverter', count: 1, status: 'active', efficiency: 95 },
          { type: 'Monitoring System', count: 1, status: 'active', efficiency: 100 }
        ]
      },
      {
        id: 'SYS-003',
        name: language === 'en' ? 'Garage & Workshop System' : 'نظام الجراج والورشة',
        location: language === 'en' ? 'Rooftop - Garage Building' : 'السطح - مبنى الجراج',
        size: 4,
        status: 'maintenance',
        efficiency: 88,
        currentProduction: 0,
        dailyProduction: 0,
        monthlyProduction: 95,
        yearlyProduction: 1100,
        totalSavings: 2800,
        co2Saved: 0.9,
        installDate: '2024-03-10',
        lastMaintenance: '2024-06-01',
        warranty: 'Active - 24.7 years remaining',
        inverterStatus: 'Maintenance Required',
        devices: [
          { type: 'Solar Panels', count: 12, status: 'active', efficiency: 89 },
          { type: 'Inverter', count: 1, status: 'maintenance', efficiency: 0 },
          { type: 'Monitoring System', count: 1, status: 'active', efficiency: 100 }
        ]
      }
    ];

    // Overall stats combining all systems
    const totalCurrentProduction = solarSystems.reduce((sum, sys) => sum + sys.currentProduction, 0);
    const totalDailyProduction = solarSystems.reduce((sum, sys) => sum + sys.dailyProduction, 0);
    const totalMonthlySavings = solarSystems.reduce((sum, sys) => sum + sys.totalSavings, 0);
    const totalCO2Saved = solarSystems.reduce((sum, sys) => sum + sys.co2Saved, 0);
    const averageEfficiency = Math.round(solarSystems.reduce((sum, sys) => sum + sys.efficiency, 0) / solarSystems.length);

    const combinedStats = [
      {
        title: language === 'en' ? 'Total Current Output' : 'إجمالي الإنتاج الحالي',
        value: totalCurrentProduction.toString(),
        unit: 'W',
        icon: Zap,
        change: '+8%',
        color: 'yellow'
      },
      {
        title: language === 'en' ? 'Today\'s Production' : 'إنتاج اليوم',
        value: totalDailyProduction.toString(),
        unit: language === 'en' ? 'kWh' : 'كيلوواط/ساعة',
        icon: Sun,
        change: '+12%',
        color: 'orange'
      },
      {
        title: language === 'en' ? 'Total Savings' : 'إجمالي الوفورات',
        value: totalMonthlySavings.toLocaleString(),
        unit: language === 'en' ? 'SAR' : 'ريال',
        icon: DollarSign,
        change: '+15%',
        color: 'emerald'
      },
      {
        title: language === 'en' ? 'CO₂ Offset' : 'تقليل الكربون',
        value: totalCO2Saved.toString(),
        unit: language === 'en' ? 'Tons' : 'طن',
        icon: Leaf,
        change: '+18%',
        color: 'green'
      },
      {
        title: language === 'en' ? 'Average Efficiency' : 'متوسط الكفاءة',
        value: averageEfficiency.toString(),
        unit: '%',
        icon: Battery,
        change: '+2%',
        color: 'blue'
      },
      {
        title: language === 'en' ? 'Active Systems' : 'الأنظمة النشطة',
        value: solarSystems.filter(sys => sys.status === 'active').length.toString(),
        unit: `/ ${solarSystems.length}`,
        icon: Home,
        change: '100%',
        color: 'purple'
      }
    ];

    // Sample chart data
    const energyData = [
      { month: language === 'en' ? 'Jan' : 'يناير', production: 1200, consumption: 900, savings: 300 },
      { month: language === 'en' ? 'Feb' : 'فبراير', production: 1100, consumption: 850, savings: 250 },
      { month: language === 'en' ? 'Mar' : 'مارس', production: 1350, consumption: 920, savings: 430 },
      { month: language === 'en' ? 'Apr' : 'أبريل', production: 1450, consumption: 980, savings: 470 },
      { month: language === 'en' ? 'May' : 'مايو', production: 1600, consumption: 1050, savings: 550 },
      { month: language === 'en' ? 'Jun' : 'يونيو', production: 1800, consumption: 1200, savings: 600 },
    ];

    const dailyProduction = [
      { time: '06:00', power: 0 },
      { time: '08:00', power: 150 },
      { time: '10:00', power: 400 },
      { time: '12:00', power: 650 },
      { time: '14:00', power: 800 },
      { time: '16:00', power: 450 },
      { time: '18:00', power: 100 },
      { time: '20:00', power: 0 },
    ];

    return (
      <div className="space-y-8">
        {/* Header for installed system */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? `Welcome back, ${user?.name}!` : `مرحباً بعودتك، ${user?.name}!`}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? `Managing ${solarSystems.length} solar energy systems`
                : `إدارة ${solarSystems.length} أنظمة الطاقة الشمسية`
              }
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-right rtl:text-left">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {totalCurrentProduction}W
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Total Production' : 'إجمالي الإنتاج'}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'overview'
                  ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                viewMode === 'detailed'
                  ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {language === 'en' ? 'Detailed View' : 'عرض تفصيلي'}
            </button>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className={`w-3 h-3 rounded-full ${solarSystems.every(sys => sys.status === 'active') ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {solarSystems.filter(sys => sys.status === 'active').length} / {solarSystems.length} {language === 'en' ? 'Systems Active' : 'نظام نشط'}
            </span>
          </div>
        </motion.div>

        {viewMode === 'overview' ? (
          // Overview Mode - Combined Stats + System Cards
          <>
            {/* Combined Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {combinedStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="card p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                      </div>
                      <span className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 px-2 py-1 rounded-lg`}>
                        {stat.change}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* System Overview Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Solar Systems Overview' : 'نظرة عامة على الأنظمة الشمسية'}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {solarSystems.map((system, index) => (
                  <motion.div
                    key={system.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="card p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      setSelectedSystem(system.id);
                      setViewMode('detailed');
                    }}
                  >
                    {/* System Status Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        system.status === 'active' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : system.status === 'maintenance'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {system.status === 'active' 
                          ? (language === 'en' ? 'Active' : 'نشط')
                          : system.status === 'maintenance'
                          ? (language === 'en' ? 'Maintenance' : 'صيانة')
                          : (language === 'en' ? 'Offline' : 'غير متصل')
                        }
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
                    </div>

                    {/* System Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {system.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {system.location}
                      </p>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
                        <span className="flex items-center">
                          <Zap className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1 text-blue-500" />
                          {system.size} kW
                        </span>
                        <span className="flex items-center">
                          <Battery className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1 text-green-500" />
                          {system.efficiency}%
                        </span>
                      </div>
                    </div>

                    {/* Current Production */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {language === 'en' ? 'Current Output' : 'الإنتاج الحالي'}
                      </p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {system.currentProduction}W
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {language === 'en' ? 'Today' : 'اليوم'}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {system.dailyProduction} kWh
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {language === 'en' ? 'Savings' : 'الوفورات'}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {system.totalSavings.toLocaleString()} SAR
                        </p>
                      </div>
                    </div>

                    {/* Mini Chart or Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                        <span>{language === 'en' ? 'Efficiency' : 'الكفاءة'}</span>
                        <span>{system.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            system.efficiency >= 90 ? 'bg-green-500' : 
                            system.efficiency >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${system.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          // Detailed View Mode
          <>
            {/* System Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Select System for Detailed View' : 'اختر النظام للعرض التفصيلي'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {solarSystems.map((system) => (
                  <button
                    key={system.id}
                    onClick={() => setSelectedSystem(system.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left rtl:text-right ${
                      selectedSystem === system.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {system.name}
                      </h3>
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'active' ? 'bg-green-500' : 
                        system.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {system.size} kW • {system.currentProduction}W
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Detailed System View */}
            {selectedSystem && (
              <>
                {(() => {
                  const system = solarSystems.find(s => s.id === selectedSystem);
                  if (!system) return null;

                  return (
                    <>
                      {/* System Details Header */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card p-6"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                              {system.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              {language === 'en' ? 'System ID:' : 'رقم النظام:'} {system.id}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              {language === 'en' ? 'Location:' : 'الموقع:'} {system.location}
                            </p>
                          </div>
                          
                          <div className="mt-4 lg:mt-0 text-center">
                            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                              {system.efficiency}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {language === 'en' ? 'Efficiency' : 'الكفاءة'}
                            </div>
                          </div>
                        </div>

                        {/* System Key Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="text-center">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {language === 'en' ? 'System Size' : 'حجم النظام'}
                            </h4>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                              {system.size} kW
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {language === 'en' ? 'Current Output' : 'الإنتاج الحالي'}
                            </h4>
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                              {system.currentProduction}W
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {language === 'en' ? 'Install Date' : 'تاريخ التركيب'}
                            </h4>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {new Date(system.installDate).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {language === 'en' ? 'Total Savings' : 'إجمالي الوفورات'}
                            </h4>
                            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                              {system.totalSavings.toLocaleString()} SAR
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Device Status Cards */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {language === 'en' ? 'Device Status' : 'حالة الأجهزة'}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {system.devices.map((device, index) => (
                            <div key={index} className="card p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                  {device.type}
                                </h4>
                                <div className={`w-3 h-3 rounded-full ${
                                  device.status === 'active' ? 'bg-green-500' : 
                                  device.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {language === 'en' ? 'Count' : 'العدد'}
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {device.count}
                                  </span>
                                </div>
                                
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {language === 'en' ? 'Efficiency' : 'الكفاءة'}
                                  </span>
                                  <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {device.efficiency}%
                                  </span>
                                </div>
                                
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {language === 'en' ? 'Status' : 'الحالة'}
                                  </span>
                                  <span className={`text-sm font-medium ${
                                    device.status === 'active' ? 'text-green-600 dark:text-green-400' : 
                                    device.status === 'maintenance' ? 'text-yellow-600 dark:text-yellow-400' : 
                                    'text-red-600 dark:text-red-400'
                                  }`}>
                                    {device.status === 'active' ? (language === 'en' ? 'Active' : 'نشط') :
                                     device.status === 'maintenance' ? (language === 'en' ? 'Maintenance' : 'صيانة') :
                                     (language === 'en' ? 'Offline' : 'غير متصل')
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  );
                })()}
              </>
            )}
          </>
        )}

        {/* Charts Section - Always Show */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Energy Production Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Monthly Energy Overview' : 'نظرة عامة على الطاقة الشهرية'}
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="production" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stackId="2"
                    stroke="#f59e0b" 
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Daily Production Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Today\'s Production' : 'إنتاج اليوم'}
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyProduction}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="power" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('maintenance')}
              className="p-4 text-left rtl:text-right rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Schedule Maintenance' : 'جدولة الصيانة'}
                </span>
              </div>
            </button>
            
            <button 
              onClick={() => handleQuickAction('reports')}
              className="p-4 text-left rtl:text-right rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'View Reports' : 'عرض التقارير'}
                </span>
              </div>
            </button>
            
            <button 
              onClick={() => handleQuickAction('settings')}
              className="p-4 text-left rtl:text-right rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'System Settings' : 'إعدادات النظام'}
                </span>
              </div>
            </button>

            <button 
              onClick={() => handleQuickAction('payments')}
              className="p-4 text-left rtl:text-right rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Payment History' : 'تاريخ المدفوعات'}
                </span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    );
  };
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Journey Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Your Solar Journey' : 'رحلتك مع الطاقة الشمسية'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  key: 'new',
                  icon: '🌟',
                  title: language === 'en' ? 'Getting Started' : 'البداية',
                  description: language === 'en' ? 'Explore solar options' : 'استكشف خيارات الطاقة الشمسية'
                },
                {
                  key: 'quote_pending',
                  icon: '📋',
                  title: language === 'en' ? 'Quotes Received' : 'العروض المستلمة',
                  description: language === 'en' ? 'Compare vendor quotes' : 'قارن عروض الموردين'
                },
                {
                  key: 'project_active',
                  icon: '🔧',
                  title: language === 'en' ? 'Installation' : 'التركيب',
                  description: language === 'en' ? 'System being installed' : 'جاري تركيب النظام'
                },
                {
                  key: 'system_installed',
                  icon: '⚡',
                  title: language === 'en' ? 'System Active' : 'النظام نشط',
                  description: language === 'en' ? 'Generating clean energy' : 'ينتج طاقة نظيفة'
                }
              ].map((stage, index) => (
                <button
                  key={stage.key}
                  onClick={() => setUserState(stage.key as any)}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left rtl:text-right ${
                    userState === stage.key
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg ring-2 ring-emerald-500/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400 bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  {userState === stage.key && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  <div className="text-3xl mb-3">{stage.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {stage.description}
                  </p>
                  
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'en' 
                  ? 'Click any stage to preview that experience'
                  : 'انقر على أي مرحلة لمعاينة تلك التجربة'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Render appropriate dashboard */}
        {renderDashboardContent()}

        {/* Payment Plan Modal */}
        {paymentPlanModal.isOpen && paymentPlanModal.quote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setPaymentPlanModal({ isOpen: false, quote: null })}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-md w-full border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Payment Plan' : 'خطة الدفع'}
                  </h2>
                </div>

                {/* Most Popular Badge */}
                <div className="relative mb-6">
                  <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full inline-block">
                    {language === 'en' ? 'MOST POPULAR' : 'الأكثر شعبية'}
                  </div>
                </div>

                {/* Payment Details */}
                <div className="mb-8">
                  <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">24 Months</div>
                  <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {paymentPlanModal.quote.monthlyPayment.toLocaleString()}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 mb-6">SAR per month</div>
                  
                  {/* Features */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{language === 'en' ? 'No Interest - 0% APR' : 'بدون فوائد - 0% معدل سنوي'}</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{language === 'en' ? 'Balanced payment plan' : 'خطة دفع متوازنة'}</span>
                    </div>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                  {language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}: {paymentPlanModal.quote.totalPrice.toLocaleString()} SAR
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      setPaymentPlanModal({ isOpen: false, quote: null });
                      
                      // Show success toast
                      showToast(
                        language === 'en' ? 'Quote Accepted!' : 'تم قبول العرض!',
                        language === 'en' ? 'Redirecting to payment summary...' : 'جاري التوجيه لملخص الدفع...',
                        'success'
                      );
                      
                      // Navigate to payments instead of financing
                      setTimeout(() => {
                        navigate('/payments', {
                          state: {
                            quote: paymentPlanModal.quote,
                            paymentPlan: {
                              months: 24,
                              monthlyAmount: paymentPlanModal.quote.monthlyPayment,
                              totalAmount: paymentPlanModal.quote.totalPrice,
                              interestRate: 0
                            },
                            status: 'accepted'
                          }
                        });
                      }, 1500);
                    }}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    {language === 'en' ? 'Accept & View Payment Summary' : 'اقبل واعرض ملخص الدفع'}
                  </button>
                  
                  <button 
                    onClick={() => setPaymentPlanModal({ isOpen: false, quote: null })}
                    className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-semibold transition-all duration-200"
                  >
                    {language === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Contact Modal */}
        <ContactModal
          isOpen={contactModal.isOpen}
          onClose={() => setContactModal({ isOpen: false, vendorName: '' })}
          vendorName={contactModal.vendorName}
          language={language}
          onShowToast={showToast}
        />

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={() => setConfirmationModal(prev => ({ ...prev, isOpen: false }))}
          onConfirm={confirmationModal.onConfirm}
          title={confirmationModal.title}
          message={confirmationModal.message}
          type={confirmationModal.type}
          confirmText={language === 'en' ? 'Accept Quote' : 'قبول العرض'}
          cancelText={language === 'en' ? 'Cancel' : 'إلغاء'}
          language={language}
        />

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

export default UserDashboard;
