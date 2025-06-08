import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Star,
  Target,
  Phone,
  MapPin,
  Plus,
  FileText,
  Settings,
  MessageCircle,
  Eye,
  Edit,
  Send,
  ArrowRight,
  Package
} from 'lucide-react';
import { useThemeStore, useAuthStore, useQuoteStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const VendorDashboard: React.FC = () => {
  const { language } = useThemeStore();
  const { user } = useAuthStore();
  const { getAvailableQuoteRequests, submitQuoteRequest } = useQuoteStore();
  const navigate = useNavigate();

  // Create demo data for testing if no requests exist
  useEffect(() => {
    const availableRequests = getAvailableQuoteRequests();
    
    if (availableRequests.length === 0) {
      // Create demo quote requests
      const demoRequests = [
        {
          userId: 'user-001',
          customerName: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
          customerEmail: 'ahmed.rashid@email.com',
          customerPhone: '+966 50 123 4567',
          propertyType: 'residential' as const,
          propertyAddress: language === 'en' ? 'Villa 123, King Abdul Aziz District' : 'فيلا 123، حي الملك عبد العزيز',
          city: language === 'en' ? 'Jeddah' : 'جدة',
          monthlyBill: 850,
          budget: '70,000-100,000',
          description: language === 'en' ? 'Looking for high-quality solar panels for my villa.' : 'أبحث عن ألواح شمسية عالية الجودة لفيلتي.'
        },
        {
          userId: 'user-002',
          customerName: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
          customerEmail: 'fatima.zahra@email.com',
          customerPhone: '+966 55 987 6543',
          propertyType: 'commercial' as const,
          propertyAddress: language === 'en' ? 'Office Building, Olaya Business District' : 'مبنى مكاتب، حي العليا التجاري',
          city: language === 'en' ? 'Riyadh' : 'الرياض',
          monthlyBill: 1200,
          budget: '100,000-200,000',
          description: language === 'en' ? 'Need solar solution for our office building.' : 'نحتاج حل طاقة شمسية لمبنى مكاتبنا.'
        },
        {
          userId: 'user-003',
          customerName: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
          customerEmail: 'mohammed.hassan@email.com',
          customerPhone: '+966 56 456 7890',
          propertyType: 'residential' as const,
          propertyAddress: language === 'en' ? 'Compound Villa, Corniche Area' : 'فيلا مجمع، منطقة الكورنيش',
          city: language === 'en' ? 'Dammam' : 'الدمام',
          monthlyBill: 650,
          budget: '50,000-100,000',
          description: language === 'en' ? 'Small residential system needed.' : 'نحتاج نظام سكني صغير.'
        }
      ];

      // Add demo requests with slight delays
      demoRequests.forEach((request, index) => {
        setTimeout(() => {
          try {
            submitQuoteRequest(request);
          } catch (error) {
            console.error('Error creating demo request:', error);
          }
        }, index * 100);
      });
    }
  }, [language, getAvailableQuoteRequests, submitQuoteRequest]);

  // Get real quote requests count
  const availableRequests = getAvailableQuoteRequests(user?.id);
  const pendingQuotes = availableRequests.filter(req => req.quotesReceived === 0).length;

  // Mock data for charts
  const monthlyProjects = [
    { month: language === 'en' ? 'Jan' : 'يناير', completed: 12, pending: 8, revenue: 45000 },
    { month: language === 'en' ? 'Feb' : 'فبراير', completed: 15, pending: 6, revenue: 52000 },
    { month: language === 'en' ? 'Mar' : 'مارس', completed: 18, pending: 9, revenue: 61000 },
    { month: language === 'en' ? 'Apr' : 'أبريل', completed: 14, pending: 12, revenue: 48000 },
    { month: language === 'en' ? 'May' : 'مايو', completed: 20, pending: 15, revenue: 68000 },
    { month: language === 'en' ? 'Jun' : 'يونيو', completed: 22, pending: 10, revenue: 75000 },
  ];

  const projectStatus = [
    { name: language === 'en' ? 'Completed' : 'مكتملة', value: 68, color: '#10b981' },
    { name: language === 'en' ? 'In Progress' : 'قيد التنفيذ', value: 25, color: '#f59e0b' },
    { name: language === 'en' ? 'Pending' : 'معلقة', value: 7, color: '#ef4444' },
  ];

  const stats = [
    {
      title: language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات',
      value: '285,400',
      unit: language === 'en' ? 'SAR' : 'ريال',
      icon: DollarSign,
      change: '+23%',
      color: 'emerald'
    },
    {
      title: language === 'en' ? 'Active Projects' : 'المشاريع النشطة',
      value: '12',
      unit: language === 'en' ? 'Projects' : 'مشروع',
      icon: Briefcase,
      change: '+5',
      color: 'blue'
    },
    {
      title: language === 'en' ? 'Customer Rating' : 'تقييم العملاء',
      value: '4.8',
      unit: '/5.0',
      icon: Star,
      change: '+0.2',
      color: 'yellow'
    },
    {
      title: language === 'en' ? 'Completion Rate' : 'معدل الإنجاز',
      value: '96',
      unit: '%',
      icon: Target,
      change: '+3%',
      color: 'purple'
    }
  ];

  // Define helper function before using it
  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const submitted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return language === 'en' ? 'Just now' : 'الآن';
    if (diffInHours < 24) return language === 'en' ? `${diffInHours} hours ago` : `منذ ${diffInHours} ساعة`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return language === 'en' ? `${diffInDays} days ago` : `منذ ${diffInDays} يوم`;
  };

  const recentLeads = availableRequests.slice(0, 3).map(request => ({
    id: request.id,
    name: request.customerName,
    location: request.city,
    systemSize: `${Math.ceil(request.monthlyBill / 70)} kW`, // Estimate based on monthly bill
    value: `${Math.ceil(request.monthlyBill / 70) * 6500} SAR`, // Estimate based on 6500 SAR per kW
    status: request.quotesReceived === 0 ? 'new' : 'contacted',
    time: getTimeSince(request.submittedAt),
    urgency: request.urgency,
    monthlyBill: request.monthlyBill,
    budget: request.budget,
    requestId: request.id
  }));

  const upcomingTasks = [
    {
      title: language === 'en' ? 'Site Survey - Villa 123' : 'مسح الموقع - فيلا 123',
      time: language === 'en' ? 'Today, 2:00 PM' : 'اليوم، 2:00 مساءً',
      type: 'survey',
      priority: 'high'
    },
    {
      title: language === 'en' ? 'Installation - Office Complex' : 'التركيب - مجمع مكاتب',
      time: language === 'en' ? 'Tomorrow, 9:00 AM' : 'غداً، 9:00 صباحاً',
      type: 'installation',
      priority: 'medium'
    },
    {
      title: language === 'en' ? 'Follow-up Call - Residential' : 'مكالمة متابعة - سكني',
      time: language === 'en' ? 'Jun 15, 11:00 AM' : '15 يونيو، 11:00 صباحاً',
      type: 'call',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'quoted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? `Welcome, ${user?.name}!` : `مرحباً، ${user?.name}!`}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Manage your solar installation business'
                  : 'إدارة أعمال تركيب الطاقة الشمسية'
                }
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4 rtl:space-x-reverse">
              <button 
                onClick={() => navigate('/vendor/profile')}
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Settings className="w-5 h-5" />
                <span>{language === 'en' ? 'Profile' : 'الملف الشخصي'}</span>
              </button>
              <button 
                onClick={() => navigate('/vendor/projects')}
                className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {language === 'en' ? 'Manage Projects' : 'إدارة المشاريع'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="card p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <span className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 px-2 py-1 rounded-lg`}>
                    {stat.change}
                  </span>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.value} <span className="text-sm font-normal text-gray-500">{stat.unit}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Manage your business operations' : 'إدارة عمليات عملك'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Response to Quote Requests */}
            <motion.button
              onClick={() => navigate('/vendor/quotes')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {availableRequests.length}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                {language === 'en' ? 'Quote Requests' : 'طلبات العروض'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {language === 'en' ? 'Respond to customer inquiries' : 'رد على استفسارات العملاء'}
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                <span>{availableRequests.length} {language === 'en' ? 'Pending' : 'معلقة'}</span>
                <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            {/* Manage Projects */}
            <motion.button
              onClick={() => navigate('/vendor/projects')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  12
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                {language === 'en' ? 'Manage Projects' : 'إدارة المشاريع'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {language === 'en' ? 'Track installation progress' : 'تتبع تقدم التركيبات'}
              </p>
              <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <span>{language === 'en' ? '12 Active' : '12 نشط'}</span>
                <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            {/* Customer Management */}
            <motion.button
              onClick={() => navigate('/vendor/customers')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  3
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                {language === 'en' ? 'Customer Management' : 'إدارة العملاء'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {language === 'en' ? 'CRM & support tickets' : 'إدارة العلاقات والدعم'}
              </p>
              <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
                <span>{language === 'en' ? '3 Active Tickets' : '3 تذاكر نشطة'}</span>
                <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            {/* Inventory Management */}
            <motion.button
              onClick={() => navigate('/vendor/inventory')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  2
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                {language === 'en' ? 'Inventory' : 'المخزون'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {language === 'en' ? 'Equipment & parts tracking' : 'تتبع المعدات والقطع'}
              </p>
              <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium">
                <span>{language === 'en' ? '2 Low Stock' : '2 مخزون منخفض'}</span>
                <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            {/* Payments Dashboard */}
            <motion.button
              onClick={() => navigate('/vendor/payments')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ✓
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                {language === 'en' ? 'Payments' : 'المدفوعات'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {language === 'en' ? 'Track earnings & BNPL' : 'تتبع الأرباح والدفع الآجل'}
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                <span>{language === 'en' ? '485K SAR' : '485 ألف ريال'}</span>
                <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            {/* Analytics Dashboard */}
            <motion.button
              onClick={() => navigate('/vendor/analytics')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  +23%
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                {language === 'en' ? 'Analytics' : 'التحليلات'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {language === 'en' ? 'Performance insights' : 'رؤى الأداء'}
              </p>
              <div className="flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                <span>{language === 'en' ? '+23% Growth' : '+23% نمو'}</span>
                <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Monthly Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Monthly Performance' : 'الأداء الشهري'}
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyProjects}>
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
                  <Bar 
                    dataKey="completed" 
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="pending" 
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Project Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Project Status' : 'حالة المشاريع'}
            </h3>
            
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4">
              {projectStatus.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{status.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {status.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Leads and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Recent Leads' : 'العملاء المحتملون الجدد'}
              </h3>
              <button 
                onClick={() => navigate('/vendor/quotes')}
                className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium"
              >
                {language === 'en' ? 'View All' : 'عرض الكل'}
              </button>
            </div>
            
            <div className="space-y-4">
              {recentLeads.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'No new quote requests' : 'لا توجد طلبات عروض جديدة'}
                  </p>
                </div>
              ) : (
                recentLeads.map((lead, index) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</h4>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status === 'new' 
                            ? (language === 'en' ? 'New' : 'جديد')
                            : lead.status === 'contacted'
                            ? (language === 'en' ? 'Contacted' : 'تم التواصل')
                            : (language === 'en' ? 'Quoted' : 'تم الرد')
                          }
                        </span>
                        {lead.urgency === 'high' && (
                          <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                            {language === 'en' ? 'Urgent' : 'عاجل'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <MapPin className="w-4 h-4" />
                          <span>{lead.location}</span>
                        </div>
                        <span>~{lead.systemSize}</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {lead.budget} SAR
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{language === 'en' ? 'Monthly Bill:' : 'الفاتورة الشهرية:'} {lead.monthlyBill} SAR</span>
                        <span>•</span>
                        <span>{lead.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button 
                        onClick={() => navigate(`/vendor/quotes/respond/${lead.requestId}`)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                        title={language === 'en' ? 'Send Quote' : 'إرسال عرض'}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          // In a real app, this would open a contact modal or phone call
                          alert(language === 'en' ? 'Calling customer...' : 'جاري الاتصال بالعميل...');
                        }}
                        className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors duration-200"
                        title={language === 'en' ? 'Call Customer' : 'اتصال بالعميل'}
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate('/vendor/quotes')}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/20 rounded-lg transition-colors duration-200"
                        title={language === 'en' ? 'View All Requests' : 'عرض جميع الطلبات'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Upcoming Tasks' : 'المهام القادمة'}
              </h3>
              <button 
                onClick={() => navigate('/vendor/projects')}
                className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium"
              >
                {language === 'en' ? 'View Calendar' : 'عرض التقويم'}
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{task.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
