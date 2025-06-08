import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Download,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  DollarSign,
  Star,
  Briefcase,
  Shield,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  Activity,
  FileCheck,
  FileX,
  MoreVertical
} from 'lucide-react';
import { useThemeStore } from '../../store';
import AdminHeader from '../../components/AdminHeader';

// Types for vendor approval
interface VendorApplication {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  contactPerson: string;
  establishedYear: string;
  employeeCount: string;
  address: string;
  city: string;
  serviceAreas: string[];
  specializations: string[];
  website?: string;
  
  // Financial Information
  iban: string;
  bankName: string;
  expectedRevenue: number;
  
  // Documents
  documents: {
    commercialRegistration: DocumentStatus;
    vatCertificate: DocumentStatus;
    secLicense: DocumentStatus;
    sasoCertificate: DocumentStatus;
    insuranceCertificate: DocumentStatus;
    portfolioSamples: DocumentStatus;
  };
  
  // Application Details
  submittedAt: string;
  lastUpdated: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_clarification';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reviewerId?: string;
  reviewerNotes?: string;
  rejectionReason?: string;
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  
  // Business Metrics (for existing vendors)
  completedProjects?: number;
  customerRating?: number;
  totalRevenue?: number;
  responseTime?: string;
}

interface DocumentStatus {
  status: 'pending' | 'approved' | 'rejected' | 'missing';
  uploadedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  fileUrl?: string;
}

const AdminVendorApproval: React.FC = () => {
  const { language } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  // Mock vendor applications data
  const allApplications: VendorApplication[] = [
    {
      id: '1',
      companyName: 'Green Energy Solutions',
      email: 'info@greenenergy.sa',
      phone: '+966501234567',
      contactPerson: 'Ahmed Al-Rashid',
      establishedYear: '2019',
      employeeCount: '25-50',
      address: 'King Fahd Road, Riyadh',
      city: 'Riyadh',
      serviceAreas: ['Riyadh', 'Qassim', 'Hail'],
      specializations: ['Residential Solar', 'Commercial Solar', 'Maintenance'],
      website: 'https://greenenergy.sa',
      iban: 'SA03800000000',
      bankName: 'NCB Bank',
      expectedRevenue: 2500000,
      documents: {
        commercialRegistration: { status: 'approved', uploadedAt: '2024-01-10T10:00:00Z', reviewedAt: '2024-01-11T14:30:00Z' },
        vatCertificate: { status: 'approved', uploadedAt: '2024-01-10T10:05:00Z', reviewedAt: '2024-01-11T14:35:00Z' },
        secLicense: { status: 'pending', uploadedAt: '2024-01-10T10:10:00Z' },
        sasoCertificate: { status: 'approved', uploadedAt: '2024-01-10T10:15:00Z', reviewedAt: '2024-01-11T14:40:00Z' },
        insuranceCertificate: { status: 'rejected', uploadedAt: '2024-01-10T10:20:00Z', reviewedAt: '2024-01-11T14:45:00Z', rejectionReason: 'Insurance amount insufficient' },
        portfolioSamples: { status: 'approved', uploadedAt: '2024-01-10T10:25:00Z', reviewedAt: '2024-01-11T14:50:00Z' }
      },
      submittedAt: '2024-01-10T09:30:00Z',
      lastUpdated: '2024-01-11T14:50:00Z',
      status: 'under_review',
      priority: 'high',
      reviewerId: 'admin1',
      reviewerNotes: 'Strong portfolio, needs insurance update',
      complianceScore: 85,
      riskLevel: 'low'
    },
    {
      id: '2',
      companyName: 'Solar Tech Arabia',
      email: 'contact@solartech.sa',
      phone: '+966507654321',
      contactPerson: 'Fatima Al-Zahra',
      establishedYear: '2021',
      employeeCount: '10-25',
      address: 'Prince Sultan Road, Jeddah',
      city: 'Jeddah',
      serviceAreas: ['Jeddah', 'Mecca', 'Taif'],
      specializations: ['Residential Solar', 'Battery Storage'],
      iban: 'SA04800000001',
      bankName: 'Al Rajhi Bank',
      expectedRevenue: 1500000,
      documents: {
        commercialRegistration: { status: 'approved', uploadedAt: '2024-01-12T11:00:00Z', reviewedAt: '2024-01-13T09:30:00Z' },
        vatCertificate: { status: 'approved', uploadedAt: '2024-01-12T11:05:00Z', reviewedAt: '2024-01-13T09:35:00Z' },
        secLicense: { status: 'approved', uploadedAt: '2024-01-12T11:10:00Z', reviewedAt: '2024-01-13T09:40:00Z' },
        sasoCertificate: { status: 'pending', uploadedAt: '2024-01-12T11:15:00Z' },
        insuranceCertificate: { status: 'approved', uploadedAt: '2024-01-12T11:20:00Z', reviewedAt: '2024-01-13T09:45:00Z' },
        portfolioSamples: { status: 'approved', uploadedAt: '2024-01-12T11:25:00Z', reviewedAt: '2024-01-13T09:50:00Z' }
      },
      submittedAt: '2024-01-12T10:30:00Z',
      lastUpdated: '2024-01-13T09:50:00Z',
      status: 'pending',
      priority: 'medium',
      complianceScore: 92,
      riskLevel: 'low'
    },
    {
      id: '3',
      companyName: 'Desert Sun Power',
      email: 'info@desertsun.sa',
      phone: '+966503456789',
      contactPerson: 'Mohammed Al-Qahtani',
      establishedYear: '2020',
      employeeCount: '50-100',
      address: 'Dhahran Street, Dammam',
      city: 'Dammam',
      serviceAreas: ['Eastern Province', 'Jubail', 'Khobar'],
      specializations: ['Commercial Solar', 'Industrial Solar', 'Grid-Tie Systems'],
      website: 'https://desertsun.sa',
      iban: 'SA05800000002',
      bankName: 'SABB Bank',
      expectedRevenue: 5000000,
      documents: {
        commercialRegistration: { status: 'rejected', uploadedAt: '2024-01-08T15:00:00Z', reviewedAt: '2024-01-09T10:30:00Z', rejectionReason: 'Document expired' },
        vatCertificate: { status: 'approved', uploadedAt: '2024-01-08T15:05:00Z', reviewedAt: '2024-01-09T10:35:00Z' },
        secLicense: { status: 'approved', uploadedAt: '2024-01-08T15:10:00Z', reviewedAt: '2024-01-09T10:40:00Z' },
        sasoCertificate: { status: 'approved', uploadedAt: '2024-01-08T15:15:00Z', reviewedAt: '2024-01-09T10:45:00Z' },
        insuranceCertificate: { status: 'pending', uploadedAt: '2024-01-08T15:20:00Z' },
        portfolioSamples: { status: 'approved', uploadedAt: '2024-01-08T15:25:00Z', reviewedAt: '2024-01-09T10:50:00Z' }
      },
      submittedAt: '2024-01-08T14:30:00Z',
      lastUpdated: '2024-01-09T10:50:00Z',
      status: 'needs_clarification',
      priority: 'urgent',
      reviewerId: 'admin2',
      reviewerNotes: 'Need updated commercial registration',
      rejectionReason: 'Commercial registration expired',
      complianceScore: 75,
      riskLevel: 'medium'
    },
    {
      id: '4',
      companyName: 'Alpha Solar Systems',
      email: 'admin@alphasolar.sa',
      phone: '+966508765432',
      contactPerson: 'Sarah Al-Mutairi',
      establishedYear: '2018',
      employeeCount: '100+',
      address: 'King Abdullah Road, Medina',
      city: 'Medina',
      serviceAreas: ['Medina', 'Yanbu', 'Tabuk'],
      specializations: ['Residential Solar', 'Commercial Solar', 'Maintenance', 'Monitoring'],
      website: 'https://alphasolar.sa',
      iban: 'SA06800000003',
      bankName: 'Riyad Bank',
      expectedRevenue: 8000000,
      documents: {
        commercialRegistration: { status: 'approved', uploadedAt: '2024-01-14T08:00:00Z', reviewedAt: '2024-01-14T16:30:00Z' },
        vatCertificate: { status: 'approved', uploadedAt: '2024-01-14T08:05:00Z', reviewedAt: '2024-01-14T16:35:00Z' },
        secLicense: { status: 'approved', uploadedAt: '2024-01-14T08:10:00Z', reviewedAt: '2024-01-14T16:40:00Z' },
        sasoCertificate: { status: 'approved', uploadedAt: '2024-01-14T08:15:00Z', reviewedAt: '2024-01-14T16:45:00Z' },
        insuranceCertificate: { status: 'approved', uploadedAt: '2024-01-14T08:20:00Z', reviewedAt: '2024-01-14T16:50:00Z' },
        portfolioSamples: { status: 'approved', uploadedAt: '2024-01-14T08:25:00Z', reviewedAt: '2024-01-14T16:55:00Z' }
      },
      submittedAt: '2024-01-14T07:30:00Z',
      lastUpdated: '2024-01-14T16:55:00Z',
      status: 'approved',
      priority: 'high',
      reviewerId: 'admin1',
      reviewerNotes: 'Excellent application, all documents verified',
      complianceScore: 98,
      riskLevel: 'low',
      completedProjects: 150,
      customerRating: 4.8,
      totalRevenue: 12000000,
      responseTime: '< 2 hours'
    }
  ];

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = allApplications.filter(app => {
      const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.phone.includes(searchTerm);
      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || app.priority === selectedPriority;
      const matchesRisk = selectedRisk === 'all' || app.riskLevel === selectedRisk;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesRisk;
    });

    // Sort applications
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'companyName':
          aValue = a.companyName.toLowerCase();
          bValue = b.companyName.toLowerCase();
          break;
        case 'submittedAt':
          aValue = new Date(a.submittedAt).getTime();
          bValue = new Date(b.submittedAt).getTime();
          break;
        case 'lastUpdated':
          aValue = new Date(a.lastUpdated).getTime();
          bValue = new Date(b.lastUpdated).getTime();
          break;
        case 'complianceScore':
          aValue = a.complianceScore;
          bValue = b.complianceScore;
          break;
        case 'expectedRevenue':
          aValue = a.expectedRevenue;
          bValue = b.expectedRevenue;
          break;
        default:
          aValue = a.submittedAt;
          bValue = b.submittedAt;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [allApplications, searchTerm, selectedStatus, selectedPriority, selectedRisk, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * applicationsPerPage,
    currentPage * applicationsPerPage
  );

  // Get status display information
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30',
          icon: Clock,
          text: language === 'en' ? 'Pending Review' : 'في انتظار المراجعة'
        };
      case 'under_review':
        return {
          color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30',
          icon: Eye,
          text: language === 'en' ? 'Under Review' : 'قيد المراجعة'
        };
      case 'approved':
        return {
          color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30',
          icon: CheckCircle,
          text: language === 'en' ? 'Approved' : 'معتمد'
        };
      case 'rejected':
        return {
          color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30',
          icon: XCircle,
          text: language === 'en' ? 'Rejected' : 'مرفوض'
        };
      case 'needs_clarification':
        return {
          color: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
          icon: AlertTriangle,
          text: language === 'en' ? 'Needs Clarification' : 'يحتاج توضيح'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30',
          icon: AlertTriangle,
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

  // Get document status icon and color
  const getDocumentStatus = (status: string) => {
    switch (status) {
      case 'approved':
        return { icon: FileCheck, color: 'text-green-600 dark:text-green-400' };
      case 'rejected':
        return { icon: FileX, color: 'text-red-600 dark:text-red-400' };
      case 'pending':
        return { icon: Clock, color: 'text-yellow-600 dark:text-yellow-400' };
      case 'missing':
        return { icon: AlertTriangle, color: 'text-gray-400 dark:text-gray-500' };
      default:
        return { icon: FileText, color: 'text-gray-400 dark:text-gray-500' };
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  // Handle application actions
  const handleApplicationAction = (applicationId: string, action: string) => {
    console.log(`Action ${action} for application ${applicationId}`);
    // Implement application actions (approve, reject, request clarification, etc.)
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for applications:`, selectedApplications);
    // Implement bulk actions
  };

  // Calculate overall document completion
  const calculateDocumentCompletion = (documents: VendorApplication['documents']) => {
    const total = Object.keys(documents).length;
    const approved = Object.values(documents).filter(doc => doc.status === 'approved').length;
    return Math.round((approved / total) * 100);
  };

  // Summary stats
  const stats = {
    total: allApplications.length,
    pending: allApplications.filter(app => app.status === 'pending').length,
    underReview: allApplications.filter(app => app.status === 'under_review').length,
    approved: allApplications.filter(app => app.status === 'approved').length,
    rejected: allApplications.filter(app => app.status === 'rejected').length,
    needsClarification: allApplications.filter(app => app.status === 'needs_clarification').length
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AdminHeader
          title={language === 'en' ? 'Vendor Approvals' : 'موافقات الموردين'}
          description={language === 'en' 
            ? 'Review and approve vendor registration applications'
            : 'مراجعة والموافقة على طلبات تسجيل الموردين'
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
          </div>
        </AdminHeader>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.total}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Total Applications' : 'إجمالي الطلبات'}
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
              {language === 'en' ? 'Pending Review' : 'في انتظار المراجعة'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.underReview}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Under Review' : 'قيد المراجعة'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.approved}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Approved' : 'معتمد'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.needsClarification}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Needs Clarification' : 'يحتاج توضيح'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.rejected}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Rejected' : 'مرفوض'}
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
                  placeholder={language === 'en' ? 'Search applications...' : 'البحث عن الطلبات...'}
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
                <option value="pending">{language === 'en' ? 'Pending' : 'في انتظار'}</option>
                <option value="under_review">{language === 'en' ? 'Under Review' : 'قيد المراجعة'}</option>
                <option value="approved">{language === 'en' ? 'Approved' : 'معتمد'}</option>
                <option value="rejected">{language === 'en' ? 'Rejected' : 'مرفوض'}</option>
                <option value="needs_clarification">{language === 'en' ? 'Needs Clarification' : 'يحتاج توضيح'}</option>
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
                <option value="submittedAt">{language === 'en' ? 'Submission Date' : 'تاريخ التقديم'}</option>
                <option value="companyName">{language === 'en' ? 'Company Name' : 'اسم الشركة'}</option>
                <option value="lastUpdated">{language === 'en' ? 'Last Updated' : 'آخر تحديث'}</option>
                <option value="complianceScore">{language === 'en' ? 'Compliance Score' : 'نقاط الامتثال'}</option>
                <option value="expectedRevenue">{language === 'en' ? 'Expected Revenue' : 'الإيرادات المتوقعة'}</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedApplications.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {language === 'en' 
                    ? `${selectedApplications.length} applications selected`
                    : `تم تحديد ${selectedApplications.length} طلب`
                  }
                </span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleBulkAction('approve')}
                    className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                  >
                    {language === 'en' ? 'Approve All' : 'الموافقة على الكل'}
                  </button>
                  <button
                    onClick={() => handleBulkAction('reject')}
                    className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                  >
                    {language === 'en' ? 'Reject All' : 'رفض الكل'}
                  </button>
                  <button
                    onClick={() => setSelectedApplications([])}
                    className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {language === 'en' ? 'Clear' : 'مسح'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Applications Table */}
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
                          setSelectedApplications(paginatedApplications.map(app => app.id));
                        } else {
                          setSelectedApplications([]);
                        }
                      }}
                      checked={selectedApplications.length === paginatedApplications.length && paginatedApplications.length > 0}
                    />
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Company' : 'الشركة'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Status' : 'الحالة'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Documents' : 'المستندات'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Business Info' : 'معلومات الأعمال'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Compliance' : 'الامتثال'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Actions' : 'الإجراءات'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedApplications.map((application) => {
                  const statusDisplay = getStatusDisplay(application.status);
                  const StatusIcon = statusDisplay.icon;
                  const documentCompletion = calculateDocumentCompletion(application.documents);
                  
                  return (
                    <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
                          checked={selectedApplications.includes(application.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedApplications([...selectedApplications, application.id]);
                            } else {
                              setSelectedApplications(selectedApplications.filter(id => id !== application.id));
                            }
                          }}
                        />
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium">
                            {application.companyName.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4 rtl:ml-0 rtl:mr-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {application.companyName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                              <Mail className="w-3 h-3" />
                              <span>{application.email}</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                              <Phone className="w-3 h-3" />
                              <span>{application.phone}</span>
                            </div>
                            {application.website && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                                <Globe className="w-3 h-3" />
                                <span>{application.website}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                              <StatusIcon className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                              {statusDisplay.text}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(application.priority)}`}>
                              {language === 'en' ? application.priority : 
                                application.priority === 'urgent' ? 'عاجل' :
                                application.priority === 'high' ? 'عالي' :
                                application.priority === 'medium' ? 'متوسط' : 'منخفض'
                              }
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Submitted:' : 'تم التقديم:'} {formatDate(application.submittedAt)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Updated:' : 'آخر تحديث:'} {formatDate(application.lastUpdated)}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${documentCompletion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {documentCompletion}%
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1">
                            {Object.entries(application.documents).map(([docType, docStatus]) => {
                              const { icon: DocIcon, color } = getDocumentStatus(docStatus.status);
                              return (
                                <div key={docType} className="flex items-center justify-center">
                                  <DocIcon className={`w-3 h-3 ${color}`} title={docType} />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1 text-xs">
                          <div className="text-gray-900 dark:text-gray-100 font-medium">
                            {application.contactPerson}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 flex items-center">
                            <MapPin className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {application.city}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {application.establishedYear}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 flex items-center">
                            <Users className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {application.employeeCount}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 flex items-center">
                            <DollarSign className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {formatCurrency(application.expectedRevenue)}
                          </div>
                          {application.completedProjects && (
                            <div className="text-gray-500 dark:text-gray-400 flex items-center">
                              <Briefcase className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                              {application.completedProjects} projects
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${application.complianceScore}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {application.complianceScore}%
                            </span>
                          </div>
                          
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(application.riskLevel)}`}>
                            <Shield className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {language === 'en' ? application.riskLevel : 
                              application.riskLevel === 'low' ? 'منخفض' :
                              application.riskLevel === 'medium' ? 'متوسط' : 'عالي'
                            }
                          </span>
                          
                          {application.customerRating && (
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {application.customerRating}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowApplicationModal(true);
                            }}
                            className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200"
                            title={language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {application.status === 'pending' || application.status === 'under_review' ? (
                            <>
                              <button
                                onClick={() => handleApplicationAction(application.id, 'approve')}
                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                                title={language === 'en' ? 'Approve' : 'موافقة'}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleApplicationAction(application.id, 'reject')}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                                title={language === 'en' ? 'Reject' : 'رفض'}
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          ) : null}
                          
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
                    <span className="font-medium">{(currentPage - 1) * applicationsPerPage + 1}</span>
                    {' '}{language === 'en' ? 'to' : 'إلى'}{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * applicationsPerPage, filteredApplications.length)}
                    </span>
                    {' '}{language === 'en' ? 'of' : 'من'}{' '}
                    <span className="font-medium">{filteredApplications.length}</span>
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

        {/* Application Detail Modal - This will be implemented in the next component */}
        {showApplicationModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Vendor Application Details' : 'تفاصيل طلب المورد'}
                </h3>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Modal content will be expanded in next iteration */}
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? 'Detailed application review interface will be implemented next.'
                    : 'سيتم تنفيذ واجهة مراجعة الطلبات التفصيلية لاحقاً.'
                  }
                </p>
              </div>

              <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowApplicationModal(false)}
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

export default AdminVendorApproval;