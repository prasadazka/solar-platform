import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import rabhanLogo from '../assets/rabhan_logo.svg';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Calculator, 
  ShoppingBag, 
  LogOut, 
  User,
  Globe,
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  Building,
  Shield
} from 'lucide-react';
import { useThemeStore, useAuthStore, useCartStore } from '../store';
import { LoginCredentials } from '../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'user'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { isDarkMode, language, toggleDarkMode, setLanguage } = useThemeStore();
  const { isAuthenticated, user, logout, login, isLoading, error } = useAuthStore();
  const { getItemCount } = useCartStore();
  const location = useLocation();
  const navigate = useNavigate();

  const cartItemCount = getItemCount();

  // Cleanup body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const roleOptions = [
    { 
      value: 'user', 
      label: language === 'en' ? 'End User' : 'المستخدم النهائي', 
      icon: User,
      description: language === 'en' ? 'Homeowner or Business' : 'مالك منزل أو شركة'
    },
    { 
      value: 'vendor', 
      label: language === 'en' ? 'Contractor' : 'المقاول', 
      icon: Building,
      description: language === 'en' ? 'Solar Installation Company' : 'شركة تركيب الطاقة الشمسية'
    },
    { 
      value: 'admin', 
      label: language === 'en' ? 'Administrator' : 'المدير', 
      icon: Shield,
      description: language === 'en' ? 'Platform Manager' : 'مدير المنصة'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = language === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Invalid email format' : 'تنسيق البريد الإلكتروني غير صحيح';
    }

    if (!formData.password) {
      newErrors.password = language === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await login(formData);
    
    // Check if login was successful (we need to check after the login call)
    setTimeout(() => {
      if (!error) {
        closeLoginModal();
        navigate('/dashboard');
        setFormData({ email: 'demo@alphapower.sa', password: '123456', role: 'user' });
        setErrors({});
      }
    }, 100);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setFormData({ email: 'demo@alphapower.sa', password: '123456', role: 'user' });
    setErrors({});
    document.body.classList.add('modal-open');
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    document.body.classList.remove('modal-open');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { 
      name: language === 'en' ? 'Calculator' : 'حاسبة الطاقة', 
      path: '/calculator', 
      icon: Calculator 
    },
    { 
      name: language === 'en' ? 'Products' : 'المنتجات', 
      path: '/products', 
      icon: ShoppingBag 
    },
    { 
      name: language === 'en' ? 'Official Site' : 'الموقع الرسمي', 
      path: 'https://rabhan.sa/', 
      icon: Globe,
      external: true
    },
  ];

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <img 
              src={rabhanLogo} 
              alt="Rabhan Logo" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = !item.external && location.pathname === item.path;
              
              if (item.external) {
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Cart Icon */}
            <Link 
              to="/products" 
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.name}
                  </span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-t-xl"
                  >
                    {language === 'en' ? 'Dashboard' : 'لوحة التحكم'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-b-xl flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  to="/signup"
                  className="px-4 py-2 border-2 border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-300 rounded-xl font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 transform hover:scale-105"
                >
                  {language === 'en' ? 'Sign Up' : 'تسجيل جديد'}
                </Link>
                <button
                  onClick={openLoginModal}
                  className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = !item.external && location.pathname === item.path;
                
                if (item.external) {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                  );
                }
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div 
            className="modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLoginModal();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-inner">
                <div className="p-6 sm:p-8">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse flex-1 min-w-0">
                    <img 
                      src={rabhanLogo} 
                      alt="Rabhan Logo" 
                      className="w-24 h-24 sm:w-32 sm:h-32 object-contain flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                        {language === 'en' ? 'Welcome Back' : 'مرحباً بعودتك'}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {language === 'en' ? 'Sign in to your account' : 'سجل دخولك إلى حسابك'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeLoginModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2 rtl:ml-0 rtl:mr-2"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                      {language === 'en' ? 'Login as' : 'تسجيل الدخول كـ'}
                    </label>
                    
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      {roleOptions.map((role) => {
                        const Icon = role.icon;
                        return (
                          <motion.div
                            key={role.value}
                            whileTap={{ scale: 0.98 }}
                          >
                            <label className={`relative flex items-center p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              formData.role === role.value
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400'
                            }`}>
                              <input
                                type="radio"
                                name="role"
                                value={role.value}
                                checked={formData.role === role.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              
                              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mr-3 rtl:mr-0 rtl:ml-3 flex-shrink-0 ${
                                formData.role === role.value
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`} />
                              
                              <div className="min-w-0 flex-1">
                                <div className={`font-medium text-sm sm:text-base ${
                                  formData.role === role.value
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-gray-900 dark:text-gray-100'
                                }`}>
                                  {role.label}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {role.description}
                                </div>
                              </div>
                              
                              {formData.role === role.value && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute right-3 rtl:right-auto rtl:left-3 w-2 h-2 bg-emerald-600 rounded-full"
                                />
                              )}
                            </label>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                    </label>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-field pl-10 rtl:pl-3 rtl:pr-10 text-sm sm:text-base ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </div>
                    
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      {language === 'en' ? 'Password' : 'كلمة المرور'}
                    </label>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`input-field pl-10 pr-10 rtl:pr-10 rtl:pl-10 text-sm sm:text-base ${
                          errors.password ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        placeholder={language === 'en' ? 'Enter your password' : 'أدخل كلمة المرور'}
                      />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                    
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3"
                    >
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:mr-0 rtl:ml-2"></div>
                        {language === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...'}
                      </div>
                    ) : (
                      language === 'en' ? 'Sign In' : 'تسجيل الدخول'
                    )}
                  </motion.button>

                  {/* Demo Credentials Note */}
                  <div className="text-center pt-2">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {language === 'en' ? 'Demo Credentials (Pre-filled):' : 'بيانات تجريبية (مُعبأة مسبقاً):'}
                    </p>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p className="break-all">{language === 'en' ? 'Email: demo@alphapower.sa' : 'البريد: demo@alphapower.sa'}</p>
                      <p>{language === 'en' ? 'Password: 123456' : 'كلمة المرور: 123456'}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
