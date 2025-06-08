import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useThemeStore } from '../store';
import { useRegistrationStore, getUserSteps, getVendorSteps } from '../store/registration';
import ProgressTracker from '../components/ProgressTracker';
import UserRegistrationSteps from './UserRegistrationSteps';
import VendorRegistrationSteps from './VendorRegistrationSteps';

const MultiStepRegistration: React.FC = () => {
  const { type } = useParams<{ type: 'user' | 'vendor' }>();
  const navigate = useNavigate();
  const { language } = useThemeStore();
  const { 
    registrationType, 
    currentStep, 
    userOnboarding, 
    vendorOnboarding,
    setRegistrationType,
    nextStep,
    prevStep,
    submitRegistration
  } = useRegistrationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (type && (type === 'user' || type === 'vendor')) {
      setRegistrationType(type);
    } else {
      navigate('/signup');
    }
  }, [type, setRegistrationType, navigate]);

  if (!registrationType) {
    return null;
  }

  const steps = registrationType === 'user' ? getUserSteps(language) : getVendorSteps(language);
  const onboardingStatus = registrationType === 'user' ? userOnboarding : vendorOnboarding;
  const isLastStep = currentStep === onboardingStatus.totalSteps;
  const isFirstStep = currentStep === 1;

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitRegistration();
      // Navigate to success page or dashboard
      navigate('/registration-success');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    if (registrationType === 'user') {
      return <UserRegistrationSteps currentStep={currentStep} />;
    } else {
      return <VendorRegistrationSteps currentStep={currentStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProgressTracker
                steps={steps}
                onboardingStatus={onboardingStatus}
                currentStep={currentStep}
                type={registrationType}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
            >
              {/* Step Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {steps[currentStep - 1]?.title}
                  </h1>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'en' 
                      ? `Step ${currentStep} of ${onboardingStatus.totalSteps}`
                      : `الخطوة ${currentStep} من ${onboardingStatus.totalSteps}`
                    }
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {steps[currentStep - 1]?.description}
                </p>
              </div>

              {/* Step Content */}
              <div className="mb-8">
                {renderStepContent()}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={prevStep}
                  disabled={isFirstStep}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isFirstStep
                      ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{language === 'en' ? 'Previous' : 'السابق'}</span>
                </button>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {/* Save Draft */}
                  <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                    {language === 'en' ? 'Save Draft' : 'حفظ المسودة'}
                  </button>

                  {/* Next/Submit */}
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{language === 'en' ? 'Submitting...' : 'جاري الإرسال...'}</span>
                      </>
                    ) : isLastStep ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>{language === 'en' ? 'Submit Application' : 'إرسال الطلب'}</span>
                      </>
                    ) : (
                      <>
                        <span>{language === 'en' ? 'Continue' : 'متابعة'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepRegistration;
