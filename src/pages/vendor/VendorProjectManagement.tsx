import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  User,
  Zap,
  DollarSign,
  Eye,
  Edit,
  TrendingUp,
  Award
} from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();

  const mockProjects = [
    {
      id: 'proj-001',
      customerName: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
      address: language === 'en' ? 'Jeddah, King Abdul Aziz District' : 'جدة، حي الملك عبد العزيز',
      systemSize: 12,
      totalValue: 78000,
      status: 'in_progress',
      progress: 65,
      startDate: '2024-11-01',
      expectedCompletion: '2024-12-15',
      urgency: 'medium'
    },
    {
      id: 'proj-002',
      customerName: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
      address: language === 'en' ? 'Riyadh, Olaya District' : 'الرياض، حي العليا',
      systemSize: 8,
      totalValue: 52000,
      status: 'pending',
      progress: 15,
      startDate: '2024-11-20',
      expectedCompletion: '2025-01-10',
      urgency: 'low'
    },
    {
      id: 'proj-003',
      customerName: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
      address: language === 'en' ? 'Dammam, Corniche Area' : 'الدمام، منطقة الكورنيش',
      systemSize: 15,
      totalValue: 97500,
      status: 'completed',
      progress: 100,
      startDate: '2024-09-15',
      expectedCompletion: '2024-11-01',
      actualCompletion: '2024-10-28',
      urgency: 'low',
      completionDate: '2024-10-28',
      warrantyStatus: 'active',
      nextMaintenance: '2025-04-28',
      customerSatisfaction: 5,
      bnplStatus: 'active',
      monthlyPayment: 4063
    },
    {
      id: 'proj-004',
      customerName: language === 'en' ? 'Sara Al-Mahmoud' : 'سارة المحمود',
      address: language === 'en' ? 'Mecca, Al-Aziziyah District' : 'مكة، حي العزيزية',
      systemSize: 10,
      totalValue: 65000,
      status: 'completed',
      progress: 100,
      startDate: '2024-08-01',
      expectedCompletion: '2024-09-15',
      actualCompletion: '2024-09-12',
      urgency: 'medium',
      completionDate: '2024-09-12',
      warrantyStatus: 'active',
      nextMaintenance: '2025-03-12',
      customerSatisfaction: 4.8,
      bnplStatus: 'active',
      monthlyPayment: 2708
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
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
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
            </button>
          </div>

          <h1 className="text-3xl font-bold gradient-text mb-4">
            {language === 'en' ? 'Project Management' : 'إدارة المشاريع'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Track and manage your solar installation projects'
              : 'تتبع وإدارة مشاريع تركيب الطاقة الشمسية'
            }
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {mockProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {project.customerName}
                  </h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{project.address}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status === 'pending' 
                    ? (language === 'en' ? 'Pending' : 'في الانتظار')
                    : project.status === 'in_progress'
                    ? (language === 'en' ? 'In Progress' : 'قيد التنفيذ')
                    : (language === 'en' ? 'Completed' : 'مكتمل')
                  }
                </span>
              </div>
              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {project.systemSize} kW
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {project.totalValue.toLocaleString()} SAR
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(project.expectedCompletion).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar / Completion Status */}
              <div className="mb-4">
                {project.status === 'completed' ? (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">
                        {language === 'en' ? 'Project Completed' : 'تم إنجاز المشروع'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-green-600 dark:text-green-300">{language === 'en' ? 'Completed:' : 'مكتمل في:'}</span>
                        <span className="ml-2 rtl:ml-0 rtl:mr-2 text-green-800 dark:text-green-200 font-medium">
                          {new Date(project.actualCompletion).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-600 dark:text-green-300">{language === 'en' ? 'Customer Rating:' : 'تقييم العميل:'}</span>
                        <span className="ml-2 rtl:ml-0 rtl:mr-2 text-green-800 dark:text-green-200 font-medium">
                          {project.customerSatisfaction}/5 ⭐
                        </span>
                      </div>
                      <div>
                        <span className="text-green-600 dark:text-green-300">{language === 'en' ? 'Warranty:' : 'الضمان:'}</span>
                        <span className="ml-2 rtl:ml-0 rtl:mr-2 text-green-800 dark:text-green-200 font-medium">
                          {project.warrantyStatus === 'active' ? (language === 'en' ? 'Active' : 'نشط') : (language === 'en' ? 'Expired' : 'منتهي')}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-600 dark:text-green-300">{language === 'en' ? 'BNPL Status:' : 'حالة الدفع الآجل:'}</span>
                        <span className="ml-2 rtl:ml-0 rtl:mr-2 text-green-800 dark:text-green-200 font-medium">
                          {project.bnplStatus === 'active' ? (language === 'en' ? 'Active' : 'نشط') : (language === 'en' ? 'Completed' : 'مكتمل')}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {language === 'en' ? 'Progress' : 'التقدم'}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                {project.status === 'completed' ? (
                  // Post-Completion Actions
                  <>
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <button 
                        onClick={() => navigate(`/vendor/projects/${project.id}/completion`)}
                        className="flex-1 btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                      >
                        <Award className="w-4 h-4" />
                        <span>{language === 'en' ? 'Completion Dashboard' : 'لوحة الإنجاز'}</span>
                      </button>
                      
                      <button 
                        onClick={() => navigate(`/vendor/projects/${project.id}`)}
                        className="flex-1 btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{language === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
                      </button>
                    </div>
                    
                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <button 
                        onClick={() => navigate(`/vendor/maintenance/schedule/${project.id}`)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{language === 'en' ? 'Schedule Maintenance' : 'جدولة الصيانة'}</span>
                      </button>
                      
                      <button 
                        onClick={() => navigate(`/vendor/customer-service/${project.id}`)}
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{language === 'en' ? 'Customer Support' : 'دعم العملاء'}</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button 
                        onClick={() => navigate(`/vendor/performance/${project.id}`)}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-1 rtl:space-x-reverse"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>{language === 'en' ? 'Performance' : 'الأداء'}</span>
                      </button>
                      
                      <button 
                        onClick={() => navigate(`/vendor/warranty/${project.id}`)}
                        className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-1 rtl:space-x-reverse"
                      >
                        <Award className="w-4 h-4" />
                        <span>{language === 'en' ? 'Warranty' : 'الضمان'}</span>
                      </button>
                      
                      <button 
                        onClick={() => navigate(`/vendor/payments/customer/${project.id}`)}
                        className="bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-1 rtl:space-x-reverse"
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>{language === 'en' ? 'Payments' : 'المدفوعات'}</span>
                      </button>
                    </div>

                    {/* Next Maintenance Alert */}
                    {project.nextMaintenance && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-yellow-800 dark:text-yellow-200">
                            {language === 'en' ? 'Next maintenance due:' : 'الصيانة التالية مستحقة في:'} 
                            <strong className="ml-1 rtl:ml-0 rtl:mr-1">{new Date(project.nextMaintenance).toLocaleDateString()}</strong>
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Regular Project Actions
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <button 
                      onClick={() => navigate(`/vendor/projects/${project.id}`)}
                      className="flex-1 btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{language === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
                    </button>
                    
                    <button 
                      onClick={() => navigate(`/vendor/projects/${project.id}/update`)}
                      className="flex-1 btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse"
                    >
                      <Edit className="w-4 h-4" />
                      <span>{language === 'en' ? 'Update' : 'تحديث'}</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default VendorProjectManagement;