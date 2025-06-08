import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft,
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  AlertCircle,
  Building,
  Star,
  Zap,
  Award
} from 'lucide-react';
import { useThemeStore } from '../store';

const PaymentManagement: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state (from quote acceptance)
  const stateData = location.state as {
    quote?: any;
    paymentMethod?: string;
    paymentPlan?: any;
    status?: string;
  } | null;

  // Check if this is a new quote acceptance
  const isNewQuoteAcceptance = stateData?.status === 'accepted' && stateData?.quote;

  // Default loan details (for existing payments) or use quote data
  const loanDetails = isNewQuoteAcceptance ? {
    totalAmount: stateData.quote.totalPrice,
    remainingBalance: stateData.quote.totalPrice, // Full amount remaining for new quote
    monthlyPayment: stateData.quote.monthlyPayment,
    nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    loanTerm: stateData.paymentPlan?.months || 24,
    paymentsCompleted: 0, // New quote, no payments made
    paymentsRemaining: stateData.paymentPlan?.months || 24,
    vendorName: stateData.quote.vendorName,
    systemSize: stateData.quote.systemSize
  } : {
    totalAmount: 85000,
    remainingBalance: 42500,
    monthlyPayment: 3542,
    nextPaymentDate: '2024-07-15',
    loanTerm: 24,
    paymentsCompleted: 12,
    paymentsRemaining: 12,
    vendorName: 'Solar Solutions KSA',
    systemSize: 12
  };

  const paymentHistory = isNewQuoteAcceptance ? [] : [
    { id: 1, date: '2024-06-15', amount: 3542, status: 'paid', method: 'Auto-debit' },
    { id: 2, date: '2024-05-15', amount: 3542, status: 'paid', method: 'Auto-debit' },
    { id: 3, date: '2024-04-15', amount: 3542, status: 'paid', method: 'Auto-debit' },
    { id: 4, date: '2024-03-15', amount: 3542, status: 'paid', method: 'Auto-debit' }
  ];

  const progressPercentage = isNewQuoteAcceptance ? 0 : 50;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
          </button>

          {isNewQuoteAcceptance ? (
            /* New Quote Acceptance Header */
            <div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {language === 'en' ? 'Quote Accepted!' : 'تم قبول العرض!'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'en' ? 'Your solar installation payment plan' : 'خطة دفع تركيب الطاقة الشمسية'}
                  </p>
                </div>
              </div>
              
              {/* Quote Summary Card */}
              <div className="card p-6 mb-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Building className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {loanDetails.vendorName}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {stateData?.quote?.vendorRating}/5.0
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'System Size' : 'حجم النظام'}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {loanDetails.systemSize} kW
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Total Investment' : 'إجمالي الاستثمار'}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {loanDetails.totalAmount.toLocaleString()} SAR
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Monthly Payment' : 'الدفعة الشهرية'}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {loanDetails.monthlyPayment.toLocaleString()} SAR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Existing Payment Management Header */
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {language === 'en' ? 'Payment Management' : 'إدارة المدفوعات'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Track your BNPL payments and loan progress' : 'تتبع دفعات التمويل المؤجل وتقدم القرض'}
              </p>
            </div>
          )}
        </motion.div>

        {/* Loan Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-emerald-500" />
              <span className={`text-xs px-2 py-1 rounded-full ${
                isNewQuoteAcceptance 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              }`}>
                {isNewQuoteAcceptance 
                  ? (language === 'en' ? 'Ready to Start' : 'جاهز للبدء')
                  : `${progressPercentage}% ${language === 'en' ? 'Paid' : 'مدفوع'}`
                }
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {loanDetails.remainingBalance.toLocaleString()} SAR
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isNewQuoteAcceptance 
                ? (language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي')
                : (language === 'en' ? 'Remaining Balance' : 'الرصيد المتبقي')
              }
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-500" />
              <span className={`text-xs px-2 py-1 rounded-full ${
                isNewQuoteAcceptance
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              }`}>
                {isNewQuoteAcceptance
                  ? (language === 'en' ? 'First Payment' : 'الدفعة الأولى')
                  : (language === 'en' ? 'Due Soon' : 'مستحق قريباً')
                }
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {loanDetails.monthlyPayment.toLocaleString()} SAR
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isNewQuoteAcceptance
                ? (language === 'en' ? 'Monthly Payment' : 'الدفعة الشهرية')
                : (language === 'en' ? 'Next Payment' : 'الدفعة التالية')
              }
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                {loanDetails.paymentsCompleted}/{loanDetails.loanTerm}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {loanDetails.paymentsRemaining}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isNewQuoteAcceptance
                ? (language === 'en' ? 'Total Payments' : 'إجمالي الدفعات')
                : (language === 'en' ? 'Payments Left' : 'دفعات متبقية')
              }
            </p>
          </div>
        </motion.div>

        {/* Payment Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {isNewQuoteAcceptance 
              ? (language === 'en' ? 'Payment Plan Details' : 'تفاصيل خطة الدفع')
              : (language === 'en' ? 'Loan Progress' : 'تقدم القرض')
            }
          </h2>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>{language === 'en' ? 'Progress' : 'التقدم'}</span>
              <span>{progressPercentage}% {language === 'en' ? 'Complete' : 'مكتمل'}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                {isNewQuoteAcceptance 
                  ? (language === 'en' ? 'First Payment Due' : 'تاريخ أول دفعة')
                  : (language === 'en' ? 'Paid to Date' : 'المدفوع حتى الآن')
                }
              </h3>
              {isNewQuoteAcceptance ? (
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {new Date(loanDetails.nextPaymentDate).toLocaleDateString()}
                </p>
              ) : (
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {(loanDetails.totalAmount - loanDetails.remainingBalance).toLocaleString()} SAR
                </p>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                {isNewQuoteAcceptance
                  ? (language === 'en' ? 'Payment Plan' : 'خطة الدفع')
                  : (language === 'en' ? 'Next Payment Date' : 'تاريخ الدفعة التالية')
                }
              </h3>
              {isNewQuoteAcceptance ? (
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {loanDetails.loanTerm} {language === 'en' ? 'months • 0% interest' : 'شهر • 0% فوائد'}
                </p>
              ) : (
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {new Date(loanDetails.nextPaymentDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* New Quote Acceptance Actions */}
          {isNewQuoteAcceptance && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {language === 'en' ? 'Next Steps' : 'الخطوات التالية'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/financing/application', { 
                    state: { 
                      quote: stateData?.quote,
                      paymentPlan: stateData?.paymentPlan 
                    } 
                  })}
                  className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{language === 'en' ? 'Complete BNPL Application' : 'أكمل طلب التمويل المؤجل'}</span>
                </button>
                <button 
                  onClick={() => navigate('/quotes')}
                  className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{language === 'en' ? 'Back to Quotes' : 'العودة للعروض'}</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Payment History' : 'تاريخ المدفوعات'}
            </h2>
            {!isNewQuoteAcceptance && (
              <button className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
                <Download className="w-4 h-4" />
                <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
              </button>
            )}
          </div>

          {isNewQuoteAcceptance ? (
            /* No Payment History for New Quote */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'No Payments Yet' : 'لا توجد دفعات بعد'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {language === 'en' 
                  ? 'Your payment history will appear here after completing the BNPL application and making your first payment.'
                  : 'سيظهر تاريخ الدفعات هنا بعد إكمال طلب التمويل المؤجل وسداد أول دفعة.'
                }
              </p>
              
              {/* Next Payment Schedule */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {language === 'en' ? 'Upcoming First Payment' : 'أول دفعة قادمة'}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {loanDetails.monthlyPayment.toLocaleString()} SAR
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Due on' : 'مستحق في'} {new Date(loanDetails.nextPaymentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Existing Payment History */
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {payment.amount.toLocaleString()} SAR
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(payment.date).toLocaleDateString()} • {payment.method}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                    {language === 'en' ? 'Paid' : 'مدفوع'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentManagement;