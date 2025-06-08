import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  CreditCard, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock,
  Building,
  Award,
  Wrench,
  Zap,
  Plus,
  X,
  Eye,
  EyeOff,
  Phone,
  Globe,
  Calendar,
  User,
  Camera,
  Mail,
  Lock,
  Shield
} from 'lucide-react';
import { useThemeStore } from '../store';

interface VendorRegistrationStepsProps {
  currentStep: number;
}

const VendorRegistrationSteps: React.FC<VendorRegistrationStepsProps> = ({ currentStep }) => {
  const { language } = useThemeStore();
  
  // Form state management
  const [formData, setFormData] = useState({
    // Step 1: Company Information & Account Creation
    companyName: '',
    commercialRegistration: '',
    establishmentDate: '',
    companySize: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Business Details
    vatNumber: '',
    licenseNumber: '',
    sasoCertificate: '',
    energyAuthorityLicense: '',
    
    // Step 3: Location & Services
    serviceAreas: [] as string[],
    capabilities: [] as string[],
    experience: '',
    projectTypes: [] as string[],
    
    // Step 4: Financial Information
    bankName: '',
    iban: '',
    accountHolder: '',
    taxCertificate: '',
    
    // Step 5: Documents
    uploadedDocuments: {} as Record<string, File | null>
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

  const handleArrayInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [documentType]: file
      }
    }));
  };

  const saudiCities = [
    'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Tabuk', 
    'Abha', 'Khamis Mushait', 'Najran', 'Jazan', 'Hail', 'Al Jubail',
    'Yanbu', 'Taif', 'Buraidah', 'Hofuf', 'Sakaka', 'Arar', 'Qatif'
  ];

  const serviceCapabilities = [
    { id: 'residential', label: language === 'en' ? 'Residential Solar' : 'الطاقة الشمسية السكنية' },
    { id: 'commercial', label: language === 'en' ? 'Commercial Solar' : 'الطاقة الشمسية التجارية' },
    { id: 'industrial', label: language === 'en' ? 'Industrial Solar' : 'الطاقة الشمسية الصناعية' },
    { id: 'maintenance', label: language === 'en' ? 'Maintenance & Repair' : 'الصيانة والإصلاح' },
    { id: 'consultation', label: language === 'en' ? 'Energy Consultation' : 'استشارات الطاقة' },
    { id: 'monitoring', label: language === 'en' ? 'System Monitoring' : 'مراقبة النظام' }
  ];

  const projectTypes = [
    { id: 'rooftop', label: language === 'en' ? 'Rooftop Installation' : 'تركيب على الأسطح' },
    { id: 'ground', label: language === 'en' ? 'Ground Mount' : 'التركيب الأرضي' },
    { id: 'carport', label: language === 'en' ? 'Carport Solar' : 'مظلات السيارات الشمسية' },
    { id: 'hybrid', label: language === 'en' ? 'Hybrid Systems' : 'الأنظمة المختلطة' },
    { id: 'storage', label: language === 'en' ? 'Battery Storage' : 'تخزين البطاريات' }
  ];

  const requiredDocuments = [
    { id: 'cr', label: language === 'en' ? 'Commercial Registration' : 'السجل التجاري', required: true },
    { id: 'vat', label: language === 'en' ? 'VAT Certificate' : 'شهادة الضريبة المضافة', required: true },
    { id: 'saso', label: language === 'en' ? 'SASO Certificate' : 'شهادة الساسو', required: true },
    { id: 'energy_license', label: language === 'en' ? 'Energy Authority License' : 'ترخيص هيئة الطاقة', required: true },
    { id: 'insurance', label: language === 'en' ? 'Insurance Certificate' : 'شهادة التأمين', required: false },
    { id: 'experience', label: language === 'en' ? 'Experience Certificates' : 'شهادات الخبرة', required: false }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Company Information & Account Creation' : 'معلومات الشركة وإنشاء الحساب'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Company Name' : 'اسم الشركة'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <Building className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? 'Enter company name' : 'أدخل اسم الشركة'}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Commercial Registration' : 'السجل التجاري'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="commercialRegistration"
                    value={formData.commercialRegistration}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? 'Enter CR number' : 'أدخل رقم السجل التجاري'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Contact Email' : 'البريد الإلكتروني'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? 'Enter email address' : 'أدخل البريد الإلكتروني'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Contact Phone' : 'رقم الهاتف'} *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="input-field pl-10 rtl:pl-3 rtl:pr-10"
                    placeholder={language === 'en' ? '+966 50 123 4567' : '+966 50 123 4567'}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'Create Account Password' : 'إنشاء كلمة مرور الحساب'}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {language === 'en' ? 'Business Details' : 'تفاصيل الأعمال'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'VAT Number' : 'الرقم الضريبي'} *
                </label>
                <input
                  type="text"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'Enter VAT number' : 'أدخل الرقم الضريبي'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'License Number' : 'رقم الرخصة'} *
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'Enter license number' : 'أدخل رقم الرخصة'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'SASO Certificate' : 'شهادة الساسو'} *
                </label>
                <input
                  type="text"
                  name="sasoCertificate"
                  value={formData.sasoCertificate}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'Enter SASO certificate number' : 'أدخل رقم شهادة الساسو'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Energy Authority License' : 'ترخيص هيئة الطاقة'} *
                </label>
                <input
                  type="text"
                  name="energyAuthorityLicense"
                  value={formData.energyAuthorityLicense}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'Enter energy authority license' : 'أدخل ترخيص هيئة الطاقة'}
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    {language === 'en' ? 'Required Certifications' : 'الشهادات المطلوبة'}
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {language === 'en' 
                      ? 'All licenses and certificates must be valid and issued by Saudi authorities.'
                      : 'جميع التراخيص والشهادات يجب أن تكون سارية ومصدرة من السلطات السعودية.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Location & Services' : 'الموقع والخدمات'}
            </h3>
            
            {/* Service Areas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                {language === 'en' ? 'Service Areas' : 'مناطق الخدمة'} *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {saudiCities.map((city) => (
                  <label key={city} className="flex items-center space-x-2 rtl:space-x-reverse p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.serviceAreas.includes(city)}
                      onChange={() => handleArrayInputChange('serviceAreas', city)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Service Capabilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                {language === 'en' ? 'Service Capabilities' : 'قدرات الخدمة'} *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceCapabilities.map((capability) => (
                  <label key={capability.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.capabilities.includes(capability.id)}
                      onChange={() => handleArrayInputChange('capabilities', capability.id)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{capability.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                {language === 'en' ? 'Project Types' : 'أنواع المشاريع'} *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectTypes.map((project) => (
                  <label key={project.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.projectTypes.includes(project.id)}
                      onChange={() => handleArrayInputChange('projectTypes', project.id)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{project.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Years of Experience' : 'سنوات الخبرة'} *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="input-field"
                required
              >
                <option value="">{language === 'en' ? 'Select experience' : 'اختر الخبرة'}</option>
                <option value="1-2">{language === 'en' ? '1-2 years' : '1-2 سنة'}</option>
                <option value="3-5">{language === 'en' ? '3-5 years' : '3-5 سنوات'}</option>
                <option value="6-10">{language === 'en' ? '6-10 years' : '6-10 سنوات'}</option>
                <option value="10+">{language === 'en' ? '10+ years' : '10+ سنوات'}</option>
              </select>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {language === 'en' ? 'Financial Information' : 'المعلومات المالية'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Bank Name' : 'اسم البنك'} *
                </label>
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">{language === 'en' ? 'Select bank' : 'اختر البنك'}</option>
                  <option value="sab">Saudi British Bank (SABB)</option>
                  <option value="ncb">National Commercial Bank (NCB)</option>
                  <option value="rajhi">Al Rajhi Bank</option>
                  <option value="riyadh">Riyad Bank</option>
                  <option value="anb">Arab National Bank</option>
                  <option value="samb">Saudi Arabian Monetary Bank</option>
                  <option value="alinma">Alinma Bank</option>
                  <option value="albilad">Bank AlBilad</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'IBAN Number' : 'رقم الآيبان'} *
                </label>
                <input
                  type="text"
                  name="iban"
                  value={formData.iban}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'SA00 0000 0000 0000 0000 0000' : 'SA00 0000 0000 0000 0000 0000'}
                  pattern="SA[0-9]{22}"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Account Holder Name' : 'اسم صاحب الحساب'} *
                </label>
                <input
                  type="text"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'Enter account holder name' : 'أدخل اسم صاحب الحساب'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {language === 'en' ? 'Tax Certificate Number' : 'رقم الشهادة الضريبية'} *
                </label>
                <input
                  type="text"
                  name="taxCertificate"
                  value={formData.taxCertificate}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder={language === 'en' ? 'Enter tax certificate number' : 'أدخل رقم الشهادة الضريبية'}
                  required
                />
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-start">
                <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    {language === 'en' ? 'Payment Information' : 'معلومات الدفع'}
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {language === 'en' 
                      ? 'This IBAN will be used for receiving payments from completed projects. Make sure all details are accurate.'
                      : 'سيتم استخدام هذا الآيبان لاستلام المدفوعات من المشاريع المكتملة. تأكد من دقة جميع التفاصيل.'
                    }
                  </p>
                </div>
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
            
            <div className="space-y-4">
              {requiredDocuments.map((doc) => (
                <div key={doc.id} className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3 rtl:mr-0 rtl:ml-3" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {doc.label}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {language === 'en' ? 'PDF, JPG, PNG - Max 5MB' : 'PDF, JPG, PNG - حد أقصى 5 ميجابايت'}
                        </p>
                      </div>
                    </div>
                    
                    {formData.uploadedDocuments[doc.id] ? (
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400">
                        <CheckCircle className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                        <span className="text-sm font-medium">
                          {language === 'en' ? 'Uploaded' : 'تم الرفع'}
                        </span>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                          className="sr-only"
                        />
                        <div className="flex items-center px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors duration-200">
                          <Upload className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          <span className="text-sm font-medium">
                            {language === 'en' ? 'Upload' : 'رفع'}
                          </span>
                        </div>
                      </label>
                    )}
                  </div>
                  
                  {formData.uploadedDocuments[doc.id] && (
                    <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {formData.uploadedDocuments[doc.id]?.name}
                      </span>
                      <button
                        onClick={() => handleFileUpload(doc.id, null)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    {language === 'en' ? 'Document Requirements' : 'متطلبات المستندات'}
                  </h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• {language === 'en' ? 'All documents must be clear and readable' : 'جميع المستندات يجب أن تكون واضحة ومقروءة'}</li>
                    <li>• {language === 'en' ? 'File size should not exceed 5MB' : 'حجم الملف يجب ألا يتجاوز 5 ميجابايت'}</li>
                    <li>• {language === 'en' ? 'Accepted formats: PDF, JPG, PNG' : 'الصيغ المقبولة: PDF, JPG, PNG'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Clock className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {language === 'en' ? 'Application Submitted!' : 'تم إرسال الطلب!'}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                {language === 'en' 
                  ? 'Your vendor registration application has been submitted successfully. Our team will review your application within 5-7 business days.'
                  : 'تم إرسال طلب تسجيل المقاول بنجاح. سيقوم فريقنا بمراجعة طلبك خلال 5-7 أيام عمل.'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    {language === 'en' ? 'Document Review' : 'مراجعة المستندات'}
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {language === 'en' ? '1-2 business days' : '1-2 يوم عمل'}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    {language === 'en' ? 'Verification' : 'التحقق'}
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {language === 'en' ? '2-3 business days' : '2-3 أيام عمل'}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    {language === 'en' ? 'Activation' : 'التفعيل'}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {language === 'en' ? 'Same day' : 'نفس اليوم'}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {language === 'en' ? 'What happens next?' : 'ما الذي سيحدث بعد ذلك؟'}
                </h4>
                <div className="text-left space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3 mt-0.5">1</span>
                    {language === 'en' 
                      ? 'We will review your documents and verify your credentials'
                      : 'سنقوم بمراجعة مستنداتك والتحقق من بياناتك'
                    }
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3 mt-0.5">2</span>
                    {language === 'en' 
                      ? 'You will receive an email notification about the status'
                      : 'ستتلقى إشعار بالبريد الإلكتروني حول الحالة'
                    }
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3 mt-0.5">3</span>
                    {language === 'en' 
                      ? 'Once approved, you can start receiving project requests'
                      : 'بمجرد الموافقة، يمكنك البدء في استلام طلبات المشاريع'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? `Step ${currentStep}` : `الخطوة ${currentStep}`}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'en' ? 'This step is under development' : 'هذه الخطوة قيد التطوير'}
            </p>
          </div>
        );
    }
  };

  return <div>{renderStep()}</div>;
};

export default VendorRegistrationSteps;
