import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Building,
  Phone,
  Mail,
  MapPin,
  Award,
  Star,
  Edit,
  Save,
  Shield,
  CheckCircle,
  AlertCircle,
  Camera,
  Upload,
  Globe,
  Clock,
  Users,
  Calendar,
  FileText,
  Target,
  TrendingUp,
  BadgeCheck,
  Settings,
  Plus,
  Trash2,
  Home,
  Briefcase,
  Warehouse,
  Navigation
} from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorProfileManagement: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useThemeStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [profileData, setProfileData] = useState({
    companyName: 'Alpha Solar Solutions KSA',
    email: 'info@alphasolar.sa',
    phone: '+966 12 345 6789',
    website: 'www.alphasolar.sa',
    establishedYear: '2018',
    employeeCount: '25-50',
    description: language === 'en' 
      ? 'Leading solar energy solutions provider in Saudi Arabia with over 5 years of experience in residential and commercial installations.'
      : 'مزود رائد لحلول الطاقة الشمسية في المملكة مع أكثر من 5 سنوات من الخبرة في التركيبات السكنية والتجارية.',
    
    // Address Information
    addresses: [
      {
        id: 1,
        type: 'headquarters',
        label: language === 'en' ? 'Headquarters' : 'المقر الرئيسي',
        street: 'King Fahd Road, Building 123',
        district: 'Al Salamah District',
        city: 'Jeddah',
        region: 'Makkah Province',
        postalCode: '21462',
        country: 'Saudi Arabia',
        isPrimary: true
      },
      {
        id: 2,
        type: 'warehouse',
        label: language === 'en' ? 'Main Warehouse' : 'المستودع الرئيسي',
        street: 'Industrial City, Unit 45',
        district: 'Al Jubail Industrial',
        city: 'Jeddah',
        region: 'Makkah Province',
        postalCode: '21514',
        country: 'Saudi Arabia',
        isPrimary: false
      }
    ],
    
    // Business Information
    businessHours: {
      sunday: { open: '08:00', close: '17:00', isOpen: true },
      monday: { open: '08:00', close: '17:00', isOpen: true },
      tuesday: { open: '08:00', close: '17:00', isOpen: true },
      wednesday: { open: '08:00', close: '17:00', isOpen: true },
      thursday: { open: '08:00', close: '17:00', isOpen: true },
      friday: { open: '13:00', close: '17:00', isOpen: true },
      saturday: { open: '00:00', close: '00:00', isOpen: false }
    },

    // Performance Stats
    completedProjects: 150,
    customerRating: 4.8,
    responseTime: '2 hours',
    totalRevenue: '2.5M SAR',
    serviceAreas: ['Jeddah', 'Makkah', 'Taif', 'Rabigh'],
    
    // Certifications
    certifications: [
      { name: 'SASO Certification', number: 'SASO-2024-001', expiryDate: '2025-12-31', status: 'active' },
      { name: 'SEC License', number: 'SEC-INS-2024', expiryDate: '2025-06-30', status: 'active' },
      { name: 'ISO 9001:2015', number: 'ISO-9001-2024', expiryDate: '2026-03-15', status: 'active' }
    ],

    // Social Media
    socialMedia: {
      linkedin: 'https://linkedin.com/company/alphasolar',
      twitter: 'https://twitter.com/alphasolar_sa',
      instagram: 'https://instagram.com/alphasolar_sa'
    }
  });

  const profileCompletion = 85; // Calculate based on filled fields

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
    alert(language === 'en' ? 'Profile updated successfully!' : 'تم تحديث الملف الشخصي بنجاح!');
  };

  const addNewAddress = () => {
    const newAddress = {
      id: Date.now(),
      type: 'office',
      label: language === 'en' ? 'New Address' : 'عنوان جديد',
      street: '',
      district: '',
      city: '',
      region: '',
      postalCode: '',
      country: 'Saudi Arabia',
      isPrimary: false
    };
    setProfileData({
      ...profileData,
      addresses: [...profileData.addresses, newAddress]
    });
  };

  const removeAddress = (addressId: number) => {
    setProfileData({
      ...profileData,
      addresses: profileData.addresses.filter(addr => addr.id !== addressId)
    });
  };

  const updateAddress = (addressId: number, field: string, value: any) => {
    setProfileData({
      ...profileData,
      addresses: profileData.addresses.map(addr => 
        addr.id === addressId ? { ...addr, [field]: value } : addr
      )
    });
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

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-4">
                {language === 'en' ? 'Company Profile' : 'ملف الشركة'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Manage your business information and settings'
                  : 'إدارة معلومات الأعمال والإعدادات'
                }
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-3 rtl:space-x-reverse">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Profile Completion' : 'اكتمال الملف'}
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-300"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{profileCompletion}%</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isEditing 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                <Edit className="w-5 h-5" />
                <span>{isEditing ? (language === 'en' ? 'Cancel Edit' : 'إلغاء التعديل') : (language === 'en' ? 'Edit Profile' : 'تعديل الملف')}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 mb-8 relative overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {/* Company Logo */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  {profileData.companyName.split(' ').map(word => word[0]).join('').substring(0, 2)}
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-2 border-emerald-600 flex items-center justify-center hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors duration-200">
                    <Camera className="w-4 h-4 text-emerald-600" />
                  </button>
                )}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profileData.companyName}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{profileData.description}</p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mt-3">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.customerRating}</span>
                    <span className="text-gray-500 text-sm">({profileData.completedProjects} {language === 'en' ? 'projects' : 'مشروع'})</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">{language === 'en' ? 'Verified' : 'موثق'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6 lg:mt-0">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">{profileData.completedProjects}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{language === 'en' ? 'Projects' : 'مشاريع'}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{profileData.totalRevenue}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{language === 'en' ? 'Revenue' : 'الإيرادات'}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{profileData.responseTime}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{language === 'en' ? 'Response' : 'الاستجابة'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 p-1 rounded-xl overflow-x-auto">
            {[
              { id: 'general', label: language === 'en' ? 'General' : 'عام', icon: Building },
              { id: 'addresses', label: language === 'en' ? 'Addresses' : 'العناوين', icon: MapPin },
              { id: 'business', label: language === 'en' ? 'Business' : 'الأعمال', icon: Briefcase },
              { id: 'certifications', label: language === 'en' ? 'Certifications' : 'الشهادات', icon: Award },
              { id: 'performance', label: language === 'en' ? 'Performance' : 'الأداء', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-emerald-600 shadow-md border border-emerald-200 dark:border-emerald-700'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
        {/* General Information Tab */}
        {activeTab === 'general' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Company Information */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <Building className="w-5 h-5 text-emerald-600" />
                <span>{language === 'en' ? 'Company Information' : 'معلومات الشركة'}</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Company Name' : 'اسم الشركة'}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.companyName}
                      onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Building className="w-5 h-5 text-emerald-600" />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{profileData.companyName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Phone' : 'الهاتف'}
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Phone className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Website' : 'الموقع الإلكتروني'}
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{profileData.website}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Company Description' : 'وصف الشركة'}
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.description}
                      onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                      rows={4}
                      className="input-field"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-900 dark:text-gray-100">{profileData.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>{language === 'en' ? 'Company Details' : 'تفاصيل الشركة'}</span>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Established Year' : 'سنة التأسيس'}
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profileData.establishedYear}
                      onChange={(e) => setProfileData({...profileData, establishedYear: e.target.value})}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{profileData.establishedYear}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Employee Count' : 'عدد الموظفين'}
                  </label>
                  {isEditing ? (
                    <select
                      value={profileData.employeeCount}
                      onChange={(e) => setProfileData({...profileData, employeeCount: e.target.value})}
                      className="input-field"
                    >
                      <option value="1-10">1-10</option>
                      <option value="11-25">11-25</option>
                      <option value="25-50">25-50</option>
                      <option value="50-100">50-100</option>
                      <option value="100+">100+</option>
                    </select>
                  ) : (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{profileData.employeeCount} {language === 'en' ? 'employees' : 'موظف'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Service Areas' : 'مناطق الخدمة'}
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {profileData.serviceAreas.map((area, index) => (
                      <span key={index} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Social Media' : 'وسائل التواصل الاجتماعي'}
                  </label>
                  <div className="space-y-3">
                    {Object.entries(profileData.socialMedia).map(([platform, url]) => (
                      <div key={platform} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{platform}:</span>
                        <span className="text-gray-900 dark:text-gray-100 text-sm">{url}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2 rtl:space-x-reverse">
                <MapPin className="w-6 h-6 text-emerald-600" />
                <span>{language === 'en' ? 'Business Addresses' : 'عناوين الأعمال'}</span>
              </h3>
              {isEditing && (
                <button
                  onClick={addNewAddress}
                  className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Plus className="w-5 h-5" />
                  <span>{language === 'en' ? 'Add Address' : 'إضافة عنوان'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {profileData.addresses.map((address, index) => (
                <div key={address.id} className="card p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      {address.type === 'headquarters' && <Home className="w-5 h-5 text-emerald-600" />}
                      {address.type === 'warehouse' && <Warehouse className="w-5 h-5 text-blue-600" />}
                      {address.type === 'office' && <Building className="w-5 h-5 text-purple-600" />}
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{address.label}</h4>
                      {address.isPrimary && (
                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-medium">
                          {language === 'en' ? 'Primary' : 'رئيسي'}
                        </span>
                      )}
                    </div>
                    
                    {isEditing && profileData.addresses.length > 1 && (
                      <button
                        onClick={() => removeAddress(address.id)}
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            {language === 'en' ? 'Address Label' : 'تسمية العنوان'}
                          </label>
                          <input
                            type="text"
                            value={address.label}
                            onChange={(e) => updateAddress(address.id, 'label', e.target.value)}
                            className="input-field"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            {language === 'en' ? 'Street Address' : 'عنوان الشارع'}
                          </label>
                          <input
                            type="text"
                            value={address.street}
                            onChange={(e) => updateAddress(address.id, 'street', e.target.value)}
                            className="input-field"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                              {language === 'en' ? 'District' : 'الحي'}
                            </label>
                            <input
                              type="text"
                              value={address.district}
                              onChange={(e) => updateAddress(address.id, 'district', e.target.value)}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                              {language === 'en' ? 'City' : 'المدينة'}
                            </label>
                            <input
                              type="text"
                              value={address.city}
                              onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                              {language === 'en' ? 'Region' : 'المنطقة'}
                            </label>
                            <input
                              type="text"
                              value={address.region}
                              onChange={(e) => updateAddress(address.id, 'region', e.target.value)}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                              {language === 'en' ? 'Postal Code' : 'الرمز البريدي'}
                            </label>
                            <input
                              type="text"
                              value={address.postalCode}
                              onChange={(e) => updateAddress(address.id, 'postalCode', e.target.value)}
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <input
                            type="checkbox"
                            id={`primary-${address.id}`}
                            checked={address.isPrimary}
                            onChange={(e) => updateAddress(address.id, 'isPrimary', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <label htmlFor={`primary-${address.id}`} className="text-sm text-gray-700 dark:text-gray-200">
                            {language === 'en' ? 'Set as primary address' : 'تعيين كعنوان رئيسي'}
                          </label>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-gray-900 dark:text-gray-100 font-medium">{address.street}</p>
                        <p className="text-gray-600 dark:text-gray-300">{address.district}, {address.city}</p>
                        <p className="text-gray-600 dark:text-gray-300">{address.region}, {address.postalCode}</p>
                        <p className="text-gray-600 dark:text-gray-300">{address.country}</p>
                        
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <button className="flex items-center space-x-2 rtl:space-x-reverse text-emerald-600 hover:text-emerald-700 text-sm">
                            <Navigation className="w-4 h-4" />
                            <span>{language === 'en' ? 'View on Map' : 'عرض على الخريطة'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Business Hours Tab */}
        {activeTab === 'business' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="w-6 h-6 text-blue-600" />
                <span>{language === 'en' ? 'Business Hours' : 'ساعات العمل'}</span>
              </h3>

              <div className="space-y-4">
                {Object.entries(profileData.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="w-20 text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {language === 'en' ? day : 
                          day === 'sunday' ? 'الأحد' :
                          day === 'monday' ? 'الاثنين' :
                          day === 'tuesday' ? 'الثلاثاء' :
                          day === 'wednesday' ? 'الأربعاء' :
                          day === 'thursday' ? 'الخميس' :
                          day === 'friday' ? 'الجمعة' : 'السبت'
                        }
                      </span>
                      {isEditing && (
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            businessHours: {
                              ...profileData.businessHours,
                              [day]: { ...hours, isOpen: e.target.checked }
                            }
                          })}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                      )}
                    </div>
                    
                    {hours.isOpen ? (
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {isEditing ? (
                          <>
                            <input
                              type="time"
                              value={hours.open}
                              onChange={(e) => setProfileData({
                                ...profileData,
                                businessHours: {
                                  ...profileData.businessHours,
                                  [day]: { ...hours, open: e.target.value }
                                }
                              })}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                            <span className="text-gray-600 dark:text-gray-300">-</span>
                            <input
                              type="time"
                              value={hours.close}
                              onChange={(e) => setProfileData({
                                ...profileData,
                                businessHours: {
                                  ...profileData.businessHours,
                                  [day]: { ...hours, close: e.target.value }
                                }
                              })}
                              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm"
                            />
                          </>
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {hours.open} - {hours.close}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-red-600 font-medium text-sm">
                        {language === 'en' ? 'Closed' : 'مغلق'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2 rtl:space-x-reverse">
                <Award className="w-6 h-6 text-purple-600" />
                <span>{language === 'en' ? 'Certifications & Licenses' : 'الشهادات والتراخيص'}</span>
              </h3>
              {isEditing && (
                <button className="btn-primary flex items-center space-x-2 rtl:space-x-reverse">
                  <Plus className="w-5 h-5" />
                  <span>{language === 'en' ? 'Add Certificate' : 'إضافة شهادة'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="card p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Award className="w-6 h-6 text-purple-600" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {cert.status === 'active' ? (language === 'en' ? 'Active' : 'نشط') : (language === 'en' ? 'Expired' : 'منتهي')}
                      </span>
                    </div>
                    {isEditing && (
                      <button className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{cert.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>{language === 'en' ? 'Number:' : 'الرقم:'}</strong> {cert.number}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>{language === 'en' ? 'Expires:' : 'ينتهي في:'}</strong> {new Date(cert.expiryDate).toLocaleDateString()}
                    </p>
                    
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center space-x-1 rtl:space-x-reverse">
                        <FileText className="w-4 h-4" />
                        <span>{language === 'en' ? 'View Certificate' : 'عرض الشهادة'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <span>{language === 'en' ? 'Performance Analytics' : 'تحليلات الأداء'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: language === 'en' ? 'Customer Rating' : 'تقييم العملاء',
                  value: profileData.customerRating,
                  unit: '/5.0',
                  icon: Star,
                  color: 'yellow',
                  change: '+0.2'
                },
                {
                  title: language === 'en' ? 'Completed Projects' : 'المشاريع المكتملة',
                  value: profileData.completedProjects,
                  unit: '',
                  icon: CheckCircle,
                  color: 'emerald',
                  change: '+12'
                },
                {
                  title: language === 'en' ? 'Response Time' : 'وقت الاستجابة',
                  value: profileData.responseTime,
                  unit: '',
                  icon: Clock,
                  color: 'blue',
                  change: '-30min'
                },
                {
                  title: language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات',
                  value: profileData.totalRevenue,
                  unit: '',
                  icon: TrendingUp,
                  color: 'purple',
                  change: '+23%'
                }
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="card p-6 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 dark:from-${metric.color}-900/20 dark:to-${metric.color}-800/20 opacity-50`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-${metric.color}-100 dark:bg-${metric.color}-900/30 rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                        </div>
                        <span className={`text-sm font-medium text-${metric.color}-600 dark:text-${metric.color}-400 bg-${metric.color}-50 dark:bg-${metric.color}-900/20 px-2 py-1 rounded-lg`}>
                          {metric.change}
                        </span>
                      </div>
                      
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {metric.value}{metric.unit}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{metric.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Monthly Performance' : 'الأداء الشهري'}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Projects Completed' : 'المشاريع المكتملة'}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'Customer Satisfaction' : 'رضا العملاء'}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{language === 'en' ? 'On-Time Delivery' : 'التسليم في الوقت المحدد'}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">98%</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {language === 'en' ? 'Recent Achievements' : 'الإنجازات الأخيرة'}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-900 dark:text-gray-100 text-sm">
                      {language === 'en' ? 'Top Rated Vendor - Q4 2024' : 'أفضل مقاول - الربع الرابع 2024'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-900 dark:text-gray-100 text-sm">
                      {language === 'en' ? '100+ Projects Milestone' : 'إنجاز 100+ مشروع'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <BadgeCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900 dark:text-gray-100 text-sm">
                      {language === 'en' ? 'Verified Business Partner' : 'شريك أعمال موثق'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end space-x-4 rtl:space-x-reverse pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {language === 'en' ? 'Cancel' : 'إلغاء'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 rtl:space-x-reverse disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>
                {isSaving 
                  ? (language === 'en' ? 'Saving...' : 'جاري الحفظ...')
                  : (language === 'en' ? 'Save Changes' : 'حفظ التغييرات')
                }
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VendorProfileManagement;