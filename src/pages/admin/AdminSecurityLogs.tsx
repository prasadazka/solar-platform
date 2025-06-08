import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Unlock, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  Smartphone, 
  Monitor, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Ban, 
  CheckCircle, 
  XCircle, 
  Info, 
  AlertCircle, 
  FileText, 
  Database, 
  Server, 
  Wifi, 
  Globe, 
  Key, 
  UserCheck, 
  UserX, 
  LogIn, 
  LogOut,
  Settings,
  Trash2,
  Archive,
  Flag
} from 'lucide-react';
import { useThemeStore } from '../../store';
import AdminHeader from '../../components/AdminHeader';

// Types for security logs
interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType: 'login' | 'logout' | 'failed_login' | 'password_change' | 'permission_change' | 'data_access' | 'suspicious_activity' | 'system_access' | 'api_access';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId: string;
  userName: string;
  userRole: 'user' | 'vendor' | 'admin';
  ipAddress: string;
  location: string;
  device: string;
  userAgent: string;
  description: string;
  details?: any;
  resolved: boolean;
  assignedTo?: string;
  notes?: string;
}

interface SystemMetric {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  activeUsers: number;
  apiRequests: number;
  errorRate: number;
  responseTime: number;
}

const AdminSecurityLogs: React.FC = () => {
  const { language } = useThemeStore();
  const [activeTab, setActiveTab] = useState('security');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [dateRange, setDateRange] = useState('24h');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 20;

  // Mock security events data
  const securityEvents: SecurityEvent[] = [
    {
      id: '1',
      timestamp: '2024-01-15T14:30:00Z',
      eventType: 'failed_login',
      severity: 'medium',
      userId: 'user-001',
      userName: 'ahmed.rashid@email.com',
      userRole: 'user',
      ipAddress: '192.168.1.100',
      location: 'Riyadh, Saudi Arabia',
      device: 'Desktop',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      description: 'Multiple failed login attempts',
      details: { attempts: 5, timeSpan: '10 minutes' },
      resolved: false
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:25:00Z',
      eventType: 'login',
      severity: 'low',
      userId: 'admin-001',
      userName: 'admin@alphapower.sa',
      userRole: 'admin',
      ipAddress: '203.0.113.5',
      location: 'Jeddah, Saudi Arabia',
      device: 'Mobile',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)',
      description: 'Successful admin login',
      resolved: true
    },
    {
      id: '3',
      timestamp: '2024-01-15T14:20:00Z',
      eventType: 'suspicious_activity',
      severity: 'high',
      userId: 'user-045',
      userName: 'suspicious.user@email.com',
      userRole: 'user',
      ipAddress: '198.51.100.23',
      location: 'Unknown',
      device: 'Desktop',
      userAgent: 'Python-urllib/3.8',
      description: 'Automated bot-like behavior detected',
      details: { pattern: 'rapid_requests', count: 150, duration: '2 minutes' },
      resolved: false,
      assignedTo: 'security-team'
    },
    {
      id: '4',
      timestamp: '2024-01-15T14:15:00Z',
      eventType: 'data_access',
      severity: 'medium',
      userId: 'vendor-012',
      userName: 'vendor@greenenergy.sa',
      userRole: 'vendor',
      ipAddress: '192.168.1.50',
      location: 'Dammam, Saudi Arabia',
      device: 'Desktop',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      description: 'Access to sensitive customer data',
      details: { dataType: 'customer_financial', recordCount: 25 },
      resolved: true
    },
    {
      id: '5',
      timestamp: '2024-01-15T14:10:00Z',
      eventType: 'permission_change',
      severity: 'high',
      userId: 'admin-002',
      userName: 'superadmin@alphapower.sa',
      userRole: 'admin',
      ipAddress: '203.0.113.10',
      location: 'Riyadh, Saudi Arabia',
      device: 'Desktop',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      description: 'User role elevated to admin',
      details: { targetUser: 'user-078', oldRole: 'user', newRole: 'admin' },
      resolved: true
    }
  ];

  // Mock system metrics
  const systemMetrics: SystemMetric[] = [
    { timestamp: '14:00', cpuUsage: 45, memoryUsage: 62, diskUsage: 78, activeUsers: 1205, apiRequests: 2400, errorRate: 0.2, responseTime: 245 },
    { timestamp: '14:15', cpuUsage: 52, memoryUsage: 65, diskUsage: 78, activeUsers: 1340, apiRequests: 2800, errorRate: 0.1, responseTime: 230 },
    { timestamp: '14:30', cpuUsage: 48, memoryUsage: 68, diskUsage: 79, activeUsers: 1280, apiRequests: 2600, errorRate: 0.3, responseTime: 260 },
    { timestamp: '14:45', cpuUsage: 55, memoryUsage: 70, diskUsage: 79, activeUsers: 1420, apiRequests: 3200, errorRate: 0.15, responseTime: 275 }
  ];

  // Filter events
  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.ipAddress.includes(searchTerm);
    const matchesSeverity = selectedSeverity === 'all' || event.severity === selectedSeverity;
    const matchesEventType = selectedEventType === 'all' || event.eventType === selectedEventType;
    
    return matchesSearch && matchesSeverity && matchesEventType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / logsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  // Get event type icon and color
  const getEventTypeDisplay = (eventType: string) => {
    switch (eventType) {
      case 'login':
        return { icon: LogIn, color: 'text-green-600 dark:text-green-400' };
      case 'logout':
        return { icon: LogOut, color: 'text-blue-600 dark:text-blue-400' };
      case 'failed_login':
        return { icon: XCircle, color: 'text-red-600 dark:text-red-400' };
      case 'password_change':
        return { icon: Key, color: 'text-yellow-600 dark:text-yellow-400' };
      case 'permission_change':
        return { icon: Settings, color: 'text-orange-600 dark:text-orange-400' };
      case 'data_access':
        return { icon: Database, color: 'text-purple-600 dark:text-purple-400' };
      case 'suspicious_activity':
        return { icon: AlertTriangle, color: 'text-red-600 dark:text-red-400' };
      case 'system_access':
        return { icon: Server, color: 'text-blue-600 dark:text-blue-400' };
      case 'api_access':
        return { icon: Globe, color: 'text-indigo-600 dark:text-indigo-400' };
      default:
        return { icon: Info, color: 'text-gray-600 dark:text-gray-400' };
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(language === 'en' ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Handle event action
  const handleEventAction = (eventId: string, action: string) => {
    console.log(`Action ${action} for event ${eventId}`);
    // Implement event actions (resolve, assign, flag, etc.)
  };

  // Security summary stats
  const securityStats = {
    totalEvents: securityEvents.length,
    criticalEvents: securityEvents.filter(e => e.severity === 'critical').length,
    unresolvedEvents: securityEvents.filter(e => !e.resolved).length,
    suspiciousActivities: securityEvents.filter(e => e.eventType === 'suspicious_activity').length,
    failedLogins: securityEvents.filter(e => e.eventType === 'failed_login').length
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AdminHeader
          title={language === 'en' ? 'Security & Audit Logs' : 'سجلات الأمان والتدقيق'}
          description={language === 'en' 
            ? 'Monitor security events, system performance, and audit trails'
            : 'مراقبة أحداث الأمان وأداء النظام ومسارات التدقيق'
          }
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
              <RefreshCw className="w-5 h-5" />
              <span>{language === 'en' ? 'Refresh' : 'تحديث'}</span>
            </button>
            
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
              <Download className="w-5 h-5" />
              <span>{language === 'en' ? 'Export Logs' : 'تصدير السجلات'}</span>
            </button>
          </div>
        </AdminHeader>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 rtl:space-x-reverse">
              <button
                onClick={() => setActiveTab('security')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'security'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Shield className="w-5 h-5" />
                  <span>{language === 'en' ? 'Security Events' : 'أحداث الأمان'}</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('system')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'system'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Activity className="w-5 h-5" />
                  <span>{language === 'en' ? 'System Health' : 'صحة النظام'}</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('audit')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'audit'
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FileText className="w-5 h-5" />
                  <span>{language === 'en' ? 'Audit Trail' : 'مسار التدقيق'}</span>
                </div>
              </button>
            </nav>
          </div>
        </motion.div>

        {activeTab === 'security' && (
          <>
            {/* Security Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
            >
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {securityStats.totalEvents}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Total Events' : 'إجمالي الأحداث'}
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {securityStats.criticalEvents}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Critical Events' : 'أحداث حرجة'}
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {securityStats.unresolvedEvents}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Unresolved' : 'غير محلول'}
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Ban className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {securityStats.suspiciousActivities}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Suspicious Activity' : 'نشاط مشبوه'}
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {securityStats.failedLogins}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Failed Logins' : 'عمليات دخول فاشلة'}
                </p>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Search events...' : 'البحث عن الأحداث...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {/* Severity Filter */}
                <div>
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">{language === 'en' ? 'All Severities' : 'جميع الدرجات'}</option>
                    <option value="low">{language === 'en' ? 'Low' : 'منخفض'}</option>
                    <option value="medium">{language === 'en' ? 'Medium' : 'متوسط'}</option>
                    <option value="high">{language === 'en' ? 'High' : 'عالي'}</option>
                    <option value="critical">{language === 'en' ? 'Critical' : 'حرج'}</option>
                  </select>
                </div>

                {/* Event Type Filter */}
                <div>
                  <select
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="all">{language === 'en' ? 'All Event Types' : 'جميع أنواع الأحداث'}</option>
                    <option value="login">{language === 'en' ? 'Login' : 'تسجيل دخول'}</option>
                    <option value="failed_login">{language === 'en' ? 'Failed Login' : 'دخول فاشل'}</option>
                    <option value="suspicious_activity">{language === 'en' ? 'Suspicious Activity' : 'نشاط مشبوه'}</option>
                    <option value="data_access">{language === 'en' ? 'Data Access' : 'الوصول للبيانات'}</option>
                    <option value="permission_change">{language === 'en' ? 'Permission Change' : 'تغيير الصلاحيات'}</option>
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="1h">{language === 'en' ? 'Last Hour' : 'آخر ساعة'}</option>
                    <option value="24h">{language === 'en' ? 'Last 24 Hours' : 'آخر 24 ساعة'}</option>
                    <option value="7d">{language === 'en' ? 'Last 7 Days' : 'آخر 7 أيام'}</option>
                    <option value="30d">{language === 'en' ? 'Last 30 Days' : 'آخر 30 يوم'}</option>
                  </select>
                </div>

                {/* Actions */}
                <div>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                    <Filter className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Security Events Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {language === 'en' ? 'Event' : 'الحدث'}
                      </th>
                      <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {language === 'en' ? 'User' : 'المستخدم'}
                      </th>
                      <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {language === 'en' ? 'Location & Device' : 'الموقع والجهاز'}
                      </th>
                      <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {language === 'en' ? 'Severity' : 'الخطورة'}
                      </th>
                      <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {language === 'en' ? 'Status' : 'الحالة'}
                      </th>
                      <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {language === 'en' ? 'Actions' : 'الإجراءات'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedEvents.map((event) => {
                      const eventDisplay = getEventTypeDisplay(event.eventType);
                      const EventIcon = eventDisplay.icon;
                      
                      return (
                        <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${eventDisplay.color.includes('green') ? 'bg-green-100 dark:bg-green-900/30' : eventDisplay.color.includes('red') ? 'bg-red-100 dark:bg-red-900/30' : eventDisplay.color.includes('yellow') ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-900/30'}`}>
                                <EventIcon className={`w-4 h-4 ${eventDisplay.color}`} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {event.description}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatTimestamp(event.timestamp)}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {event.userName}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {event.userRole} • {event.userId}
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-600 dark:text-gray-300">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-600 dark:text-gray-300">
                                <Monitor className="w-3 h-3" />
                                <span>{event.device}</span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {event.ipAddress}
                              </div>
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                              {language === 'en' ? event.severity : 
                                event.severity === 'low' ? 'منخفض' :
                                event.severity === 'medium' ? 'متوسط' :
                                event.severity === 'high' ? 'عالي' : 'حرج'
                              }
                            </span>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                event.resolved 
                                  ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
                                  : 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
                              }`}>
                                {event.resolved 
                                  ? (language === 'en' ? 'Resolved' : 'محلول')
                                  : (language === 'en' ? 'Open' : 'مفتوح')
                                }
                              </span>
                              {event.assignedTo && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {language === 'en' ? 'Assigned to:' : 'مُعيّن إلى:'} {event.assignedTo}
                                </div>
                              )}
                            </div>
                          </td>
                          
                          <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <button
                                onClick={() => handleEventAction(event.id, 'view')}
                                className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200"
                                title={language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              
                              {!event.resolved && (
                                <button
                                  onClick={() => handleEventAction(event.id, 'resolve')}
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                                  title={language === 'en' ? 'Mark as Resolved' : 'وضع علامة كمحلول'}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleEventAction(event.id, 'flag')}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                                title={language === 'en' ? 'Flag for Review' : 'وضع علامة للمراجعة'}
                              >
                                <Flag className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {language === 'en' ? 'Previous' : 'السابق'}
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="ml-3 rtl:ml-0 rtl:mr-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {language === 'en' ? 'Next' : 'التالي'}
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {language === 'en' ? 'Showing' : 'عرض'}{' '}
                        <span className="font-medium">{(currentPage - 1) * logsPerPage + 1}</span>
                        {' '}{language === 'en' ? 'to' : 'إلى'}{' '}
                        <span className="font-medium">
                          {Math.min(currentPage * logsPerPage, filteredEvents.length)}
                        </span>
                        {' '}{language === 'en' ? 'of' : 'من'}{' '}
                        <span className="font-medium">{filteredEvents.length}</span>
                        {' '}{language === 'en' ? 'results' : 'نتيجة'}
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px rtl:space-x-reverse" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md rtl:rounded-l-none rtl:rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">{language === 'en' ? 'Previous' : 'السابق'}</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pageNum === currentPage
                                ? 'z-10 bg-emerald-50 dark:bg-emerald-900/50 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md rtl:rounded-r-none rtl:rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">{language === 'en' ? 'Next' : 'التالي'}</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <Server className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'System Health Monitoring' : 'مراقبة صحة النظام'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'System health monitoring interface will be implemented in the next phase.'
                : 'سيتم تنفيذ واجهة مراقبة صحة النظام في المرحلة التالية.'
              }
            </p>
          </motion.div>
        )}

        {activeTab === 'audit' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Audit Trail' : 'مسار التدقيق'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Comprehensive audit trail interface will be implemented in the next phase.'
                : 'سيتم تنفيذ واجهة مسار التدقيق الشامل في المرحلة التالية.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminSecurityLogs;