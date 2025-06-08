import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle,
  User,
  FileText,
  CreditCard,
  MapPin,
  Building,
  Shield,
  Eye,
  UserCheck
} from 'lucide-react';
import { useThemeStore } from '../store';
import { OnboardingStatus, RegistrationStep } from '../types';

interface ProgressTrackerProps {
  steps: RegistrationStep[];
  onboardingStatus: OnboardingStatus;
  currentStep: number;
  type: 'user' | 'vendor';
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  steps,
  onboardingStatus,
  currentStep,
  type
}) => {
  const { language } = useThemeStore();

  const getStepIcon = (iconName: string) => {
    const icons = {
      'user': User,
      'id-card': FileText,
      'settings': Shield,
      'shield-check': CheckCircle,
      'file-text': FileText,
      'building': Building,
      'clipboard': FileText,
      'map-pin': MapPin,
      'credit-card': CreditCard,
      'user-check': UserCheck
    };
    return icons[iconName as keyof typeof icons] || User;
  };

  const getStepStatus = (stepIndex: number, stepId: string) => {
    if (onboardingStatus.completedSteps.includes(stepId)) {
      return 'completed';
    } else if (stepIndex + 1 === currentStep) {
      return 'active';
    } else if (stepIndex + 1 < currentStep) {
      return 'completed';
    } else {
      return 'pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'active':
        return Clock;
      case 'pending':
        return AlertCircle;
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'active':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700';
      case 'pending':
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600';
      case 'rejected':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600';
    }
  };

  const getOverallStatusBadge = () => {
    const statusConfig = {
      'incomplete': {
        text: language === 'en' ? 'In Progress' : 'قيد التقدم',
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      },
      'pending_review': {
        text: language === 'en' ? 'Under Review' : 'قيد المراجعة',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      },
      'approved': {
        text: language === 'en' ? 'Approved' : 'معتمد',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      },
      'rejected': {
        text: language === 'en' ? 'Rejected' : 'مرفوض',
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      }
    };

    const config = statusConfig[onboardingStatus.status];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const completionPercentage = Math.round(
    (onboardingStatus.completedSteps.length / onboardingStatus.totalSteps) * 100
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {language === 'en' ? 'Registration Progress' : 'تقدم التسجيل'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? `${onboardingStatus.completedSteps.length} of ${onboardingStatus.totalSteps} steps completed`
              : `${onboardingStatus.completedSteps.length} من ${onboardingStatus.totalSteps} خطوات مكتملة`
            }
          </p>
        </div>
        {getOverallStatusBadge()}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Overall Progress' : 'التقدم العام'}
          </span>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const stepStatus = getStepStatus(index, step.id);
          const StepIcon = getStepIcon(step.icon);
          const StatusIcon = getStatusIcon(stepStatus);
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                stepStatus === 'active' 
                  ? 'ring-2 ring-emerald-500 ring-opacity-50' 
                  : ''
              }`}
            >
              {/* Step Number/Icon */}
              <div className={`relative flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4 ${getStatusColor(stepStatus)}`}>
                {stepStatus === 'completed' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                  <h4 className={`font-medium ${
                    stepStatus === 'active' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {step.title}
                  </h4>
                  <StatusIcon className={`w-4 h-4 ${
                    stepStatus === 'completed' ? 'text-green-500' :
                    stepStatus === 'active' ? 'text-blue-500' :
                    stepStatus === 'rejected' ? 'text-red-500' :
                    'text-gray-400'
                  }`} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {step.description}
                </p>
              </div>

              {/* Step Action */}
              {stepStatus === 'active' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0"
                >
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Additional Info */}
      {onboardingStatus.status === 'pending_review' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              {language === 'en' 
                ? 'Your application is under review. We\'ll notify you once approved.'
                : 'طلبك قيد المراجعة. سنقوم بإشعارك بمجرد الموافقة عليه.'
              }
            </p>
          </div>
        </motion.div>
      )}

      {onboardingStatus.status === 'rejected' && onboardingStatus.rejectionReason && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-800"
        >
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
                {language === 'en' ? 'Application Rejected' : 'تم رفض الطلب'}
              </p>
              <p className="text-sm text-red-700 dark:text-red-400">
                {onboardingStatus.rejectionReason}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressTracker;
