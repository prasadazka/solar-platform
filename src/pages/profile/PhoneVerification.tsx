import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Timer,
  RefreshCw
} from 'lucide-react';
import { useThemeStore } from '../../store';

const PhoneVerification: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('+966501234567');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleSendOTP = async () => {
    setLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (phoneNumber.length < 10) {
      setError(language === 'en' ? 'Please enter a valid phone number' : 'يرجى إدخال رقم هاتف صحيح');
      setLoading(false);
      return;
    }
    
    setStep('otp');
    setCountdown(60);
    setLoading(false);
  };

  const handleOTPChange = (value: string, index: number) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError('');
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError(language === 'en' ? 'Please enter the complete OTP' : 'يرجى إدخال رمز التحقق كاملاً');
      setLoading(false);
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (otpValue === '123456') {
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } else {
      setError(language === 'en' ? 'Invalid OTP. Please try again.' : 'رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.');
    }
    
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCountdown(60);
    setResendLoading(false);
    setOtp(['', '', '', '', '', '']);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {language === 'en' ? 'Phone Verified!' : 'تم التحقق من الهاتف!'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' ? 'Your phone number has been successfully verified.' : 'تم التحقق من رقم هاتفك بنجاح.'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back to Profile' : 'العودة للملف الشخصي'}</span>
          </button>

          <div className="card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                {step === 'phone' ? (
                  <Phone className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <MessageSquare className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {step === 'phone' 
                  ? (language === 'en' ? 'Verify Phone Number' : 'تحقق من رقم الهاتف')
                  : (language === 'en' ? 'Enter Verification Code' : 'أدخل رمز التحقق')
                }
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300">
                {step === 'phone'
                  ? (language === 'en' 
                      ? 'We\'ll send you a verification code to confirm your phone number'
                      : 'سنرسل لك رمز تحقق لتأكيد رقم هاتفك'
                    )
                  : (language === 'en'
                      ? `We've sent a 6-digit code to ${phoneNumber}`
                      : `أرسلنا رمز مكون من 6 أرقام إلى ${phoneNumber}`
                    )
                }
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3 rtl:space-x-reverse">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-600 dark:text-red-400 text-sm">{error}</span>
              </div>
            )}

            {step === 'phone' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input-field"
                    placeholder={language === 'en' ? '+966 50 123 4567' : '+966 50 123 4567'}
                    dir="ltr"
                  />
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                    </div>
                  ) : (
                    language === 'en' ? 'Send Verification Code' : 'إرسال رمز التحقق'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-4 text-center">
                    {language === 'en' ? 'Enter 6-digit code' : 'أدخل الرمز المكون من 6 أرقام'}
                  </label>
                  
                  <div className="flex justify-center space-x-3 rtl:space-x-reverse mb-6">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        name={`otp-${index}`}
                        value={digit}
                        onChange={(e) => handleOTPChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-20 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        maxLength={1}
                        dir="ltr"
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en' ? 'Verifying...' : 'جاري التحقق...'}
                    </div>
                  ) : (
                    language === 'en' ? 'Verify Code' : 'تحقق من الرمز'
                  )}
                </button>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {language === 'en' ? 'Resend code in' : 'إعادة إرسال الرمز خلال'} {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      disabled={resendLoading}
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium disabled:opacity-50"
                    >
                      {resendLoading ? (
                        <div className="flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 animate-spin mr-2 rtl:mr-0 rtl:ml-2" />
                          {language === 'en' ? 'Resending...' : 'جاري الإرسال...'}
                        </div>
                      ) : (
                        language === 'en' ? 'Resend Code' : 'إعادة إرسال الرمز'
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <p className="text-blue-600 dark:text-blue-400 text-sm text-center">
                <strong>{language === 'en' ? 'Demo:' : 'التجربة:'}</strong> {language === 'en' ? 'Use code 123456 for testing' : 'استخدم الرمز 123456 للتجربة'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhoneVerification;