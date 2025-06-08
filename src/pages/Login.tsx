import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Zap, 
  User, 
  Building, 
  Shield,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { useAuthStore, useThemeStore } from '../store';
import { LoginCredentials } from '../types';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login, isLoading, error } = useAuthStore();
  const { language, isDarkMode, setLanguage, toggleDarkMode } = useThemeStore();

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
    
    // Clear error when user starts typing
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
    } else if (formData.password.length < 6) {
      newErrors.password = language === 'en' ? 'Password must be at least 6 characters' : 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
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
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 flex items-center justify-center p-4 relative">
      {/* Language and Theme Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 rtl:space-x-reverse">
        <button
          onClick={toggleLanguage}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm"
          aria-label="Toggle language"
        >
          <Globe className="w-5 h-5" />
        </button>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl dark:shadow-emerald-500/25"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {language === 'en' ? 'RABHAN' : 'رابحان'}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Saudi Solar Energy Platform'
              : 'منصة الطاقة الشمسية السعودية'
            }
          </p>
        </div>

        {/* Login Form */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                {language === 'en' ? 'Login as' : 'تسجيل الدخول كـ'}
              </label>
              
              <div className="grid grid-cols-1 gap-3">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  return (
                    <motion.div
                      key={role.value}
                      whileTap={{ scale: 0.98 }}
                    >
                      <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
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
                        
                        <Icon className={`w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 ${
                          formData.role === role.value
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-gray-400 dark:text-gray-500'
                        }`} />
                        
                        <div>
                          <div className={`font-medium ${
                            formData.role === role.value
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {role.label}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
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
                  className={`input-field pl-10 rtl:pl-3 rtl:pr-10 ${
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
                  className={`input-field pl-10 pr-10 rtl:pr-10 rtl:pl-10 ${
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

            {/* Demo Credentials */}
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {language === 'en' ? 'Demo Credentials:' : 'بيانات تجريبية:'}
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                <p>{language === 'en' ? 'Email: demo@alphapower.sa' : 'البريد: demo@alphapower.sa'}</p>
                <p>{language === 'en' ? 'Password: 123456' : 'كلمة المرور: 123456'}</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? "Don't have an account? " 
              : 'ليس لديك حساب؟ '
            }
            <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              {language === 'en' ? 'Contact us' : 'تواصل معنا'}
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
