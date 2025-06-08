import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, DollarSign, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import { useThemeStore } from '../../store';

const UserBNPLDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();

  const bnplSummary = {
    totalAmount: 78000,
    amountPaid: 32500,
    remainingAmount: 45500,
    monthlyEMI: 3250,
    remainingEMIs: 14,
    nextPaymentDate: '2024-12-05',
    status: 'active',
    autoDebitEnabled: true,
    paymentScore: 850,
    totalSolarSavings: 12500,
    projectedAnnualSavings: 18500
  };

  const nextPayments = [
    { date: '2024-12-05', amount: 3250, status: 'upcoming' },
    { date: '2025-01-05', amount: 3250, status: 'scheduled' },
    { date: '2025-02-05', amount: 3250, status: 'scheduled' }
  ];

  const paymentHistory = [
    { date: '2024-11-05', amount: 3250, status: 'paid', method: 'Auto Debit' },
    { date: '2024-10-05', amount: 3250, status: 'paid', method: 'Auto Debit' },
    { date: '2024-09-05', amount: 3250, status: 'paid', method: 'Credit Card' }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
            {language === 'en' ? 'My BNPL Payments' : 'مدفوعاتي الآجلة'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' ? 'Track your payment schedule and history' : 'تتبع جدول ومراجعة مدفوعاتك'}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{bnplSummary.amountPaid.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Total Paid' : 'إجمالي المدفوع'}</div>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{bnplSummary.remainingEMIs}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Payments Left' : 'دفعات متبقية'}</div>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{bnplSummary.totalSolarSavings.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Solar Savings' : 'وفورات الطاقة'}</div>
          </div>

          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{bnplSummary.paymentScore}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Payment Score' : 'نقاط الدفع'}</div>
          </div>
        </motion.div>

        {/* BNPL Summary Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Payment Overview */}
          <div className="lg:col-span-2 card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Payment Overview' : 'نظرة عامة على المدفوعات'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{bnplSummary.totalAmount.toLocaleString()} SAR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Amount Paid' : 'المبلغ المدفوع'}</span>
                  <span className="font-semibold text-green-600">{bnplSummary.amountPaid.toLocaleString()} SAR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Remaining Amount' : 'المبلغ المتبقي'}</span>
                  <span className="font-semibold text-blue-600">{bnplSummary.remainingAmount.toLocaleString()} SAR</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly EMI' : 'القسط الشهري'}</span>
                  <span className="font-semibold text-emerald-600">{bnplSummary.monthlyEMI.toLocaleString()} SAR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Remaining EMIs' : 'الأقساط المتبقية'}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{bnplSummary.remainingEMIs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Next Payment' : 'الدفعة التالية'}</span>
                  <span className="font-semibold text-red-600">{new Date(bnplSummary.nextPaymentDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Payment Progress' : 'تقدم الدفع'}</span>
                <span className="text-sm text-emerald-600">{Math.round((bnplSummary.amountPaid / bnplSummary.totalAmount) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(bnplSummary.amountPaid / bnplSummary.totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Next Payment Alert */}
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
              {language === 'en' ? 'Next Payment Due' : 'الدفعة التالية مستحقة'}
            </h4>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{bnplSummary.monthlyEMI.toLocaleString()}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300 mb-4">SAR</div>
              
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm text-blue-600 dark:text-blue-300 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{new Date(bnplSummary.nextPaymentDate).toLocaleDateString()}</span>
              </div>

              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                {language === 'en' ? 'Pay Now' : 'ادفع الآن'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Recent Payments' : 'المدفوعات الأخيرة'}
            </h3>
            
            <div className="space-y-4">
              {paymentHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{payment.amount.toLocaleString()} SAR</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(payment.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">{payment.method}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Payments */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Upcoming Payments' : 'المدفوعات القادمة'}
            </h3>
            
            <div className="space-y-4">
              {nextPayments.map((payment, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${
                  payment.status === 'upcoming' 
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payment.status === 'upcoming' 
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Calendar className={`w-5 h-5 ${
                        payment.status === 'upcoming' ? 'text-yellow-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{payment.amount.toLocaleString()} SAR</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(payment.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {payment.status === 'upcoming' && (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserBNPLDashboard;