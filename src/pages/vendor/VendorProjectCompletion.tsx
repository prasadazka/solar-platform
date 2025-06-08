import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft,
  CheckCircle,
  Calendar,
  FileText,
  Award,
  TrendingUp,
  Phone,
  Settings,
  Download,
  Upload,
  Camera,
  Users,
  Star,
  DollarSign,
  Zap,
  Shield,
  Clock,
  MapPin,
  AlertTriangle,
  MessageSquare,
  Video,
  Wrench,
  ClipboardCheck,
  Battery,
  Sun,
  Play,
  Pause
} from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorProjectCompletion: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { language } = useThemeStore();
  const [activeTab, setActiveTab] = useState('handover');
  // Mock completed project data
  const completedProject = {
    id: projectId || 'proj-003',
    customerName: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
    customerPhone: '+966 50 987 6543',
    address: language === 'en' ? 'Dammam, Corniche Area' : 'الدمام، منطقة الكورنيش',
    systemSize: 15,
    totalValue: 97500,
    completionDate: '2024-10-28',
    warrantyExpiry: '2034-10-28',
    customerSatisfaction: 4.8,
    bnplStatus: 'active',
    monthlyPayment: 4063,
    nextMaintenance: '2025-04-28',
    systemEfficiency: 92.5,
    monthlyProduction: 2250,
    totalSavings: 8750,
    environmentalImpact: 2.8
  };

  const postCompletionActions = [
    {
      category: language === 'en' ? 'Customer Handover' : 'تسليم العميل',
      actions: [
        {
          title: language === 'en' ? 'Digital Certificate Delivery' : 'تسليم الشهادة الرقمية',
          description: language === 'en' ? 'Generate and deliver installation certificate' : 'إنشاء وتسليم شهادة التركيب',
          icon: Award,
          status: 'completed',
          color: 'green',
          revenue: 0
        },
        {
          title: language === 'en' ? 'System Training' : 'تدريب النظام',
          description: language === 'en' ? 'Customer training on system operation' : 'تدريب العميل على تشغيل النظام',
          icon: Users,
          status: 'completed',
          color: 'green',
          revenue: 1500
        },
        {
          title: language === 'en' ? 'Documentation Package' : 'حزمة الوثائق',
          description: language === 'en' ? 'Complete manuals and warranty documents' : 'دليل الاستخدام ووثائق الضمان',
          icon: FileText,
          status: 'completed',
          color: 'green',
          revenue: 0
        }
      ]
    },    {
      category: language === 'en' ? 'Performance Monitoring' : 'مراقبة الأداء',
      actions: [
        {
          title: language === 'en' ? 'Baseline Performance Setup' : 'إعداد أداء خط الأساس',
          description: language === 'en' ? 'Record initial system performance metrics' : 'تسجيل مقاييس الأداء الأولية',
          icon: TrendingUp,
          status: 'completed',
          color: 'green',
          revenue: 800
        },
        {
          title: language === 'en' ? 'Remote Monitoring Setup' : 'إعداد المراقبة عن بُعد',
          description: language === 'en' ? 'Configure remote monitoring system' : 'تكوين نظام المراقبة عن بُعد',
          icon: Settings,
          status: 'in_progress',
          color: 'blue',
          revenue: 1200
        },
        {
          title: language === 'en' ? 'Monthly Performance Reports' : 'تقارير الأداء الشهرية',
          description: language === 'en' ? 'Generate monthly performance analysis' : 'إنشاء تحليل الأداء الشهري',
          icon: ClipboardCheck,
          status: 'upcoming',
          color: 'yellow',
          revenue: 500
        }
      ]
    },    {
      category: language === 'en' ? 'Maintenance Services' : 'خدمات الصيانة',
      actions: [
        {
          title: language === 'en' ? '6-Month Inspection' : 'فحص 6 أشهر',
          description: language === 'en' ? 'First scheduled maintenance visit' : 'أول زيارة صيانة مجدولة',
          icon: Calendar,
          status: 'upcoming',
          color: 'yellow',
          revenue: 2500
        },
        {
          title: language === 'en' ? 'Annual Comprehensive Service' : 'خدمة سنوية شاملة',
          description: language === 'en' ? 'Comprehensive yearly maintenance' : 'صيانة شاملة سنوية',
          icon: Wrench,
          status: 'scheduled',
          color: 'gray',
          revenue: 4500
        },
        {
          title: language === 'en' ? '24/7 Emergency Support' : 'دعم طوارئ على مدار الساعة',
          description: language === 'en' ? 'Emergency technical support availability' : 'توفر الدعم الفني للطوارئ',
          icon: Phone,
          status: 'active',
          color: 'emerald',
          revenue: 1800
        }
      ]
    },    {
      category: language === 'en' ? 'Customer Relationship' : 'علاقة العملاء',
      actions: [
        {
          title: language === 'en' ? 'Satisfaction Survey' : 'استطلاع الرضا',
          description: language === 'en' ? 'Collect customer feedback and rating' : 'جمع تعليقات وتقييم العميل',
          icon: Star,
          status: 'completed',
          color: 'green',
          revenue: 0
        },
        {
          title: language === 'en' ? 'Customer Success Program' : 'برنامج نجاح العملاء',
          description: language === 'en' ? 'Ongoing customer support and optimization' : 'دعم العملاء المستمر والتحسين',
          icon: TrendingUp,
          status: 'active',
          color: 'emerald',
          revenue: 2000
        },
        {
          title: language === 'en' ? 'Referral Program' : 'برنامج الإحالة',
          description: language === 'en' ? 'Customer referral and incentive program' : 'برنامج إحالة العملاء والحوافز',
          icon: Users,
          status: 'active',
          color: 'emerald',
          revenue: 5000
        }
      ]
    }
  ];
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Play className="w-5 h-5 text-blue-600" />;
      case 'upcoming':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'scheduled':
        return <Calendar className="w-5 h-5 text-gray-600" />;
      case 'active':
        return <Zap className="w-5 h-5 text-emerald-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'scheduled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const totalAdditionalRevenue = postCompletionActions
    .flatMap(category => category.actions)
    .reduce((total, action) => total + (action.revenue || 0), 0);
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
              onClick={() => navigate('/vendor/projects')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Projects' : 'العودة للمشاريع'}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-4">
                {language === 'en' ? 'Project Completion Dashboard' : 'لوحة إنجاز المشروع'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Manage post-installation services and customer relationship'
                  : 'إدارة خدمات ما بعد التركيب وعلاقة العملاء'
                }
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
              <span className={`px-4 py-2 rounded-xl font-medium ${getStatusColor('completed')}`}>
                {language === 'en' ? 'Project Completed' : 'تم إنجاز المشروع'}
              </span>
            </div>
          </div>
        </motion.div>
        {/* Project Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{completedProject.customerName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{completedProject.systemSize} kW System</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{completedProject.totalValue.toLocaleString()} SAR</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Project Value' : 'قيمة المشروع'}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{totalAdditionalRevenue.toLocaleString()} SAR</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Additional Revenue' : 'إيرادات إضافية'}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{completedProject.customerSatisfaction}/5</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Customer Rating' : 'تقييم العميل'}</p>
            </div>
          </div>
        </motion.div>
        {/* Post-Completion Action Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {postCompletionActions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3 rtl:space-x-reverse">
                <span className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {categoryIndex + 1}
                </span>
                <span>{category.category}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.actions.map((action, actionIndex) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={actionIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + actionIndex * 0.1 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                        action.status === 'completed' 
                          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                          : action.status === 'in_progress'
                          ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                          : action.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      }`}
                    >                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          action.status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : action.status === 'in_progress'
                            ? 'bg-blue-100 dark:bg-blue-900/30'
                            : action.status === 'active'
                            ? 'bg-emerald-100 dark:bg-emerald-900/30'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            action.status === 'completed' 
                              ? 'text-green-600'
                              : action.status === 'in_progress'
                              ? 'text-blue-600'
                              : action.status === 'active'
                              ? 'text-emerald-600'
                              : 'text-gray-600'
                          }`} />
                        </div>
                        {getStatusIcon(action.status)}
                      </div>

                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {action.description}
                      </p>

                      {action.revenue > 0 && (
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {language === 'en' ? 'Revenue Potential' : 'إمكانية الإيرادات'}
                          </span>
                          <span className="text-sm font-semibold text-emerald-600">
                            {action.revenue.toLocaleString()} SAR
                          </span>
                        </div>
                      )}
                      <button 
                        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          action.status === 'completed' 
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : action.status === 'in_progress'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : action.status === 'active'
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-gray-600 text-white hover:bg-gray-700'
                        }`}
                        onClick={() => {
                          if (action.title.includes('Training')) {
                            navigate('/vendor/customer-training');
                          } else if (action.title.includes('Maintenance')) {
                            navigate('/vendor/maintenance-schedule');
                          } else if (action.title.includes('Support')) {
                            navigate('/vendor/customer-support');
                          } else if (action.title.includes('Performance')) {
                            navigate('/vendor/performance-monitoring');
                          }
                        }}
                      >
                        {action.status === 'completed' 
                          ? (language === 'en' ? 'View Details' : 'عرض التفاصيل')
                          : action.status === 'in_progress'
                          ? (language === 'en' ? 'Continue' : 'متابعة')
                          : action.status === 'active'
                          ? (language === 'en' ? 'Manage' : 'إدارة')
                          : (language === 'en' ? 'Schedule' : 'جدولة')
                        }
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
        {/* Customer Communication Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mt-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Customer Communication' : 'التواصل مع العميل'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              onClick={() => window.open(`tel:${completedProject.customerPhone}`)}
            >
              <Phone className="w-5 h-5" />
              <span>{language === 'en' ? 'Call Customer' : 'اتصال بالعميل'}</span>
            </button>

            <button 
              className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
              onClick={() => navigate('/vendor/customer-messages')}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{language === 'en' ? 'Send Message' : 'إرسال رسالة'}</span>
            </button>

            <button 
              className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              onClick={() => navigate('/vendor/video-call')}
            >
              <Video className="w-5 h-5" />
              <span>{language === 'en' ? 'Video Call' : 'مكالمة فيديو'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorProjectCompletion;