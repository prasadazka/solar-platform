import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Zap, DollarSign, Leaf, Battery } from 'lucide-react';
import { useThemeStore } from '../store';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Reports: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();

  const monthlyData = [
    { month: 'Jan', production: 850, consumption: 650, savings: 240 },
    { month: 'Feb', production: 920, consumption: 680, savings: 280 },
    { month: 'Mar', production: 1100, consumption: 720, savings: 420 },
    { month: 'Apr', production: 1250, consumption: 780, savings: 510 },
    { month: 'May', production: 1400, consumption: 850, savings: 650 },
    { month: 'Jun', production: 1500, consumption: 920, savings: 720 }
  ];

  const stats = [
    { icon: Zap, value: '7,020', unit: 'kWh', label: language === 'en' ? 'Generated' : 'منتجة', color: 'yellow' },
    { icon: DollarSign, value: '2,820', unit: 'SAR', label: language === 'en' ? 'Saved' : 'موفرة', color: 'emerald' },
    { icon: Leaf, value: '3.5', unit: 'Tons', label: language === 'en' ? 'CO₂ Reduced' : 'كربون مقلل', color: 'green' },
    { icon: Battery, value: '94', unit: '%', label: language === 'en' ? 'Efficiency' : 'كفاءة', color: 'blue' }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {language === 'en' ? 'Energy Reports' : 'تقارير الطاقة'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Track your solar performance' : 'تتبع أداء الطاقة الشمسية'}
              </p>
            </div>
            
            <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse mt-4 md:mt-0">
              <Download className="w-5 h-5" />
              <span>{language === 'en' ? 'Export PDF' : 'تصدير PDF'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;