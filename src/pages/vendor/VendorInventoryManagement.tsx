import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Download,
  Upload,
  Eye,
  Edit,
  BarChart3,
  ShoppingCart,
  Warehouse
} from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorInventoryManagement: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const [activeTab, setActiveTab] = useState('inventory');

  const inventoryItems = [
    {
      id: 'INV001',
      name: language === 'en' ? 'Solar Panel - 400W Mono' : 'لوح شمسي - 400 واط أحادي',
      category: 'panels',
      brand: 'SunPower',
      model: 'SPR-MAX3-400',
      quantity: 150,
      reserved: 24,
      available: 126,
      unitCost: 850,
      totalValue: 127500,
      reorderLevel: 50,
      status: 'in_stock',
      location: 'Warehouse A-1',
      lastUpdated: '2024-12-01'
    },
    {
      id: 'INV002',
      name: language === 'en' ? 'Inverter - 5kW String' : 'عاكس - 5 كيلو واط سلسلة',
      category: 'inverters',
      brand: 'SMA',
      model: 'STP-5000TL',
      quantity: 25,
      reserved: 8,
      available: 17,
      unitCost: 2400,
      totalValue: 60000,
      reorderLevel: 10,
      status: 'low_stock',
      location: 'Warehouse B-2',
      lastUpdated: '2024-11-30'
    },
    {
      id: 'INV003',
      name: language === 'en' ? 'Battery Storage - 10kWh' : 'بطارية تخزين - 10 كيلو واط ساعة',
      category: 'batteries',
      brand: 'Tesla',
      model: 'Powerwall 2',
      quantity: 8,
      reserved: 6,
      available: 2,
      unitCost: 12000,
      totalValue: 96000,
      reorderLevel: 5,
      status: 'critical',
      location: 'Warehouse C-1',
      lastUpdated: '2024-12-02'
    },
    {
      id: 'INV004',
      name: language === 'en' ? 'Mounting Rails - Aluminum' : 'قضبان التثبيت - ألومنيوم',
      category: 'mounting',
      brand: 'Quick Mount',
      model: 'QM-RAIL-4M',
      quantity: 0,
      reserved: 12,
      available: -12,
      unitCost: 45,
      totalValue: 0,
      reorderLevel: 100,
      status: 'out_of_stock',
      location: 'Warehouse D-3',
      lastUpdated: '2024-12-03'
    }
  ];

  const pendingOrders = [
    {
      id: 'PO001',
      supplier: 'SolarTech Distributors',
      items: 3,
      totalValue: 125000,
      orderDate: '2024-11-28',
      expectedDelivery: '2024-12-10',
      status: 'pending'
    },
    {
      id: 'PO002',
      supplier: 'Green Energy Supplies',
      items: 2,
      totalValue: 48000,
      orderDate: '2024-12-01',
      expectedDelivery: '2024-12-08',
      status: 'shipped'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'out_of_stock':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'shipped':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'low_stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'critical':
      case 'out_of_stock':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
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
                {language === 'en' ? 'Inventory Management' : 'إدارة المخزون'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Track equipment, parts, and inventory levels' : 'تتبع المعدات والقطع ومستويات المخزون'}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
              <button className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
                <Download className="w-5 h-5" />
                <span>{language === 'en' ? 'Export Report' : 'تصدير التقرير'}</span>
              </button>
              <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="w-5 h-5" />
                <span>{language === 'en' ? 'Add Item' : 'إضافة صنف'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[
              { id: 'inventory', label: language === 'en' ? 'Inventory' : 'المخزون', icon: Package },
              { id: 'orders', label: language === 'en' ? 'Orders' : 'الطلبات', icon: ShoppingCart },
              { id: 'analytics', label: language === 'en' ? 'Analytics' : 'التحليلات', icon: BarChart3 },
              { id: 'warehouse', label: language === 'en' ? 'Warehouse' : 'المستودع', icon: Warehouse }
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
        {activeTab === 'inventory' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search inventory...' : 'البحث في المخزون...'}
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
        )}

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Total Items' : 'إجمالي الأصناف'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">183</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Low Stock' : 'مخزون منخفض'}
                </p>
                <p className="text-2xl font-bold text-orange-600">2</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Total Value' : 'القيمة الإجمالية'}
                </p>
                <p className="text-2xl font-bold text-emerald-600">283K SAR</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {language === 'en' ? 'Pending Orders' : 'طلبات معلقة'}
                </p>
                <p className="text-2xl font-bold text-purple-600">2</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Item' : 'الصنف'}
                    </th>
                    <th className="text-left py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Category' : 'الفئة'}
                    </th>
                    <th className="text-left py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Stock' : 'المخزون'}
                    </th>
                    <th className="text-left py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Status' : 'الحالة'}
                    </th>
                    <th className="text-left py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Value' : 'القيمة'}
                    </th>
                    <th className="text-left py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Location' : 'الموقع'}
                    </th>
                    <th className="text-left py-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Actions' : 'الإجراءات'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.brand} - {item.model}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{item.category}</span>
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'Available:' : 'متاح:'} {item.available}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Reserved:' : 'محجوز:'} {item.reserved}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          {getStatusIcon(item.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status === 'in_stock' 
                              ? (language === 'en' ? 'In Stock' : 'متوفر')
                              : item.status === 'low_stock'
                              ? (language === 'en' ? 'Low Stock' : 'مخزون منخفض')
                              : item.status === 'critical'
                              ? (language === 'en' ? 'Critical' : 'حرج')
                              : (language === 'en' ? 'Out of Stock' : 'نفد المخزون')
                            }
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {item.totalValue.toLocaleString()} SAR
                          </div>
                          <div className="text-gray-600 dark:text-gray-300">
                            {item.unitCost} SAR/{language === 'en' ? 'unit' : 'وحدة'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-300">{item.location}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          {(item.status === 'low_stock' || item.status === 'critical' || item.status === 'out_of_stock') && (
                            <button className="p-1 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded">
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Purchase Orders' : 'أوامر الشراء'}
              </h3>
              <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="w-5 h-5" />
                <span>{language === 'en' ? 'New Order' : 'طلب جديد'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{order.id}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status === 'pending' 
                            ? (language === 'en' ? 'Pending' : 'معلق')
                            : (language === 'en' ? 'Shipped' : 'تم الشحن')
                          }
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">{language === 'en' ? 'Supplier' : 'المورد'}</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{order.supplier}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">{language === 'en' ? 'Items' : 'الأصناف'}</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{order.items} {language === 'en' ? 'items' : 'صنف'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">{language === 'en' ? 'Expected Delivery' : 'تاريخ التسليم المتوقع'}</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(order.expectedDelivery).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-2xl font-bold text-emerald-600">{order.totalValue.toLocaleString()} SAR</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Ordered on' : 'تم الطلب في'} {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Inventory Analytics' : 'تحليلات المخزون'}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Stock Levels by Category' : 'مستويات المخزون حسب الفئة'}
                </h4>
                <div className="space-y-3">
                  {[
                    { category: language === 'en' ? 'Solar Panels' : 'الألواح الشمسية', percentage: 85, color: 'bg-blue-500' },
                    { category: language === 'en' ? 'Inverters' : 'العواكس', percentage: 45, color: 'bg-yellow-500' },
                    { category: language === 'en' ? 'Batteries' : 'البطاريات', percentage: 25, color: 'bg-red-500' },
                    { category: language === 'en' ? 'Mounting' : 'التثبيت', percentage: 0, color: 'bg-gray-500' }
                  ].map((cat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{cat.category}</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${cat.color}`}
                            style={{ width: `${cat.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{cat.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Recent Activity' : 'النشاط الأخير'}
                </h4>
                <div className="space-y-3">
                  {[
                    { action: language === 'en' ? 'Stock updated: Solar Panels' : 'تحديث المخزون: الألواح الشمسية', time: '2 hours ago' },
                    { action: language === 'en' ? 'New order placed: Inverters' : 'طلب جديد: العواكس', time: '5 hours ago' },
                    { action: language === 'en' ? 'Low stock alert: Batteries' : 'تنبيه مخزون منخفض: البطاريات', time: '1 day ago' },
                    { action: language === 'en' ? 'Delivery received: Mounting Rails' : 'استلام شحنة: قضبان التثبيت', time: '2 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <span className="text-sm text-gray-900 dark:text-gray-100">{activity.action}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Warehouse Tab */}
        {activeTab === 'warehouse' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Warehouse Management' : 'إدارة المستودع'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Warehouse A',
                  sections: ['A-1', 'A-2', 'A-3'],
                  utilization: 85,
                  totalItems: 125,
                  color: 'emerald'
                },
                {
                  name: 'Warehouse B', 
                  sections: ['B-1', 'B-2'],
                  utilization: 60,
                  totalItems: 45,
                  color: 'blue'
                },
                {
                  name: 'Warehouse C',
                  sections: ['C-1'],
                  utilization: 40,
                  totalItems: 13,
                  color: 'purple'
                }
              ].map((warehouse, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{warehouse.name}</h4>
                    <div className={`w-12 h-12 bg-${warehouse.color}-100 dark:bg-${warehouse.color}-900/30 rounded-xl flex items-center justify-center`}>
                      <Warehouse className={`w-6 h-6 text-${warehouse.color}-600`} />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {language === 'en' ? 'Utilization' : 'الاستخدام'}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{warehouse.utilization}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${warehouse.color}-500`}
                          style={{ width: `${warehouse.utilization}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Total Items' : 'إجمالي الأصناف'}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{warehouse.totalItems}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Sections:' : 'الأقسام:'}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {warehouse.sections.map((section, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {section}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VendorInventoryManagement;