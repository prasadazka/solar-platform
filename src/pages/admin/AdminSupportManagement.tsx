import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Headphones, 
  MessageSquare, 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Plus, 
  Send, 
  Paperclip, 
  Star, 
  Eye, 
  Edit, 
  Trash2, 
  Archive, 
  Flag, 
  UserCheck, 
  Phone, 
  Mail, 
  Calendar, 
  Tag, 
  Building, 
  Zap,
  DollarSign,
  Settings,
  MoreVertical
} from 'lucide-react';
import { useThemeStore } from '../../store';
import AdminHeader from '../../components/AdminHeader';

// Types for support management
interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'pending_customer' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'account' | 'vendor' | 'bnpl' | 'general';
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerType: 'user' | 'vendor' | 'admin';
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  tags: string[];
  attachments: string[];
  rating?: number;
  feedback?: string;
  estimatedResolutionTime?: string;
  actualResolutionTime?: string;
}

interface SupportMessage {
  id: string;
  ticketId: string;
  fromUser: string;
  fromUserName: string;
  fromUserType: 'customer' | 'agent' | 'system';
  message: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: string[];
}

const AdminSupportManagement: React.FC = () => {
  const { language } = useThemeStore();
  const [activeTab, setActiveTab] = useState('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 15;

  // Mock support tickets data
  const supportTickets: SupportTicket[] = [
    {
      id: '1',
      ticketNumber: 'SUPP-2024-001',
      subject: 'Unable to submit BNPL application',
      description: 'I am trying to submit my BNPL application but getting an error message when I click submit. The page just freezes and nothing happens.',
      status: 'open',
      priority: 'high',
      category: 'bnpl',
      customerId: 'user-001',
      customerName: 'Ahmed Al-Rashid',
      customerEmail: 'ahmed.rashid@email.com',
      customerPhone: '+966501234567',
      customerType: 'user',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      tags: ['bnpl', 'application', 'error'],
      attachments: ['screenshot.png'],
      estimatedResolutionTime: '2 hours'
    },
    {
      id: '2',
      ticketNumber: 'SUPP-2024-002',
      subject: 'Vendor dashboard not loading',
      description: 'My vendor dashboard is showing a blank screen after login. I need to access my projects and quotes but cannot see anything.',
      status: 'in_progress',
      priority: 'medium',
      category: 'technical',
      customerId: 'vendor-012',
      customerName: 'Green Energy Solutions',
      customerEmail: 'support@greenenergy.sa',
      customerPhone: '+966507654321',
      customerType: 'vendor',
      assignedTo: 'agent-001',
      assignedToName: 'Sarah Al-Mutairi',
      createdAt: '2024-01-15T09:15:00Z',
      updatedAt: '2024-01-15T11:20:00Z',
      tags: ['dashboard', 'vendor', 'loading'],
      attachments: [],
      estimatedResolutionTime: '4 hours'
    },
    {
      id: '3',
      ticketNumber: 'SUPP-2024-003',
      subject: 'Incorrect billing amount charged',
      description: 'I was charged 150 SAR instead of the agreed 120 SAR for my monthly payment. Please check and correct this billing error.',
      status: 'pending_customer',
      priority: 'medium',
      category: 'billing',
      customerId: 'user-025',
      customerName: 'Fatima Al-Zahra',
      customerEmail: 'fatima.zahra@email.com',
      customerPhone: '+966503456789',
      customerType: 'user',
      assignedTo: 'agent-002',
      assignedToName: 'Mohammed Al-Qahtani',
      createdAt: '2024-01-14T16:45:00Z',
      updatedAt: '2024-01-15T08:30:00Z',
      tags: ['billing', 'payment', 'error'],
      attachments: ['payment_receipt.pdf'],
      estimatedResolutionTime: '1 day'
    },
    {
      id: '4',
      ticketNumber: 'SUPP-2024-004',
      subject: 'Request to change email address',
      description: 'I need to update my email address from old@email.com to new@email.com. Please help me change this in my account.',
      status: 'resolved',
      priority: 'low',
      category: 'account',
      customerId: 'user-078',
      customerName: 'Abdullah Al-Ghamdi',
      customerEmail: 'abdullah.ghamdi@email.com',
      customerPhone: '+966508765432',
      customerType: 'user',
      assignedTo: 'agent-003',
      assignedToName: 'Noura Al-Harbi',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-14T15:45:00Z',
      resolvedAt: '2024-01-14T15:45:00Z',
      tags: ['account', 'email', 'update'],
      attachments: [],
      rating: 5,
      feedback: 'Very helpful and quick response. Thank you!',
      estimatedResolutionTime: '30 minutes',
      actualResolutionTime: '1 hour 25 minutes'
    },
    {
      id: '5',
      ticketNumber: 'SUPP-2024-005',
      subject: 'Solar calculator showing incorrect results',
      description: 'The solar calculator is showing unrealistic savings estimates. For a 5kW system, it shows 15,000 SAR monthly savings which seems too high.',
      status: 'open',
      priority: 'urgent',
      category: 'technical',
      customerId: 'user-156',
      customerName: 'Omar Al-Rashid',
      customerEmail: 'omar.rashid@email.com',
      customerPhone: '+966502345678',
      customerType: 'user',
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
      tags: ['calculator', 'estimation', 'bug'],
      attachments: ['calculator_screenshot.png'],
      estimatedResolutionTime: '1 hour'
    }
  ];

  // Filter tickets
  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  // Get status display
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'open':
        return {
          color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
          icon: AlertTriangle,
          text: language === 'en' ? 'Open' : 'مفتوح'
        };
      case 'in_progress':
        return {
          color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
          icon: Clock,
          text: language === 'en' ? 'In Progress' : 'قيد المعالجة'
        };
      case 'pending_customer':
        return {
          color: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
          icon: User,
          text: language === 'en' ? 'Pending Customer' : 'في انتظار العميل'
        };
      case 'resolved':
        return {
          color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
          icon: CheckCircle,
          text: language === 'en' ? 'Resolved' : 'محلول'
        };
      case 'closed':
        return {
          color: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30',
          icon: XCircle,
          text: language === 'en' ? 'Closed' : 'مُغلق'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30',
          icon: MessageSquare,
          text: language === 'en' ? 'Unknown' : 'غير معروف'
        };
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-800 bg-red-200 dark:text-red-300 dark:bg-red-900/50';
      case 'high':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'low':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return Settings;
      case 'billing':
        return DollarSign;
      case 'account':
        return User;
      case 'vendor':
        return Building;
      case 'bnpl':
        return DollarSign;
      case 'general':
        return MessageSquare;
      default:
        return MessageSquare;
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
      minute: '2-digit'
    });
  };

  // Calculate time elapsed
  const calculateTimeElapsed = (timestamp: string) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return language === 'en' ? 'Less than 1 hour' : 'أقل من ساعة';
    } else if (diffInHours < 24) {
      return language === 'en' ? `${diffInHours} hours ago` : `منذ ${diffInHours} ساعة`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return language === 'en' ? `${days} days ago` : `منذ ${days} يوم`;
    }
  };

  // Handle ticket action
  const handleTicketAction = (ticketId: string, action: string) => {
    console.log(`Action ${action} for ticket ${ticketId}`);
    // Implement ticket actions
  };

  // Support summary stats
  const supportStats = {
    totalTickets: supportTickets.length,
    openTickets: supportTickets.filter(t => t.status === 'open').length,
    inProgress: supportTickets.filter(t => t.status === 'in_progress').length,
    resolved: supportTickets.filter(t => t.status === 'resolved').length,
    urgentTickets: supportTickets.filter(t => t.priority === 'urgent').length,
    avgResolutionTime: '2.5 hours',
    customerSatisfaction: 4.7
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AdminHeader
          title={language === 'en' ? 'Support Management' : 'إدارة الدعم الفني'}
          description={language === 'en' 
            ? 'Manage customer support tickets, track resolutions, and analyze support metrics'
            : 'إدارة تذاكر دعم العملاء وتتبع الحلول وتحليل مقاييس الدعم'
          }
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
              <RefreshCw className="w-5 h-5" />
              <span>{language === 'en' ? 'Refresh' : 'تحديث'}</span>
            </button>
            
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
              <Download className="w-5 h-5" />
              <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
            </button>
            
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <Plus className="w-5 h-5" />
              <span>{language === 'en' ? 'New Ticket' : 'تذكرة جديدة'}</span>
            </button>
          </div>
        </AdminHeader>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {supportStats.totalTickets}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Total Tickets' : 'إجمالي التذاكر'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {supportStats.openTickets}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Open Tickets' : 'التذاكر المفتوحة'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {supportStats.inProgress}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'In Progress' : 'قيد المعالجة'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {supportStats.resolved}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Resolved' : 'محلولة'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Flag className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {supportStats.urgentTickets}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Urgent' : 'عاجل'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {supportStats.avgResolutionTime}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Avg Resolution' : 'متوسط الحل'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {supportStats.customerSatisfaction}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Satisfaction' : 'الرضا'}
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search tickets...' : 'البحث عن التذاكر...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</option>
                <option value="open">{language === 'en' ? 'Open' : 'مفتوح'}</option>
                <option value="in_progress">{language === 'en' ? 'In Progress' : 'قيد المعالجة'}</option>
                <option value="pending_customer">{language === 'en' ? 'Pending Customer' : 'في انتظار العميل'}</option>
                <option value="resolved">{language === 'en' ? 'Resolved' : 'محلول'}</option>
                <option value="closed">{language === 'en' ? 'Closed' : 'مُغلق'}</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'en' ? 'All Priorities' : 'جميع الأولويات'}</option>
                <option value="urgent">{language === 'en' ? 'Urgent' : 'عاجل'}</option>
                <option value="high">{language === 'en' ? 'High' : 'عالي'}</option>
                <option value="medium">{language === 'en' ? 'Medium' : 'متوسط'}</option>
                <option value="low">{language === 'en' ? 'Low' : 'منخفض'}</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'en' ? 'All Categories' : 'جميع الفئات'}</option>
                <option value="technical">{language === 'en' ? 'Technical' : 'تقني'}</option>
                <option value="billing">{language === 'en' ? 'Billing' : 'الفواتير'}</option>
                <option value="account">{language === 'en' ? 'Account' : 'الحساب'}</option>
                <option value="vendor">{language === 'en' ? 'Vendor' : 'المورد'}</option>
                <option value="bnpl">{language === 'en' ? 'BNPL' : 'التمويل المؤجل'}</option>
                <option value="general">{language === 'en' ? 'General' : 'عام'}</option>
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

        {/* Support Tickets Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Ticket' : 'التذكرة'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Customer' : 'العميل'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Status & Priority' : 'الحالة والأولوية'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Category' : 'الفئة'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Assigned & Time' : 'المُكلف والوقت'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Actions' : 'الإجراءات'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedTickets.map((ticket) => {
                  const statusDisplay = getStatusDisplay(ticket.status);
                  const StatusIcon = statusDisplay.icon;
                  const CategoryIcon = getCategoryIcon(ticket.category);
                  
                  return (
                    <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <CategoryIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {ticket.ticketNumber}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                              {ticket.subject}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {calculateTimeElapsed(ticket.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {ticket.customerName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1 rtl:space-x-reverse">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-32">{ticket.customerEmail}</span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1 rtl:space-x-reverse">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              ticket.customerType === 'user' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                              ticket.customerType === 'vendor' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                            }`}>
                              {ticket.customerType}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {statusDisplay.text}
                          </span>
                          <br />
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {language === 'en' ? ticket.priority : 
                              ticket.priority === 'urgent' ? 'عاجل' :
                              ticket.priority === 'high' ? 'عالي' :
                              ticket.priority === 'medium' ? 'متوسط' : 'منخفض'
                            }
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                            {language === 'en' ? 
                              ticket.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) :
                              ticket.category === 'technical' ? 'تقني' :
                              ticket.category === 'billing' ? 'الفواتير' :
                              ticket.category === 'account' ? 'الحساب' :
                              ticket.category === 'vendor' ? 'المورد' :
                              ticket.category === 'bnpl' ? 'التمويل المؤجل' : 'عام'
                            }
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {ticket.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {tag}
                              </span>
                            ))}
                            {ticket.tags.length > 2 && (
                              <span className="text-xs text-gray-500">+{ticket.tags.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {ticket.assignedToName ? (
                            <div className="text-sm text-gray-900 dark:text-gray-100 flex items-center space-x-1 rtl:space-x-reverse">
                              <UserCheck className="w-3 h-3" />
                              <span>{ticket.assignedToName}</span>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {language === 'en' ? 'Unassigned' : 'غير مُكلف'}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Created:' : 'إنشاء:'} {formatTimestamp(ticket.createdAt)}
                          </div>
                          {ticket.estimatedResolutionTime && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {language === 'en' ? 'ETA:' : 'الوقت المتوقع:'} {ticket.estimatedResolutionTime}
                            </div>
                          )}
                          {ticket.rating && (
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{ticket.rating}/5</span>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowTicketModal(true);
                            }}
                            className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200"
                            title={language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleTicketAction(ticket.id, 'edit')}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                            title={language === 'en' ? 'Edit Ticket' : 'تعديل التذكرة'}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          
                          {ticket.status === 'open' && (
                            <button
                              onClick={() => handleTicketAction(ticket.id, 'assign')}
                              className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200"
                              title={language === 'en' ? 'Assign Ticket' : 'تكليف التذكرة'}
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                          )}
                          
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
                            title={language === 'en' ? 'More Actions' : 'المزيد من الإجراءات'}
                          >
                            <MoreVertical className="w-4 h-4" />
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
                    <span className="font-medium">{(currentPage - 1) * ticketsPerPage + 1}</span>
                    {' '}{language === 'en' ? 'to' : 'إلى'}{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * ticketsPerPage, filteredTickets.length)}
                    </span>
                    {' '}{language === 'en' ? 'of' : 'من'}{' '}
                    <span className="font-medium">{filteredTickets.length}</span>
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

        {/* Ticket Detail Modal - Placeholder */}
        {showTicketModal && selectedTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Support Ticket Details' : 'تفاصيل تذكرة الدعم الفني'}
                </h3>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Modal content will be expanded in next iteration */}
              <div className="text-center py-8">
                <Headphones className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? 'Detailed support ticket interface with messaging and resolution tools will be implemented next.'
                    : 'سيتم تنفيذ واجهة تذكرة الدعم التفصيلية مع أدوات المراسلة والحل لاحقاً.'
                  }
                </p>
              </div>

              <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  {language === 'en' ? 'Close' : 'إغلاق'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupportManagement;