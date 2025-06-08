import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Building, 
  ArrowRight, 
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Home,
  Briefcase,
  Star
} from 'lucide-react';
import { useThemeStore } from '../store';
import { useRegistrationStore } from '../store/registration';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const { setRegistrationType } = useRegistrationStore();
  const [selectedType, setSelectedType] = useState<'user' | 'vendor' | null>(null);

  const accountTypes = [
    {
      type: 'user' as const,
      icon: Home,
      title: language === 'en' ? 'Homeowner / Business' : 'مالك منزل / شركة',
      subtitle: language === 'en' ? 'Get solar energy for your property' : 'احصل على الطاقة الشمسية لعقارك',
      features: [
        language === 'en' ? 'Smart solar calculator' : 'حاسبة ذكية للطاقة الشمسية',
        language === 'en' ? 'BNPL financing (0% interest)' : 'تمويل مؤجل (بدون فوائد)',
        language === 'en' ? 'Certified installer network' : 'شبكة مُركبين معتمدين',
        language === 'en' ? 'Real-time monitoring' : 'مراقبة في الوقت الفعلي',
        language === 'en' ? '25-year warranty' : 'ضمان 25 سنة'
      ],
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      type: 'vendor' as const,
      icon: Briefcase,
      title: language === 'en' ? 'Solar Contractor' : 'مقاول طاقة شمسية',
      subtitle: language === 'en' ? 'Join our certified installer network' : 'انضم إلى شبكة المُركبين المعتمدين',
      features: [
        language === 'en' ? 'Qualified customer leads' : 'عملاء محتملين مؤهلين',
        language === 'en' ? 'Project management tools' : 'أدوات إدارة المشاريع',
        language === 'en' ? 'Automated payments' : 'مدفوعات آلية',
        language === 'en' ? 'Marketing support' : 'دعم تسويقي',
        language === 'en' ? 'Business analytics' : 'تحليلات الأعمال'
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600'
    }
  ];

  const handleGetStarted = (type: 'user' | 'vendor') => {
    setSelectedType(type);
    setRegistrationType(type);
    // Navigate to registration flow
    navigate(`/register/${type}`);
  };

  const processSteps = [
    {
      icon: User,
      title: language === 'en' ? 'Sign Up' : 'التسجيل',
      description: language === 'en' ? 'Create your account' : 'إنشاء حسابك'
    },
    {
      icon: CheckCircle,
      title: language === 'en' ? 'Verification' : 'التحقق',
      description: language === 'en' ? 'Verify your identity' : 'تحقق من هويتك'
    },
    {
      icon: Star,
      title: language === 'en' ? 'Get Started' : 'ابدأ',
      description: language === 'en' ? 'Access your dashboard' : 'الوصول للوحة التحكم'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link to="/" className="inline-flex items-center space-x-2 rtl:space-x-reverse mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">RABHAN</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Join RABHAN' : 'انضم إلى رابحان'}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Choose your account type to get started with solar energy solutions'
              : 'اختر نوع حسابك للبدء في حلول الطاقة الشمسية'
            }
          </p>
        </motion.div>

        {/* Account Type Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {accountTypes.map((accountType, index) => {
            const Icon = accountType.icon;
            const isSelected = selectedType === accountType.type;
            
            return (
              <motion.div
                key={accountType.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer group hover:shadow-2xl transform hover:scale-105 ${
                  isSelected
                    ? `border-${accountType.color}-500 bg-${accountType.color}-50 dark:bg-${accountType.color}-900/20`
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-300 dark:hover:border-emerald-400'
                }`}
                onClick={() => setSelectedType(accountType.type)}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${accountType.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {accountType.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {accountType.subtitle}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {accountType.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`w-2 h-2 rounded-full bg-${accountType.color}-500`} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetStarted(accountType.type);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse group ${
                    isSelected
                      ? `bg-gradient-to-r ${accountType.gradient} text-white shadow-lg hover:shadow-xl`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>
                    {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
                  </span>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                    isSelected ? 'group-hover:translate-x-1 rtl:group-hover:-translate-x-1' : ''
                  }`} />
                </motion.button>

                {/* Popular Badge */}
                {accountType.type === 'user' && (
                  <div className="absolute -top-4 left-8">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      {language === 'en' ? 'MOST POPULAR' : 'الأكثر شيوعاً'}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Simple 3-Step Process' : 'عملية بسيطة من 3 خطوات'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Get started with RABHAN in just a few minutes'
                : 'ابدأ مع رابحان في دقائق معدودة'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform translate-x-4"></div>
                  )}
                  
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Already have account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}
            {' '}
            <Link to="/" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
              {language === 'en' ? 'Sign in here' : 'سجل دخولك هنا'}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
