import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Zap, DollarSign, Edit, CheckCircle, Phone } from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorProjectDetails: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { language } = useThemeStore();

  const project = {
    id: projectId,
    customerName: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
    customerPhone: '+966 50 123 4567',
    address: language === 'en' ? 'Villa 123, King Abdul Aziz District, Jeddah' : 'فيلا 123، حي الملك عبد العزيز، جدة',
    systemSize: 12,
    totalValue: 78000,
    status: 'in_progress',
    progress: 65,
    startDate: '2024-11-01',
    expectedCompletion: '2024-12-15'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const milestones = [
    { name: language === 'en' ? 'Site Survey' : 'مسح الموقع', completed: true, date: '2024-11-01' },
    { name: language === 'en' ? 'Permits' : 'التصاريح', completed: true, date: '2024-11-05' },
    { name: language === 'en' ? 'Equipment' : 'المعدات', completed: true, date: '2024-11-10' },
    { name: language === 'en' ? 'Installation' : 'التركيب', completed: false, date: '2024-11-15' },
    { name: language === 'en' ? 'Testing' : 'الاختبار', completed: false, date: '2024-12-01' },
    { name: language === 'en' ? 'Handover' : 'التسليم', completed: false, date: '2024-12-15' }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
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
                {language === 'en' ? 'Project Details' : 'تفاصيل المشروع'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Comprehensive project information and progress tracking' : 'معلومات شاملة عن المشروع وتتبع التقدم'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => navigate(`/vendor/projects/${projectId}/update`)}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Edit className="w-5 h-5" />
                <span>{language === 'en' ? 'Update Project' : 'تحديث المشروع'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Project Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Customer Information */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Customer Information' : 'معلومات العميل'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">{project.customerName.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{project.customerName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Primary Contact' : 'جهة الاتصال الرئيسية'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-200">{project.customerPhone}</span>
              </div>
              
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-200">{project.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Project Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Project Status' : 'حالة المشروع'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Status' : 'الحالة'}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status === 'pending' 
                    ? (language === 'en' ? 'Pending' : 'في الانتظار')
                    : project.status === 'in_progress'
                    ? (language === 'en' ? 'In Progress' : 'قيد التنفيذ')
                    : (language === 'en' ? 'Completed' : 'مكتمل')
                  }
                </span>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Progress' : 'التقدم'}</span>
                  <span className="text-emerald-600 font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Expected completion:' : 'الإنجاز المتوقع:'} {new Date(project.expectedCompletion).toLocaleDateString()}
                </span>
              </div>

              {/* Completion Actions */}
              {project.progress >= 100 && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                    {language === 'en' ? 'Project Completion Actions' : 'إجراءات إنجاز المشروع'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button 
                      onClick={() => navigate('/vendor/project-handover')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                    >
                      {language === 'en' ? 'Complete Handover' : 'إنجاز التسليم'}
                    </button>
                    <button 
                      onClick={() => navigate('/vendor/maintenance-schedule')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      {language === 'en' ? 'Schedule Maintenance' : 'جدولة الصيانة'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* System Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'System Details' : 'تفاصيل النظام'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'System Size' : 'حجم النظام'}</span>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">{project.systemSize} kW</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Total Value' : 'القيمة الإجمالية'}</span>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-emerald-600">{project.totalValue.toLocaleString()} SAR</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Start Date' : 'تاريخ البداية'}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Milestones */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {language === 'en' ? 'Project Milestones' : 'معالم المشروع'}
          </h3>
          
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-xl ${
                milestone.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.completed 
                    ? 'bg-green-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {milestone.completed ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${
                      milestone.completed 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {milestone.name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(milestone.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    milestone.completed 
                      ? 'text-green-600 dark:text-green-300' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {milestone.completed 
                      ? (language === 'en' ? 'Completed successfully' : 'تم الإنجاز بنجاح')
                      : (language === 'en' ? 'Pending completion' : 'في انتظار الإنجاز')
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorProjectDetails;