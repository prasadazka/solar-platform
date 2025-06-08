import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Globe,
  Moon,
  Sun,
  Mail,
  MessageSquare,
  Lock,
  Save,
  Check
} from 'lucide-react';
import { useThemeStore } from '../../store';

const ProfileSettings: React.FC = () => {
  const { language, isDarkMode, toggleDarkMode, setLanguage } = useThemeStore();
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState<'privacy' | 'notifications' | 'security' | 'preferences'>('privacy');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    privacy: {
      profileVisibility: 'private' as 'public' | 'private' | 'contacts',
      showEmail: false,
      showPhone: false,
      allowMarketing: false,
      allowAnalytics: true
    },
    notifications: {
      email: { security: true, updates: true, marketing: false },
      sms: { security: true, updates: false, marketing: false }
    },
    security: {
      twoFactorEnabled: false,
      loginAlerts: true,
      sessionTimeout: 30
    },
    preferences: {
      language: language,
      theme: isDarkMode ? 'dark' as const : 'light' as const,
      currency: 'SAR' as 'SAR' | 'USD' | 'EUR'
    }
  });

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const updateNestedSetting = (section: string, subsection: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...(prev[section as keyof typeof prev] as any)[subsection],
          [key]: value
        }
      }
    }));
  };

  const sections = [
    { id: 'privacy', label: language === 'en' ? 'Privacy' : 'الخصوصية', icon: Eye },
    { id: 'notifications', label: language === 'en' ? 'Notifications' : 'الإشعارات', icon: Bell },
    { id: 'security', label: language === 'en' ? 'Security' : 'الأمان', icon: Shield },
    { id: 'preferences', label: language === 'en' ? 'Preferences' : 'التفضيلات', icon: Settings }
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
          <div className="mb-6">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Profile' : 'العودة للملف الشخصي'}</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-4">
                {language === 'en' ? 'Profile Settings' : 'إعدادات الملف الشخصي'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Manage your privacy, notifications, and security preferences'
                  : 'أدر تفضيلات الخصوصية والإشعارات والأمان'
                }
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <button 
                onClick={handleSave}
                disabled={loading}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : saved ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>
                  {loading ? (language === 'en' ? 'Saving...' : 'جاري الحفظ...') : 
                   saved ? (language === 'en' ? 'Saved!' : 'تم الحفظ!') :
                   (language === 'en' ? 'Save Changes' : 'حفظ التغييرات')}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="card p-4 sticky top-8">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-left rtl:text-right transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card p-8">
              {/* Privacy Settings */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    {language === 'en' ? 'Privacy Settings' : 'إعدادات الخصوصية'}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                        {language === 'en' ? 'Profile Visibility' : 'ظهور الملف الشخصي'}
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'public', label: language === 'en' ? 'Public - Anyone can see' : 'عام - يمكن لأي شخص الرؤية' },
                          { value: 'private', label: language === 'en' ? 'Private - Only you can see' : 'خاص - أنت فقط يمكنك الرؤية' },
                          { value: 'contacts', label: language === 'en' ? 'Contacts - Only your contacts' : 'جهات الاتصال - جهات اتصالك فقط' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center space-x-3 rtl:space-x-reverse">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value={option.value}
                              checked={settings.privacy.profileVisibility === option.value}
                              onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'Show Email Address' : 'إظهار البريد الإلكتروني'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Allow others to see your email' : 'السماح للآخرين برؤية بريدك الإلكتروني'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.showEmail}
                            onChange={(e) => updateSetting('privacy', 'showEmail', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {language === 'en' ? 'Show Phone Number' : 'إظهار رقم الهاتف'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'en' ? 'Allow others to see your phone' : 'السماح للآخرين برؤية هاتفك'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.privacy.showPhone}
                            onChange={(e) => updateSetting('privacy', 'showPhone', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add more sections here */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;