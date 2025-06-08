import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calculator,
  DollarSign,
  Clock,
  Shield,
  CreditCard,
  CheckCircle,
  FileText,
  Percent
} from 'lucide-react';
import { useThemeStore } from '../../store';

const BNPLFinancing: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState(85000);

  // BNPL Plans
  const bnplPlans = [
    {
      id: 1,
      duration: 18,
      monthlyPayment: Math.round(loanAmount / 18),
      totalAmount: loanAmount,
      features: [
        language === 'en' ? 'No Interest - 0% APR' : 'بدون فوائد - 0% معدل سنوي',
        language === 'en' ? 'Quick 18-month plan' : 'خطة سريعة 18 شهر',
        language === 'en' ? 'Early payment benefits' : 'مزايا الدفع المبكر',
        language === 'en' ? 'No hidden fees' : 'بدون رسوم خفية'
      ],
      popular: false
    },
    {
      id: 2,
      duration: 24,
      monthlyPayment: Math.round(loanAmount / 24),
      totalAmount: loanAmount,
      features: [
        language === 'en' ? 'No Interest - 0% APR' : 'بدون فوائد - 0% معدل سنوي',
        language === 'en' ? 'Balanced payment plan' : 'خطة دفع متوازنة'
      ],
      popular: true
    }
  ];
  // Benefits of BNPL
  const benefits = [
    {
      icon: Percent,
      title: language === 'en' ? '0% Interest Rate' : 'معدل فائدة 0%',
      description: language === 'en' ? 'Pay only the system cost with no additional interest charges' : 'ادفع تكلفة النظام فقط بدون رسوم فوائد إضافية'
    },
    {
      icon: Clock,
      title: language === 'en' ? 'Quick Approval' : 'موافقة سريعة',
      description: language === 'en' ? 'Get approved in minutes with our digital assessment' : 'احصل على الموافقة في دقائق مع التقييم الرقمي'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'SAMA Regulated' : 'منظم من مؤسسة النقد',
      description: language === 'en' ? 'Fully compliant with Saudi Central Bank regulations' : 'متوافق تماماً مع لوائح البنك المركزي السعودي'
    },
    {
      icon: CreditCard,
      title: language === 'en' ? 'Easy Payments' : 'دفعات سهلة',
      description: language === 'en' ? 'Automated monthly deductions from your bank account' : 'استقطاعات شهرية آلية من حسابك البنكي'
    }
  ];

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
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

          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <DollarSign className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {language === 'en' ? 'BNPL Solar Financing' : 'تمويل الطاقة الشمسية المؤجل'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Transform your home with solar energy today and pay in convenient installments with 0% interest'
                : 'حوّل منزلك بالطاقة الشمسية اليوم وادفع بأقساط مريحة بدون فوائد'
              }
            </p>
          </div>
        </motion.div>
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            {language === 'en' ? 'Why Choose Our BNPL?' : 'لماذا تختار التمويل المؤجل؟'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="card p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Loan Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Calculate Your Payments' : 'احسب دفعاتك'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'Adjust your system cost to see payment options' : 'اضبط تكلفة النظام لرؤية خيارات الدفع'}
            </p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'en' ? 'System Cost (SAR)' : 'تكلفة النظام (ريال)'}
            </label>
            <div className="relative">
              <input
                type="range"
                min="50000"
                max="200000"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>50K</span>
                <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                  {loanAmount.toLocaleString()} SAR
                </span>
                <span>200K</span>
              </div>
            </div>
          </div>
        </motion.div>
        {/* BNPL Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            {language === 'en' ? 'Choose Your Payment Plan' : 'اختر خطة الدفع'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bnplPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + plan.id * 0.1 }}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-emerald-500 shadow-2xl scale-105'
                    : 'hover:shadow-xl hover:scale-102'
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Card with custom styling to prevent overflow clipping */}
                <div className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:ring-1 dark:ring-gray-700 border border-gray-100 dark:border-gray-700 backdrop-blur-sm p-6 ${plan.popular ? 'border-2 border-emerald-500' : ''}`}>
                  
                  {/* Badge positioned inside card at top */}
                  {plan.popular && (
                    <div className="flex justify-center mb-4">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        {language === 'en' ? 'MOST POPULAR' : 'الأكثر شيوعاً'}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {plan.duration} {language === 'en' ? 'Months' : 'شهر'}
                    </h3>
                    <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      {plan.monthlyPayment.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'SAR per month' : 'ريال شهرياً'}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {language === 'en' ? 'Total Amount:' : 'المبلغ الإجمالي:'} {plan.totalAmount.toLocaleString()} SAR
                  </div>

                  {selectedPlan === plan.id && (
                    <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl pointer-events-none" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Application Section */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Ready to Apply?' : 'جاهز للتقديم؟'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'en' 
                ? `You've selected the ${bnplPlans.find(p => p.id === selectedPlan)?.duration}-month plan with payments of ${bnplPlans.find(p => p.id === selectedPlan)?.monthlyPayment.toLocaleString()} SAR per month`
                : `لقد اخترت خطة ${bnplPlans.find(p => p.id === selectedPlan)?.duration} شهر بدفعات ${bnplPlans.find(p => p.id === selectedPlan)?.monthlyPayment.toLocaleString()} ريال شهرياً`
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/financing/application')}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <FileText className="w-5 h-5" />
                <span>{language === 'en' ? 'Apply Now' : 'تقدم الآن'}</span>
              </button>
              
              <button 
                onClick={() => navigate('/calculator')}
                className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Calculator className="w-5 h-5" />
                <span>{language === 'en' ? 'Calculate Savings' : 'احسب الوفورات'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Eligibility Requirements */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-emerald-500 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === 'en' ? 'Eligibility Requirements' : 'متطلبات الأهلية'}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Saudi resident (Citizen or Iqama holder)' : 'مقيم سعودي (مواطن أو حامل إقامة)'}
                </span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Age between 21-65 years' : 'العمر بين 21-65 سنة'}
                </span>
              </div>              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Minimum monthly income: 8,000 SAR' : 'الحد الأدنى للراتب الشهري: 8,000 ريال'}
                </span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Clean credit history with SIMAH' : 'سجل ائتماني نظيف مع سمة'}
                </span>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-2 rtl:mr-0 rtl:ml-2" />
              {language === 'en' ? 'Required Documents' : 'المستندات المطلوبة'}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'National ID or Iqama (both sides)' : 'الهوية الوطنية أو الإقامة (الوجهان)'}
                </span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Salary certificate or employment letter' : 'شهادة راتب أو خطاب عمل'}
                </span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Bank statements (last 3 months)' : 'كشف حساب بنكي (آخر 3 أشهر)'}
                </span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Property deed or lease agreement' : 'صك الملكية أو عقد الإيجار'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BNPLFinancing;