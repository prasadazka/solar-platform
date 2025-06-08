import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Zap,
  Award,
  Download,
  CreditCard,
  Building,
  Smartphone,
  Wallet,
  FileText,
  ChevronRight,
  Heart,
  Shield,
  Percent,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart3,
  Calculator,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Share2
} from 'lucide-react';
import { useThemeStore, useAuthStore, useQuoteStore } from '../../store';

const UserQuoteManagement: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { getUserQuoteRequests, acceptVendorQuote, rejectVendorQuote, clearAndReinitialize } = useQuoteStore();

  const [activeTab, setActiveTab] = useState('received'); // 'requests' or 'received'
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedBNPLMonths, setSelectedBNPLMonths] = useState<number>(24); // Default to 24 months
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  // Initialize dummy data on component mount
  useEffect(() => {
    if (user?.id) {
      clearAndReinitialize(user.id);
    }
  }, [user?.id, clearAndReinitialize]);

  // Get user's quote requests
  const userQuotes = getUserQuoteRequests(user?.id || '');

  // Saudi Payment Methods
  const paymentMethods = [
    {
      id: 'bnpl',
      name: language === 'en' ? 'BNPL - 0% Interest' : 'الشراء الآن والدفع لاحقاً - 0% فوائد',
      subtitle: language === 'en' ? 'Most Popular • Up to 30 months' : 'الأكثر شعبية • حتى 30 شهر',
      icon: <Percent className="w-6 h-6" />,
      popular: true,
      description: language === 'en' ? '0% interest installments' : 'أقساط بدون فوائد'
    },
    {
      id: 'sarie',
      name: language === 'en' ? 'Bank Transfer (SARIE)' : 'حوالة بنكية (سارية)',
      subtitle: language === 'en' ? 'Instant & Free' : 'فوري ومجاني',
      icon: <Building className="w-6 h-6" />,
      popular: false,
      description: language === 'en' ? 'Direct bank transfer' : 'حوالة بنكية مباشرة'
    },
    {
      id: 'cards',
      name: language === 'en' ? 'Credit/Debit Cards' : 'بطاقات ائتمانية/مدين',
      subtitle: language === 'en' ? 'Visa, Mastercard, mada' : 'فيزا، ماستركارد، مدى',
      icon: <CreditCard className="w-6 h-6" />,
      popular: false,
      description: language === 'en' ? 'Secure card payment' : 'دفع آمن بالبطاقة'
    },
    {
      id: 'stc_pay',
      name: language === 'en' ? 'STC Pay' : 'أس تي سي باي',
      subtitle: language === 'en' ? 'Digital Wallet' : 'محفظة رقمية',
      icon: <Smartphone className="w-6 h-6" />,
      popular: false,
      description: language === 'en' ? 'Mobile wallet payment' : 'دفع عبر المحفظة المحمولة'
    },
    {
      id: 'apple_pay',
      name: language === 'en' ? 'Apple Pay' : 'أبل باي',
      subtitle: language === 'en' ? 'Touch/Face ID' : 'معرف اللمس/الوجه',
      icon: <Smartphone className="w-6 h-6" />,
      popular: false,
      description: language === 'en' ? 'Biometric authentication' : 'مصادقة بيومترية'
    },
    {
      id: 'tabby',
      name: language === 'en' ? 'Tabby' : 'تابي',
      subtitle: language === 'en' ? 'Split in 4 payments' : 'تقسيم على 4 دفعات',
      icon: <Calculator className="w-6 h-6" />,
      popular: false,
      description: language === 'en' ? 'Interest-free splits' : 'تقسيط بدون فوائد'
    },
    {
      id: 'tamara',
      name: language === 'en' ? 'Tamara' : 'تمارا',
      subtitle: language === 'en' ? 'Pay in 3 installments' : 'ادفع على 3 أقساط',
      icon: <Wallet className="w-6 h-6" />,
      popular: false,
      description: language === 'en' ? 'Flexible payment plans' : 'خطط دفع مرنة'
    },
    {
      id: 'bank_check',
      name: language === 'en' ? 'Bank Check' : 'شيك بنكي',
      subtitle: language === 'en' ? 'Certified Bank Check' : 'شيك بنكي معتمد',
      icon: <FileText className="w-6 h-6" />,
      popular: false,
      description: language === 'en' ? 'Traditional payment method' : 'طريقة دفع تقليدية'
    }
  ];

  // Filter quotes based on search and filter
  const filteredQuotes = userQuotes.filter(quote => {
    const matchesSearch = quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return matchesSearch && quote.status === 'pending';
    if (filter === 'active') return matchesSearch && quote.status === 'active';
    if (filter === 'completed') return matchesSearch && quote.status === 'completed';
    
    return matchesSearch;
  });

  // Get quotes with responses for received tab
  const quotesWithResponses = filteredQuotes.filter(quote => quote.vendorResponses.length > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const submitted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return language === 'en' ? 'Just now' : 'الآن';
    if (diffInHours < 24) return language === 'en' ? `${diffInHours} hours ago` : `منذ ${diffInHours} ساعة`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return language === 'en' ? `${diffInDays} days ago` : `منذ ${diffInDays} يوم`;
  };

  const handleAcceptQuote = (requestId: string, responseId: string) => {
    const quote = userQuotes.find(q => q.id === requestId);
    const response = quote?.vendorResponses.find(r => r.id === responseId);
    
    if (quote && response) {
      setSelectedQuote({ quote, response });
      setSelectedPaymentMethod('');
      setSelectedBNPLMonths(24);
      setTermsAccepted(false);
      setShowPaymentModal(true);
    }
  };

  const handleRejectQuote = (requestId: string, responseId: string) => {
    if (window.confirm(language === 'en' 
      ? 'Are you sure you want to reject this quote?' 
      : 'هل أنت متأكد من رفض هذا العرض؟'
    )) {
      rejectVendorQuote(requestId, responseId);
      alert(language === 'en' ? 'Quote rejected.' : 'تم رفض العرض.');
    }
  };

  const handleDownloadProposal = (vendorName: string, responseId?: string) => {
    // Simulate PDF download
    const fileName = responseId 
      ? `${vendorName}_Solar_Proposal_${responseId}.pdf`
      : `All_Solar_Proposals_${Date.now()}.pdf`;
    
    // Create a fake download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Solar proposal from ${vendorName}`));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    alert(language === 'en' 
      ? `Downloading proposal from ${vendorName}...` 
      : `تحميل العرض من ${vendorName}...`
    );
  };

  const handleCompareQuotes = () => {
    if (selectedQuotes.length < 2) {
      alert(language === 'en' 
        ? 'Please select at least 2 quotes to compare' 
        : 'يرجى اختيار عرضين على الأقل للمقارنة'
      );
      return;
    }
    setShowComparisonModal(true);
  };

  const handleContactVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setShowContactModal(true);
  };

  const handleEditRequest = (requestId: string) => {
    navigate(`/quotes/request?edit=${requestId}`);
  };

  const handleCancelRequest = (requestId: string) => {
    if (window.confirm(language === 'en' 
      ? 'Are you sure you want to cancel this quote request?' 
      : 'هل أنت متأكد من إلغاء طلب العرض هذا؟'
    )) {
      // Here you would call a cancel function from the store
      alert(language === 'en' ? 'Request cancelled.' : 'تم إلغاء الطلب.');
    }
  };

  const handleShareQuote = (quote: any) => {
    const shareText = `Solar quote for ${quote.propertyAddress} - ${quote.vendorResponses.length} quotes received`;
    if (navigator.share) {
      navigator.share({
        title: 'Solar Quote',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
      alert(language === 'en' ? 'Link copied to clipboard!' : 'تم نسخ الرابط!');
    }
  };

  const handleCopyQuoteId = (quoteId: string) => {
    navigator.clipboard.writeText(quoteId);
    alert(language === 'en' ? 'Quote ID copied!' : 'تم نسخ معرف العرض!');
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleCompletePayment = () => {
    if (!selectedPaymentMethod) {
      alert(language === 'en' ? 'Please select a payment method' : 'يرجى اختيار طريقة دفع');
      return;
    }

    if (!termsAccepted) {
      alert(language === 'en' ? 'Please accept the terms and conditions' : 'يرجى الموافقة على الشروط والأحكام');
      return;
    }

    // Handle BNPL - Route to BNPL page
    if (selectedPaymentMethod === 'bnpl') {
      const quoteData = {
        vendorName: selectedQuote.response.vendorName,
        totalPrice: selectedQuote.response.totalPrice,
        systemSize: selectedQuote.response.systemSize,
        monthlyPayment: Math.round(selectedQuote.response.totalPrice / selectedBNPLMonths),
        selectedMonths: selectedBNPLMonths,
        quoteId: selectedQuote.response.id,
        requestId: selectedQuote.quote.id
      };
      
      // Store quote data for BNPL page
      sessionStorage.setItem('bnpl-quote-data', JSON.stringify(quoteData));
      
      // Navigate to BNPL page
      navigate('/financing/application');
      return;
    }

    // Handle other payment methods - Show loading and success
    setIsProcessingPayment(true);
    
    // Simulate payment processing (2-3 seconds)
    setTimeout(() => {
      acceptVendorQuote(selectedQuote.quote.id, selectedQuote.response.id);
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      setShowPaymentSuccess(true);
      
      // Reset form
      setSelectedQuote(null);
      setSelectedPaymentMethod('');
      setSelectedBNPLMonths(24);
      setTermsAccepted(false);
      
      // Auto-close success dialog after 4 seconds
      setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 4000);
    }, 2500); // 2.5 seconds loading
  };

  const toggleQuoteSelection = (quoteId: string) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
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

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-4">
                {language === 'en' ? 'Quote Management' : 'إدارة العروض'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Manage your solar installation quotes and choose payment options'
                  : 'إدارة عروض تركيب الطاقة الشمسية واختيار خيارات الدفع'
                }
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3 rtl:space-x-reverse">
              {selectedQuotes.length > 1 && (
                <button 
                  onClick={handleCompareQuotes}
                  className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>{language === 'en' ? 'Compare' : 'مقارنة'} ({selectedQuotes.length})</span>
                </button>
              )}
              
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
          className="mb-6"
        >
          <div className="flex space-x-1 rtl:space-x-reverse p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'received'
                  ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {language === 'en' ? 'Received Quotes' : 'العروض المستلمة'}
              {quotesWithResponses.length > 0 && (
                <span className="ml-2 rtl:ml-0 rtl:mr-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs px-2 py-1 rounded-full">
                  {quotesWithResponses.reduce((total, quote) => total + quote.vendorResponses.length, 0)}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'requests'
                  ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {language === 'en' ? 'Quote Requests' : 'طلبات العروض'}
              {filteredQuotes.length > 0 && (
                <span className="ml-2 rtl:ml-0 rtl:mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                  {filteredQuotes.length}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 rtl:pl-4 rtl:pr-10"
              placeholder={language === 'en' ? 'Search by address or vendor...' : 'ابحث بالعنوان أو المقاول...'}
            />
          </div>
          
          <div className="flex space-x-3 rtl:space-x-reverse">
            {['all', 'pending', 'active', 'completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filter === filterType 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                }`}
              >
                {filterType === 'all' && (language === 'en' ? 'All' : 'الكل')}
                {filterType === 'pending' && (language === 'en' ? 'Pending' : 'معلق')}
                {filterType === 'active' && (language === 'en' ? 'Active' : 'نشط')}
                {filterType === 'completed' && (language === 'en' ? 'Completed' : 'مكتمل')}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content based on active tab */}
        {activeTab === 'received' ? (
          // Received Quotes Tab
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {quotesWithResponses.length === 0 ? (
              <div className="text-center py-16">
                <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'No quotes received yet' : 'لم يتم استلام عروض بعد'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' 
                    ? 'Vendors will send their quotes here once they review your request'
                    : 'سيرسل المقاولون عروضهم هنا بمجرد مراجعة طلبك'
                  }
                </p>
                <button 
                  onClick={() => navigate('/quotes/request')}
                  className="btn-primary"
                >
                  {language === 'en' ? 'Send Your First Request' : 'أرسل طلبك الأول'}
                </button>
              </div>
            ) : (
              quotesWithResponses.map((quote, index) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="card p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Quote Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <input
                          type="checkbox"
                          checked={selectedQuotes.includes(quote.id)}
                          onChange={() => toggleQuoteSelection(quote.id)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {quote.propertyAddress}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                          {quote.status === 'pending' 
                            ? (language === 'en' ? 'Pending' : 'معلق')
                            : quote.status === 'active'
                            ? (language === 'en' ? 'Active' : 'نشط')
                            : (language === 'en' ? 'Completed' : 'مكتمل')
                          }
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <MapPin className="w-4 h-4" />
                          <span>{quote.city}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <DollarSign className="w-4 h-4" />
                          <span>{quote.budget}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>{getTimeSince(quote.submittedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                        {quote.vendorResponses.length} {language === 'en' ? 'quotes received' : 'عرض مستلم'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Monthly Bill:' : 'الفاتورة الشهرية:'} {quote.monthlyBill} SAR
                      </div>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse mt-2">
                        <button
                          onClick={() => handleShareQuote(quote)}
                          className="text-xs text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                          title={language === 'en' ? 'Share' : 'مشاركة'}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleCopyQuoteId(quote.id)}
                          className="text-xs text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                          title={language === 'en' ? 'Copy ID' : 'نسخ المعرف'}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Vendor Responses */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {language === 'en' ? 'Vendor Quotes' : 'عروض المقاولين'}
                      </h4>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => handleDownloadProposal('All Vendors')}
                          className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center space-x-1 rtl:space-x-reverse transition-colors duration-200"
                        >
                          <Download className="w-4 h-4" />
                          <span>{language === 'en' ? 'Download All' : 'تحميل الكل'}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {quote.vendorResponses.map((response, responseIndex) => (
                        <div 
                          key={response.id}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            response.status === 'accepted' 
                              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                              : response.status === 'rejected'
                              ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-800'
                          }`}
                        >
                          {/* Vendor Info */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                                <Award className="w-5 h-5 text-emerald-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                  {response.vendorName}
                                </h5>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-gray-600 dark:text-gray-300">{response.vendorRating}</span>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-green-600 dark:text-green-400 text-xs">
                                    {language === 'en' ? 'Verified' : 'موثق'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {response.status === 'accepted' && (
                              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center space-x-1 rtl:space-x-reverse">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{language === 'en' ? 'Accepted' : 'مقبول'}</span>
                              </span>
                            )}
                            {response.status === 'rejected' && (
                              <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs px-2 py-1 rounded-full flex items-center space-x-1 rtl:space-x-reverse">
                                <XCircle className="w-3 h-3" />
                                <span>{language === 'en' ? 'Rejected' : 'مرفوض'}</span>
                              </span>
                            )}
                          </div>
                          
                          {/* Quote Details */}
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'System Size' : 'حجم النظام'}</span>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{response.systemSize} kW</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Price' : 'السعر الإجمالي'}</span>
                              <p className="font-medium text-emerald-600">{response.totalPrice.toLocaleString()} SAR</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly Savings' : 'الوفر الشهري'}</span>
                              <p className="font-medium text-green-600">{response.monthlyPayment.toLocaleString()} SAR</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Installation' : 'التركيب'}</span>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{response.installationTimeframe} {language === 'en' ? 'weeks' : 'أسابيع'}</p>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                                {response.warranty}-{language === 'en' ? 'year warranty' : 'سنة ضمان'}
                              </span>
                              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                                {language === 'en' ? 'Free maintenance' : 'صيانة مجانية'}
                              </span>
                              <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs px-2 py-1 rounded-full">
                                {language === 'en' ? 'Monitoring app' : 'تطبيق مراقبة'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            {response.status === 'submitted' && (
                              <>
                                <button
                                  onClick={() => handleAcceptQuote(quote.id, response.id)}
                                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center space-x-1 rtl:space-x-reverse transform hover:scale-105"
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{language === 'en' ? 'Accept & Pay' : 'قبول ودفع'}</span>
                                </button>
                                
                                <button
                                  onClick={() => handleRejectQuote(quote.id, response.id)}
                                  className="px-4 py-2 border border-red-300 text-red-600 dark:border-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                                  title={language === 'en' ? 'Reject' : 'رفض'}
                                >
                                  <ThumbsDown className="w-4 h-4" />
                                </button>
                                
                                <button
                                  onClick={() => handleDownloadProposal(response.vendorName, response.id)}
                                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                  title={language === 'en' ? 'Download Proposal' : 'تحميل العرض'}
                                >
                                  <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                </button>
                                
                                <button
                                  onClick={() => handleContactVendor(response)}
                                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                  title={language === 'en' ? 'Contact Vendor' : 'اتصل بالمقاول'}
                                >
                                  <MessageCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                </button>
                              </>
                            )}
                            
                            {response.status === 'accepted' && (
                              <div className="flex-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-medium text-center flex items-center justify-center space-x-2 rtl:space-x-reverse">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{language === 'en' ? 'Payment Processed - Installation Scheduled' : 'تم الدفع - تم جدولة التركيب'}</span>
                              </div>
                            )}
                            
                            {response.status === 'rejected' && (
                              <div className="flex-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium text-center flex items-center justify-center space-x-2 rtl:space-x-reverse">
                                <XCircle className="w-4 h-4" />
                                <span>{language === 'en' ? 'Quote Rejected' : 'تم رفض العرض'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          // Quote Requests Tab
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {filteredQuotes.length === 0 ? (
              <div className="text-center py-16">
                <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {searchTerm 
                    ? (language === 'en' ? 'No matching requests found' : 'لم يتم العثور على طلبات مطابقة')
                    : (language === 'en' ? 'No quote requests yet' : 'لا توجد طلبات عروض بعد')
                  }
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' 
                    ? 'Start by requesting quotes from solar installation companies'
                    : 'ابدأ بطلب عروض من شركات تركيب الطاقة الشمسية'
                  }
                </p>
                <button 
                  onClick={() => navigate('/quotes/request')}
                  className="btn-primary"
                >
                  {language === 'en' ? 'Request Your First Quote' : 'اطلب عرضك الأول'}
                </button>
              </div>
            ) : (
              filteredQuotes.map((quote, index) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="card p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Request Details */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {quote.propertyAddress}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                          {quote.status === 'pending' 
                            ? (language === 'en' ? 'Pending' : 'معلق')
                            : quote.status === 'active'
                            ? (language === 'en' ? 'Active' : 'نشط')
                            : (language === 'en' ? 'Completed' : 'مكتمل')
                          }
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <MapPin className="w-4 h-4" />
                          <span>{quote.city}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <DollarSign className="w-4 h-4" />
                          <span>{quote.budget}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Zap className="w-4 h-4" />
                          <span>{quote.monthlyBill} SAR/month</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>{getTimeSince(quote.submittedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                        {quote.quotesReceived || 0} {language === 'en' ? 'quotes received' : 'عرض مستلم'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'of' : 'من'} {quote.quotesRequested || 5} {language === 'en' ? 'requested' : 'مطلوب'}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>{language === 'en' ? 'Response Progress' : 'تقدم الردود'}</span>
                      <span>{Math.round(((quote.quotesReceived || 0) / (quote.quotesRequested || 5)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((quote.quotesReceived || 0) / (quote.quotesRequested || 5)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <button
                        onClick={() => handleEditRequest(quote.id)}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <Edit className="w-4 h-4" />
                        <span>{language === 'en' ? 'Edit Request' : 'تعديل الطلب'}</span>
                      </button>
                      
                      <button
                        onClick={() => handleCancelRequest(quote.id)}
                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{language === 'en' ? 'Cancel Request' : 'إلغاء الطلب'}</span>
                      </button>
                    </div>

                    {(quote.vendorResponses?.length || 0) > 0 && (
                      <button
                        onClick={() => setActiveTab('received')}
                        className="btn-secondary text-sm flex items-center space-x-1 rtl:space-x-reverse"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{language === 'en' ? 'View Quotes' : 'عرض الردود'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
        {/* Payment Modal */}
        {showPaymentModal && selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'Choose Payment Method' : 'اختر طريقة الدفع'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? `Complete payment for ${selectedQuote.response.vendorName}'s quote`
                    : `أكمل الدفع لعرض ${selectedQuote.response.vendorName}`
                  }
                </p>
              </div>

              {/* Selected Quote Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {language === 'en' ? 'Order Summary' : 'ملخص الطلب'}
                  </h4>
                  <span className="text-2xl font-bold text-emerald-600">
                    {selectedQuote.response.totalPrice.toLocaleString()} SAR
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'System Size' : 'حجم النظام'}</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.response.systemSize} kW</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Installation' : 'التركيب'}</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.response.installationTimeframe} weeks</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly Savings' : 'الوفر الشهري'}</span>
                    <p className="font-medium text-green-600">{selectedQuote.response.monthlyPayment.toLocaleString()} SAR</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Vendor' : 'المقاول'}</span>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{selectedQuote.response.vendorName}</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Available Payment Methods' : 'طرق الدفع المتاحة'}
                </h4>
                
                <div className="grid grid-cols-1 gap-3">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedPaymentMethod === method.id
                          ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-emerald-200 dark:hover:border-emerald-700'
                      }`}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`p-2 rounded-lg ${
                            selectedPaymentMethod === method.id
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {method.icon}
                          </div>
                          
                          <div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                {method.name}
                              </h5>
                              {method.popular && (
                                <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs px-2 py-1 rounded-full">
                                  {language === 'en' ? 'Popular' : 'الأكثر شعبية'}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{method.subtitle}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{method.description}</p>
                          </div>
                        </div>
                        
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          selectedPaymentMethod === method.id
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}>
                          {selectedPaymentMethod === method.id && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                      </div>
                      
                      {/* BNPL Details */}
                      {method.id === 'bnpl' && selectedPaymentMethod === 'bnpl' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800"
                        >
                          <div className="mb-4">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                              {language === 'en' ? 'Select Payment Plan:' : 'اختر خطة الدفع:'}
                            </h6>
                            <div className="grid grid-cols-3 gap-3">
                              {[18, 24, 30].map((months) => (
                                <button
                                  key={months}
                                  onClick={() => setSelectedBNPLMonths(months)}
                                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                    selectedBNPLMonths === months
                                      ? 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-900/30'
                                      : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-600'
                                  }`}
                                >
                                  <div className="text-center">
                                    <div className={`font-semibold ${
                                      selectedBNPLMonths === months 
                                        ? 'text-emerald-600 dark:text-emerald-400' 
                                        : 'text-gray-900 dark:text-gray-100'
                                    }`}>
                                      {months} {language === 'en' ? 'Months' : 'شهر'}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                      {Math.round(selectedQuote.response.totalPrice / months).toLocaleString()} SAR
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      /{language === 'en' ? 'month' : 'شهر'}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-emerald-800 dark:text-emerald-300">
                              <Shield className="w-4 h-4" />
                              <span>{language === 'en' ? '0% Interest • No Hidden Fees • SAMA Approved' : '0% فوائد • بدون رسوم خفية • معتمد من ساما'}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 mt-1 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'en' 
                      ? 'I agree to the Terms and Conditions, Privacy Policy, and Solar Installation Agreement. I understand that this payment will initiate the installation process.'
                      : 'أوافق على الشروط والأحكام وسياسة الخصوصية واتفاقية تركيب الطاقة الشمسية. أتفهم أن هذا الدفع سيبدأ عملية التركيب.'
                    }
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 rtl:space-x-reverse">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {language === 'en' ? 'Cancel' : 'إلغاء'}
                </button>
                
                <button
                  onClick={handleCompletePayment}
                  disabled={!selectedPaymentMethod || !termsAccepted || isProcessingPayment}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
                    (selectedPaymentMethod && termsAccepted && !isProcessingPayment)
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 transform hover:scale-105'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{language === 'en' ? 'Processing...' : 'جاري المعالجة...'}</span>
                    </div>
                  ) : (
                    selectedPaymentMethod === 'bnpl' 
                      ? (language === 'en' ? 'Continue to BNPL' : 'المتابعة إلى التقسيط')
                      : (language === 'en' ? 'Complete Payment' : 'إتمام الدفع')
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Contact Vendor Modal */}
        {showContactModal && selectedVendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'Contact Vendor' : 'اتصل بالمقاول'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedVendor.vendorName}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => window.open(`tel:${selectedVendor.vendorPhone}`)}
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <div className="text-left rtl:text-right">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'Call Now' : 'اتصل الآن'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{selectedVendor.vendorPhone}</div>
                  </div>
                </button>

                <button
                  onClick={() => window.open(`mailto:${selectedVendor.vendorEmail}`)}
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div className="text-left rtl:text-right">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'Send Email' : 'أرسل بريد إلكتروني'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{selectedVendor.vendorEmail}</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    const message = `Hello, I'm interested in your solar quote for ${selectedQuote?.quote.propertyAddress}`;
                    window.open(`https://wa.me/${selectedVendor.vendorPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`);
                  }}
                  className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div className="text-left rtl:text-right">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'WhatsApp' : 'واتساب'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Send quick message' : 'أرسل رسالة سريعة'}
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="w-full py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {language === 'en' ? 'Close' : 'إغلاق'}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Payment Success Modal */}
        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 300 }}
                className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", damping: 20, stiffness: 300 }}
                >
                  <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {language === 'en' ? 'Payment Completed!' : 'تم الدفع بنجاح!'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' 
                    ? 'Your payment has been successfully processed. The contractor will contact you soon to schedule the installation.'
                    : 'تمت معالجة دفعتك بنجاح. سيتصل بك المقاول قريباً لجدولة التركيب.'
                  }
                </p>

                {/* Success Details */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Payment Method:' : 'طريقة الدفع:'}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Next Step:' : 'الخطوة التالية:'}
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {language === 'en' ? 'Installation Scheduling' : 'جدولة التركيب'}
                    </span>
                  </div>
                </div>

                {/* Loading dots animation */}
                <div className="flex justify-center space-x-2 rtl:space-x-reverse mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  ></motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  ></motion.div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' ? 'Contractor will contact you soon...' : 'سيتصل بك المقاول قريباً...'}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Quote Comparison Modal */}
        {showComparisonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowComparisonModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'Quote Comparison' : 'مقارنة العروض'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? `Comparing ${selectedQuotes.length} selected quotes` : `مقارنة ${selectedQuotes.length} عروض مختارة`}
                </p>
              </div>

              <div className="text-center py-16">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'Comparison Feature Coming Soon!' : 'ميزة المقارنة قريباً!'}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {language === 'en' 
                    ? 'We are working on a detailed comparison tool to help you make the best decision.'
                    : 'نحن نعمل على أداة مقارنة تفصيلية لمساعدتك في اتخاذ أفضل قرار.'
                  }
                </p>
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="btn-primary"
                >
                  {language === 'en' ? 'Close' : 'إغلاق'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserQuoteManagement;