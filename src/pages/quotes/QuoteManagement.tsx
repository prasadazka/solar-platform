import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Plus,
  FileText,
  Clock,
  CheckCircle,
  Star,
  DollarSign,
  Calendar,
  Users,
  Filter,
  Search,
  Eye,
  Download,
  MessageCircle,
  AlertTriangle,
  X,
  Phone,
  Mail,
  MapPin,
  Award,
  CreditCard,
  Smartphone,
  Building,
  Banknote,
  Wallet,
  QrCode,
  Shield,
  Check
} from 'lucide-react';
import { useThemeStore } from '../../store';

interface Quote {
  id: string;
  vendorName: string;
  vendorRating: number;
  systemSize: number;
  totalPrice: number;
  monthlyPayment: number;
  installationDate: string;
  warranty: number;
  status: 'pending' | 'received' | 'accepted' | 'rejected';
  submittedAt: string;
  validUntil: string;
  proposal?: string; // File path
  highlights: string[];
  vendorInfo?: {
    phone: string;
    email: string;
    address: string;
    licenseNumber: string;
    experience: string;
    specializations: string[];
  };
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  processingTime: string;
  fees: string;
  available: boolean;
  popular?: boolean;
}

interface QuoteRequest {
  id: string;
  propertyType: string;
  systemSize?: number;
  location: string;
  status: 'pending' | 'active' | 'completed';
  submittedAt: string;
  quotesReceived: number;
  quotes: Quote[];
}

const QuoteManagement: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'requests' | 'quotes'>('quotes');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  
  // Modal states
  const [showQuoteDetails, setShowQuoteDetails] = useState(false);
  const [showContactVendor, setShowContactVendor] = useState(false);
  const [showPaymentPlan, setShowPaymentPlan] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  // Payment Methods (Similar to Indian payment ecosystem)
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'bnpl',
      name: language === 'en' ? 'Buy Now Pay Later (BNPL)' : 'اشتري الآن وادفع لاحقاً',
      icon: <Calendar className="w-6 h-6" />,
      description: language === 'en' ? 'Split payment into 18-30 monthly installments' : 'قسم الدفع على 18-30 قسط شهري',
      processingTime: language === 'en' ? 'Instant approval' : 'موافقة فورية',
      fees: language === 'en' ? 'No processing fees' : 'بدون رسوم معالجة',
      available: true,
      popular: true
    },
    {
      id: 'bank_transfer',
      name: language === 'en' ? 'Bank Transfer (SARIE)' : 'حوالة بنكية (سريع)',
      icon: <Building className="w-6 h-6" />,
      description: language === 'en' ? 'Direct transfer from your bank account' : 'تحويل مباشر من حسابك البنكي',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      fees: language === 'en' ? 'Free' : 'مجاني',
      available: true
    },
    {
      id: 'credit_card',
      name: language === 'en' ? 'Credit/Debit Card' : 'بطاقة ائتمان/خصم',
      icon: <CreditCard className="w-6 h-6" />,
      description: language === 'en' ? 'Visa, Mastercard, mada' : 'فيزا، ماستركارد، مدى',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      fees: language === 'en' ? '2.5% processing fee' : 'رسوم معالجة 2.5%',
      available: true
    },
    {
      id: 'stc_pay',
      name: 'STC Pay',
      icon: <Smartphone className="w-6 h-6" />,
      description: language === 'en' ? 'Pay using STC Pay digital wallet' : 'ادفع باستخدام محفظة STC Pay الرقمية',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      fees: language === 'en' ? 'Free' : 'مجاني',
      available: true
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: <Smartphone className="w-6 h-6" />,
      description: language === 'en' ? 'Quick payment with Touch ID or Face ID' : 'دفع سريع ببصمة اليد أو الوجه',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      fees: language === 'en' ? 'Free' : 'مجاني',
      available: true
    },
    {
      id: 'tabby',
      name: 'Tabby',
      icon: <QrCode className="w-6 h-6" />,
      description: language === 'en' ? 'Split in 4 payments, no interest' : 'قسم على 4 دفعات، بدون فوائد',
      processingTime: language === 'en' ? 'Instant approval' : 'موافقة فورية',
      fees: language === 'en' ? 'No fees' : 'بدون رسوم',
      available: true
    },
    {
      id: 'tamara',
      name: 'Tamara',
      icon: <Wallet className="w-6 h-6" />,
      description: language === 'en' ? 'Pay in 3 installments' : 'ادفع على 3 أقساط',
      processingTime: language === 'en' ? 'Instant approval' : 'موافقة فورية',
      fees: language === 'en' ? 'No fees' : 'بدون رسوم',
      available: true
    },
    {
      id: 'check',
      name: language === 'en' ? 'Bank Check' : 'شيك بنكي',
      icon: <Banknote className="w-6 h-6" />,
      description: language === 'en' ? 'Pay via certified bank check' : 'ادفع عبر شيك بنكي معتمد',
      processingTime: language === 'en' ? '2-3 business days' : '2-3 أيام عمل',
      fees: language === 'en' ? 'Free' : 'مجاني',
      available: true
    }
  ];

  // Load quote requests from localStorage or use mock data
  useEffect(() => {
    // ALWAYS create dummy data with guaranteed quotes
    const dummyRequests: QuoteRequest[] = [
      {
        id: 'req-001',
        propertyType: language === 'en' ? 'Residential Villa' : 'فيلا سكنية',
        systemSize: 12,
        location: language === 'en' ? 'Jeddah, King Abdul Aziz District' : 'جدة، حي الملك عبد العزيز',
        status: 'active',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        quotesReceived: 4,
        quotes: [
          {
            id: 'quote-001',
            vendorName: 'Solar Solutions KSA',
            vendorRating: 4.8,
            systemSize: 12,
            totalPrice: 85000,
            monthlyPayment: 2400,
            installationDate: '2024-07-15',
            warranty: 25,
            status: 'received',
            submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            highlights: [
              language === 'en' ? 'Premium Tier 1 Panels' : 'ألواح من الدرجة الأولى',
              language === 'en' ? '25-year warranty' : 'ضمان 25 سنة',
              language === 'en' ? 'Free maintenance 3 years' : 'صيانة مجانية 3 سنوات'
            ],
            vendorInfo: {
              phone: '+966 12 345 6789',
              email: 'info@solarsolutions.sa',
              address: 'King Fahd Road, Jeddah 21462',
              licenseNumber: 'SEC-2023-001',
              experience: '8 years',
              specializations: ['Residential Solar', 'Commercial Systems']
            }
          },
          {
            id: 'quote-002',
            vendorName: 'Green Energy Arabia',
            vendorRating: 4.6,
            systemSize: 12,
            totalPrice: 92000,
            monthlyPayment: 2600,
            installationDate: '2024-07-20',
            warranty: 20,
            status: 'received',
            submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            highlights: [
              language === 'en' ? 'German inverters' : 'عاكسات ألمانية',
              language === 'en' ? 'Smart monitoring' : 'مراقبة ذكية',
              language === 'en' ? '20-year guarantee' : 'ضمان 20 سنة'
            ],
            vendorInfo: {
              phone: '+966 11 987 6543',
              email: 'contact@greenarabia.com',
              address: 'Prince Sultan Road, Riyadh 11362',
              licenseNumber: 'SEC-2023-002',
              experience: '12 years',
              specializations: ['Large Scale Solar', 'Industrial Solutions']
            }
          },
          {
            id: 'quote-003',
            vendorName: 'Sun Power Saudi',
            vendorRating: 4.9,
            systemSize: 12,
            totalPrice: 78000,
            monthlyPayment: 2200,
            installationDate: '2024-07-10',
            warranty: 30,
            status: 'received',
            submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            highlights: [
              language === 'en' ? 'Highest efficiency 22%' : 'كفاءة عالية 22%',
              language === 'en' ? 'Battery option' : 'خيار البطارية',
              language === 'en' ? 'SASO certified' : 'معتمد من مواصفات'
            ],
            vendorInfo: {
              phone: '+966 13 456 7890',
              email: 'hello@sunpower.sa',
              address: 'Al Khobar Business District, Dammam 31952',
              licenseNumber: 'SEC-2023-003',
              experience: '15 years',
              specializations: ['Premium Systems', 'Smart Technology']
            }
          }
        ]
      }
    ];
    
    setQuoteRequests(dummyRequests);
    // FORCE to quotes tab
    setActiveTab('quotes');
    
    console.log('Fixed dummy quotes loaded:', dummyRequests);
  }, [language]);

  // Handler functions
  const handleViewDetails = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowQuoteDetails(true);
  };

  const handleViewRequestDetails = (request: QuoteRequest) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
  };

  const handleContactVendor = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowContactVendor(true);
  };

  const handleAcceptQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowPaymentPlan(true);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleProceedWithPayment = () => {
    if (!selectedQuote || !selectedPaymentMethod) return;
    
    // Close modals
    setShowPaymentOptions(false);
    setSelectedQuote(null);
    setSelectedPaymentMethod('');
    
    // Navigate based on payment method
    if (selectedPaymentMethod === 'bnpl') {
      // For BNPL, go to payments page with accepted quote details
      navigate('/payments', { 
        state: { 
          quote: selectedQuote, 
          paymentMethod: selectedPaymentMethod,
          paymentPlan: {
            months: 24,
            monthlyAmount: selectedQuote.monthlyPayment,
            totalAmount: selectedQuote.totalPrice,
            interestRate: 0
          },
          status: 'accepted'
        } 
      });
    } else {
      // For other payment methods, also go to payments page
      navigate('/payments', { 
        state: { 
          quote: selectedQuote, 
          paymentMethod: selectedPaymentMethod,
          status: 'processing'
        } 
      });
    }
  };

  const closeAllModals = () => {
    setShowQuoteDetails(false);
    setShowContactVendor(false);
    setShowPaymentPlan(false);
    setShowPaymentOptions(false);
    setShowRequestDetails(false);
    setSelectedQuote(null);
    setSelectedRequest(null);
    setSelectedPaymentMethod('');
  };

  const filteredRequests = quoteRequests; // Show all requests for now - remove filtering issues

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Back Navigation */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-4">
                {language === 'en' ? 'Quote Management' : 'إدارة العروض'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Manage your quote requests and compare contractor proposals'
                  : 'أدر طلبات العروض وقارن مقترحات المقاولين'
                }
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => navigate('/quotes/request')}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Plus className="w-5 h-5" />
                <span>{language === 'en' ? 'New Quote Request' : 'طلب عرض جديد'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'requests'
                  ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {language === 'en' ? 'Quote Requests' : 'طلبات العروض'}
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'quotes'
                  ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {language === 'en' ? 'Received Quotes' : 'العروض المستلمة'}
            </button>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 rtl:pl-4 rtl:pr-10"
                placeholder={language === 'en' ? 'Search by location or property type...' : 'ابحث بالموقع أو نوع العقار...'}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field pl-10 rtl:pl-4 rtl:pr-10 w-full md:w-48"
              >
                <option value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</option>
                <option value="pending">{language === 'en' ? 'Pending' : 'في الانتظار'}</option>
                <option value="active">{language === 'en' ? 'Active' : 'نشط'}</option>
                <option value="completed">{language === 'en' ? 'Completed' : 'مكتمل'}</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {activeTab === 'requests' ? (
          /* Quote Requests List */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {filteredRequests.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'No Quote Requests Found' : 'لم يتم العثور على طلبات عروض'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' 
                    ? 'Start by creating your first quote request'
                    : 'ابدأ بإنشاء أول طلب عرض لك'
                  }
                </p>
                <button 
                  onClick={() => navigate('/quotes/request')}
                  className="btn-primary"
                >
                  {language === 'en' ? 'Create Quote Request' : 'إنشاء طلب عرض'}
                </button>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : request.status === 'active'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {request.status === 'pending' 
                            ? (language === 'en' ? 'Pending' : 'في الانتظار')
                            : request.status === 'active'
                            ? (language === 'en' ? 'Active' : 'نشط')
                            : (language === 'en' ? 'Completed' : 'مكتمل')
                          }
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'en' ? 'Submitted' : 'تم الإرسال'} {new Date(request.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {request.propertyType} - {request.location}
                      </h3>
                      
                      <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                        {request.systemSize && (
                          <div className="flex items-center">
                            <span className="font-medium">{request.systemSize} kW</span>
                            <span className="ml-1 rtl:ml-0 rtl:mr-1">
                              {language === 'en' ? 'System' : 'نظام'}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                          <span>
                            {request.quotesReceived} {language === 'en' ? 'Quotes' : 'عروض'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
                      <button 
                        onClick={() => handleViewRequestDetails(request)}
                        className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{language === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          /* Received Quotes View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Show quotes from all requests */}
            {filteredRequests.flatMap(request => 
              request.quotes.map(quote => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-2xl dark:hover:shadow-emerald-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {quote.vendorName}
                      </h3>
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
                      {quote.highlights.slice(0, 3).map((highlight, index) => (
                        <span 
                          key={index}
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
                        onClick={() => handleViewDetails(quote)}
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
              ))
            )}
            
            {/* Show "No Quotes" message only if truly no quotes exist */}
            {filteredRequests.length > 0 && filteredRequests.every(req => req.quotes.length === 0) && (
              <div className="text-center py-16">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'No Quotes Received Yet' : 'لم يتم استلام عروض بعد'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' 
                    ? 'Quotes will appear here once contractors respond to your requests'
                    : 'ستظهر العروض هنا بمجرد رد المقاولين على طلباتك'
                  }
                </p>
                <button 
                  onClick={() => navigate('/quotes/request')}
                  className="btn-primary"
                >
                  {language === 'en' ? 'Request New Quote' : 'طلب عرض جديد'}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Request Details Modal */}
      <AnimatePresence>
        {showRequestDetails && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeAllModals}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Quote Request Details' : 'تفاصيل طلب العرض'}
                  </h2>
                  <button
                    onClick={closeAllModals}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Request Information */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Request Information' : 'معلومات الطلب'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Property Type' : 'نوع العقار'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedRequest.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Location' : 'الموقع'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedRequest.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'System Size' : 'حجم النظام'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedRequest.systemSize} kW</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Status' : 'الحالة'}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedRequest.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : selectedRequest.status === 'active'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {selectedRequest.status === 'pending' 
                            ? (language === 'en' ? 'Pending' : 'في الانتظار')
                            : selectedRequest.status === 'active'
                            ? (language === 'en' ? 'Active' : 'نشط')
                            : (language === 'en' ? 'Completed' : 'مكتمل')
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Submitted' : 'تاريخ الإرسال'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{new Date(selectedRequest.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quotes Status */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Quotes Status' : 'حالة العروض'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Quotes Received' : 'العروض المستلمة'}</span>
                        <span className="font-bold text-emerald-600">{selectedRequest.quotesReceived}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Pending Quotes' : 'العروض المعلقة'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{Math.max(0, 5 - selectedRequest.quotesReceived)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Best Quote' : 'أفضل عرض'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {selectedRequest.quotes.length > 0 
                            ? `${Math.min(...selectedRequest.quotes.map(q => q.totalPrice)).toLocaleString()} SAR`
                            : (language === 'en' ? 'N/A' : 'غير متوفر')
                          }
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <span>{language === 'en' ? 'Quote Collection Progress' : 'تقدم جمع العروض'}</span>
                        <span>{Math.round((selectedRequest.quotesReceived / 5) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min((selectedRequest.quotesReceived / 5) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {selectedRequest.quotesReceived > 0 && (
                    <button 
                      onClick={() => {
                        closeAllModals();
                        setActiveTab('quotes');
                      }}
                      className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    >
                      <Eye className="w-5 h-5" />
                      <span>{language === 'en' ? 'View Received Quotes' : 'عرض العروض المستلمة'}</span>
                    </button>
                  )}
                  <button 
                    onClick={() => navigate('/quotes/request')}
                    className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <Plus className="w-5 h-5" />
                    <span>{language === 'en' ? 'Create New Request' : 'إنشاء طلب جديد'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Details Modal */}
      <AnimatePresence>
        {showQuoteDetails && selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeAllModals}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Quote Details' : 'تفاصيل العرض'}
                  </h2>
                  <button
                    onClick={closeAllModals}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Vendor Information */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Vendor Information' : 'معلومات المقاول'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Building className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.vendorName}</span>
                      </div>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-600 dark:text-gray-300">{selectedQuote.vendorRating}/5.0 Rating</span>
                      </div>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-600 dark:text-gray-300">{selectedQuote.vendorInfo?.licenseNumber}</span>
                      </div>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-600 dark:text-gray-300">{selectedQuote.vendorInfo?.experience} {language === 'en' ? 'experience' : 'خبرة'}</span>
                      </div>
                    </div>
                  </div>

                  {/* System Details */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'System Details' : 'تفاصيل النظام'}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'System Size' : 'حجم النظام'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.systemSize} kW</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Total Price' : 'السعر الإجمالي'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.totalPrice.toLocaleString()} SAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Monthly Payment' : 'الدفعة الشهرية'}</span>
                        <span className="font-medium text-emerald-600">{selectedQuote.monthlyPayment.toLocaleString()} SAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Installation Date' : 'تاريخ التركيب'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{new Date(selectedQuote.installationDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Warranty' : 'الضمان'}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.warranty} {language === 'en' ? 'years' : 'سنة'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {language === 'en' ? 'Key Features' : 'المميزات الرئيسية'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedQuote.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                {selectedQuote.vendorInfo?.specializations && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Specializations' : 'التخصصات'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedQuote.vendorInfo.specializations.map((spec, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      closeAllModals();
                      handleAcceptQuote(selectedQuote);
                    }}
                    className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{language === 'en' ? 'Accept Quote' : 'قبول العرض'}</span>
                  </button>
                  <button 
                    onClick={() => {
                      closeAllModals();
                      handleContactVendor(selectedQuote);
                    }}
                    className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{language === 'en' ? 'Contact Vendor' : 'تواصل مع المقاول'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Vendor Modal */}
      <AnimatePresence>
        {showContactVendor && selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeAllModals}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Contact Vendor' : 'تواصل مع المقاول'}
                  </h2>
                  <button
                    onClick={closeAllModals}
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
                    {selectedQuote.vendorName}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-300">{selectedQuote.vendorRating}/5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={`tel:${selectedQuote.vendorInfo?.phone}`}
                    className="flex items-center justify-center space-x-3 rtl:space-x-reverse w-full p-4 border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <Phone className="w-6 h-6 text-emerald-600" />
                    <div className="text-left rtl:text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'en' ? 'Call Now' : 'اتصل الآن'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedQuote.vendorInfo?.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${selectedQuote.vendorInfo?.email}`}
                    className="flex items-center justify-center space-x-3 rtl:space-x-reverse w-full p-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 transform hover:scale-105"
                  >
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div className="text-left rtl:text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'en' ? 'Send Email' : 'إرسال إيميل'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedQuote.vendorInfo?.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-3 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <MapPin className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {language === 'en' ? 'Office Address' : 'عنوان المكتب'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedQuote.vendorInfo?.address}</p>
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
        )}
      </AnimatePresence>

      {/* Payment Plan Modal */}
      <AnimatePresence>
        {showPaymentPlan && selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeAllModals}
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
                    {selectedQuote.monthlyPayment.toLocaleString()}
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
                  {language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}: {selectedQuote.totalPrice.toLocaleString()} SAR
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      setShowPaymentPlan(false);
                      setShowPaymentOptions(true);
                    }}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    {language === 'en' ? 'Choose Payment Method' : 'اختر طريقة الدفع'}
                  </button>
                  
                  <button 
                    onClick={closeAllModals}
                    className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-semibold transition-all duration-200"
                  >
                    {language === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Options Modal */}
      <AnimatePresence>
        {showPaymentOptions && selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeAllModals}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Choose Payment Method' : 'اختر طريقة الدفع'}
                  </h2>
                  <button
                    onClick={closeAllModals}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Order Summary */}
                <div className="card p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.vendorName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{selectedQuote.systemSize} kW Solar System</p>
                    </div>
                    <div className="text-right rtl:text-left">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedQuote.totalPrice.toLocaleString()} SAR</p>
                      <p className="text-sm text-emerald-600">{selectedQuote.monthlyPayment.toLocaleString()} SAR/month with BNPL</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Available Payment Methods' : 'طرق الدفع المتاحة'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedPaymentMethod === method.id
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                            : method.available
                            ? 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 bg-white dark:bg-gray-700'
                            : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed'
                        }`}
                        onClick={() => method.available && handlePaymentMethodSelect(method.id)}
                      >
                        {method.popular && (
                          <div className="absolute -top-2 -right-2 rtl:-left-2 rtl:-right-auto bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg z-10">
                            {language === 'en' ? 'MOST POPULAR' : 'الأكثر شعبية'}
                          </div>
                        )}
                        
                        <div className="flex items-start space-x-3 rtl:space-x-reverse">
                          <div className={`p-2 rounded-lg ${
                            selectedPaymentMethod === method.id 
                              ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-400'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                          }`}>
                            {method.icon}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {method.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {method.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>{method.processingTime}</span>
                              <span>{method.fees}</span>
                            </div>
                          </div>
                          
                          {selectedPaymentMethod === method.id && (
                            <div className="p-1 bg-emerald-500 rounded-full">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {language === 'en' 
                          ? 'Your payment information is secured with 256-bit SSL encryption and is PCI DSS compliant.'
                          : 'معلومات الدفع الخاصة بك محمية بتشفير SSL 256 بت ومتوافقة مع معايير PCI DSS.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleProceedWithPayment}
                    disabled={!selectedPaymentMethod}
                    className={`btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse ${
                      !selectedPaymentMethod ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>{language === 'en' ? 'Proceed to Payment' : 'المتابعة للدفع'}</span>
                  </button>
                  <button 
                    onClick={closeAllModals}
                    className="btn-secondary"
                  >
                    {language === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuoteManagement;