import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Calculator, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Building, 
  Leaf, 
  Award,
  ArrowRight,
  Play,
  CheckCircle,
  Sun,
  Battery,
  Home,
  DollarSign,
  Globe,
  Shield,
  Truck,
  HeadphonesIcon
} from 'lucide-react';
import { useThemeStore } from '../store';

const HomePage: React.FC = () => {
  const { language } = useThemeStore();

  const stats = [
    {
      number: '2,847',
      label: language === 'en' ? 'Happy Customers' : 'عميل سعيد',
      icon: Users
    },
    {
      number: '167',
      label: language === 'en' ? 'Certified Partners' : 'شريك معتمد',
      icon: Building
    },
    {
      number: '15MW',
      label: language === 'en' ? 'Energy Generated' : 'طاقة منتجة',
      icon: Zap
    },
    {
      number: '8.5M',
      label: language === 'en' ? 'SAR Savings' : 'ريال توفير',
      icon: TrendingUp
    }
  ];

  const features = [
    {
      icon: Calculator,
      title: language === 'en' ? 'Smart Solar Calculator' : 'حاسبة ذكية للطاقة الشمسية',
      description: language === 'en' 
        ? 'Calculate your solar savings and system requirements instantly with our AI-powered calculator'
        : 'احسب توفيرك من الطاقة الشمسية ومتطلبات النظام فورياً مع حاسبتنا الذكية',
      color: 'emerald'
    },
    {
      icon: DollarSign,
      title: language === 'en' ? 'Flexible 12-30 Month Plans' : 'خطط مرنة من 12-30 شهر',
      description: language === 'en' 
        ? 'Choose from flexible 12 to 30 monthly installment plans with 0% interest, making clean energy affordable for everyone'
        : 'اختر من خطط الأقساط المرنة من 12 إلى 30 شهر بدون فوائد، مما يجعل الطاقة النظيفة ميسورة التكلفة للجميع',
      color: 'blue'
    },
    {
      icon: ShoppingBag,
      title: language === 'en' ? 'Premium Equipment Store' : 'متجر معدات متميز',
      description: language === 'en' 
        ? 'High-quality solar panels, inverters, and batteries from trusted global brands'
        : 'ألواح شمسية وانفرترات وبطاريات عالية الجودة من علامات تجارية عالمية موثوقة',
      color: 'purple'
    },
    {
      icon: Users,
      title: language === 'en' ? 'Certified Installers' : 'مُركبون معتمدون',
      description: language === 'en' 
        ? 'Connect with vetted, certified solar installation professionals in your area'
        : 'تواصل مع محترفي تركيب الطاقة الشمسية المعتمدين والموثوقين في منطقتك',
      color: 'orange'
    },
    {
      icon: Shield,
      title: language === 'en' ? 'SAMA Compliant' : 'متوافق مع ساما',
      description: language === 'en' 
        ? 'Fully compliant with Saudi Arabia Monetary Authority regulations and guidelines'
        : 'متوافق بالكامل مع لوائح وتوجيهات مؤسسة النقد العربي السعودي',
      color: 'green'
    },
    {
      icon: Leaf,
      title: language === 'en' ? 'Environmental Impact' : 'التأثير البيئي',
      description: language === 'en' 
        ? 'Track your carbon footprint reduction and contribute to Saudi Vision 2030'
        : 'تتبع تقليل بصمتك الكربونية وساهم في رؤية السعودية 2030',
      color: 'teal'
    }
  ];

  const testimonials = [
    {
      name: language === 'en' ? 'Ahmed Al-Rashid' : 'أحمد الراشد',
      role: language === 'en' ? 'Homeowner, Riyadh' : 'مالك منزل، الرياض',
      content: language === 'en' 
        ? 'Alpha Power made going solar incredibly easy. The BNPL option allowed us to start saving from day one without any upfront costs.'
        : 'جعلت ألفا باور التحول للطاقة الشمسية أمراً سهلاً للغاية. خيار الدفع المؤجل سمح لنا بالبدء في التوفير من اليوم الأول دون أي تكاليف مقدمة.',
      avatar: '/api/placeholder/64/64'
    },
    {
      name: language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
      role: language === 'en' ? 'Business Owner, Jeddah' : 'صاحبة أعمال، جدة',
      content: language === 'en' 
        ? 'Our commercial solar installation has reduced our electricity costs by 70%. The ROI exceeded our expectations.'
        : 'قلل تركيب الطاقة الشمسية التجاري لدينا من تكاليف الكهرباء بنسبة 70%. تجاوز العائد على الاستثمار توقعاتنا.',
      avatar: '/api/placeholder/64/64'
    },
    {
      name: language === 'en' ? 'Mohammed Hassan' : 'محمد حسن',
      role: language === 'en' ? 'Contractor, Dammam' : 'مقاول، الدمام',
      content: language === 'en' 
        ? 'As a certified installer, Alpha Power provides me with qualified leads and seamless project management tools.'
        : 'كمُركب معتمد، توفر لي ألفا باور عملاء محتملين مؤهلين وأدوات إدارة مشاريع سلسة.',
      avatar: '/api/placeholder/64/64'
    }
  ];

  const benefits = [
    {
      title: language === 'en' ? 'Free Installation Consultation' : 'استشارة تركيب مجانية',
      icon: HeadphonesIcon
    },
    {
      title: language === 'en' ? 'Warranty up to 25 Years' : 'ضمان حتى 25 سنة',
      icon: Shield
    },
    {
      title: language === 'en' ? 'Free Delivery & Setup' : 'توصيل وتركيب مجاني',
      icon: Truck
    },
    {
      title: language === 'en' ? '24/7 Monitoring Support' : 'دعم مراقبة 24/7',
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 pt-20 pb-16">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left rtl:lg:text-right"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Leaf className="w-4 h-4" />
                <span>{language === 'en' ? 'Supporting Saudi Net Zero 2060 Goal' : 'دعم هدف السعودية لصافي الصفر 2060'}</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                <span className="block">
                  {language === 'en' ? 'RABHAN' : 'رابحان'}
                </span>
                <span className="gradient-text">
                  {language === 'en' ? 'Solar Revolution' : 'ثورة الطاقة الشمسية'}
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                {language === 'en' 
                  ? 'Powering Saudi Arabia\'s Net Zero 2060 vision through accessible solar energy. Transform your home or business with clean energy. Get flexible 12 to 30 monthly installment plans with 0% interest.'
                  : 'تعزيز رؤية السعودية لصافي الصفر 2060 من خلال الطاقة الشمسية المتاحة. حوّل منزلك أو عملك بالطاقة النظيفة. احصل على خطط دفع مرنة من 12 إلى 30 شهر بدون فوائد.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/calculator">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center space-x-2 rtl:space-x-reverse group"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>{language === 'en' ? 'Calculate My Savings' : 'احسب التوفير'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <button className="btn-secondary flex items-center justify-center space-x-2 rtl:space-x-reverse group">
                  <Play className="w-5 h-5" />
                  <span>{language === 'en' ? 'Watch Demo' : 'شاهد العرض'}</span>
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-300"
                    >
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>{benefit.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Visual */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Sun className="w-6 h-6 text-yellow-500" />
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {language === 'en' ? 'Solar System' : 'النظام الشمسي'}
                        </span>
                      </div>
                      <span className="text-green-600 dark:text-green-400 font-bold">
                        {language === 'en' ? 'Active' : 'نشط'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">8.5kW</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {language === 'en' ? 'System Size' : 'حجم النظام'}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2,450</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {language === 'en' ? 'SAR/Month' : 'ريال/شهر'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        {language === 'en' ? 'Monthly Savings:' : 'التوفير الشهري:'}
                      </span>
                      <span className="font-bold text-green-600 dark:text-green-400">1,850 SAR</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Battery className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Why Choose RABHAN?' : 'لماذا تختار رابحان؟'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'We make solar energy accessible, affordable, and hassle-free for every Saudi home and business, contributing to the Kingdom\'s Net Zero 2060 commitment.'
                : 'نجعل الطاقة الشمسية متاحة وبأسعار معقولة وبدون متاعب لكل منزل وعمل سعودي، مساهمين في التزام المملكة بصافي الصفر 2060.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className={`w-16 h-16 mb-6 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Saudi Net Zero Mission Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'Saudi Net Zero 2060' : 'صافي الصفر السعودي 2060'}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {language === 'en' ? 'Contributing to Saudi Arabia\'s Climate Vision' : 'المساهمة في رؤية السعودية المناخية'}
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12">
              {language === 'en' 
                ? 'RABHAN is proud to support the Kingdom\'s ambitious commitment to achieve net zero greenhouse gas emissions by 2060, as announced by Crown Prince Mohammed bin Salman through the Saudi Green Initiative.'
                : 'تفخر رابحان بدعم التزام المملكة الطموح لتحقيق صافي انبعاثات غازات الدفيئة صفر بحلول 2060، كما أعلن ولي العهد الأمير محمد بن سلمان من خلال المبادرة الخضراء السعودية.'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: TrendingUp,
                title: language === 'en' ? '50% Renewable by 2030' : '50% طاقة متجددة بحلول 2030',
                description: language === 'en' ? 'Saudi Arabia aims to generate 50% of electricity from renewable sources by 2030' : 'تهدف السعودية لتوليد 50% من الكهرباء من مصادر متجددة بحلول 2030',
                color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              },
              {
                icon: Leaf,
                title: language === 'en' ? 'Net Zero by 2060' : 'صافي الصفر بحلول 2060',
                description: language === 'en' ? 'Achieve net zero greenhouse gas emissions through the Circular Carbon Economy approach' : 'تحقيق صافي انبعاثات غازات الدفيئة صفر من خلال نهج الاقتصاد الكربوني الدائري',
                color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              },
              {
                icon: DollarSign,
                title: language === 'en' ? '$187B Investment' : '187 مليار دولار استثمار',
                description: language === 'en' ? 'Saudi Arabia plans to invest $187 billion in renewable energy projects and green initiatives' : 'تخطط السعودية لاستثمار 187 مليار دولار في مشاريع الطاقة المتجددة والمبادرات الخضراء',
                color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              },
              {
                icon: Globe,
                title: language === 'en' ? '278M Tons CO2 Reduction' : 'تقليل 278 مليون طن CO2',
                description: language === 'en' ? 'Target to reduce carbon dioxide equivalent emissions by 278 million tons annually by 2030' : 'هدف تقليل انبعاثات ثاني أكسيد الكربون المكافئة بـ 278 مليون طن سنوياً بحلول 2030',
                color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-16 h-16 ${item.color.split(' ')[0]} ${item.color.split(' ')[1]} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className={`w-8 h-8 ${item.color.split(' ')[2]} ${item.color.split(' ')[3]}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'How RABHAN Contributes' : 'كيف تساهم رابحان'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {language === 'en' 
                  ? 'Every solar installation through RABHAN directly supports Saudi Arabia\'s renewable energy targets. By making solar energy accessible through our BNPL platform, we\'re accelerating the Kingdom\'s transition to clean energy and helping achieve the ambitious Net Zero 2060 goal.'
                  : 'كل تركيب للطاقة الشمسية من خلال رابحان يدعم مباشرة أهداف السعودية للطاقة المتجددة. من خلال جعل الطاقة الشمسية متاحة عبر منصة الدفع المؤجل، نحن نسرع انتقال المملكة إلى الطاقة النظيفة ونساعد في تحقيق هدف صافي الصفر الطموح 2060.'
                }
              </p>
              <a 
                href="https://www.sgi.gov.sa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 rtl:space-x-reverse text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
              >
                <span>{language === 'en' ? 'Learn more about Saudi Green Initiative' : 'تعرف على المزيد حول المبادرة الخضراء السعودية'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'How It Works' : 'كيف يعمل'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Get solar energy in 4 simple steps'
                : 'احصل على الطاقة الشمسية في 4 خطوات بسيطة'
              }
            </p>
          </motion.div>

          {/* Steps Container */}
          <div className="relative">
            {/* Connecting Line - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute top-20 left-1/2 w-3/4 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                {
                  step: '01',
                  title: language === 'en' ? 'Calculate' : 'احسب',
                  description: language === 'en' ? 'Use our smart calculator to estimate your savings' : 'استخدم حاسبتنا الذكية لتقدير توفيرك',
                  icon: Calculator
                },
                {
                  step: '02', 
                  title: language === 'en' ? 'Choose' : 'اختر',
                  description: language === 'en' ? 'Select equipment and payment plan that suits you' : 'اختر المعدات وخطة الدفع التي تناسبك',
                  icon: ShoppingBag
                },
                {
                  step: '03',
                  title: language === 'en' ? 'Install' : 'ركّب',
                  description: language === 'en' ? 'Our certified partners handle the installation' : 'شركاؤنا المعتمدون يتولون التركيب',
                  icon: Home
                },
                {
                  step: '04',
                  title: language === 'en' ? 'Save' : 'وفّر',
                  description: language === 'en' ? 'Start saving on your electricity bills immediately' : 'ابدأ التوفير في فواتير الكهرباء فوراً',
                  icon: TrendingUp
                }
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col items-center text-center relative z-10"
                  >
                    {/* Step Circle Container */}
                    <div className="relative mb-6">
                      {/* Main Circle */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      
                      {/* Step Number Badge */}
                      <div className={`absolute -top-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-lg ${
                        language === 'ar' ? '-left-2' : '-right-2'
                      }`}>
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="max-w-xs">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        {step.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'What Our Customers Say' : 'ماذا يقول عملاؤنا'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'Real stories from satisfied customers across Saudi Arabia'
                : 'قصص حقيقية من عملاء راضين في جميع أنحاء المملكة العربية السعودية'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">"</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Official RABHAN Platform Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'Official RABHAN Platform' : 'منصة رابحان الرسمية'}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {language === 'en' ? 'Experience the Official RABHAN Platform' : 'اكتشف منصة رابحان الرسمية'}
            </h2>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'RABHAN is a Saudi-based FinTech company dedicated to making clean energy more accessible with seamless financing solutions and flexible 12 to 30 monthly installment plans.'
                : 'رابحان هي شركة تقنية مالية سعودية مختصة في جعل الطاقة النظيفة أكثر إتاحة مع حلول التمويل السلسة وخطط الأقساط المرنة من 12 إلى 30 شهر.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: language === 'en' ? 'Flexible Payment Plans' : 'خطط دفع مرنة',
                  description: language === 'en' ? '12 to 30 monthly installments' : 'أقساط شهرية من 12 إلى 30',
                  icon: DollarSign
                },
                {
                  title: language === 'en' ? 'Transparent Pricing' : 'أسعار شفافة',
                  description: language === 'en' ? 'No hidden fees or charges' : 'بدون رسوم أو تكاليف مخفية',
                  icon: Shield
                },
                {
                  title: language === 'en' ? 'Expert Support' : 'دعم متخصص',
                  description: language === 'en' ? 'Pre-vetted professionals' : 'متخصصون معتمدون مسبقاً',
                  icon: Users
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  >
                    <Icon className="w-8 h-8 text-white mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-emerald-100 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.a
              href="https://rabhan.sa/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform"
            >
              <Globe className="w-6 h-6" />
              <span>{language === 'en' ? 'Visit Official RABHAN Website' : 'زيارة موقع رابحان الرسمي'}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === 'en' ? 'Ready to Join Saudi\'s Green Future?' : 'جاهز للانضمام لمستقبل السعودية الأخضر؟'}
            </h2>
            
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Join thousands of satisfied customers who are already saving money while contributing to Saudi Arabia\'s Net Zero 2060 vision through RABHAN.'
                : 'انضم إلى آلاف العملاء الراضين الذين يوفرون المال بالفعل بينما يساهمون في رؤية السعودية صافي الصفر 2060 من خلال رابحان.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Calculator className="w-6 h-6" />
                  <span>{language === 'en' ? 'Get Started Now' : 'ابدأ الآن'}</span>
                </motion.button>
              </Link>
              
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>{language === 'en' ? 'Browse Products' : 'تصفح المنتجات'}</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
