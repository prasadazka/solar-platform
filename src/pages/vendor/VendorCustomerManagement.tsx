import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Users,
  Calendar,
  ClipboardCheck,
  Phone,
  MessageSquare,
  Settings,
  Download,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorCustomerManagement: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
      email: 'ahmed.rashid@email.com',
      phone: '+966 50 123 4567',
      address: language === 'en' ? 'Jeddah, King Abdul Aziz District' : 'جدة، حي الملك عبد العزيز',
      projectStatus: 'active',
      systemSize: '15 kW',
      installationDate: '2024-10-28',
      lastContact: '2024-12-01',
      satisfaction: 4.8,
      bnplStatus: 'active',
      nextMaintenance: '2025-04-28',
      totalValue: 97500,
      tickets: 0
    },
    {
      id: 2,
      name: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
      email: 'fatima.zahra@email.com',
      phone: '+966 55 987 6543',
      address: language === 'en' ? 'Riyadh, Olaya Business District' : 'الرياض، حي العليا التجاري',
      projectStatus: 'completed',
      systemSize: '8 kW',
      installationDate: '2024-09-15',
      lastContact: '2024-11-28',
      satisfaction: 4.5,
      bnplStatus: 'active',
      nextMaintenance: '2025-03-15',
      totalValue: 52000,
      tickets: 1
    },
    {
      id: 3,
      name: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
      email: 'mohammed.hassan@email.com',
      phone: '+966 56 456 7890',
      address: language === 'en' ? 'Dammam, Corniche Area' : 'الدمام، منطقة الكورنيش',
      projectStatus: 'in_progress',
      systemSize: '12 kW',
      installationDate: '2024-11-15',
      lastContact: '2024-12-02',
      satisfaction: 4.9,
      bnplStatus: 'active',
      nextMaintenance: '2025-05-15',
      totalValue: 78000,
      tickets: 0
    }
  ];

  const supportTickets = [
    {
      id: 'T001',
      customerId: 2,
      customerName: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
      subject: language === 'en' ? 'System performance inquiry' : 'استفسار عن أداء النظام',
      priority: 'medium',
      status: 'open',
      createdAt: '2024-12-01',
      lastUpdate: '2024-12-02',
      category: 'technical'
    },
    {
      id: 'T002',
      customerId: 1,
      customerName: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
      subject: language === 'en' ? 'Maintenance scheduling' : 'جدولة الصيانة',
      priority: 'low',
      status: 'resolved',
      createdAt: '2024-11-28',
      lastUpdate: '2024-11-30',
      category: 'maintenance'
    },
    {
      id: 'T003',
      customerId: 3,
      customerName: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
      subject: language === 'en' ? 'Warranty documentation' : 'وثائق الضمان',
      priority: 'high',
      status: 'in_progress',
      createdAt: '2024-12-02',
      lastUpdate: '2024-12-03',
      category: 'documentation'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'open':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-4">
                {language === 'en' ? 'Customer Management' : 'إدارة العملاء'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Manage customer relationships and support requests' : 'إدارة علاقات العملاء وطلبات الدعم'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
              <button className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
                <Download className="w-5 h-5" />
                <span>{language === 'en' ? 'Export Data' : 'تصدير البيانات'}</span>
              </button>
              <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="w-5 h-5" />
                <span>{language === 'en' ? 'Add Customer' : 'إضافة عميل'}</span>
              </button>
            </div>
          </div>
        </motion.div>
        {/* Tab Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[
              { id: 'customers', label: language === 'en' ? 'Customers' : 'العملاء', icon: Users },
              { id: 'support', label: language === 'en' ? 'Support Tickets' : 'تذاكر الدعم', icon: MessageSquare },
              { id: 'maintenance', label: language === 'en' ? 'Maintenance' : 'الصيانة', icon: Settings },
              { id: 'communications', label: language === 'en' ? 'Communications' : 'التواصل', icon: Phone }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-emerald-600 shadow-md border border-emerald-200 dark:border-emerald-700'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search customers...' : 'البحث عن العملاء...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-full md:w-80"
              />
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <Filter className="w-4 h-4" />
                <span>{language === 'en' ? 'Filter' : 'تصفية'}</span>
              </button>
            </div>
          </div>
        </motion.div>
        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            {customers.map((customer) => (
              <div key={customer.id} className="card p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-bold text-lg">{customer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{customer.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{customer.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.projectStatus)}`}>
                        {customer.projectStatus === 'active' 
                          ? (language === 'en' ? 'Active' : 'نشط')
                          : customer.projectStatus === 'completed'
                          ? (language === 'en' ? 'Completed' : 'مكتمل')
                          : (language === 'en' ? 'In Progress' : 'قيد التنفيذ')
                        }
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'System Size' : 'حجم النظام'}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{customer.systemSize}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Installation Date' : 'تاريخ التركيب'}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(customer.installationDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Satisfaction' : 'الرضا'}</p>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-gray-900 dark:text-gray-100">{customer.satisfaction}/5</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Next Maintenance' : 'الصيانة التالية'}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(customer.nextMaintenance).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button 
                        onClick={() => window.open(`tel:${customer.phone}`)}
                        className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                        title={language === 'en' ? 'Call Customer' : 'اتصال بالعميل'}
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/vendor/customer-messages/${customer.id}`)}
                        className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                        title={language === 'en' ? 'Send Message' : 'إرسال رسالة'}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/vendor/customer/${customer.id}`)}
                        className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        title={language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {customer.tickets > 0 && (
                      <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-800 dark:text-red-200">
                            {customer.tickets} {language === 'en' ? 'open ticket(s)' : 'تذكرة مفتوحة'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
        {/* Support Tickets Tab */}
        {activeTab === 'support' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Support Tickets' : 'تذاكر الدعم'}
              </h3>
              <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="w-5 h-5" />
                <span>{language === 'en' ? 'Create Ticket' : 'إنشاء تذكرة'}</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Ticket ID' : 'رقم التذكرة'}
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Customer' : 'العميل'}
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Subject' : 'الموضوع'}
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Priority' : 'الأولوية'}
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Status' : 'الحالة'}
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Created' : 'تاريخ الإنشاء'}
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Actions' : 'الإجراءات'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {supportTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 font-mono text-sm text-gray-900 dark:text-gray-100">{ticket.id}</td>
                      <td className="py-4 text-gray-900 dark:text-gray-100">{ticket.customerName}</td>
                      <td className="py-4 text-gray-900 dark:text-gray-100">{ticket.subject}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority === 'high' 
                            ? (language === 'en' ? 'High' : 'عالي')
                            : ticket.priority === 'medium'
                            ? (language === 'en' ? 'Medium' : 'متوسط')
                            : (language === 'en' ? 'Low' : 'منخفض')
                          }
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status === 'open' 
                            ? (language === 'en' ? 'Open' : 'مفتوح')
                            : ticket.status === 'in_progress'
                            ? (language === 'en' ? 'In Progress' : 'قيد المعالجة')
                            : (language === 'en' ? 'Resolved' : 'محلول')
                          }
                        </span>
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-300">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button 
                            onClick={() => navigate(`/vendor/tickets/${ticket.id}`)}
                            className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigate(`/vendor/tickets/${ticket.id}/edit`)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Maintenance Schedule' : 'جدول الصيانة'}
              </h3>
              <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="w-5 h-5" />
                <span>{language === 'en' ? 'Schedule Maintenance' : 'جدولة صيانة'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Maintenance */}
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>{language === 'en' ? 'Upcoming Maintenance' : 'الصيانة القادمة'}</span>
                </h4>
                
                <div className="space-y-4">
                  {customers.filter(c => c.nextMaintenance).map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">{customer.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{customer.systemSize} - {customer.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-emerald-600">{new Date(customer.nextMaintenance).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">
                          {Math.ceil((new Date(customer.nextMaintenance).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} {language === 'en' ? 'days' : 'يوم'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance History */}
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                  <ClipboardCheck className="w-5 h-5 text-blue-600" />
                  <span>{language === 'en' ? 'Recent Maintenance' : 'الصيانة الأخيرة'}</span>
                </h4>
                
                <div className="space-y-3">
                  {[
                    {
                      customer: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
                      type: language === 'en' ? 'Routine Inspection' : 'فحص دوري',
                      date: '2024-11-28',
                      status: 'completed'
                    },
                    {
                      customer: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
                      type: language === 'en' ? 'Panel Cleaning' : 'تنظيف الألواح',
                      date: '2024-11-25',
                      status: 'completed'
                    },
                    {
                      customer: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
                      type: language === 'en' ? 'System Check' : 'فحص النظام',
                      date: '2024-11-20',
                      status: 'completed'
                    }
                  ].map((maintenance, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{maintenance.customer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{maintenance.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(maintenance.date).toLocaleDateString()}</p>
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs">
                          {language === 'en' ? 'Completed' : 'مكتمل'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Maintenance Analytics */}
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Maintenance Analytics' : 'تحليلات الصيانة'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Completed This Month' : 'مكتمل هذا الشهر'}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">5</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Scheduled Next Week' : 'مجدول الأسبوع القادم'}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.9</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Average Rating' : 'متوسط التقييم'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Communications Tab */}
        {activeTab === 'communications' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Customer Communications' : 'التواصل مع العملاء'}
              </h3>
              <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="w-5 h-5" />
                <span>{language === 'en' ? 'New Message' : 'رسالة جديدة'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Communication Methods */}
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Communication Methods' : 'طرق التواصل'}
                </h4>
                
                <div className="space-y-3">
                  {[
                    { method: language === 'en' ? 'Phone Calls' : 'المكالمات الهاتفية', count: 45, icon: Phone, color: 'green' },
                    { method: language === 'en' ? 'Messages' : 'الرسائل', count: 128, icon: MessageSquare, color: 'blue' },
                    { method: language === 'en' ? 'Emails' : 'البريد الإلكتروني', count: 67, icon: FileText, color: 'purple' },
                    { method: language === 'en' ? 'Video Calls' : 'مكالمات الفيديو', count: 12, icon: Eye, color: 'orange' }
                  ].map((comm, index) => {
                    const Icon = comm.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-10 h-10 bg-${comm.color}-100 dark:bg-${comm.color}-900/30 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${comm.color}-600`} />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{comm.method}</span>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-gray-100">{comm.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Communications */}
              <div className="lg:col-span-2 card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Recent Communications' : 'التواصل الأخير'}
                </h4>
                
                <div className="space-y-4">
                  {[
                    {
                      customer: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
                      type: 'phone',
                      message: language === 'en' ? 'Discussed system performance and upcoming maintenance' : 'ناقش أداء النظام والصيانة القادمة',
                      time: '2 hours ago',
                      duration: '15 min'
                    },
                    {
                      customer: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
                      type: 'message',
                      message: language === 'en' ? 'Sent installation completion certificate and warranty documentation' : 'أرسل شهادة إتمام التركيب ووثائق الضمان',
                      time: '5 hours ago',
                      duration: null
                    },
                    {
                      customer: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
                      type: 'email',
                      message: language === 'en' ? 'Provided technical support for monitoring app setup' : 'قدم الدعم الفني لإعداد تطبيق المراقبة',
                      time: '1 day ago',
                      duration: null
                    },
                    {
                      customer: language === 'en' ? 'Sarah Al-Mahmoud' : 'سارة المحمود',
                      type: 'video',
                      message: language === 'en' ? 'Virtual system walkthrough and training session' : 'جولة افتراضية في النظام وجلسة تدريبية',
                      time: '2 days ago',
                      duration: '45 min'
                    }
                  ].map((comm, index) => (
                    <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        comm.type === 'phone' ? 'bg-green-100 dark:bg-green-900/30' :
                        comm.type === 'message' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        comm.type === 'email' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        'bg-orange-100 dark:bg-orange-900/30'
                      }`}>
                        {comm.type === 'phone' && <Phone className="w-5 h-5 text-green-600" />}
                        {comm.type === 'message' && <MessageSquare className="w-5 h-5 text-blue-600" />}
                        {comm.type === 'email' && <FileText className="w-5 h-5 text-purple-600" />}
                        {comm.type === 'video' && <Eye className="w-5 h-5 text-orange-600" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100">{comm.customer}</h5>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span>{comm.time}</span>
                            {comm.duration && <span className="ml-2">• {comm.duration}</span>}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{comm.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Communication Analytics */}
            <div className="card p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Communication Analytics' : 'تحليلات التواصل'}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">98%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Response Rate' : 'معدل الاستجابة'}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">2.5h</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Avg Response Time' : 'متوسط وقت الرد'}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">4.8</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Customer Satisfaction' : 'رضا العملاء'}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">252</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{language === 'en' ? 'Total Communications' : 'إجمالي التواصل'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VendorCustomerManagement;