import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Search, 
  Filter, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Download,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  TrendingDown,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Calculator,
  FileText,
  Building,
  Percent,
  BarChart3,
  PieChart,
  Activity,
  Banknote,
  Receipt,
  CreditCard as CreditCardIcon,
  Wallet,
  BadgeCheck,
  AlertCircle,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { useThemeStore } from '../../store';
import AdminHeader from '../../components/AdminHeader';

// Types for BNPL applications
interface BNPLApplication {
  id: string;
  applicationNumber: string;
  
  // Customer Information
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  nationalId: string;
  monthlyIncome: number;
  employmentStatus: string;
  employerName: string;
  
  // Application Details
  requestedAmount: number;
  loanTerm: number; // months
  monthlyPayment: number;
  interestRate: number;
  downPayment: number;
  totalCost: number;
  
  // Solar Project Details
  vendorId: string;
  vendorName: string;
  systemSize: number; // kW
  projectType: 'residential' | 'commercial' | 'industrial';
  propertyAddress: string;
  city: string;
  expectedSavings: number;
  paybackPeriod: number; // years
  
  // Financial Assessment
  creditScore: number;
  debtToIncomeRatio: number;
  existingLoans: number;
  bankStatements: DocumentStatus;
  salarySlips: DocumentStatus;
  employmentLetter: DocumentStatus;
  nationalIdCopy: DocumentStatus;
  
  // Risk Assessment
  riskLevel: 'low' | 'medium' | 'high' | 'very_high';
  riskFactors: string[];
  creditHistory: 'excellent' | 'good' | 'fair' | 'poor';
  
  // Application Status
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'conditional_approval' | 'requires_guarantor';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedAt: string;
  reviewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  
  // Review Details
  reviewerId?: string;
  reviewerNotes?: string;
  rejectionReason?: string;
  conditions?: string[];
  
  // Approval Limits
  approvedAmount?: number;
  approvedTerm?: number;
  finalInterestRate?: number;
  
  // Compliance
  samaCompliant: boolean;
  kycCompleted: boolean;
  amlChecked: boolean;
  
  // Performance Prediction
  defaultProbability: number;
  expectedProfitability: number;
}

interface DocumentStatus {
  status: 'pending' | 'approved' | 'rejected' | 'missing';
  uploadedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  fileUrl?: string;
}

const AdminBNPLApproval: React.FC = () => {
  const { language } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('pending');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [amountRange, setAmountRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('submittedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<BNPLApplication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  // Mock BNPL applications data
  const allApplications: BNPLApplication[] = [
    {
      id: '1',
      applicationNumber: 'BNPL-2024-001',
      customerId: 'user-001',
      customerName: 'Ahmed Al-Rashid',
      customerEmail: 'ahmed.rashid@email.com',
      customerPhone: '+966501234567',
      nationalId: '1234567890',
      monthlyIncome: 15000,
      employmentStatus: 'employed',
      employerName: 'Saudi Aramco',
      requestedAmount: 125000,
      loanTerm: 24,
      monthlyPayment: 5500,
      interestRate: 8.5,
      downPayment: 25000,
      totalCost: 150000,
      vendorId: 'vendor-001',
      vendorName: 'Green Energy Solutions',
      systemSize: 10,
      projectType: 'residential',
      propertyAddress: 'King Fahd Road, Riyadh',
      city: 'Riyadh',
      expectedSavings: 12000,
      paybackPeriod: 8.5,
      creditScore: 720,
      debtToIncomeRatio: 35,
      existingLoans: 5000,
      bankStatements: { status: 'approved', uploadedAt: '2024-01-10T10:00:00Z', reviewedAt: '2024-01-11T14:30:00Z' },
      salarySlips: { status: 'approved', uploadedAt: '2024-01-10T10:05:00Z', reviewedAt: '2024-01-11T14:35:00Z' },
      employmentLetter: { status: 'approved', uploadedAt: '2024-01-10T10:10:00Z', reviewedAt: '2024-01-11T14:40:00Z' },
      nationalIdCopy: { status: 'approved', uploadedAt: '2024-01-10T10:15:00Z', reviewedAt: '2024-01-11T14:45:00Z' },
      riskLevel: 'low',
      riskFactors: [],
      creditHistory: 'excellent',
      status: 'under_review',
      priority: 'medium',
      submittedAt: '2024-01-10T09:30:00Z',
      reviewedAt: '2024-01-11T14:50:00Z',
      reviewerId: 'admin-001',
      reviewerNotes: 'Strong financial profile, excellent credit history',
      samaCompliant: true,
      kycCompleted: true,
      amlChecked: true,
      defaultProbability: 5,
      expectedProfitability: 15000
    },
    {
      id: '2',
      applicationNumber: 'BNPL-2024-002',
      customerId: 'user-002',
      customerName: 'Fatima Al-Zahra',
      customerEmail: 'fatima.zahra@email.com',
      customerPhone: '+966507654321',
      nationalId: '2345678901',
      monthlyIncome: 8000,
      employmentStatus: 'employed',
      employerName: 'Ministry of Education',
      requestedAmount: 85000,
      loanTerm: 30,
      monthlyPayment: 3200,
      interestRate: 9.0,
      downPayment: 15000,
      totalCost: 100000,
      vendorId: 'vendor-002',
      vendorName: 'Solar Tech Arabia',
      systemSize: 7,
      projectType: 'residential',
      propertyAddress: 'Prince Sultan Road, Jeddah',
      city: 'Jeddah',
      expectedSavings: 9500,
      paybackPeriod: 9.2,
      creditScore: 650,
      debtToIncomeRatio: 42,
      existingLoans: 2500,
      bankStatements: { status: 'approved', uploadedAt: '2024-01-12T11:00:00Z', reviewedAt: '2024-01-13T09:30:00Z' },
      salarySlips: { status: 'approved', uploadedAt: '2024-01-12T11:05:00Z', reviewedAt: '2024-01-13T09:35:00Z' },
      employmentLetter: { status: 'pending', uploadedAt: '2024-01-12T11:10:00Z' },
      nationalIdCopy: { status: 'approved', uploadedAt: '2024-01-12T11:15:00Z', reviewedAt: '2024-01-13T09:40:00Z' },
      riskLevel: 'medium',
      riskFactors: ['High debt-to-income ratio'],
      creditHistory: 'good',
      status: 'pending',
      priority: 'medium',
      submittedAt: '2024-01-12T10:30:00Z',
      samaCompliant: true,
      kycCompleted: false,
      amlChecked: true,
      defaultProbability: 15,
      expectedProfitability: 8500
    },
    {
      id: '3',
      applicationNumber: 'BNPL-2024-003',
      customerId: 'user-003',
      customerName: 'Mohammed Al-Qahtani',
      customerEmail: 'mohammed.qahtani@email.com',
      customerPhone: '+966503456789',
      nationalId: '3456789012',
      monthlyIncome: 25000,
      employmentStatus: 'business_owner',
      employerName: 'Al-Qahtani Trading Co.',
      requestedAmount: 350000,
      loanTerm: 36,
      monthlyPayment: 11500,
      interestRate: 7.5,
      downPayment: 70000,
      totalCost: 420000,
      vendorId: 'vendor-003',
      vendorName: 'Desert Sun Power',
      systemSize: 25,
      projectType: 'commercial',
      propertyAddress: 'Industrial Area, Dammam',
      city: 'Dammam',
      expectedSavings: 45000,
      paybackPeriod: 7.2,
      creditScore: 780,
      debtToIncomeRatio: 28,
      existingLoans: 15000,
      bankStatements: { status: 'approved', uploadedAt: '2024-01-08T15:00:00Z', reviewedAt: '2024-01-09T10:30:00Z' },
      salarySlips: { status: 'rejected', uploadedAt: '2024-01-08T15:05:00Z', reviewedAt: '2024-01-09T10:35:00Z', rejectionReason: 'Business income statements required instead' },
      employmentLetter: { status: 'approved', uploadedAt: '2024-01-08T15:10:00Z', reviewedAt: '2024-01-09T10:40:00Z' },
      nationalIdCopy: { status: 'approved', uploadedAt: '2024-01-08T15:15:00Z', reviewedAt: '2024-01-09T10:45:00Z' },
      riskLevel: 'low',
      riskFactors: ['Business income verification needed'],
      creditHistory: 'excellent',
      status: 'conditional_approval',
      priority: 'high',
      submittedAt: '2024-01-08T14:30:00Z',
      reviewedAt: '2024-01-09T10:50:00Z',
      reviewerId: 'admin-002',
      reviewerNotes: 'High-value application, requires business income verification',
      conditions: ['Provide audited financial statements', 'Business registration verification'],
      approvedAmount: 300000,
      approvedTerm: 36,
      finalInterestRate: 7.5,
      samaCompliant: true,
      kycCompleted: true,
      amlChecked: true,
      defaultProbability: 8,
      expectedProfitability: 35000
    },
    {
      id: '4',
      applicationNumber: 'BNPL-2024-004',
      customerId: 'user-004',
      customerName: 'Sarah Al-Mutairi',
      customerEmail: 'sarah.mutairi@email.com',
      customerPhone: '+966508765432',
      nationalId: '4567890123',
      monthlyIncome: 5500,
      employmentStatus: 'employed',
      employerName: 'Local Hospital',
      requestedAmount: 95000,
      loanTerm: 24,
      monthlyPayment: 4200,
      interestRate: 10.0,
      downPayment: 10000,
      totalCost: 105000,
      vendorId: 'vendor-004',
      vendorName: 'Alpha Solar Systems',
      systemSize: 6,
      projectType: 'residential',
      propertyAddress: 'Al-Noor District, Medina',
      city: 'Medina',
      expectedSavings: 7800,
      paybackPeriod: 11.5,
      creditScore: 580,
      debtToIncomeRatio: 55,
      existingLoans: 4500,
      bankStatements: { status: 'rejected', uploadedAt: '2024-01-14T08:00:00Z', reviewedAt: '2024-01-14T16:30:00Z', rejectionReason: 'Insufficient account balance history' },
      salarySlips: { status: 'approved', uploadedAt: '2024-01-14T08:05:00Z', reviewedAt: '2024-01-14T16:35:00Z' },
      employmentLetter: { status: 'approved', uploadedAt: '2024-01-14T08:10:00Z', reviewedAt: '2024-01-14T16:40:00Z' },
      nationalIdCopy: { status: 'approved', uploadedAt: '2024-01-14T08:15:00Z', reviewedAt: '2024-01-14T16:45:00Z' },
      riskLevel: 'high',
      riskFactors: ['Low credit score', 'High debt-to-income ratio', 'Limited banking history'],
      creditHistory: 'fair',
      status: 'rejected',
      priority: 'low',
      submittedAt: '2024-01-14T07:30:00Z',
      reviewedAt: '2024-01-14T16:50:00Z',
      rejectedAt: '2024-01-14T16:55:00Z',
      reviewerId: 'admin-001',
      reviewerNotes: 'High risk profile, insufficient financial stability',
      rejectionReason: 'Credit score below minimum threshold, high debt-to-income ratio',
      samaCompliant: true,
      kycCompleted: true,
      amlChecked: false,
      defaultProbability: 45,
      expectedProfitability: -2000
    },
    {
      id: '5',
      applicationNumber: 'BNPL-2024-005',
      customerId: 'user-005',
      customerName: 'Abdullah Al-Ghamdi',
      customerEmail: 'abdullah.ghamdi@email.com',
      customerPhone: '+966502345678',
      nationalId: '5678901234',
      monthlyIncome: 18000,
      employmentStatus: 'employed',
      employerName: 'SABIC',
      requestedAmount: 180000,
      loanTerm: 30,
      monthlyPayment: 6800,
      interestRate: 8.0,
      downPayment: 40000,
      totalCost: 220000,
      vendorId: 'vendor-001',
      vendorName: 'Green Energy Solutions',
      systemSize: 15,
      projectType: 'residential',
      propertyAddress: 'Al-Shifa District, Taif',
      city: 'Taif',
      expectedSavings: 18500,
      paybackPeriod: 8.8,
      creditScore: 690,
      debtToIncomeRatio: 38,
      existingLoans: 8000,
      bankStatements: { status: 'approved', uploadedAt: '2024-01-15T12:00:00Z', reviewedAt: '2024-01-15T18:30:00Z' },
      salarySlips: { status: 'approved', uploadedAt: '2024-01-15T12:05:00Z', reviewedAt: '2024-01-15T18:35:00Z' },
      employmentLetter: { status: 'approved', uploadedAt: '2024-01-15T12:10:00Z', reviewedAt: '2024-01-15T18:40:00Z' },
      nationalIdCopy: { status: 'approved', uploadedAt: '2024-01-15T12:15:00Z', reviewedAt: '2024-01-15T18:45:00Z' },
      riskLevel: 'low',
      riskFactors: [],
      creditHistory: 'good',
      status: 'approved',
      priority: 'medium',
      submittedAt: '2024-01-15T11:30:00Z',
      reviewedAt: '2024-01-15T18:50:00Z',
      approvedAt: '2024-01-15T18:55:00Z',
      reviewerId: 'admin-003',
      reviewerNotes: 'Stable employment, good credit profile, approved with standard terms',
      approvedAmount: 180000,
      approvedTerm: 30,
      finalInterestRate: 8.0,
      samaCompliant: true,
      kycCompleted: true,
      amlChecked: true,
      defaultProbability: 10,
      expectedProfitability: 22000
    }
  ];

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = allApplications.filter(app => {
      const matchesSearch = app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
      const matchesRisk = selectedRisk === 'all' || app.riskLevel === selectedRisk;
      const matchesPriority = selectedPriority === 'all' || app.priority === selectedPriority;
      
      let matchesAmount = true;
      if (amountRange !== 'all') {
        switch (amountRange) {
          case 'under_50k':
            matchesAmount = app.requestedAmount < 50000;
            break;
          case '50k_150k':
            matchesAmount = app.requestedAmount >= 50000 && app.requestedAmount <= 150000;
            break;
          case '150k_300k':
            matchesAmount = app.requestedAmount > 150000 && app.requestedAmount <= 300000;
            break;
          case 'over_300k':
            matchesAmount = app.requestedAmount > 300000;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesRisk && matchesPriority && matchesAmount;
    });

    // Sort applications
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'customerName':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        case 'submittedAt':
          aValue = new Date(a.submittedAt).getTime();
          bValue = new Date(b.submittedAt).getTime();
          break;
        case 'requestedAmount':
          aValue = a.requestedAmount;
          bValue = b.requestedAmount;
          break;
        case 'creditScore':
          aValue = a.creditScore;
          bValue = b.creditScore;
          break;
        case 'defaultProbability':
          aValue = a.defaultProbability;
          bValue = b.defaultProbability;
          break;
        case 'expectedProfitability':
          aValue = a.expectedProfitability;
          bValue = b.expectedProfitability;
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
  }, [allApplications, searchTerm, selectedStatus, selectedRisk, selectedPriority, amountRange, sortBy, sortOrder]);

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
      case 'conditional_approval':
        return {
          color: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30',
          icon: AlertTriangle,
          text: language === 'en' ? 'Conditional Approval' : 'موافقة مشروطة'
        };
      case 'requires_guarantor':
        return {
          color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30',
          icon: Shield,
          text: language === 'en' ? 'Requires Guarantor' : 'يتطلب ضامن'
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
      case 'very_high':
        return 'text-red-800 bg-red-200 dark:text-red-300 dark:bg-red-900/50';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
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

  // Get credit score color
  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600 dark:text-green-400';
    if (score >= 650) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 550) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
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
    // Implement application actions (approve, reject, request documents, etc.)
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for applications:`, selectedApplications);
    // Implement bulk actions
  };

  // Calculate document completion
  const calculateDocumentCompletion = (app: BNPLApplication) => {
    const documents = [app.bankStatements, app.salarySlips, app.employmentLetter, app.nationalIdCopy];
    const approved = documents.filter(doc => doc.status === 'approved').length;
    return Math.round((approved / documents.length) * 100);
  };

  // Summary stats
  const stats = {
    total: allApplications.length,
    pending: allApplications.filter(app => app.status === 'pending').length,
    underReview: allApplications.filter(app => app.status === 'under_review').length,
    approved: allApplications.filter(app => app.status === 'approved').length,
    rejected: allApplications.filter(app => app.status === 'rejected').length,
    conditionalApproval: allApplications.filter(app => app.status === 'conditional_approval').length,
    totalRequested: allApplications.reduce((sum, app) => sum + app.requestedAmount, 0),
    totalApproved: allApplications.filter(app => app.status === 'approved').reduce((sum, app) => sum + (app.approvedAmount || app.requestedAmount), 0),
    avgCreditScore: Math.round(allApplications.reduce((sum, app) => sum + app.creditScore, 0) / allApplications.length),
    highRiskCount: allApplications.filter(app => app.riskLevel === 'high' || app.riskLevel === 'very_high').length
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AdminHeader
          title={language === 'en' ? 'BNPL Applications' : 'طلبات التمويل المؤجل'}
          description={language === 'en' 
            ? 'Review and approve Buy Now Pay Later financing applications'
            : 'مراجعة والموافقة على طلبات التمويل المؤجل'
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
              <BarChart3 className="w-5 h-5" />
              <span>{language === 'en' ? 'Analytics' : 'التحليلات'}</span>
            </button>
          </div>
        </AdminHeader>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.conditionalApproval}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Conditional' : 'مشروط'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(stats.totalRequested / 1000000)}M
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Total Requested' : 'إجمالي المطلوب'}
            </p>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.avgCreditScore}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Avg Credit Score' : 'متوسط النقاط الائتمانية'}
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
                <option value="conditional_approval">{language === 'en' ? 'Conditional' : 'مشروط'}</option>
                <option value="requires_guarantor">{language === 'en' ? 'Needs Guarantor' : 'يتطلب ضامن'}</option>
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
                <option value="very_high">{language === 'en' ? 'Very High Risk' : 'عالي المخاطر جداً'}</option>
              </select>
            </div>

            {/* Amount Range Filter */}
            <div>
              <select
                value={amountRange}
                onChange={(e) => setAmountRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">{language === 'en' ? 'All Amounts' : 'جميع المبالغ'}</option>
                <option value="under_50k">{language === 'en' ? 'Under 50K' : 'أقل من 50 ألف'}</option>
                <option value="50k_150k">{language === 'en' ? '50K - 150K' : '50-150 ألف'}</option>
                <option value="150k_300k">{language === 'en' ? '150K - 300K' : '150-300 ألف'}</option>
                <option value="over_300k">{language === 'en' ? 'Over 300K' : 'أكثر من 300 ألف'}</option>
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
                <option value="customerName">{language === 'en' ? 'Customer Name' : 'اسم العميل'}</option>
                <option value="requestedAmount">{language === 'en' ? 'Requested Amount' : 'المبلغ المطلوب'}</option>
                <option value="creditScore">{language === 'en' ? 'Credit Score' : 'النقاط الائتمانية'}</option>
                <option value="defaultProbability">{language === 'en' ? 'Default Risk' : 'مخاطر التعثر'}</option>
                <option value="expectedProfitability">{language === 'en' ? 'Expected Profit' : 'الربح المتوقع'}</option>
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
                    {language === 'en' ? 'Customer' : 'العميل'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Application' : 'الطلب'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Financial Info' : 'المعلومات المالية'}
                  </th>
                  <th className="px-6 py-4 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {language === 'en' ? 'Risk Assessment' : 'تقييم المخاطر'}
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
                {paginatedApplications.map((application) => {
                  const statusDisplay = getStatusDisplay(application.status);
                  const StatusIcon = statusDisplay.icon;
                  const documentCompletion = calculateDocumentCompletion(application);
                  
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
                            {application.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4 rtl:ml-0 rtl:mr-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {application.customerName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                              <Mail className="w-3 h-3" />
                              <span>{application.customerEmail}</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                              <Phone className="w-3 h-3" />
                              <span>{application.customerPhone}</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2 rtl:space-x-reverse">
                              <User className="w-3 h-3" />
                              <span>{application.nationalId}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1 text-xs">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {application.applicationNumber}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {formatCurrency(application.requestedAmount)}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {application.loanTerm} {language === 'en' ? 'months' : 'شهر'}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {application.interestRate}% {language === 'en' ? 'APR' : 'معدل سنوي'}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 flex items-center">
                            <Building className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {application.vendorName}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {application.systemSize}kW - {language === 'en' ? application.projectType : 
                              application.projectType === 'residential' ? 'سكني' :
                              application.projectType === 'commercial' ? 'تجاري' : 'صناعي'
                            }
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1 text-xs">
                          <div className="text-gray-900 dark:text-gray-100 font-medium">
                            {formatCurrency(application.monthlyIncome)} / {language === 'en' ? 'month' : 'شهر'}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Monthly Payment:' : 'الدفعة الشهرية:'} {formatCurrency(application.monthlyPayment)}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'DTI:' : 'نسبة الدين:'} {application.debtToIncomeRatio}%
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Existing Loans:' : 'القروض الحالية:'} {formatCurrency(application.existingLoans)}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {application.employmentStatus === 'employed' ? 
                              (language === 'en' ? 'Employed' : 'موظف') :
                              (language === 'en' ? 'Business Owner' : 'صاحب عمل')
                            }
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {application.employerName}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className={`text-lg font-bold ${getCreditScoreColor(application.creditScore)}`}>
                              {application.creditScore}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {language === 'en' ? 'Credit Score' : 'النقاط الائتمانية'}
                            </span>
                          </div>
                          
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(application.riskLevel)}`}>
                            <Shield className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                            {language === 'en' ? application.riskLevel : 
                              application.riskLevel === 'low' ? 'منخفض' :
                              application.riskLevel === 'medium' ? 'متوسط' :
                              application.riskLevel === 'high' ? 'عالي' : 'عالي جداً'
                            }
                          </span>
                          
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Default Risk:' : 'مخاطر التعثر:'} {application.defaultProbability}%
                          </div>
                          
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Expected Profit:' : 'الربح المتوقع:'} {formatCurrency(application.expectedProfitability)}
                          </div>
                          
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className="w-12 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${documentCompletion}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {documentCompletion}%
                            </span>
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
                          
                          {application.reviewedAt && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {language === 'en' ? 'Reviewed:' : 'تمت المراجعة:'} {formatDate(application.reviewedAt)}
                            </div>
                          )}
                          
                          {application.approvedAmount && (
                            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                              {language === 'en' ? 'Approved:' : 'معتمد:'} {formatCurrency(application.approvedAmount)}
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
                          
                          {(application.status === 'pending' || application.status === 'under_review') && (
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
                              <button
                                onClick={() => handleApplicationAction(application.id, 'conditional')}
                                className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200"
                                title={language === 'en' ? 'Conditional Approval' : 'موافقة مشروطة'}
                              >
                                <AlertTriangle className="w-4 h-4" />
                              </button>
                            </>
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

        {/* Application Detail Modal - Placeholder */}
        {showApplicationModal && selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'BNPL Application Details' : 'تفاصيل طلب التمويل المؤجل'}
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
                    ? 'Detailed BNPL application review interface will be implemented next.'
                    : 'سيتم تنفيذ واجهة مراجعة طلبات التمويل المؤجل التفصيلية لاحقاً.'
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

export default AdminBNPLApproval;