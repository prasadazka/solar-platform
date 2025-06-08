import React from 'react';
import { useThemeStore } from '../store';
import { Zap, Heart, Leaf, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useThemeStore();

  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {language === 'en' ? 'RABHAN' : 'رابحان'}
              </span>
            </div>
            
            {/* Project Attribution */}
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left rtl:md:text-right">
              <p className="mb-1">
                {language === 'en' ? 'Owned by Alpha Power' : 'مملوك من قبل ألفا باور'}
              </p>
              <p className="mb-2">
                {language === 'en' ? 'Developed by Azkashine' : 'طوّر من قبل أزكاشاين'}
              </p>
              <a 
                href="https://rabhan.sa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors duration-200 mb-3 block"
              >
                {language === 'en' ? '🌐 Visit Official Website' : '🌐 زيارة الموقع الرسمي'}
              </a>
              <div className="flex items-center justify-center md:justify-start rtl:md:justify-end space-x-1 rtl:space-x-reverse">
                <span>© 2024 RABHAN.</span>
                <span>{language === 'en' ? 'Made with' : 'صنع بـ'}</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>{language === 'en' ? 'in Saudi Arabia' : 'في المملكة العربية السعودية'}</span>
              </div>
            </div>
          </div>

          {/* Saudi Net Zero Goals Mission */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center md:text-left rtl:md:text-right">
              {language === 'en' ? 'Saudi Net Zero 2060' : 'صافي الصفر السعودي 2060'}
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left rtl:md:text-right">
              <p className="mb-2">
                {language === 'en' 
                  ? 'Supporting Saudi Arabia\'s commitment to achieve net zero greenhouse gas emissions by 2060 through the Saudi Green Initiative'
                  : 'دعم التزام المملكة العربية السعودية بتحقيق صافي انبعاثات غازات الدفيئة صفر بحلول 2060 من خلال المبادرة الخضراء السعودية'
                }
              </p>
              <div className="flex items-center justify-center md:justify-start rtl:md:justify-end space-x-2 rtl:space-x-reverse">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {language === 'en' ? 'Vision 2030 Aligned' : 'متوافق مع رؤية 2030'}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a 
                href="https://rabhan.sa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 text-center md:text-left rtl:md:text-right font-medium flex items-center space-x-1 rtl:space-x-reverse"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'Official RABHAN Site' : 'موقع رابحان الرسمي'}</span>
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 text-center md:text-left rtl:md:text-right"
              >
                {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 text-center md:text-left rtl:md:text-right"
              >
                {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 text-center md:text-left rtl:md:text-right"
              >
                {language === 'en' ? 'Support Center' : 'مركز الدعم'}
              </a>
              <a 
                href="https://www.sgi.gov.sa/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200 text-center md:text-left rtl:md:text-right font-medium"
              >
                {language === 'en' ? 'Saudi Green Initiative' : 'المبادرة الخضراء السعودية'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
