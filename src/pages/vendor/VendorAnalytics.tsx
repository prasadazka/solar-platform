import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Star,
  Target,
  Activity,
  Zap,
  MapPin,
  Download,
  RefreshCw
} from 'lucide-react';
import { useThemeStore, useAuthStore, useQuoteStore } from '../../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const VendorAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { getVendorQuoteResponses, getAvailableQuoteRequests } = useQuoteStore();

  const [timeRange, setTimeRange] = useState('6m');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get real data from quote store
  const vendorQuotes = getVendorQuoteResponses(user?.id || '');
  const availableRequests = getAvailableQuoteRequests(user?.id);

  // Mock analytics data
  const monthlyRevenue = [
    { month: language === 'en' ? 'Jan' : 'يناير', revenue: 85000 },
    { month: language === 'en' ? 'Feb' : 'فبراير', revenue: 92000 },
    { month: language === 'en' ? 'Mar' : 'مارس', revenue: 78000 },
    { month: language === 'en' ? 'Apr' : 'أبريل', revenue: 105000 },
    { month: language === 'en' ? 'May' : 'مايو', revenue: 118000 },
    { month: language === 'en' ? 'Jun' : 'يونيو', revenue: 134000 },
  ];

  const quoteConversion = [
    { week: 'Week 1', sent: 12, accepted: 8 },
    { week: 'Week 2', sent: 15, accepted: 11 },
    { week: 'Week 3', sent: 18, accepted: 14 },
    { week: 'Week 4', sent: 22, accepted: 17 },
  ];

  const systemTypes = [
    { name: language === 'en' ? 'Residential' : 'سكني', value: 65, color: '#10b981' },
    { name: language === 'en' ? 'Commercial' : 'تجاري', value: 25, color: '#3b82f6' },
    { name: language === 'en' ? 'Industrial' : 'صناعي', value: 10, color: '#f59e0b' },
  ];

  const topCustomers = [
    {
      name: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
      location: language === 'en' ? 'Jeddah' : 'جدة',
      totalSpent: 125000,
      projects: 3
    },
    {
      name: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
      location: language === 'en' ? 'Riyadh' : 'الرياض',
      totalSpent: 89000,
      projects: 2
    }
  ];

  const refreshData = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const exportReport = () => {
    alert(language === 'en' ? 'Analytics report exported!' : 'تم تصدير التقرير!');
  };

  const kpiCards = [
    {
      title: language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات',
      value: '612,000',
      unit: 'SAR',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: language === 'en' ? 'Quote Acceptance' : 'معدل قبول العروض',
      value: '74',
      unit: '%',
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: 'blue'
    },
    {
      title: language === 'en' ? 'Customer Rating' : 'تقييم العملاء',
      value: '4.8',
      unit: '/5.0',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    },
    {
      title: language === 'en' ? 'Active Customers' : 'العملاء النشطون',
      value: '95',
      unit: language === 'en' ? 'customers' : 'عميل',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
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
                {language === 'en' ? 'Business Analytics' : 'تحليلات الأعمال'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Comprehensive insights into your solar business performance'
                  : 'رؤى شاملة حول أداء أعمالك في مجال الطاقة الشمسية'
                }
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4 rtl:space-x-reverse">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field"
              >
                <option value="1m">{language === 'en' ? 'Last Month' : 'الشهر الماضي'}</option>
                <option value="3m">{language === 'en' ? 'Last 3 Months' : 'آخر 3 أشهر'}</option>
                <option value="6m">{language === 'en' ? 'Last 6 Months' : 'آخر 6 أشهر'}</option>
                <option value="1y">{language === 'en' ? 'Last Year' : 'السنة الماضية'}</option>
              </select>
              
              <button 
                onClick={refreshData}
                disabled={isRefreshing}
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{language === 'en' ? 'Refresh' : 'تحديث'}</span>
              </button>
              
              <button 
                onClick={exportReport}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Download className="w-5 h-5" />
                <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${kpi.color}-100 dark:bg-${kpi.color}-900/30 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <TrendIcon className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {kpi.value} <span className="text-sm font-normal text-gray-500">{kpi.unit}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{kpi.title}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Revenue Trend' : 'اتجاه الإيرادات'}
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: any) => [`${value.toLocaleString()} SAR`, 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    fill="url(#revenueGradient)"
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quote Conversion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Quote Conversion Rate' : 'معدل تحويل العروض'}
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quoteConversion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="sent" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Sent" />
                  <Bar dataKey="accepted" fill="#10b981" radius={[4, 4, 0, 0]} name="Accepted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* System Types and Top Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Types Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'System Types' : 'أنواع الأنظمة'}
            </h3>
            
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={systemTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {systemTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4">
              {systemTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{type.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {type.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Top Customers' : 'أفضل العملاء'}
            </h3>
            
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {customer.name}
                    </h4>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-3 h-3" />
                      <span>{customer.location}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {customer.projects} {language === 'en' ? 'projects' : 'مشاريع'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {customer.totalSpent.toLocaleString()} SAR
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Performance Summary' : 'ملخص الأداء'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <Activity className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-emerald-600 mb-1">103</div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300">
                {language === 'en' ? 'Projects Completed' : 'المشاريع المكتملة'}
              </div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-blue-600 mb-1">1,247 kW</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                {language === 'en' ? 'Capacity Installed' : 'القدرة المركبة'}
              </div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-600 mb-1">95</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                {language === 'en' ? 'Satisfied Customers' : 'عملاء راضون'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorAnalytics;
