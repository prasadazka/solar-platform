import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  FileText,
  Shield,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Download,
  Upload,
  Edit3,
  LogIn,
  Settings,
  Calculator,
  FileCheck,
  UserCheck,
  Calendar
} from 'lucide-react';
import { useThemeStore } from '../../store';

interface ActivityItem {
  id: string;
  type: 'login' | 'profile_update' | 'document_upload' | 'verification' | 'security' | 'calculation' | 'quote_request' | 'system_action';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  metadata?: {
    ip?: string;
    location?: string;
    device?: string;
    documentType?: string;
    changes?: string[];
  };
}

const ProfileActivity: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState<'all' | 'security' | 'profile' | 'documents' | 'verification'>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'login',
      title: language === 'en' ? 'Successful Login' : 'تسجيل دخول ناجح',
      description: language === 'en' ? 'Logged in successfully' : 'تم تسجيل الدخول بنجاح',
      timestamp: new Date('2024-01-20T14:30:00'),
      status: 'success',
      metadata: {
        ip: '192.168.1.100',
        location: 'Jeddah, Saudi Arabia',
        device: 'Chrome on Windows'
      }
    },
    {
      id: '2',
      type: 'document_upload',
      title: language === 'en' ? 'Document Uploaded' : 'تم رفع مستند',
      description: language === 'en' ? 'National ID document uploaded successfully' : 'تم رفع مستند الهوية الوطنية بنجاح',
      timestamp: new Date('2024-01-19T16:45:00'),
      status: 'success',
      metadata: {
        documentType: 'National ID'
      }
    },
    {
      id: '3',
      type: 'verification',
      title: language === 'en' ? 'Email Verified' : 'تم التحقق من البريد الإلكتروني',
      description: language === 'en' ? 'Email address verified successfully' : 'تم التحقق من البريد الإلكتروني بنجاح',
      timestamp: new Date('2024-01-19T10:20:00'),
      status: 'success'
    },
    {
      id: '4',
      type: 'profile_update',
      title: language === 'en' ? 'Profile Updated' : 'تم تحديث الملف الشخصي',
      description: language === 'en' ? 'Personal information updated' : 'تم تحديث المعلومات الشخصية',
      timestamp: new Date('2024-01-18T11:15:00'),
      status: 'info',
      metadata: {
        changes: ['Phone Number', 'Address']
      }
    },
    {
      id: '5',
      type: 'security',
      title: language === 'en' ? 'Password Changed' : 'تم تغيير كلمة المرور',
      description: language === 'en' ? 'Account password updated successfully' : 'تم تحديث كلمة مرور الحساب بنجاح',
      timestamp: new Date('2024-01-15T09:45:00'),
      status: 'success'
    }
  ]);

  const getIcon = (type: string, status: string) => {
    const iconClass = `w-5 h-5 ${
      status === 'success' ? 'text-green-500' :
      status === 'warning' ? 'text-yellow-500' :
      status === 'error' ? 'text-red-500' :
      'text-blue-500'
    }`;

    switch (type) {
      case 'login':
        return <LogIn className={iconClass} />;
      case 'profile_update':
        return <Edit3 className={iconClass} />;
      case 'document_upload':
        return <Upload className={iconClass} />;
      case 'verification':
        return status === 'success' ? <CheckCircle className={iconClass} /> : <AlertCircle className={iconClass} />;
      case 'security':
        return <Shield className={iconClass} />;
      case 'calculation':
        return <Calculator className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'security') return ['login', 'security'].includes(activity.type);
    if (filter === 'profile') return activity.type === 'profile_update';
    if (filter === 'documents') return activity.type === 'document_upload';
    if (filter === 'verification') return activity.type === 'verification';
    return true;
  });

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Profile' : 'العودة للملف الشخصي'}</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-4">
                {language === 'en' ? 'Account Activity' : 'نشاط الحساب'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'View your recent account activity and security events'
                  : 'عرض نشاط حسابك الأخير وأحداث الأمان'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: language === 'en' ? 'All Activity' : 'جميع الأنشطة' },
                { key: 'security', label: language === 'en' ? 'Security' : 'الأمان' },
                { key: 'profile', label: language === 'en' ? 'Profile' : 'الملف الشخصي' },
                { key: 'documents', label: language === 'en' ? 'Documents' : 'المستندات' },
                { key: 'verification', label: language === 'en' ? 'Verification' : 'التحقق' }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    filter === filterOption.key
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="card p-6"
            >
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    activity.status === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                    'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    {getIcon(activity.type, activity.status)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {activity.title}
                    </h3>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.timestamp.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {activity.description}
                  </p>

                  {activity.metadata && (
                    <div className="space-y-2">
                      {activity.metadata.ip && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <strong>{language === 'en' ? 'IP:' : 'عنوان IP:'}</strong> {activity.metadata.ip}
                          {activity.metadata.location && (
                            <span className="ml-2 rtl:ml-0 rtl:mr-2">
                              • {activity.metadata.location}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {activity.metadata.device && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <strong>{language === 'en' ? 'Device:' : 'الجهاز:'}</strong> {activity.metadata.device}
                        </div>
                      )}
                      
                      {activity.metadata.documentType && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <strong>{language === 'en' ? 'Document:' : 'المستند:'}</strong> {activity.metadata.documentType}
                        </div>
                      )}
                      
                      {activity.metadata.changes && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <strong>{language === 'en' ? 'Changes:' : 'التغييرات:'}</strong> {activity.metadata.changes.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-12 text-center"
          >
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'No Activity Found' : 'لا توجد أنشطة'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'No activities match your current filter.'
                : 'لا توجد أنشطة تطابق المرشح الحالي.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfileActivity;