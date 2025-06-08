import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  FileText,
  Shield,
  Bell,
  Globe,
  Moon,
  Sun,
  Save,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Camera,
  Edit3,
  Lock,
  Download,
  Activity,
  Clock
} from 'lucide-react';
import { useThemeStore, useAuthStore } from '../store';
import Toast from '../components/Toast';

interface UserProfileData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalId: string;
  dateOfBirth: string;
  
  // Address Information
  city: string;
  district: string;
  street: string;
  buildingNumber: string;
  postalCode: string;
  
  // Property Information
  propertyType: 'residential' | 'commercial' | 'industrial';
  propertySize: string;
  roofType: 'flat' | 'pitched' | 'mixed';
  monthlyElectricityBill: number;
  
  // Preferences
  language: 'en' | 'ar';
  notifications: {
    email: boolean;
    sms: boolean;
    marketing: boolean;
  };
  
  // Verification Status
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsUploaded: boolean;
  
  // Profile Photo
  profilePhoto?: File | string;
}

const UserProfile: React.FC = () => {
  const { language, isDarkMode, setLanguage, toggleDarkMode } = useThemeStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'personal' | 'address' | 'property' | 'security' | 'preferences'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{
    isOpen: boolean;
    title: string;
    message?: string;
    type?: 'success' | 'warning' | 'info' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showToast = (title: string, message?: string, type: 'success' | 'warning' | 'info' | 'error' = 'info') => {
    setToast({ isOpen: true, title, message, type });
  };
  
  const [profileData, setProfileData] = useState<UserProfileData>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+966501234567',
    nationalId: '',
    dateOfBirth: '',
    city: 'Jeddah',
    district: '',
    street: '',
    buildingNumber: '',
    postalCode: '',
    propertyType: 'residential',
    propertySize: '200-500',
    roofType: 'flat',
    monthlyElectricityBill: 800,
    language: language,
    notifications: {
      email: true,
      sms: true,
      marketing: false
    },
    emailVerified: true,
    phoneVerified: false,
    documentsUploaded: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (field: keyof UserProfileData, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, profilePhoto: file }));
    }
  };

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.phone,
      profileData.nationalId,
      profileData.city,
      profileData.street,
      profileData.propertyType,
      profileData.monthlyElectricityBill
    ];
    
    const completed = fields.filter(field => field && field !== '').length;
    const verification = [
      profileData.emailVerified,
      profileData.phoneVerified,
      profileData.documentsUploaded
    ].filter(Boolean).length;
    
    return Math.round(((completed + verification) / (fields.length + 3)) * 100);
  };

  const saveProfile = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage (in real app, send to backend)
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    setLoading(false);
    setIsEditing(false);
    
    // Show success message
    showToast(
      language === 'en' ? 'Profile Updated!' : 'تم التحديث!',
      language === 'en' ? 'Profile updated successfully' : 'تم تحديث الملف الشخصي بنجاح',
      'success'
    );
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast(
        language === 'en' ? 'Password Mismatch' : 'عدم تطابق كلمة المرور',
        language === 'en' ? 'Passwords do not match!' : 'كلمات المرور غير متطابقة!',
        'error'
      );
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setShowPasswordForm(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    
    showToast(
      language === 'en' ? 'Password Changed!' : 'تم تغيير كلمة المرور!',
      language === 'en' ? 'Password changed successfully' : 'تم تغيير كلمة المرور بنجاح',
      'success'
    );
  };

  const verifyPhone = () => {
    // Navigate to phone verification
    navigate('/verify/phone');
  };

  const uploadDocuments = () => {
    // Navigate to document upload
    navigate('/profile/documents');
  };

  const tabs = [
    { id: 'personal', label: language === 'en' ? 'Personal Info' : 'المعلومات الشخصية', icon: User },
    { id: 'address', label: language === 'en' ? 'Address' : 'العنوان', icon: MapPin },
    { id: 'property', label: language === 'en' ? 'Property' : 'العقار', icon: Home },
    { id: 'security', label: language === 'en' ? 'Security' : 'الأمان', icon: Shield },
    { id: 'preferences', label: language === 'en' ? 'Preferences' : 'التفضيلات', icon: Bell }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Back Navigation */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Dashboard' : 'العودة للوحة التحكم'}</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-4">
                {language === 'en' ? 'My Profile' : 'ملفي الشخصي'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Manage your account information and preferences'
                  : 'أدر معلومات حسابك وتفضيلاتك'
                }
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Edit3 className="w-5 h-5" />
                  <span>{language === 'en' ? 'Edit Profile' : 'تعديل الملف'}</span>
                </button>
              ) : (
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    {language === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                  <button 
                    onClick={saveProfile}
                    disabled={loading}
                    className="btn-primary flex items-center space-x-2 rtl:space-x-reverse disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    <span>{loading ? (language === 'en' ? 'Saving...' : 'جاري الحفظ...') : (language === 'en' ? 'Save Changes' : 'حفظ التغييرات')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Profile Completion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Profile Completion' : 'اكتمال الملف الشخصي'}
            </h3>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {calculateProfileCompletion()}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${calculateProfileCompletion()}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {profileData.emailVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'en' ? 'Email Verified' : 'تم التحقق من البريد'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {profileData.phoneVerified ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <button onClick={verifyPhone} className="flex items-center space-x-3 rtl:space-x-reverse hover:text-emerald-600 dark:hover:text-emerald-400">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'en' ? 'Verify Phone' : 'تحقق من الهاتف'}
                  </span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {profileData.documentsUploaded ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <button onClick={uploadDocuments} className="flex items-center space-x-3 rtl:space-x-reverse hover:text-emerald-600 dark:hover:text-emerald-400">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'en' ? 'Upload Documents' : 'رفع المستندات'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card p-4 sticky top-8">
              {/* Profile Photo */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    {profileData.profilePhoto ? (
                      <img 
                        src={typeof profileData.profilePhoto === 'string' ? profileData.profilePhoto : URL.createObjectURL(profileData.profilePhoto)}
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors duration-200">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="sr-only"
                      />
                    </label>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{profileData.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-left rtl:text-right transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="card p-8">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    {language === 'en' ? 'Personal Information' : 'المعلومات الشخصية'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'First Name' : 'الاسم الأول'} *
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter your first name' : 'أدخل اسمك الأول'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Last Name' : 'اسم العائلة'} *
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter your last name' : 'أدخل اسم عائلتك'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'} *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="input-field disabled:opacity-50 disabled:cursor-not-allowed pr-10 rtl:pr-4 rtl:pl-10"
                          placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                        />
                        {profileData.emailVerified && (
                          <CheckCircle className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Phone Number' : 'رقم الهاتف'} *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="input-field disabled:opacity-50 disabled:cursor-not-allowed pr-10 rtl:pr-4 rtl:pl-10"
                          placeholder={language === 'en' ? '+966 50 123 4567' : '+966 50 123 4567'}
                        />
                        {profileData.phoneVerified ? (
                          <CheckCircle className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                        ) : (
                          <button
                            onClick={verifyPhone}
                            className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                          >
                            <AlertCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'National ID' : 'رقم الهوية'} *
                      </label>
                      <input
                        type="text"
                        value={profileData.nationalId}
                        onChange={(e) => handleInputChange('nationalId', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter your national ID' : 'أدخل رقم هويتك'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Date of Birth' : 'تاريخ الميلاد'}
                      </label>
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === 'address' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    {language === 'en' ? 'Address Information' : 'معلومات العنوان'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'City' : 'المدينة'} *
                      </label>
                      <select
                        value={profileData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">{language === 'en' ? 'Select city' : 'اختر المدينة'}</option>
                        <option value="Riyadh">{language === 'en' ? 'Riyadh' : 'الرياض'}</option>
                        <option value="Jeddah">{language === 'en' ? 'Jeddah' : 'جدة'}</option>
                        <option value="Mecca">{language === 'en' ? 'Mecca' : 'مكة'}</option>
                        <option value="Medina">{language === 'en' ? 'Medina' : 'المدينة'}</option>
                        <option value="Dammam">{language === 'en' ? 'Dammam' : 'الدمام'}</option>
                        <option value="Khobar">{language === 'en' ? 'Khobar' : 'الخبر'}</option>
                        <option value="Tabuk">{language === 'en' ? 'Tabuk' : 'تبوك'}</option>
                        <option value="Abha">{language === 'en' ? 'Abha' : 'أبها'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'District' : 'الحي'} *
                      </label>
                      <input
                        type="text"
                        value={profileData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter district' : 'أدخل اسم الحي'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Street' : 'الشارع'} *
                      </label>
                      <input
                        type="text"
                        value={profileData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter street name' : 'أدخل اسم الشارع'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Building Number' : 'رقم المبنى'} *
                      </label>
                      <input
                        type="text"
                        value={profileData.buildingNumber}
                        onChange={(e) => handleInputChange('buildingNumber', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter building number' : 'أدخل رقم المبنى'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Postal Code' : 'الرمز البريدي'}
                      </label>
                      <input
                        type="text"
                        value={profileData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter postal code' : 'أدخل الرمز البريدي'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Property Tab */}
              {activeTab === 'property' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    {language === 'en' ? 'Property Information' : 'معلومات العقار'}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Property Type' : 'نوع العقار'} *
                      </label>
                      <select
                        value={profileData.propertyType}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="residential">{language === 'en' ? 'Residential' : 'سكني'}</option>
                        <option value="commercial">{language === 'en' ? 'Commercial' : 'تجاري'}</option>
                        <option value="industrial">{language === 'en' ? 'Industrial' : 'صناعي'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Property Size (m²)' : 'مساحة العقار (م²)'}
                      </label>
                      <select
                        value={profileData.propertySize}
                        onChange={(e) => handleInputChange('propertySize', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="0-100">{language === 'en' ? 'Less than 100 m²' : 'أقل من 100 م²'}</option>
                        <option value="100-200">{language === 'en' ? '100-200 m²' : '100-200 م²'}</option>
                        <option value="200-500">{language === 'en' ? '200-500 m²' : '200-500 م²'}</option>
                        <option value="500+">{language === 'en' ? 'More than 500 m²' : 'أكثر من 500 م²'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Roof Type' : 'نوع السطح'}
                      </label>
                      <select
                        value={profileData.roofType}
                        onChange={(e) => handleInputChange('roofType', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="flat">{language === 'en' ? 'Flat Roof' : 'سطح مسطح'}</option>
                        <option value="pitched">{language === 'en' ? 'Pitched Roof' : 'سطح مائل'}</option>
                        <option value="mixed">{language === 'en' ? 'Mixed' : 'مختلط'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        {language === 'en' ? 'Monthly Electricity Bill (SAR)' : 'فاتورة الكهرباء الشهرية (ريال)'}
                      </label>
                      <input
                        type="number"
                        value={profileData.monthlyElectricityBill}
                        onChange={(e) => handleInputChange('monthlyElectricityBill', Number(e.target.value))}
                        disabled={!isEditing}
                        className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={language === 'en' ? 'Enter monthly bill amount' : 'أدخل مبلغ الفاتورة الشهرية'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    {language === 'en' ? 'Security Settings' : 'إعدادات الأمان'}
                  </h2>

                  {/* Change Password Section */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {language === 'en' ? 'Password' : 'كلمة المرور'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {language === 'en' ? 'Last changed 30 days ago' : 'آخر تغيير منذ 30 يوماً'}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Lock className="w-4 h-4" />
                        <span>{language === 'en' ? 'Change Password' : 'تغيير كلمة المرور'}</span>
                      </button>
                    </div>

                    {showPasswordForm && (
                      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            {language === 'en' ? 'Current Password' : 'كلمة المرور الحالية'}
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? 'text' : 'password'}
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                              className="input-field pr-10 rtl:pr-4 rtl:pl-10"
                              placeholder={language === 'en' ? 'Enter current password' : 'أدخل كلمة المرور الحالية'}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPasswords.current ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            {language === 'en' ? 'New Password' : 'كلمة المرور الجديدة'}
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="input-field pr-10 rtl:pr-4 rtl:pl-10"
                              placeholder={language === 'en' ? 'Enter new password' : 'أدخل كلمة المرور الجديدة'}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPasswords.new ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            {language === 'en' ? 'Confirm New Password' : 'تأكيد كلمة المرور الجديدة'}
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="input-field pr-10 rtl:pr-4 rtl:pl-10"
                              placeholder={language === 'en' ? 'Confirm new password' : 'أكد كلمة المرور الجديدة'}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex space-x-3 rtl:space-x-reverse">
                          <button
                            onClick={changePassword}
                            disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword || loading}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <div className="flex items-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
                                {language === 'en' ? 'Changing...' : 'جاري التغيير...'}
                              </div>
                            ) : (
                              language === 'en' ? 'Change Password' : 'تغيير كلمة المرور'
                            )}
                          </button>
                          
                          <button
                            onClick={() => {
                              setShowPasswordForm(false);
                              setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                            }}
                            className="btn-secondary"
                          >
                            {language === 'en' ? 'Cancel' : 'إلغاء'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {language === 'en' ? 'Two-Factor Authentication' : 'المصادقة الثنائية'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {language === 'en' ? 'Add an extra layer of security to your account' : 'أضف طبقة أمان إضافية لحسابك'}
                        </p>
                      </div>
                      <button className="btn-secondary">
                        {language === 'en' ? 'Enable' : 'تفعيل'}
                      </button>
                    </div>
                  </div>

                  {/* Login Sessions */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Login Sessions' : 'جلسات تسجيل الدخول'}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'Current Session' : 'الجلسة الحالية'}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Chrome on Windows • Jeddah, Saudi Arabia' : 'كروم على ويندوز • جدة، السعودية'}
                          </p>
                        </div>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                          {language === 'en' ? 'Active' : 'نشط'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    {language === 'en' ? 'Preferences & Settings' : 'التفضيلات والإعدادات'}
                  </h2>

                  {/* Language Settings */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Language & Region' : 'اللغة والمنطقة'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          {language === 'en' ? 'Language' : 'اللغة'}
                        </label>
                        <div className="flex space-x-3 rtl:space-x-reverse">
                          <button
                            onClick={() => setLanguage('en')}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                              language === 'en'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            English
                          </button>
                          <button
                            onClick={() => setLanguage('ar')}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                              language === 'ar'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            العربية
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          {language === 'en' ? 'Theme' : 'المظهر'}
                        </label>
                        <button
                          onClick={toggleDarkMode}
                          className="w-full flex items-center justify-between py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          <span className="text-gray-600 dark:text-gray-300">
                            {isDarkMode 
                              ? (language === 'en' ? 'Dark Mode' : 'المظهر الداكن')
                              : (language === 'en' ? 'Light Mode' : 'المظهر الفاتح')
                            }
                          </span>
                          {isDarkMode ? (
                            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                          ) : (
                            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Notifications' : 'الإشعارات'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'Email Notifications' : 'إشعارات البريد الإلكتروني'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Receive notifications via email' : 'استلم الإشعارات عبر البريد الإلكتروني'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profileData.notifications.email}
                            onChange={(e) => handleNestedChange('notifications', 'email', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'SMS Notifications' : 'إشعارات الرسائل النصية'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Receive notifications via SMS' : 'استلم الإشعارات عبر الرسائل النصية'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profileData.notifications.sms}
                            onChange={(e) => handleNestedChange('notifications', 'sms', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'Marketing Communications' : 'التواصل التسويقي'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Receive promotional offers and updates' : 'استلم العروض الترويجية والتحديثات'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profileData.notifications.marketing}
                            onChange={(e) => handleNestedChange('notifications', 'marketing', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Data & Privacy */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      {language === 'en' ? 'Data & Privacy' : 'البيانات والخصوصية'}
                    </h3>
                    
                    <div className="space-y-3">
                      <button 
                        onClick={() => navigate('/profile/activity')}
                        className="w-full text-left rtl:text-right p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'View Account Activity' : 'عرض نشاط الحساب'}
                          </span>
                          <Activity className="w-5 h-5 text-gray-400" />
                        </div>
                      </button>
                      
                      <button className="w-full text-left rtl:text-right p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'Download My Data' : 'تحميل بياناتي'}
                          </span>
                          <Download className="w-5 h-5 text-gray-400" />
                        </div>
                      </button>
                      
                      <button className="w-full text-left rtl:text-right p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 text-red-600 dark:text-red-400">
                        <div className="flex items-center justify-between">
                          <span>
                            {language === 'en' ? 'Delete Account' : 'حذف الحساب'}
                          </span>
                          <AlertCircle className="w-5 h-5" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Toast Notifications */}
        <Toast
          isOpen={toast.isOpen}
          onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          language={language}
        />
      </div>
    </div>
  );
};

export default UserProfile;