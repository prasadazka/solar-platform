import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building, 
  DollarSign, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  UserX,
  Globe,
  Headphones,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CreditCard,
  Zap,
  Target,
  Award,
  Briefcase
} from 'lucide-react';
import { useThemeStore, useAuthStore } from '../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Enhanced mock data for charts
  const platformGrowth = [
    { month: language === 'en' ? 'Jan' : 'يناير', users: 120, vendors: 15, revenue: 85000, installations: 23 },
    { month: language === 'en' ? 'Feb' : 'فبراير', users: 145, vendors: 18, revenue: 102000, installations: 31 },
    { month: language === 'en' ? 'Mar' : 'مارس', users: 189, vendors: 22, revenue: 128000, installations: 45 },
    { month: language === 'en' ? 'Apr' : 'أبريل', users: 234, vendors: 28, revenue: 156000, installations: 58 },
    { month: language === 'en' ? 'May' : 'مايو', users: 298, vendors: 35, revenue: 185000, installations: 72 },
    { month: language === 'en' ? 'Jun' : 'يونيو', users: 367, vendors: 42, revenue: 223000, installations: 89 },
  ];

  const revenueBreakdown = [
    { name: language === 'en' ? 'BNPL Interest' : 'فوائد التمويل', value: 35, color: '#3b82f6' },
    { name: language === 'en' ? 'Commission' : 'العمولات', value: 45, color: '#10b981' },
    { name: language === 'en' ? 'Subscriptions' : 'الاشتراكات', value: 12, color: '#f59e0b' },
    { name: language === 'en' ? 'Other' : 'أخرى', value: 8, color: '#8b5cf6' }
  ];
  const cityPerformance = [
    { city: language === 'en' ? 'Riyadh' : 'الرياض', installs: 145, revenue: 2800000 },
    { city: language === 'en' ? 'Jeddah' : 'جدة', installs: 98, revenue: 1950000 },
    { city: language === 'en' ? 'Dammam' : 'الدمام', installs: 76, revenue: 1450000 },
    { city: language === 'en' ? 'Mecca' : 'مكة', installs: 54, revenue: 1080000 },
    { city: language === 'en' ? 'Medina' : 'المدينة', installs: 42, revenue: 820000 },
  ];

  // Enhanced KPI data
  const kpiData = [
    {
      title: language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات',
      value: '12.4M',
      subValue: 'SAR',
      change: '+23.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'emerald',
      description: language === 'en' ? 'Monthly recurring revenue' : 'الإيرادات الشهرية المتكررة'
    },
    {
      title: language === 'en' ? 'Active Users' : 'المستخدمون النشطون',
      value: '8,247',
      subValue: 'users',
      change: '+12.3%',
      changeType: 'positive',
      icon: Users,
      color: 'blue',
      description: language === 'en' ? 'Registered and verified users' : 'المستخدمون المسجلون والمتحققون'
    },
    {
      title: language === 'en' ? 'Solar Installations' : 'التركيبات الشمسية',
      value: '342',
      subValue: 'systems',
      change: '+18.7%',
      changeType: 'positive',
      icon: Zap,
      color: 'yellow',
      description: language === 'en' ? 'Completed this month' : 'مكتملة هذا الشهر'
    },
    {
      title: language === 'en' ? 'BNPL Approval Rate' : 'معدل قبول التمويل',
      value: '87.2%',
      subValue: 'approved',
      change: '+5.1%',
      changeType: 'positive',
      icon: CreditCard,
      color: 'purple',
      description: language === 'en' ? 'Financing approval success' : 'نجاح الموافقة على التمويل'
    },
    {
      title: language === 'en' ? 'Vendor Partners' : 'شركاء الموردين',
      value: '156',
      subValue: 'verified',
      change: '+8.9%',
      changeType: 'positive',
      icon: Building,
      color: 'orange',
      description: language === 'en' ? 'Active vendor network' : 'شبكة الموردين النشطة'
    },
    {
      title: language === 'en' ? 'Platform Health' : 'صحة المنصة',
      value: '99.8%',
      subValue: 'uptime',
      change: '+0.2%',
      changeType: 'positive',
      icon: Activity,
      color: 'green',
      description: language === 'en' ? 'System reliability score' : 'نقاط موثوقية النظام'
    }
  ];
  // Quick action buttons data
  const quickActions = [
    {
      title: language === 'en' ? 'User Management' : 'إدارة المستخدمين',
      description: language === 'en' ? 'Manage user accounts, permissions & verification' : 'إدارة حسابات المستخدمين والصلاحيات والتحقق',
      icon: Users,
      color: 'blue',
      route: '/admin/users',
      stats: '8,247 users'
    },
    {
      title: language === 'en' ? 'Vendor Approvals' : 'موافقات الموردين',
      description: language === 'en' ? 'Review vendor applications & compliance' : 'مراجعة طلبات الموردين والامتثال',
      icon: Building,
      color: 'purple',
      route: '/admin/vendors',
      stats: '23 pending'
    },
    {
      title: language === 'en' ? 'BNPL Management' : 'إدارة التمويل المؤجل',
      description: language === 'en' ? 'Financing applications & credit decisions' : 'طلبات التمويل وقرارات الائتمان',
      icon: CreditCard,
      color: 'emerald',
      route: '/admin/bnpl',
      stats: '87.2% approval'
    },
    {
      title: language === 'en' ? 'Analytics & Reports' : 'التحليلات والتقارير',
      description: language === 'en' ? 'Business intelligence & performance insights' : 'ذكاء الأعمال ورؤى الأداء',
      icon: BarChart3,
      color: 'orange',
      route: '/admin/analytics',
      stats: 'Real-time data'
    },
    {
      title: language === 'en' ? 'System Configuration' : 'تكوين النظام',
      description: language === 'en' ? 'Platform settings & business rules' : 'إعدادات المنصة وقواعد الأعمال',
      icon: Settings,
      color: 'gray',
      route: '/admin/settings',
      stats: 'Live config'
    },
    {
      title: language === 'en' ? 'Security Center' : 'مركز الأمان',
      description: language === 'en' ? 'Security monitoring & audit logs' : 'مراقبة الأمان وسجلات التدقيق',
      icon: Shield,
      color: 'red',
      route: '/admin/security',
      stats: '99.8% secure'
    }
  ];
  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500',
      blue: 'from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
      purple: 'from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500',
      orange: 'from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500',
      yellow: 'from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500',
      green: 'from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
      red: 'from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
      gray: 'from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconBgColor = (color: string) => {
    const colorMap = {
      emerald: 'bg-emerald-100 dark:bg-emerald-900/30',
      blue: 'bg-blue-100 dark:bg-blue-900/30',
      purple: 'bg-purple-100 dark:bg-purple-900/30',
      orange: 'bg-orange-100 dark:bg-orange-900/30',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
      green: 'bg-green-100 dark:bg-green-900/30',
      red: 'bg-red-100 dark:bg-red-900/30',
      gray: 'bg-gray-100 dark:bg-gray-900/30'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getTextColor = (color: string) => {
    const colorMap = {
      emerald: 'text-emerald-600 dark:text-emerald-400',
      blue: 'text-blue-600 dark:text-blue-400',
      purple: 'text-purple-600 dark:text-purple-400',
      orange: 'text-orange-600 dark:text-orange-400',
      yellow: 'text-yellow-600 dark:text-yellow-400',
      green: 'text-green-600 dark:text-green-400',
      red: 'text-red-600 dark:text-red-400',
      gray: 'text-gray-600 dark:text-gray-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-3">
                {language === 'en' ? 'Executive Dashboard' : 'لوحة القيادة التنفيذية'}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'RABHAN Solar Platform - Real-time Business Intelligence'
                  : 'منصة رابحان الشمسية - ذكاء الأعمال في الوقت الفعلي'
                }
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-right rtl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' ? 'Last Updated' : 'آخر تحديث'}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {new Date().toLocaleString(language === 'en' ? 'en-US' : 'ar-SA')}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl dark:ring-1 dark:ring-gray-700 border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(kpi.color)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${getIconBgColor(kpi.color)} flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${getTextColor(kpi.color)}`} />
                    </div>
                    <div className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 rounded-full text-xs font-semibold ${
                      kpi.changeType === 'positive' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {kpi.changeType === 'positive' ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      <span>{kpi.change}</span>
                    </div>
                  </div>                  
                  <div className="mb-3">
                    <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {kpi.value}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {kpi.subValue}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mt-1">
                      {kpi.title}
                    </p>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {kpi.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Revenue Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl dark:ring-1 dark:ring-gray-700 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Revenue & Growth Trends' : 'اتجاهات الإيرادات والنمو'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'en' ? 'Monthly performance overview' : 'نظرة عامة على الأداء الشهري'}
                </p>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {language === 'en' ? 'Revenue' : 'الإيرادات'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {language === 'en' ? 'Users' : 'المستخدمون'}
                  </span>
                </div>
              </div>
            </div>            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformGrowth}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                    fontWeight={500}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      padding: '16px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fill="url(#usersGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          {/* Revenue Breakdown Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl dark:ring-1 dark:ring-gray-700 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Revenue Sources' : 'مصادر الإيرادات'}
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 mt-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Click to access admin functions' : 'انقر للوصول إلى وظائف الإدارة'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.route)}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl dark:ring-1 dark:ring-gray-700 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 text-left overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(action.color)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${getIconBgColor(action.color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${getTextColor(action.color)}`} />
                      </div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {action.stats}
                      </div>
                    </div>                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {action.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {action.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'Open Dashboard' : 'فتح لوحة التحكم'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* City Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl dark:ring-1 dark:ring-gray-700 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Regional Performance' : 'الأداء الإقليمي'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {language === 'en' ? 'Installation and revenue by city' : 'التركيب والإيرادات حسب المدينة'}
              </p>
            </div>
            <div className="text-right rtl:text-left">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">415</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === 'en' ? 'Total Installations' : 'إجمالي التركيبات'}
              </p>
            </div>
          </div>          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                <XAxis 
                  dataKey="city" 
                  stroke="#6b7280"
                  fontSize={12}
                  fontWeight={500}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    padding: '16px'
                  }}
                />
                <Bar 
                  dataKey="installs" 
                  fill="#10b981" 
                  radius={[8, 8, 0, 0]}
                  name={language === 'en' ? 'Installations' : 'التركيبات'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;