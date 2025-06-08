import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Send,
  Eye,
  Clock,
  DollarSign,
  MapPin,
  User,
  Filter,
  Search,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useThemeStore, useAuthStore, useQuoteStore } from '../../store';

const VendorQuotesList: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { getAvailableQuoteRequests, getVendorQuoteResponses } = useQuoteStore();

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get real quote requests from users
  const availableRequests = getAvailableQuoteRequests(user?.id);
  const myResponses = getVendorQuoteResponses(user?.id || '');

  // Filter requests based on search and filter
  const filteredRequests = availableRequests.filter(request => {
    const matchesSearch = request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'new') return matchesSearch && request.quotesReceived === 0;
    if (filter === 'urgent') return matchesSearch && request.urgency === 'high';
    
    return matchesSearch;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'responded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
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

          <h1 className="text-3xl font-bold gradient-text mb-4">
            {language === 'en' ? 'Quote Requests' : 'طلبات العروض'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Respond to customer quote requests and manage your quotes'
              : 'رد على طلبات عروض العملاء وإدارة عروضك'
            }
          </p>
        </motion.div>
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 rtl:pl-4 rtl:pr-10"
              placeholder={language === 'en' ? 'Search by customer name or location...' : 'ابحث باسم العميل أو الموقع...'}
            />
          </div>
          
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === 'all' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              }`}
            >
              {language === 'en' ? 'All' : 'الكل'}
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === 'new' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              {language === 'en' ? 'New' : 'جديد'}
            </button>
            <button
              onClick={() => setFilter('urgent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === 'urgent' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              {language === 'en' ? 'Urgent' : 'عاجل'}
            </button>
          </div>
        </motion.div>

        {/* Quote Requests List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredRequests.length === 0 ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {searchTerm 
                  ? (language === 'en' ? 'No matching requests found' : 'لم يتم العثور على طلبات مطابقة')
                  : (language === 'en' ? 'No new quote requests' : 'لا توجد طلبات عروض جديدة')
                }
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {language === 'en' 
                  ? 'New quote requests from customers will appear here'
                  : 'ستظهر طلبات العروض الجديدة من العملاء هنا'
                }
              </p>
            </div>
          ) : (
            filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {request.customerName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency === 'high' 
                          ? (language === 'en' ? 'Urgent' : 'عاجل')
                          : request.urgency === 'medium'
                          ? (language === 'en' ? 'Medium' : 'متوسط')
                          : (language === 'en' ? 'Low' : 'منخفض')
                        }
                      </span>
                      {request.quotesReceived === 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-medium">
                          {language === 'en' ? 'New' : 'جديد'}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="w-4 h-4" />
                        <span>{request.propertyAddress}, {request.city}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <DollarSign className="w-4 h-4" />
                        <span>{request.budget} SAR</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeSince(request.submittedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>{language === 'en' ? 'Monthly Bill:' : 'الفاتورة الشهرية:'}</strong> {request.monthlyBill} SAR
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        <strong>{language === 'en' ? 'Property:' : 'نوع العقار:'}</strong> {request.propertyType}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        <strong>{language === 'en' ? 'Quotes received:' : 'العروض المستلمة:'}</strong> {request.quotesReceived}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center justify-end">
                    <button 
                      onClick={() => navigate(`/vendor/quotes/respond/${request.id}`)}
                      className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <Send className="w-4 h-4" />
                      <span>{language === 'en' ? 'Send Quote' : 'إرسال عرض'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VendorQuotesList;