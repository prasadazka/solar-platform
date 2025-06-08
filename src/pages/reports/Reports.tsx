import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Download,
  TrendingUp,
  Calendar,
  BarChart3,
  Zap,
  DollarSign,
  Leaf,
  Battery,
  Sun,
  FileText,
  Filter,
  Eye
} from 'lucide-react';
import { useThemeStore } from '../../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const Reports: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('energy');

  // Mock energy data
  const energyData = [
    { month: language === 'en' ? 'Jan' : 'يناير', production: 1200, consumption: 900, savings: 300, grid: 150 },
    { month: language === 'en' ? 'Feb' : 'فبراير', production: 1100, consumption: 850, savings: 250, grid: 200 },
    { month: language === 'en' ? 'Mar' : 'مارس', production: 1350, consumption: 920, savings: 430, grid: 120 },
    { month: language === 'en' ? 'Apr' : 'أبريل', production: 1450, consumption: 980, savings: 470, grid: 100 },
    { month: language === 'en' ? 'May' : 'مايو', production: 1600, consumption: 1050, savings: 550, grid: 80 },
    { month: language === 'en' ? 'Jun' : 'يونيو', production: 1800, consumption: 1200, savings: 600, grid: 50 }
  ];

  const financialData = [
    { month: language === 'en' ? 'Jan' : 'يناير', billSavings: 450, systemPayment: 2400, netSavings: -1950 },
    { month: language === 'en' ? 'Feb' : 'فبراير', billSavings: 375, systemPayment: 2400, netSavings: -2025 },
    { month: language === 'en' ? 'Mar' : 'مارس', billSavings: 645, systemPayment: 2400, netSavings: -1755 },
    { month: language === 'en' ? 'Apr' : 'أبريل', billSavings: 705, systemPayment: 2400, netSavings: -1695 },
    { month: language === 'en' ? 'May' : 'مايو', billSavings: 825, systemPayment: 2400, netSavings: -1575 },
    { month: language === 'en' ? 'Jun' : 'يونيو', billSavings: 900, systemPayment: 2400, netSavings: -1500 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">
                {language === 'en' ? 'Back' : 'العودة'}
              </span>
            </button>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>{language === 'en' ? 'Export' : 'تصدير'}</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {language === 'en' ? 'System Reports' : 'تقارير النظام'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Detailed analysis of your solar system performance and savings'
              : 'تحليل مفصل لأداء نظام الطاقة الشمسية والتوفير'
            }
          </p>
        </motion.div>

        {/* Report Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:ring-1 dark:ring-gray-700 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Report Type' : 'نوع التقرير'}
              </label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="energy">{language === 'en' ? 'Energy Performance' : 'أداء الطاقة'}</option>
                <option value="financial">{language === 'en' ? 'Financial Analysis' : 'التحليل المالي'}</option>
                <option value="environmental">{language === 'en' ? 'Environmental Impact' : 'التأثير البيئي'}</option>
              </select>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Time Period' : 'الفترة الزمنية'}
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="monthly">{language === 'en' ? 'Monthly' : 'شهري'}</option>
                <option value="quarterly">{language === 'en' ? 'Quarterly' : 'ربع سنوي'}</option>
                <option value="yearly">{language === 'en' ? 'Yearly' : 'سنوي'}</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Date Range' : 'النطاق الزمني'}
              </label>
              <input
                type="month"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Energy Production Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:ring-1 dark:ring-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Energy Production' : 'إنتاج الطاقة'}
              </h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-emerald-600 dark:text-emerald-400">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {language === 'en' ? '8.2 kWh/day avg' : '8.2 ك.وات/ساعة متوسط يومي'}
                </span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="production" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="consumption" 
                  stackId="2"
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Financial Savings Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:ring-1 dark:ring-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Financial Savings' : 'التوفير المالي'}
              </h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-green-600 dark:text-green-400">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {language === 'en' ? '3,750 SAR saved' : '3,750 ريال تم توفيره'}
                </span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="billSavings" fill="#10b981" />
                <Bar dataKey="netSavings" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: language === 'en' ? 'Total Production' : 'الإنتاج الإجمالي',
              value: '8,500 kWh',
              change: '+12%',
              icon: Sun,
              color: 'text-yellow-600 dark:text-yellow-400'
            },
            {
              title: language === 'en' ? 'Energy Savings' : 'توفير الطاقة',
              value: '3,128 kWh',
              change: '+8%',
              icon: Battery,
              color: 'text-green-600 dark:text-green-400'
            },
            {
              title: language === 'en' ? 'Cost Savings' : 'توفير التكلفة',
              value: '3,750 SAR',
              change: '+15%',
              icon: DollarSign,
              color: 'text-emerald-600 dark:text-emerald-400'
            },
            {
              title: language === 'en' ? 'CO₂ Reduced' : 'تقليل ثاني أكسيد الكربون',
              value: '2.8 tons',
              change: '+10%',
              icon: Leaf,
              color: 'text-teal-600 dark:text-teal-400'
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:ring-1 dark:ring-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${card.color}`} />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {card.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {card.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;
