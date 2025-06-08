import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Phone, User, Shield } from 'lucide-react';
import { useThemeStore } from '../store';

interface UserRegistrationStepsProps {
  currentStep: number;
}

const UserRegistrationSteps: React.FC<UserRegistrationStepsProps> = ({ currentStep }) => {
  const { language } = useThemeStore();
  
  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    nationalId: '',
    city: '',
    address: '',
    propertyType: '',
    verificationCode: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Password strength calculation
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return language === 'en' ? 'Very Weak' : 'ضعيف جداً';
    if (passwordStrength <= 2) return language === 'en' ? 'Weak' : 'ضعيف';
    if (passwordStrength <= 3) return language === 'en' ? 'Medium' : 'متوسط';
    if (passwordStrength <= 4) return language === 'en' ? 'Strong' : 'قوي';
    return language === 'en' ? 'Very Strong' : 'قوي جداً';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Account Creation' : 'إنشاء الحساب'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'First Name' : 'الاسم الأول'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? 'Enter your first name' : 'أدخل اسمك الأول'}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Last Name' : 'اسم العائلة'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? 'Enter your last name' : 'أدخل اسم عائلتك'}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Phone Number' : 'رقم الهاتف'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? '+966 50 123 4567' : '+966 50 123 4567'}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Create Password' : 'إنشاء كلمة المرور'}
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Password' : 'كلمة المرور'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-field pl-10 pr-10 rtl:pr-10 rtl:pl-10"
                    placeholder={language === 'en' ? 'Create a strong password' : 'أنشئ كلمة مرور قوية'}
                    required
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {language === 'en' ? 'Password Strength:' : 'قوة كلمة المرور:'}
                      </span>
                      <span className={`text-xs font-medium ${
                        passwordStrength <= 2 ? 'text-red-600' : 
                        passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="input-field pl-10 pr-10 rtl:pr-10 rtl:pl-10"
                    placeholder={language === 'en' ? 'Confirm your password' : 'أكد كلمة المرور'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2">
                    {formData.password === formData.confirmPassword ? (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <Shield className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        <span className="text-xs">
                          {language === 'en' ? 'Passwords match' : 'كلمتا المرور متطابقتان'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600 dark:text-red-400">
                        <Shield className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                        <span className="text-xs">
                          {language === 'en' ? 'Passwords do not match' : 'كلمتا المرور غير متطابقتين'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                {language === 'en' ? 'Password Requirements:' : 'متطلبات كلمة المرور:'}
              </h5>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}`}>
                  <span className="mr-2 rtl:mr-0 rtl:ml-2">{formData.password.length >= 8 ? '✓' : '•'}</span>
                  {language === 'en' ? 'At least 8 characters' : 'على الأقل 8 أحرف'}
                </li>
                <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : ''}`}>
                  <span className="mr-2 rtl:mr-0 rtl:ml-2">{/[a-z]/.test(formData.password) ? '✓' : '•'}</span>
                  {language === 'en' ? 'One lowercase letter' : 'حرف صغير واحد'}
                </li>
                <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : ''}`}>
                  <span className="mr-2 rtl:mr-0 rtl:ml-2">{/[A-Z]/.test(formData.password) ? '✓' : '•'}</span>
                  {language === 'en' ? 'One uppercase letter' : 'حرف كبير واحد'}
                </li>
                <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : ''}`}>
                  <span className="mr-2 rtl:mr-0 rtl:ml-2">{/[0-9]/.test(formData.password) ? '✓' : '•'}</span>
                  {language === 'en' ? 'One number' : 'رقم واحد'}
                </li>
                <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : ''}`}>
                  <span className="mr-2 rtl:mr-0 rtl:ml-2">{/[^A-Za-z0-9]/.test(formData.password) ? '✓' : '•'}</span>
                  {language === 'en' ? 'One special character' : 'رمز خاص واحد'}
                </li>
              </ul>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Personal Details' : 'التفاصيل الشخصية'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'National ID' : 'رقم الهوية'} *
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'Enter your national ID' : 'أدخل رقم هويتك'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'City' : 'المدينة'} *
                </label>
                <select 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">{language === 'en' ? 'Select city' : 'اختر المدينة'}</option>
                  <option value="riyadh">{language === 'en' ? 'Riyadh' : 'الرياض'}</option>
                  <option value="jeddah">{language === 'en' ? 'Jeddah' : 'جدة'}</option>
                  <option value="mecca">{language === 'en' ? 'Mecca' : 'مكة'}</option>
                  <option value="medina">{language === 'en' ? 'Medina' : 'المدينة'}</option>
                  <option value="dammam">{language === 'en' ? 'Dammam' : 'الدمام'}</option>
                  <option value="khobar">{language === 'en' ? 'Khobar' : 'الخبر'}</option>
                  <option value="tabuk">{language === 'en' ? 'Tabuk' : 'تبوك'}</option>
                  <option value="abha">{language === 'en' ? 'Abha' : 'أبها'}</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Full Address' : 'العنوان الكامل'} *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input-field min-h-[100px]"
                placeholder={language === 'en' ? 'Enter your full address' : 'أدخل عنوانك كاملاً'}
                required
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Property Preferences' : 'تفضيلات العقار'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                {language === 'en' ? 'Property Type' : 'نوع العقار'} *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'residential', label: language === 'en' ? 'Residential' : 'سكني', icon: '🏠' },
                  { value: 'commercial', label: language === 'en' ? 'Commercial' : 'تجاري', icon: '🏢' },
                  { value: 'industrial', label: language === 'en' ? 'Industrial' : 'صناعي', icon: '🏭' }
                ].map((type) => (
                  <label 
                    key={type.value} 
                    className={`relative flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.propertyType === type.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-400'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="propertyType" 
                      value={type.value} 
                      checked={formData.propertyType === type.value}
                      onChange={handleInputChange}
                      className="sr-only" 
                    />
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <div className={`font-medium text-center ${
                      formData.propertyType === type.value
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {type.label}
                    </div>
                    {formData.propertyType === type.value && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Property Size (m²)' : 'مساحة العقار (م²)'}
                </label>
                <select className="input-field">
                  <option value="">{language === 'en' ? 'Select size range' : 'اختر نطاق المساحة'}</option>
                  <option value="0-100">{language === 'en' ? 'Less than 100 m²' : 'أقل من 100 م²'}</option>
                  <option value="100-200">{language === 'en' ? '100-200 m²' : '100-200 م²'}</option>
                  <option value="200-500">{language === 'en' ? '200-500 m²' : '200-500 م²'}</option>
                  <option value="500+">{language === 'en' ? 'More than 500 m²' : 'أكثر من 500 م²'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Monthly Electricity Bill (SAR)' : 'فاتورة الكهرباء الشهرية (ريال)'}
                </label>
                <select className="input-field">
                  <option value="">{language === 'en' ? 'Select range' : 'اختر النطاق'}</option>
                  <option value="0-200">{language === 'en' ? 'Less than 200 SAR' : 'أقل من 200 ريال'}</option>
                  <option value="200-500">{language === 'en' ? '200-500 SAR' : '200-500 ريال'}</option>
                  <option value="500-1000">{language === 'en' ? '500-1000 SAR' : '500-1000 ريال'}</option>
                  <option value="1000+">{language === 'en' ? 'More than 1000 SAR' : 'أكثر من 1000 ريال'}</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                {language === 'en' ? 'Why do we need this information?' : 'لماذا نحتاج هذه المعلومات؟'}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {language === 'en' 
                  ? 'This helps us calculate the optimal solar system size and provide accurate savings estimates for your property.'
                  : 'تساعدنا هذه المعلومات في حساب الحجم الأمثل لنظام الطاقة الشمسية وتوفير تقديرات دقيقة للوفورات لعقارك.'
                }
              </p>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Email Verification' : 'التحقق من البريد الإلكتروني'}
            </h3>
            
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'Check Your Email' : 'تحقق من بريدك الإلكتروني'}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                {language === 'en' 
                  ? `We've sent a 6-digit verification code to ${formData.email || 'your email address'}`
                  : `لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى ${formData.email || 'بريدك الإلكتروني'}`
                }
              </p>
              
              <div className="max-w-xs mx-auto">
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  className="input-field text-center text-lg tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  pattern="[0-9]{6}"
                />
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' ? "Didn't receive the code?" : 'لم تستلم الرمز؟'}
                </p>
                <button 
                  type="button"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm font-medium"
                >
                  {language === 'en' ? 'Resend Code' : 'إعادة إرسال الرمز'}
                </button>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Documents Upload' : 'رفع المستندات'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                <div className="text-4xl mb-4">📄</div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'National ID Copy' : 'صورة الهوية الوطنية'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Upload a clear copy of your national ID' : 'ارفع صورة واضحة من هويتك الوطنية'}
                </p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                <div className="text-4xl mb-4">🏠</div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'Property Document' : 'وثيقة العقار'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Upload property ownership document' : 'ارفع وثيقة ملكية العقار'}
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Step {currentStep}</div>;
    }
  };

  return <div>{renderStep()}</div>;
};

export default UserRegistrationSteps;
