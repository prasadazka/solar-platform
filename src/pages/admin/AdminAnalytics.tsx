import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Building, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  Target,
  Zap,
  CreditCard,
  ShoppingCart,
  MapPin,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { useThemeStore } from '../../store';
import AdminHeader from '../../components/AdminHeader';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell,
  ComposedChart
} from 'recharts';

const AdminAnalytics: React.FC = () => {
  const { language } = useThemeStore();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showComparison, setShowComparison] = useState(true);

  // Mock analytics data
  const platformMetrics = {
    totalRevenue: 2850000,
    revenueGrowth: 23.5,
    totalUsers: 4287,
    userGrowth: 12.3,
    totalVendors: 156,
    vendorGrowth: 8.7,
    totalProjects: 892,
    projectGrowth: 18.9,
    bnplApplications: 347,
    bnplApprovalRate: 76.5,
    avgLoanAmount: 125000,
    defaultRate: 3.2
  };

  // Revenue trend data
  const revenueData = [
    { month: language === 'en' ? 'Jan' : 'يناير', revenue: 185000, users: 120, vendors: 15, projects: 45 },
    { month: language === 'en' ? 'Feb' : 'فبراير', revenue: 225000, users: 145, vendors: 18, projects: 58 },
    { month: language === 'en' ? 'Mar' : 'مارس', revenue: 275000, users: 189, vendors: 22, projects: 73 },
    { month: language === 'en' ? 'Apr' : 'أبريل', revenue: 320000, users: 234, vendors: 28, projects: 89 },
    { month: language === 'en' ? 'May' : 'مايو', revenue: 385000, users: 298, vendors: 35, projects: 112 },
    { month: language === 'en' ? 'Jun' : 'يونيو', revenue: 445000, users: 367, vendors: 42, projects: 138 },
    { month: language === 'en' ? 'Jul' : 'يوليو', revenue: 520000, users: 445, vendors: 48, projects: 165 },
    { month: language === 'en' ? 'Aug' : 'أغسطس', revenue: 580000, users: 523, vendors: 56, projects: 189 },
    { month: language === 'en' ? 'Sep' : 'سبتمبر', revenue: 645000, users: 612, vendors: 63, projects: 218 },
    { month: language === 'en' ? 'Oct' : 'أكتوبر', revenue: 720000, users: 718, vendors: 71, projects: 245 },
    { month: language === 'en' ? 'Nov' : 'نوفمبر', revenue: 815000, users: 834, vendors: 78, projects: 278 },
    { month: language === 'en' ? 'Dec' : 'ديسمبر', revenue: 890000, users: 967, vendors: 86, projects: 312 }
  ];

  // BNPL Performance data
  const bnplData = [
    { month: language === 'en' ? 'Jan' : 'يناير', applications: 28, approved: 21, rejected: 7, amount: 2800000 },
    { month: language === 'en' ? 'Feb' : 'فبراير', applications: 35, approved: 27, rejected: 8, amount: 3450000 },
    { month: language === 'en' ? 'Mar' : 'مارس', applications: 42, approved: 32, rejected: 10, amount: 4200000 },
    { month: language === 'en' ? 'Apr' : 'أبريل', applications: 38, approved: 29, rejected: 9, amount: 3850000 },
    { month: language === 'en' ? 'May' : 'مايو', applications: 45, approved: 34, rejected: 11, amount: 4500000 },
    { month: language === 'en' ? 'Jun' : 'يونيو', applications: 52, approved: 40, rejected: 12, amount: 5200000 }
  ];

  // Regional performance data
  const regionalData = [
    { name: language === 'en' ? 'Riyadh' : 'الرياض', value: 35, revenue: 890000, projects: 145 },
    { name: language === 'en' ? 'Jeddah' : 'جدة', value: 28, revenue: 720000, projects: 118 },
    { name: language === 'en' ? 'Dammam' : 'الدمام', value: 18, revenue: 465000, projects: 76 },
    { name: language === 'en' ? 'Mecca' : 'مكة', value: 12, revenue: 310000, projects: 51 },
    { name: language === 'en' ? 'Medina' : 'المدينة', value: 7, revenue: 180000, projects: 29 }
  ];

  // Vendor performance data
  const vendorPerformanceData = [
    { 
      name: 'Green Energy Solutions', 
      projects: 45, 
      revenue: 1200000, 
      rating: 4.8, 
      responseTime: '2h',
      completionRate: 98
    },
    { 
      name: 'Solar Tech Arabia', 
      projects: 38, 
      revenue: 950000, 
      rating: 4.6, 
      responseTime: '3h',
      completionRate: 95
    },
    { 
      name: 'Desert Sun Power', 
      projects: 32, 
      revenue: 850000, 
      rating: 4.7, 
      responseTime: '1.5h',
      completionRate: 97
    },
    { 
      name: 'Alpha Solar Systems', 
      projects: 28, 
      revenue: 720000, 
      rating: 4.5, 
      responseTime: '4h',
      completionRate: 92
    }
  ];

  // System performance metrics
  const systemMetrics = [
    { time: '00:00', cpu: 65, memory: 72, requests: 1200, errors: 0 },
    { time: '04:00', cpu: 45, memory: 68, requests: 800, errors: 0 },
    { time: '08:00', cpu: 85, memory: 78, requests: 2400, errors: 2 },
    { time: '12:00', cpu: 92, memory: 85, requests: 3200, errors: 1 },
    { time: '16:00', cpu: 88, memory: 82, requests: 2800, errors: 0 },
    { time: '20:00', cpu: 75, memory: 76, requests: 1800, errors: 1 }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M SAR`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K SAR`;
    }
    return `${amount} SAR`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  // Get trend color
  const getTrendColor = (value: number) => {
    return value > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  // Get trend icon
  const getTrendIcon = (value: number) => {
    return value > 0 ? ArrowUpRight : ArrowDownRight;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AdminHeader
          title={language === 'en' ? 'Platform Analytics' : 'تحليلات المنصة'}
          description={language === 'en' 
            ? 'Comprehensive business intelligence and performance metrics'
            : 'ذكاء الأعمال الشامل ومقاييس الأداء'
          }
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="7d">{language === 'en' ? 'Last 7 days' : 'آخر 7 أيام'}</option>
              <option value="30d">{language === 'en' ? 'Last 30 days' : 'آخر 30 يوم'}</option>
              <option value="90d">{language === 'en' ? 'Last 90 days' : 'آخر 90 يوم'}</option>
              <option value="1y">{language === 'en' ? 'Last year' : 'العام الماضي'}</option>
            </select>
            
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
              <RefreshCw className="w-5 h-5" />
              <span>{language === 'en' ? 'Refresh' : 'تحديث'}</span>
            </button>
            
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
              <Download className="w-5 h-5" />
              <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
            </button>
          </div>
        </AdminHeader>

        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Revenue Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${getTrendColor(platformMetrics.revenueGrowth)}`}>
                {React.createElement(getTrendIcon(platformMetrics.revenueGrowth), { className: "w-4 h-4" })}
                <span>{formatPercentage(platformMetrics.revenueGrowth)}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {formatCurrency(platformMetrics.totalRevenue)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات'}
              </p>
            </div>
          </div>

          {/* Users Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${getTrendColor(platformMetrics.userGrowth)}`}>
                {React.createElement(getTrendIcon(platformMetrics.userGrowth), { className: "w-4 h-4" })}
                <span>{formatPercentage(platformMetrics.userGrowth)}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {platformMetrics.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Total Users' : 'إجمالي المستخدمين'}
              </p>
            </div>
          </div>

          {/* Vendors Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${getTrendColor(platformMetrics.vendorGrowth)}`}>
                {React.createElement(getTrendIcon(platformMetrics.vendorGrowth), { className: "w-4 h-4" })}
                <span>{formatPercentage(platformMetrics.vendorGrowth)}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {platformMetrics.totalVendors}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Active Vendors' : 'الموردين النشطين'}
              </p>
            </div>
          </div>

          {/* Projects Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className={`flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium ${getTrendColor(platformMetrics.projectGrowth)}`}>
                {React.createElement(getTrendIcon(platformMetrics.projectGrowth), { className: "w-4 h-4" })}
                <span>{formatPercentage(platformMetrics.projectGrowth)}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {platformMetrics.totalProjects}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Solar Projects' : 'المشاريع الشمسية'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Revenue Trend' : 'اتجاه الإيرادات'}
              </h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="revenue">{language === 'en' ? 'Revenue' : 'الإيرادات'}</option>
                  <option value="users">{language === 'en' ? 'Users' : 'المستخدمين'}</option>
                  <option value="vendors">{language === 'en' ? 'Vendors' : 'الموردين'}</option>
                  <option value="projects">{language === 'en' ? 'Projects' : 'المشاريع'}</option>
                </select>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData}>
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
                    formatter={(value: any, name: string) => [
                      selectedMetric === 'revenue' ? formatCurrency(value) : value,
                      language === 'en' ? name : 
                        name === 'revenue' ? 'الإيرادات' :
                        name === 'users' ? 'المستخدمين' :
                        name === 'vendors' ? 'الموردين' : 'المشاريع'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={selectedMetric}
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric}
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Regional Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Regional Distribution' : 'التوزيع الإقليمي'}
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={regionalData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {regionalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              {regionalData.map((region, index) => (
                <div key={region.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-gray-700 dark:text-gray-200">{region.name}</span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{region.value}%</div>
                    <div className="text-gray-500 dark:text-gray-400">{formatCurrency(region.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BNPL Analytics & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* BNPL Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'BNPL Performance' : 'أداء التمويل المؤجل'}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {platformMetrics.bnplApprovalRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Approval Rate' : 'معدل الموافقة'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(platformMetrics.avgLoanAmount)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Avg Loan Amount' : 'متوسط مبلغ القرض'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {platformMetrics.defaultRate}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Default Rate' : 'معدل التعثر'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {platformMetrics.bnplApplications}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Applications' : 'الطلبات'}
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bnplData}>
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
                  <Bar dataKey="approved" stackId="a" fill="#10b981" />
                  <Bar dataKey="rejected" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* System Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'System Performance (24h)' : 'أداء النظام (24 ساعة)'}
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">99.9%</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Uptime' : 'وقت التشغيل'}
                </div>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">245ms</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Response Time' : 'وقت الاستجابة'}
                </div>
              </div>
              
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">0.01%</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Error Rate' : 'معدل الأخطاء'}
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={systemMetrics}>
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
                    dataKey="cpu" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name={language === 'en' ? 'CPU %' : 'المعالج %'}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="memory" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name={language === 'en' ? 'Memory %' : 'الذاكرة %'}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Vendor Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Top Performing Vendors' : 'أفضل الموردين أداءً'}
            </h3>
            <button className="flex items-center space-x-2 rtl:space-x-reverse text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium">
              <span>{language === 'en' ? 'View All' : 'عرض الكل'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Vendor' : 'المورد'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Projects' : 'المشاريع'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Revenue' : 'الإيرادات'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Rating' : 'التقييم'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Response Time' : 'وقت الاستجابة'}
                  </th>
                  <th className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Completion Rate' : 'معدل الإنجاز'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {vendorPerformanceData.map((vendor, index) => (
                  <tr key={vendor.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium text-sm">
                          {index + 1}
                        </div>
                        <div className="ml-3 rtl:ml-0 rtl:mr-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {vendor.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {vendor.projects}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatCurrency(vendor.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {vendor.responseTime}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${vendor.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {vendor.completionRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="card p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Revenue Growth' : 'نمو الإيرادات'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Strong upward trend' : 'اتجاه صاعد قوي'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {language === 'en' 
                ? 'Revenue has grown 23.5% this month, driven by increased BNPL adoption and vendor partnerships.'
                : 'نمت الإيرادات بنسبة 23.5% هذا الشهر، مدفوعة بزيادة اعتماد التمويل المؤجل وشراكات الموردين.'
              }
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Market Expansion' : 'توسع السوق'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Regional growth opportunity' : 'فرصة نمو إقليمية'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {language === 'en' 
                ? 'Eastern Province shows 45% growth potential. Consider expanding vendor network in Dammam and Khobar.'
                : 'تظهر المنطقة الشرقية إمكانية نمو بنسبة 45%. فكر في توسيع شبكة الموردين في الدمام والخبر.'
              }
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Risk Monitoring' : 'مراقبة المخاطر'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Low default rate maintained' : 'معدل تعثر منخفض'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {language === 'en' 
                ? 'BNPL default rate remains at 3.2%, well below industry average. Credit scoring model is performing effectively.'
                : 'يبقى معدل تعثر التمويل المؤجل عند 3.2%، أقل بكثير من متوسط الصناعة. نموذج التسجيل الائتماني يعمل بفعالية.'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;