import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  CreditCard,
  Banknote,
  PiggyBank,
  Target,
  BarChart3,
  RefreshCw,
  Percent,
  Calculator,
  Bell,
  Shield
} from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorPaymentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const [activeTab, setActiveTab] = useState('overview');
  const paymentStats = [
    { 
      title: language === 'en' ? 'Total Earnings' : 'إجمالي الأرباح', 
      value: '485,000', 
      unit: 'SAR', 
      icon: DollarSign, 
      color: 'emerald',
      trend: '+12.5%',
      subtitle: language === 'en' ? 'This year' : 'هذا العام'
    },
    { 
      title: language === 'en' ? 'Pending Collections' : 'المحصلات المعلقة', 
      value: '125,000', 
      unit: 'SAR', 
      icon: Clock, 
      color: 'yellow',
      trend: '-5.2%',
      subtitle: language === 'en' ? 'From 18 customers' : 'من 18 عميل'
    },
    { 
      title: language === 'en' ? 'This Month' : 'هذا الشهر', 
      value: '78,000', 
      unit: 'SAR', 
      icon: TrendingUp, 
      color: 'blue',
      trend: '+8.7%',
      subtitle: language === 'en' ? 'Commission included' : 'شاملة العمولة'
    },
    { 
      title: language === 'en' ? 'BNPL Customers' : 'عملاء الدفع الآجل', 
      value: '15', 
      unit: language === 'en' ? 'active' : 'نشط', 
      icon: Users, 
      color: 'purple',
      trend: '+3.1%',
      subtitle: language === 'en' ? 'Payment rate: 98%' : 'معدل الدفع: 98%'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      customer: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
      amount: 3250,
      type: 'emi_payment',
      date: '2024-12-03',
      status: 'received',
      commission: 325
    },
    {
      id: 2,
      customer: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
      amount: 2167,
      type: 'emi_payment',
      date: '2024-12-02',
      status: 'received',
      commission: 217
    },
    {
      id: 3,
      customer: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
      amount: 4063,
      type: 'final_payment',
      date: '2024-12-01',
      status: 'received',
      commission: 406
    },
    {
      id: 4,
      customer: language === 'en' ? 'Sara Al-Mahmoud' : 'سارة المحمود',
      amount: 2708,
      type: 'emi_payment',
      date: '2024-11-30',
      status: 'pending',
      commission: 271
    }
  ];
  const bnplCustomers = [
    {
      id: 1,
      name: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
      projectValue: 78000,
      amountPaid: 32500,
      remainingAmount: 45500,
      nextPayment: '2024-12-05',
      status: 'current',
      paymentScore: 'excellent'
    },
    {
      id: 2,
      name: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
      projectValue: 52000,
      amountPaid: 41600,
      remainingAmount: 10400,
      nextPayment: '2024-12-08',
      status: 'current',
      paymentScore: 'good'
    },
    {
      id: 3,
      name: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
      projectValue: 97500,
      amountPaid: 97500,
      remainingAmount: 0,
      nextPayment: null,
      status: 'completed',
      paymentScore: 'excellent'
    },
    {
      id: 4,
      name: language === 'en' ? 'Sara Al-Mahmoud' : 'سارة المحمود',
      projectValue: 65000,
      amountPaid: 19500,
      remainingAmount: 45500,
      nextPayment: '2024-12-10',
      status: 'delayed',
      paymentScore: 'fair'
    }
  ];

  const upcomingPayouts = [
    {
      date: '2024-12-15',
      amount: 52000,
      type: 'monthly_payout',
      customers: 12,
      commission: 5200
    },
    {
      date: '2024-12-25',
      amount: 23000,
      type: 'project_completion',
      customers: 3,
      commission: 2300
    },
    {
      date: '2025-01-15',
      amount: 48000,
      type: 'monthly_payout',
      customers: 15,
      commission: 4800
    }
  ];
  const monthlyData = [
    { month: 'Jul', earnings: 45000, collections: 38000, commission: 4500 },
    { month: 'Aug', earnings: 52000, collections: 48000, commission: 5200 },
    { month: 'Sep', earnings: 48000, collections: 45000, commission: 4800 },
    { month: 'Oct', earnings: 65000, collections: 58000, commission: 6500 },
    { month: 'Nov', earnings: 78000, collections: 72000, commission: 7800 },
    { month: 'Dec', earnings: 85000, collections: 75000, commission: 8500 }
  ];

  const alerts = [
    {
      id: 1,
      type: 'payment_overdue',
      customer: language === 'en' ? 'Sara Al-Mahmoud' : 'سارة المحمود',
      amount: 2708,
      daysOverdue: 3,
      priority: 'high'
    },
    {
      id: 2,
      type: 'payout_scheduled',
      amount: 52000,
      date: '2024-12-15',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'commission_update',
      message: language === 'en' ? 'Platform commission reduced to 8%' : 'تم تخفيض عمولة المنصة إلى 8%',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">{/* Header */}
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
                {language === 'en' ? 'Payment Dashboard' : 'لوحة المدفوعات'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Track earnings, collections, BNPL payments, and vendor payouts' : 'تتبع الأرباح والتحصيلات ومدفوعات الدفع الآجل ومستحقات المورد'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
              <button className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
                <Download className="w-5 h-5" />
                <span>{language === 'en' ? 'Export Report' : 'تصدير التقرير'}</span>
              </button>
              <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                <RefreshCw className="w-5 h-5" />
                <span>{language === 'en' ? 'Refresh' : 'تحديث'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[
              { id: 'overview', label: language === 'en' ? 'Overview' : 'نظرة عامة', icon: BarChart3 },
              { id: 'bnpl', label: language === 'en' ? 'BNPL Tracking' : 'تتبع الدفع الآجل', icon: CreditCard },
              { id: 'payouts', label: language === 'en' ? 'Payouts' : 'المستحقات', icon: Banknote },
              { id: 'analytics', label: language === 'en' ? 'Analytics' : 'التحليلات', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-emerald-600 shadow-md border border-emerald-200 dark:border-emerald-700'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
        {/* Stats Grid - Only show in Overview tab */}
        {activeTab === 'overview' && (
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
        )}

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Transactions */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Recent Transactions' : 'المعاملات الأخيرة'}
                </h3>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                  {language === 'en' ? 'View All' : 'عرض الكل'}
                </button>
              </div>
              
              <div className="space-y-4">
                {recentTransactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.status === 'received' 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : 'bg-yellow-100 dark:bg-yellow-900/30'
                      }`}>
                        {transaction.status === 'received' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{transaction.customer}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{transaction.amount.toLocaleString()} SAR</p>
                      <p className="text-xs text-emerald-600">+{transaction.commission} commission</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Alerts and Notifications */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Alerts & Notifications' : 'التنبيهات والإشعارات'}
                </h3>
                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                  {alerts.filter(alert => alert.priority === 'high').length} {language === 'en' ? 'urgent' : 'عاجل'}
                </span>
              </div>
              
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.priority === 'high' 
                      ? 'bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-500'
                      : alert.priority === 'medium'
                      ? 'bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-500'
                      : 'bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-500'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          alert.priority === 'high' 
                            ? 'bg-red-100 dark:bg-red-900/30' 
                            : alert.priority === 'medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30'
                            : 'bg-blue-100 dark:bg-blue-900/30'
                        }`}>
                          {alert.type === 'payment_overdue' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                          {alert.type === 'payout_scheduled' && <Calendar className="w-4 h-4 text-yellow-600" />}
                          {alert.type === 'commission_update' && <Bell className="w-4 h-4 text-blue-600" />}
                        </div>
                        <div>
                          {alert.type === 'payment_overdue' && (
                            <>
                              <p className="font-medium text-red-800 dark:text-red-200 text-sm">
                                {language === 'en' ? 'Payment Overdue' : 'دفعة متأخرة'}
                              </p>
                              <p className="text-red-600 dark:text-red-300 text-xs">
                                {alert.customer} - {alert.amount.toLocaleString()} SAR ({alert.daysOverdue} {language === 'en' ? 'days' : 'أيام'})
                              </p>
                            </>
                          )}
                          {alert.type === 'payout_scheduled' && (
                            <>
                              <p className="font-medium text-yellow-800 dark:text-yellow-200 text-sm">
                                {language === 'en' ? 'Payout Scheduled' : 'مستحق مجدول'}
                              </p>
                              <p className="text-yellow-600 dark:text-yellow-300 text-xs">
                                {alert.amount.toLocaleString()} SAR - {new Date(alert.date).toLocaleDateString()}
                              </p>
                            </>
                          )}
                          {alert.type === 'commission_update' && (
                            <>
                              <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                                {language === 'en' ? 'Commission Update' : 'تحديث العمولة'}
                              </p>
                              <p className="text-blue-600 dark:text-blue-300 text-xs">{alert.message}</p>
                            </>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.priority === 'high' 
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          : alert.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {alert.priority === 'high' && (language === 'en' ? 'High' : 'عالي')}
                        {alert.priority === 'medium' && (language === 'en' ? 'Medium' : 'متوسط')}
                        {alert.priority === 'low' && (language === 'en' ? 'Low' : 'منخفض')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {/* BNPL Tracking Tab */}
        {activeTab === 'bnpl' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'BNPL Customer Payments Tracking' : 'تتبع مدفوعات عملاء الدفع الآجل'}
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Customer' : 'العميل'}
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Project Value' : 'قيمة المشروع'}
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Paid Amount' : 'المبلغ المدفوع'}
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Remaining' : 'المتبقي'}
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Next Payment' : 'الدفعة التالية'}
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Status' : 'الحالة'}
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Actions' : 'الإجراءات'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bnplCustomers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{customer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{customer.paymentScore}</p>
                          </div>
                        </td>
                        <td className="py-4 text-gray-900 dark:text-gray-100">
                          {customer.projectValue.toLocaleString()} SAR
                        </td>
                        <td className="py-4">
                          <div>
                            <p className="text-green-600 font-medium">{customer.amountPaid.toLocaleString()} SAR</p>
                            <p className="text-xs text-gray-500">{Math.round((customer.amountPaid / customer.projectValue) * 100)}% paid</p>
                          </div>
                        </td>
                        <td className="py-4 text-blue-600 font-medium">
                          {customer.remainingAmount.toLocaleString()} SAR
                        </td>
                        <td className="py-4 text-gray-900 dark:text-gray-100">
                          {customer.nextPayment ? new Date(customer.nextPayment).toLocaleDateString() : 
                            <span className="text-green-600 font-medium">{language === 'en' ? 'Completed' : 'مكتمل'}</span>
                          }
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === 'current' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : customer.status === 'completed'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {customer.status === 'current' 
                              ? (language === 'en' ? 'Current' : 'حالي')
                              : customer.status === 'completed'
                              ? (language === 'en' ? 'Completed' : 'مكتمل')
                              : (language === 'en' ? 'Delayed' : 'متأخر')
                            }
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        {/* Payouts Tab */}
        {activeTab === 'payouts' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Upcoming Payouts' : 'المستحقات القادمة'}
              </h3>
              
              <div className="space-y-4">
                {upcomingPayouts.map((payout, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-emerald-800 dark:text-emerald-200 text-lg">
                        {payout.amount.toLocaleString()} SAR
                      </span>
                      <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        {new Date(payout.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-700 dark:text-emerald-300">
                        {payout.customers} {language === 'en' ? 'customers' : 'عميل'}
                      </span>
                      <span className="text-red-600 font-medium">
                        -{payout.commission.toLocaleString()} SAR {language === 'en' ? 'commission' : 'عمولة'}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                      {payout.type === 'monthly_payout' 
                        ? (language === 'en' ? 'Monthly Payout' : 'مستحق شهري')
                        : (language === 'en' ? 'Project Completion' : 'إنجاز مشروع')
                      }
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  {language === 'en' ? 'Payout Schedule Info' : 'معلومات جدول المستحقات'}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  {language === 'en' ? '• Monthly payouts: 15th of each month' : '• المستحقات الشهرية: 15 من كل شهر'}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {language === 'en' ? '• Platform commission: 10% of project value' : '• عمولة المنصة: 10% من قيمة المشروع'}
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Payout Summary' : 'ملخص المستحقات'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div>
                    <span className="text-emerald-800 dark:text-emerald-200 font-medium text-sm">
                      {language === 'en' ? 'Next Payout' : 'المستحق التالي'}
                    </span>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">Dec 15, 2024</p>
                  </div>
                  <span className="text-emerald-600 font-bold text-xl">52,000 SAR</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div>
                    <span className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                      {language === 'en' ? 'Total This Quarter' : 'إجمالي هذا الربع'}
                    </span>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Q4 2024</p>
                  </div>
                  <span className="text-blue-600 font-bold text-xl">123,000 SAR</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div>
                    <span className="text-yellow-800 dark:text-yellow-200 font-medium text-sm">
                      {language === 'en' ? 'Commission Deducted' : 'العمولة المخصومة'}
                    </span>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">Platform fee</p>
                  </div>
                  <span className="text-yellow-600 font-bold text-xl">12,300 SAR</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div>
                    <span className="text-purple-800 dark:text-purple-200 font-medium text-sm">
                      {language === 'en' ? 'Net Earnings' : 'صافي الأرباح'}
                    </span>
                    <p className="text-xs text-purple-600 dark:text-purple-400">After commission</p>
                  </div>
                  <span className="text-purple-600 font-bold text-xl">110,700 SAR</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Percent className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">98.2%</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Payment Success Rate' : 'معدل نجاح المدفوعات'}</p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">3,246 SAR</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Avg. Monthly EMI' : 'متوسط القسط الشهري'}</p>
              </div>

              <div className="card p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">18.2 mo</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Avg. Payment Period' : 'متوسط فترة الدفع'}</p>
              </div>
            </div>

            {/* Revenue Trends */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                {language === 'en' ? 'Revenue Trends (Last 6 Months)' : 'اتجاهات الإيرادات (آخر 6 أشهر)'}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {monthlyData.map((month, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{month.month}</p>
                    <p className="text-lg font-bold text-emerald-600 mb-1">{month.earnings.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'en' ? 'Earnings' : 'الأرباح'}</p>
                    <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(month.earnings / 85000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Payment Distribution' : 'توزيع المدفوعات'}
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'On-time payments' : 'المدفوعات في الوقت'}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-full h-full bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-green-600 font-semibold">98%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Late payments' : 'المدفوعات المتأخرة'}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-1/12 h-full bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-red-600 font-semibold">2%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Early payments' : 'المدفوعات المبكرة'}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="w-3/12 h-full bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-blue-600 font-semibold">25%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Key Performance Indicators' : 'مؤشرات الأداء الرئيسية'}
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <span className="text-emerald-800 dark:text-emerald-200 font-medium">
                      {language === 'en' ? 'Collection Efficiency' : 'كفاءة التحصيل'}
                    </span>
                    <span className="text-emerald-600 font-bold">94.8%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-blue-800 dark:text-blue-200 font-medium">
                      {language === 'en' ? 'Customer Retention' : 'الاحتفاظ بالعملاء'}
                    </span>
                    <span className="text-blue-600 font-bold">89.2%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="text-purple-800 dark:text-purple-200 font-medium">
                      {language === 'en' ? 'Revenue Growth' : 'نمو الإيرادات'}
                    </span>
                    <span className="text-purple-600 font-bold">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VendorPaymentDashboard;