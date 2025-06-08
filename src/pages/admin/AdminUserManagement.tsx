import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  UserPlus,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';
import { useThemeStore } from '../../store';
import AdminHeader from '../../components/AdminHeader';

// Types for user management
interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'vendor' | 'admin';
  status: 'active' | 'suspended' | 'pending' | 'banned';
  emailVerified: boolean;
  phoneVerified: boolean;
  profileCompleteness: number;
  lastLogin: string;
  joinedDate: string;
  city: string;
  totalSpent: number;
  quotesRequested: number;
  projectsCompleted: number;
  riskLevel: 'low' | 'medium' | 'high';
  kycStatus: 'pending' | 'approved' | 'rejected';
  avatar?: string;
}

const AdminUserManagement: React.FC = () => {
  const { language } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('joinedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Mock user data
  const allUsers: AdminUser[] = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      phone: '+966501234567',
      role: 'user',
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
      profileCompleteness: 95,
      lastLogin: '2024-01-15T10:30:00Z',
      joinedDate: '2023-11-20T14:22:00Z',
      city: 'Riyadh',
      totalSpent: 125000,
      quotesRequested: 3,
      projectsCompleted: 1,
      riskLevel: 'low',
      kycStatus: 'approved'
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      email: 'fatima.zahra@email.com',
      phone: '+966507654321',
      role: 'user',
      status: 'pending',
      emailVerified: true,
      phoneVerified: false,
      profileCompleteness: 60,
      lastLogin: '2024-01-14T15:45:00Z',
      joinedDate: '2024-01-10T09:15:00Z',
      city: 'Jeddah',
      totalSpent: 0,
      quotesRequested: 1,
      projectsCompleted: 0,
      riskLevel: 'medium',
      kycStatus: 'pending'
    },
    {
      id: '3',
      name: 'Mohammed Al-Qahtani',
      email: 'mohammed.qahtani@email.com',
      phone: '+966503456789',
      role: 'user',
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
      profileCompleteness: 100,
      lastLogin: '2024-01-13T20:10:00Z',
      joinedDate: '2023-09-15T11:30:00Z',
      city: 'Dammam',
      totalSpent: 285000,
      quotesRequested: 5,
      projectsCompleted: 2,
      riskLevel: 'low',
      kycStatus: 'approved'
    },
    {
      id: '4',
      name: 'Sarah Al-Mutairi',
      email: 'sarah.mutairi@email.com',
      phone: '+966508765432',
      role: 'user',
      status: 'suspended',
      emailVerified: false,
      phoneVerified: true,
      profileCompleteness: 40,
      lastLogin: '2024-01-05T16:20:00Z',
      joinedDate: '2023-12-01T13:45:00Z',
      city: 'Medina',
      totalSpent: 0,
      quotesRequested: 2,
      projectsCompleted: 0,
      riskLevel: 'high',
      kycStatus: 'rejected'
    },
    {
      id: '5',
      name: 'Abdullah Al-Ghamdi',
      email: 'abdullah.ghamdi@email.com',
      phone: '+966502345678',
      role: 'user',
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
      profileCompleteness: 85,
      lastLogin: '2024-01-15T08:15:00Z',
      joinedDate: '2023-10-10T16:00:00Z',
      city: 'Taif',
      totalSpent: 95000,
      quotesRequested: 2,
      projectsCompleted: 1,
      riskLevel: 'low',
      kycStatus: 'approved'
    },
    {
      id: '6',
      name: 'Noura Al-Harbi',
      email: 'noura.harbi@email.com',
      phone: '+966509876543',
      role: 'user',
      status: 'active',
      emailVerified: true,
      phoneVerified: false,
      profileCompleteness: 70,
      lastLogin: '2024-01-12T12:30:00Z',
      joinedDate: '2024-01-08T10:20:00Z',
      city: 'Khobar',
      totalSpent: 0,
      quotesRequested: 1,
      projectsCompleted: 0,
      riskLevel: 'medium',
      kycStatus: 'pending'
    }
  ];

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = allUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.phone.includes(searchTerm);
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      const matchesRisk = selectedRisk === 'all' || user.riskLevel === selectedRisk;
      
      return matchesSearch && matchesRole && matchesStatus && matchesRisk;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'joinedDate':
          aValue = new Date(a.joinedDate).getTime();
          bValue = new Date(b.joinedDate).getTime();
          break;
        case 'lastLogin':
          aValue = new Date(a.lastLogin).getTime();
          bValue = new Date(b.lastLogin).getTime();
          break;
        case 'totalSpent':
          aValue = a.totalSpent;
          bValue = b.totalSpent;
          break;
        case 'profileCompleteness':
          aValue = a.profileCompleteness;
          bValue = b.profileCompleteness;
          break;
        default:
          aValue = a.joinedDate;
          bValue = b.joinedDate;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [allUsers, searchTerm, selectedRole, selectedStatus, selectedRisk, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Get status color and icon
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
          icon: CheckCircle,
          text: language === 'en' ? 'Active' : 'نشط'
        };
      case 'suspended':
        return {
          color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
          icon: Ban,
          text: language === 'en' ? 'Suspended' : 'معلق'
        };
      case 'pending':
        return {
          color: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
          icon: Clock,
          text: language === 'en' ? 'Pending' : 'في انتظار'
        };
      case 'banned':
        return {
          color: 'text-red-800 bg-red-200 dark:text-red-300 dark:bg-red-900/50',
          icon: XCircle,
          text: language === 'en' ? 'Banned' : 'محظور'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30',
          icon: AlertTriangle,
          text: language === 'en' ? 'Unknown' : 'غير معروف'
        };
    }
  };

  // Get risk level color
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'high':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  // Handle user actions
  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action ${action} for user ${userId}`);
    // Implement user actions (suspend, activate, delete, etc.)
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for users:`, selectedUsers);
    // Implement bulk actions
  };

  // Summary stats
  const stats = {
    total: allUsers.length,
    active: allUsers.filter(u => u.status === 'active').length,
    pending: allUsers.filter(u => u.status === 'pending').length,
    suspended: allUsers.filter(u => u.status === 'suspended').length,
    highRisk: allUsers.filter(u => u.riskLevel === 'high').length
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AdminHeader
          title={language === 'en' ? 'User Management' : 'إدارة المستخدمين'}
          description={language === 'en' 
            ? 'Manage platform users, monitor activities, and handle approvals'
            : 'إدارة مستخدمي المنصة ومراقبة الأنشطة ومعالجة الموافقات'
          }
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button 
              onClick={() => handleBulkAction('export')}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <Download className="w-5 h-5" />
              <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
            </button>
            
            <button className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <UserPlus className="w-5 h-5" />
              <span>{language === 'en' ? 'Add User' : 'إضافة مستخدم'}</span>
            </button>
          </div>
        </AdminHeader>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.total}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Total Users' : 'إجمالي المستخدمين'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.active}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Active Users' : 'المستخدمين النشطين'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.pending}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Pending Approval' : 'في انتظار الموافقة'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Ban className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.suspended}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Suspended' : 'معلق'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.highRisk}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'High Risk' : 'عالي المخاطر'}
            </p>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search users...' : 'البحث عن المستخدمين...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'en' ? 'All Roles' : 'جميع الأدوار'}</option>
                <option value="user">{language === 'en' ? 'Users' : 'مستخدمين'}</option>
                <option value="vendor">{language === 'en' ? 'Vendors' : 'موردين'}</option>
                <option value="admin">{language === 'en' ? 'Admins' : 'مديرين'}</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</option>
                <option value="active">{language === 'en' ? 'Active' : 'نشط'}</option>
                <option value="pending">{language === 'en' ? 'Pending' : 'في انتظار'}</option>
                <option value="suspended">{language === 'en' ? 'Suspended' : 'معلق'}</option>
                <option value="banned">{language === 'en' ? 'Banned' : 'محظور'}</option>
              </select>
            </div>

            {/* Risk Filter */}
            <div>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'en' ? 'All Risk Levels' : 'جميع مستويات المخاطر'}</option>
                <option value="low">{language === 'en' ? 'Low Risk' : 'منخفض المخاطر'}</option>
                <option value="medium">{language === 'en' ? 'Medium Risk' : 'متوسط المخاطر'}</option>
                <option value="high">{language === 'en' ? 'High Risk' : 'عالي المخاطر'}</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="joinedDate">{language === 'en' ? 'Join Date' : 'تاريخ الانضمام'}</option>
                <option value="name">{language === 'en' ? 'Name' : 'الاسم'}</option>
                <option value="lastLogin">{language === 'en' ? 'Last Login' : 'آخر دخول'}</option>
                <option value="totalSpent">{language === 'en' ? 'Total Spent' : 'إجمالي الإنفاق'}</option>
                <option value="profileCompleteness">{language === 'en' ? 'Profile Completeness' : 'اكتمال الملف'}</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {language === 'en' 
                    ? `${selectedUsers.length} users selected`
                    : `تم تحديد ${selectedUsers.length} مستخدم`
                  }
                </span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                  >
                    {language === 'en' ? 'Activate' : 'تفعيل'}
                  </button>
                  <button
                    onClick={() => handleBulkAction('suspend')}
                    className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                  >
                    {language === 'en' ? 'Suspend' : 'تعليق'}
                  </button>
                  <button
                    onClick={() => setSelectedUsers([])}
                    className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {language === 'en' ? 'Clear' : 'مسح'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Users Table */}
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
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(paginatedUsers.map(u => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    />
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'User' : 'المستخدم'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Status' : 'الحالة'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Profile' : 'الملف الشخصي'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Activity' : 'النشاط'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Risk' : 'المخاطر'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Actions' : 'الإجراءات'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedUsers.map((user) => {
                  const statusDisplay = getStatusDisplay(user.status);
                  const StatusIcon = statusDisplay.icon;
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user.id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                            }
                          }}
                        />
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4 rtl:ml-0 rtl:mr-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                              <Mail className="w-3 h-3" />
                              <span>{user.email}</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                              <Phone className="w-3 h-3" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {statusDisplay.text}
                          </span>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs">
                            {user.emailVerified ? (
                              <span className="text-green-600 dark:text-green-400 flex items-center">
                                <Mail className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                                ✓
                              </span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400 flex items-center">
                                <Mail className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                                ✗
                              </span>
                            )}
                            {user.phoneVerified ? (
                              <span className="text-green-600 dark:text-green-400 flex items-center">
                                <Phone className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                                ✓
                              </span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400 flex items-center">
                                <Phone className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                                ✗
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${user.profileCompleteness}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 rtl:ml-0 rtl:mr-2 text-xs text-gray-600 dark:text-gray-400">
                              {user.profileCompleteness}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <MapPin className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {user.city}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1 text-xs">
                          <div className="text-gray-900 dark:text-gray-100 font-medium">
                            {formatCurrency(user.totalSpent)}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {user.quotesRequested} quotes, {user.projectsCompleted} projects
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Last login:' : 'آخر دخول:'} {formatDate(user.lastLogin)}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(user.riskLevel)}`}>
                          {language === 'en' ? user.riskLevel : 
                            user.riskLevel === 'low' ? 'منخفض' :
                            user.riskLevel === 'medium' ? 'متوسط' : 'عالي'
                          }
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, 'edit')}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                            className={`transition-colors duration-200 ${
                              user.status === 'active' 
                                ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                                : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                            }`}
                          >
                            {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleUserAction(user.id, 'delete')}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
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
                    <span className="font-medium">{(currentPage - 1) * usersPerPage + 1}</span>
                    {' '}{language === 'en' ? 'to' : 'إلى'}{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * usersPerPage, filteredUsers.length)}
                    </span>
                    {' '}{language === 'en' ? 'of' : 'من'}{' '}
                    <span className="font-medium">{filteredUsers.length}</span>
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

        {/* User Detail Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'User Details' : 'تفاصيل المستخدم'}
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* User Header */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {selectedUser.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">{selectedUser.email}</p>
                    <p className="text-gray-600 dark:text-gray-300">{selectedUser.phone}</p>
                  </div>
                </div>

                {/* User Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Status' : 'الحالة'}
                      </label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusDisplay(selectedUser.status).color}`}>
                        {getStatusDisplay(selectedUser.status).text}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Risk Level' : 'مستوى المخاطر'}
                      </label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(selectedUser.riskLevel)}`}>
                        {language === 'en' ? selectedUser.riskLevel : 
                          selectedUser.riskLevel === 'low' ? 'منخفض' :
                          selectedUser.riskLevel === 'medium' ? 'متوسط' : 'عالي'
                        }
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Location' : 'الموقع'}
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedUser.city}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Joined Date' : 'تاريخ الانضمام'}
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">{formatDate(selectedUser.joinedDate)}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Total Spent' : 'إجمالي الإنفاق'}
                      </label>
                      <p className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
                        {formatCurrency(selectedUser.totalSpent)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Activity' : 'النشاط'}
                      </label>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <p>{selectedUser.quotesRequested} {language === 'en' ? 'quotes requested' : 'طلب عرض سعر'}</p>
                        <p>{selectedUser.projectsCompleted} {language === 'en' ? 'projects completed' : 'مشروع مكتمل'}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Last Login' : 'آخر دخول'}
                      </label>
                      <p className="text-gray-900 dark:text-gray-100">{formatDate(selectedUser.lastLogin)}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {language === 'en' ? 'Profile Completeness' : 'اكتمال الملف الشخصي'}
                      </label>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedUser.profileCompleteness}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedUser.profileCompleteness}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                    {language === 'en' ? 'Verification Status' : 'حالة التحقق'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                        </span>
                      </div>
                      {selectedUser.emailVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {language === 'en' ? 'Phone' : 'الهاتف'}
                        </span>
                      </div>
                      {selectedUser.phoneVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    {language === 'en' ? 'Close' : 'إغلاق'}
                  </button>
                  
                  <button
                    onClick={() => handleUserAction(selectedUser.id, 'edit')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-200"
                  >
                    {language === 'en' ? 'Edit User' : 'تعديل المستخدم'}
                  </button>
                  
                  <button
                    onClick={() => handleUserAction(selectedUser.id, selectedUser.status === 'active' ? 'suspend' : 'activate')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      selectedUser.status === 'active'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {selectedUser.status === 'active' 
                      ? (language === 'en' ? 'Suspend User' : 'تعليق المستخدم')
                      : (language === 'en' ? 'Activate User' : 'تفعيل المستخدم')
                    }
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;