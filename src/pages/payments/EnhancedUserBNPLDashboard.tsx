import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  Settings,
  Eye,
  Plus,
  Clock,
  Shield,
  Zap,
  Home,
  Receipt,
  PiggyBank,
  Target,
  BarChart3,
  PhoneCall
} from 'lucide-react';
import { useThemeStore } from '../../store';

const EnhancedUserBNPLDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const bnplData = {
    totalAmount: 78000,
    amountPaid: 32500,
    remainingAmount: 45500,
    monthlyEMI: 3250,
    remainingEMIs: 14,
    nextPaymentDate: '2024-12-05',
    totalSavings: 12500,
    paymentScore: 850,
    autoDebitEnabled: true,
    earlyPaymentDiscount: 5,
    latePaymentFee: 250,
    contractStartDate: '2024-01-01',
    contractEndDate: '2025-03-01'
  };

  const paymentStats = [
    { 
      title: language === 'en' ? 'Total Paid' : 'إجمالي المدفوع', 
      value: '32,500', 
      unit: 'SAR', 
      icon: CheckCircle, 
      color: 'green',
      trend: '+8.5%',
      subtitle: language === 'en' ? 'On Schedule' : 'في الموعد'
    },
    { 
      title: language === 'en' ? 'Remaining Balance' : 'الرصيد المتبقي', 
      value: '45,500', 
      unit: 'SAR', 
      icon: Clock, 
      color: 'blue',
      trend: '-12.3%',
      subtitle: language === 'en' ? '14 payments left' : '14 دفعة متبقية'
    },
    { 
      title: language === 'en' ? 'Solar Savings' : 'وفورات الطاقة', 
      value: '12,500', 
      unit: 'SAR', 
      icon: TrendingUp, 
      color: 'emerald',
      trend: '+15.2%',
      subtitle: language === 'en' ? 'This year' : 'هذا العام'
    },
    { 
      title: language === 'en' ? 'Payment Score' : 'نقاط الدفع', 
      value: '850', 
      unit: '/1000', 
      icon: Shield, 
      color: 'purple',
      trend: '+5.8%',
      subtitle: language === 'en' ? 'Excellent' : 'ممتاز'
    }
  ];
  const recentPayments = [
    { 
      id: 1,
      date: '2024-11-05', 
      amount: 3250, 
      status: 'paid', 
      method: 'Auto Debit',
      transactionId: 'TXN-2024-001',
      paymentScore: 10
    },
    { 
      id: 2,
      date: '2024-10-05', 
      amount: 3250, 
      status: 'paid', 
      method: 'Auto Debit',
      transactionId: 'TXN-2024-002',
      paymentScore: 10
    },
    { 
      id: 3,
      date: '2024-09-05', 
      amount: 3250, 
      status: 'paid', 
      method: 'Credit Card',
      transactionId: 'TXN-2024-003',
      paymentScore: 8
    },
    { 
      id: 4,
      date: '2024-08-05', 
      amount: 3250, 
      status: 'paid', 
      method: 'Bank Transfer',
      transactionId: 'TXN-2024-004',
      paymentScore: 7
    }
  ];
  const nextPayments = [
    { 
      id: 1,
      date: '2024-12-05', 
      amount: 3250, 
      status: 'upcoming',
      daysLeft: 2,
      autoDebit: true
    },
    { 
      id: 2,
      date: '2025-01-05', 
      amount: 3250, 
      status: 'scheduled',
      daysLeft: 32,
      autoDebit: true
    },
    { 
      id: 3,
      date: '2025-02-05', 
      amount: 3250, 
      status: 'scheduled',
      daysLeft: 63,
      autoDebit: true
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-4">
                {language === 'en' ? 'My BNPL Payments' : 'مدفوعاتي الآجلة'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Comprehensive payment tracking, savings, and financial management' : 'تتبع شامل للمدفوعات والوفورات والإدارة المالية'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
              <button 
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                onClick={() => navigate('/payments/settings')}
              >
                <Settings className="w-5 h-5" />
                <span>{language === 'en' ? 'Settings' : 'الإعدادات'}</span>
              </button>
              <button 
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                onClick={() => navigate('/payments/pay-now')}
              >
                <DollarSign className="w-5 h-5" />
                <span>{language === 'en' ? 'Pay Now' : 'ادفع الآن'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[
              { id: 'overview', label: language === 'en' ? 'Overview' : 'نظرة عامة', icon: Home },
              { id: 'history', label: language === 'en' ? 'Payment History' : 'تاريخ المدفوعات', icon: Receipt },
              { id: 'savings', label: language === 'en' ? 'Savings' : 'الوفورات', icon: PiggyBank },
              { id: 'analytics', label: language === 'en' ? 'Analytics' : 'التحليلات', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-emerald-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
        {/* Stats Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {paymentStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend.startsWith('+') 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{stat.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Overview */}
            <div className="lg:col-span-2 card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Payment Overview' : 'نظرة عامة على المدفوعات'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{bnplData.totalAmount.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Amount Paid' : 'المبلغ المدفوع'}</span>
                    <span className="font-semibold text-green-600">{bnplData.amountPaid.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Remaining Amount' : 'المبلغ المتبقي'}</span>
                    <span className="font-semibold text-blue-600">{bnplData.remainingAmount.toLocaleString()} SAR</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Monthly EMI' : 'القسط الشهري'}</span>
                    <span className="font-semibold text-emerald-600">{bnplData.monthlyEMI.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Remaining EMIs' : 'الأقساط المتبقية'}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{bnplData.remainingEMIs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Next Payment' : 'الدفعة التالية'}</span>
                    <span className="font-semibold text-red-600">{new Date(bnplData.nextPaymentDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{language === 'en' ? 'Payment Progress' : 'تقدم الدفع'}</span>
                  <span className="text-sm text-emerald-600">{Math.round((bnplData.amountPaid / bnplData.totalAmount) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${(bnplData.amountPaid / bnplData.totalAmount) * 100}%` }}
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
                <div className="text-3xl font-bold text-blue-600 mb-2">{bnplData.monthlyEMI.toLocaleString()}</div>
                <div className="text-sm text-blue-700 dark:text-blue-300 mb-4">SAR</div>
                
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm text-blue-600 dark:text-blue-300 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(bnplData.nextPaymentDate).toLocaleDateString()}</span>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                    {language === 'en' ? 'Pay Now' : 'ادفع الآن'}
                  </button>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-blue-600 dark:text-blue-300">
                    <CheckCircle className="w-3 h-3" />
                    <span>{language === 'en' ? 'Auto-debit enabled' : 'الخصم التلقائي مُفعل'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Payments */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Recent Payments' : 'المدفوعات الأخيرة'}
              </h3>
              
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{payment.amount.toLocaleString()} SAR</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(payment.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{payment.transactionId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-green-600 font-medium">{payment.method}</span>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < payment.paymentScore ? 'bg-yellow-400' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1 rtl:ml-0 rtl:mr-1">+{payment.paymentScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 px-4 border border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200">
                {language === 'en' ? 'View All Payments' : 'عرض جميع المدفوعات'}
              </button>
            </div>
            {/* Upcoming Payments */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Upcoming Payments' : 'المدفوعات القادمة'}
              </h3>
              
              <div className="space-y-4">
                {nextPayments.map((payment) => (
                  <div key={payment.id} className={`flex items-center justify-between p-4 rounded-xl ${
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
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs">
                          {payment.autoDebit && <CheckCircle className="w-3 h-3 text-green-500" />}
                          <span className="text-gray-500 dark:text-gray-400">
                            {payment.autoDebit ? (language === 'en' ? 'Auto-debit' : 'خصم تلقائي') : (language === 'en' ? 'Manual' : 'يدوي')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        payment.daysLeft <= 7 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {payment.daysLeft} {language === 'en' ? 'days' : 'يوم'}
                      </span>
                      {payment.status === 'upcoming' && <AlertTriangle className="w-4 h-4 text-yellow-600 mt-1 mx-auto" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {/* Savings Tab */}
        {activeTab === 'savings' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Solar Savings Overview */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Solar Energy Savings' : 'وفورات الطاقة الشمسية'}
              </h3>
              
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-200">
                        {language === 'en' ? 'Monthly Savings' : 'الوفورات الشهرية'}
                      </h4>
                      <p className="text-2xl font-bold text-green-600">1,200 SAR</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {language === 'en' ? 'Average electricity bill reduction' : 'متوسط تخفيض فاتورة الكهرباء'}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                        {language === 'en' ? 'Total Savings' : 'إجمالي الوفورات'}
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">{bnplData.totalSavings.toLocaleString()} SAR</p>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {language === 'en' ? 'Since installation' : 'منذ التركيب'}
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                        {language === 'en' ? 'Projected Annual Savings' : 'الوفورات السنوية المتوقعة'}
                      </h4>
                      <p className="text-2xl font-bold text-purple-600">18,500 SAR</p>
                    </div>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    {language === 'en' ? 'Based on current performance' : 'بناءً على الأداء الحالي'}
                  </p>
                </div>
              </div>
            </div>
            {/* Savings vs Payments Comparison */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Savings vs Payments' : 'الوفورات مقابل المدفوعات'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <span className="text-emerald-800 dark:text-emerald-200 font-medium">
                    {language === 'en' ? 'Monthly BNPL Payment' : 'الدفعة الشهرية الآجلة'}
                  </span>
                  <span className="text-emerald-600 font-bold">{bnplData.monthlyEMI.toLocaleString()} SAR</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    {language === 'en' ? 'Monthly Solar Savings' : 'الوفورات الشمسية الشهرية'}
                  </span>
                  <span className="text-green-600 font-bold">1,200 SAR</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    {language === 'en' ? 'Net Monthly Cost' : 'التكلفة الشهرية الصافية'}
                  </span>
                  <span className="text-blue-600 font-bold">2,050 SAR</span>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="text-center">
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                      {language === 'en' ? 'Break-even Point' : 'نقطة التعادل'}
                    </h4>
                    <p className="text-2xl font-bold text-emerald-600 mb-1">8 months</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {language === 'en' ? 'After BNPL completion' : 'بعد إكمال الدفع الآجل'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            {/* Payment Analytics */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Payment Analytics' : 'تحليلات المدفوعات'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{Math.round((bnplData.amountPaid / bnplData.totalAmount) * 100)}%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">{language === 'en' ? 'Payment Completed' : 'المدفوعات المكتملة'}</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                  <div className="text-sm text-green-700 dark:text-green-300">{language === 'en' ? 'On-Time Payments' : 'المدفوعات في الوقت'}</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{bnplData.paymentScore}</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">{language === 'en' ? 'Credit Score' : 'النقاط الائتمانية'}</div>
                </div>
              </div>
            </div>

            {/* Financial Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Financial Benefits' : 'الفوائد المالية'}
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Interest Saved (0% APR)' : 'الفوائد الموفرة (0% معدل سنوي)'}</span>
                    <span className="text-green-600 font-semibold">7,800 SAR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Early Payment Discount Available' : 'خصم الدفع المبكر المتاح'}</span>
                    <span className="text-emerald-600 font-semibold">2,275 SAR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Potential Savings' : 'إجمالي الوفورات المحتملة'}</span>
                    <span className="text-blue-600 font-semibold">10,075 SAR</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Payment Options' : 'خيارات الدفع'}
                </h4>
                
                <div className="space-y-3">
                  <button className="w-full p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-emerald-800 dark:text-emerald-200">
                        {language === 'en' ? 'Pay Early & Save 5%' : 'ادفع مبكراً واوفر 5%'}
                      </span>
                      <span className="text-emerald-600 font-bold">2,275 SAR</span>
                    </div>
                    <p className="text-sm text-emerald-600 mt-1">
                      {language === 'en' ? 'Pay remaining balance now' : 'ادفع الرصيد المتبقي الآن'}
                    </p>
                  </button>
                  
                  <button className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {language === 'en' ? 'Extra Payment' : 'دفعة إضافية'}
                      </span>
                      <Plus className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {language === 'en' ? 'Make additional payment' : 'قم بدفعة إضافية'}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Quick Actions Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mt-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              onClick={() => navigate('/payments/pay-now')}
            >
              <DollarSign className="w-5 h-5" />
              <span>{language === 'en' ? 'Make Payment' : 'قم بالدفع'}</span>
            </button>

            <button 
              className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              onClick={() => navigate('/payments/download-receipt')}
            >
              <Download className="w-5 h-5" />
              <span>{language === 'en' ? 'Download Receipt' : 'تحميل الإيصال'}</span>
            </button>

            <button 
              className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              onClick={() => navigate('/payments/settings')}
            >
              <Settings className="w-5 h-5" />
              <span>{language === 'en' ? 'Settings' : 'الإعدادات'}</span>
            </button>

            <button 
              className="bg-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              onClick={() => navigate('/support')}
            >
              <PhoneCall className="w-5 h-5" />
              <span>{language === 'en' ? 'Support' : 'الدعم'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedUserBNPLDashboard;