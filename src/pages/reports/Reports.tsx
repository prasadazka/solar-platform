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