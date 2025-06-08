import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRegistrationData, VendorRegistrationData, OnboardingStatus, RegistrationStep } from '../types';

// Registration Store
interface RegistrationStore {
  // User Registration
  userRegistration: Partial<UserRegistrationData>;
  userOnboarding: OnboardingStatus;
  
  // Vendor Registration  
  vendorRegistration: Partial<VendorRegistrationData>;
  vendorOnboarding: OnboardingStatus;
  
  // Current registration type
  registrationType: 'user' | 'vendor' | null;
  currentStep: number;
  
  // Actions
  setRegistrationType: (type: 'user' | 'vendor') => void;
  updateUserRegistration: (data: Partial<UserRegistrationData>) => void;
  updateVendorRegistration: (data: Partial<VendorRegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  completeStep: (stepId: string) => void;
  resetRegistration: () => void;
  submitRegistration: () => Promise<void>;
}

const initialUserOnboarding: OnboardingStatus = {
  currentStep: 1,
  totalSteps: 5,
  completedSteps: [],
  pendingSteps: ['basic_info', 'personal_details', 'preferences', 'verification', 'documents'],
  status: 'incomplete'
};

const initialVendorOnboarding: OnboardingStatus = {
  currentStep: 1,
  totalSteps: 6,
  completedSteps: [],
  pendingSteps: ['company_info', 'business_details', 'location_services', 'financial_info', 'documents', 'admin_review'],
  status: 'incomplete'
};

export const useRegistrationStore = create<RegistrationStore>()(
  persist(
    (set, get) => ({
      userRegistration: {},
      userOnboarding: initialUserOnboarding,
      vendorRegistration: {},
      vendorOnboarding: initialVendorOnboarding,
      registrationType: null,
      currentStep: 1,

      setRegistrationType: (type: 'user' | 'vendor') => {
        set({
          registrationType: type,
          currentStep: 1,
        });
      },

      updateUserRegistration: (data: Partial<UserRegistrationData>) => {
        set((state) => ({
          userRegistration: { ...state.userRegistration, ...data }
        }));
      },

      updateVendorRegistration: (data: Partial<VendorRegistrationData>) => {
        set((state) => ({
          vendorRegistration: { ...state.vendorRegistration, ...data }
        }));
      },

      nextStep: () => {
        set((state) => {
          const maxSteps = state.registrationType === 'user' 
            ? state.userOnboarding.totalSteps 
            : state.vendorOnboarding.totalSteps;
          
          return {
            currentStep: Math.min(state.currentStep + 1, maxSteps)
          };
        });
      },

      prevStep: () => {
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1)
        }));
      },

      setStep: (step: number) => {
        set({ currentStep: step });
      },

      completeStep: (stepId: string) => {
        set((state) => {
          if (state.registrationType === 'user') {
            const updatedOnboarding = {
              ...state.userOnboarding,
              completedSteps: [...state.userOnboarding.completedSteps, stepId],
              pendingSteps: state.userOnboarding.pendingSteps.filter(s => s !== stepId)
            };
            return { userOnboarding: updatedOnboarding };
          } else {
            const updatedOnboarding = {
              ...state.vendorOnboarding,
              completedSteps: [...state.vendorOnboarding.completedSteps, stepId],
              pendingSteps: state.vendorOnboarding.pendingSteps.filter(s => s !== stepId)
            };
            return { vendorOnboarding: updatedOnboarding };
          }
        });
      },

      resetRegistration: () => {
        set({
          userRegistration: {},
          userOnboarding: initialUserOnboarding,
          vendorRegistration: {},
          vendorOnboarding: initialVendorOnboarding,
          registrationType: null,
          currentStep: 1,
        });
      },

      submitRegistration: async () => {
        const state = get();
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (state.registrationType === 'user') {
          set((state) => ({
            userOnboarding: {
              ...state.userOnboarding,
              status: 'pending_review',
              currentStep: state.userOnboarding.totalSteps
            }
          }));
        } else {
          set((state) => ({
            vendorOnboarding: {
              ...state.vendorOnboarding,
              status: 'pending_review',
              currentStep: state.vendorOnboarding.totalSteps
            }
          }));
        }
      },
    }),
    {
      name: 'registration-storage',
    }
  )
);

// Helper functions
export const getUserSteps = (language: 'en' | 'ar'): RegistrationStep[] => [
  {
    id: 'basic_info',
    title: language === 'en' ? 'Basic Information' : 'المعلومات الأساسية',
    description: language === 'en' ? 'Personal details and contact info' : 'التفاصيل الشخصية ومعلومات الاتصال',
    isCompleted: false,
    isActive: true,
    isDisabled: false,
    icon: 'user'
  },
  {
    id: 'personal_details',
    title: language === 'en' ? 'Personal Details' : 'التفاصيل الشخصية',
    description: language === 'en' ? 'Identity and address information' : 'معلومات الهوية والعنوان',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'id-card'
  },
  {
    id: 'preferences',
    title: language === 'en' ? 'Preferences' : 'التفضيلات',
    description: language === 'en' ? 'Energy goals and property type' : 'أهداف الطاقة ونوع العقار',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'settings'
  },
  {
    id: 'verification',
    title: language === 'en' ? 'Verification' : 'التحقق',
    description: language === 'en' ? 'Email and phone verification' : 'التحقق من البريد والهاتف',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'shield-check'
  },
  {
    id: 'documents',
    title: language === 'en' ? 'Documents' : 'المستندات',
    description: language === 'en' ? 'Upload required documents' : 'رفع المستندات المطلوبة',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'file-text'
  }
];

export const getVendorSteps = (language: 'en' | 'ar'): RegistrationStep[] => [
  {
    id: 'company_info',
    title: language === 'en' ? 'Company Information' : 'معلومات الشركة',
    description: language === 'en' ? 'Basic company details' : 'تفاصيل الشركة الأساسية',
    isCompleted: false,
    isActive: true,
    isDisabled: false,
    icon: 'building'
  },
  {
    id: 'business_details',
    title: language === 'en' ? 'Business Details' : 'تفاصيل الأعمال',
    description: language === 'en' ? 'Registration and licensing info' : 'معلومات التسجيل والترخيص',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'clipboard'
  },
  {
    id: 'location_services',
    title: language === 'en' ? 'Location & Services' : 'الموقع والخدمات',
    description: language === 'en' ? 'Service areas and capabilities' : 'مناطق الخدمة والقدرات',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'map-pin'
  },
  {
    id: 'financial_info',
    title: language === 'en' ? 'Financial Information' : 'المعلومات المالية',
    description: language === 'en' ? 'Banking and payment details' : 'تفاصيل البنك والدفع',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'credit-card'
  },
  {
    id: 'documents',
    title: language === 'en' ? 'Documents' : 'المستندات',
    description: language === 'en' ? 'Upload required documents' : 'رفع المستندات المطلوبة',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'file-text'
  },
  {
    id: 'admin_review',
    title: language === 'en' ? 'Admin Review' : 'مراجعة الإدارة',
    description: language === 'en' ? 'Awaiting admin approval' : 'في انتظار موافقة الإدارة',
    isCompleted: false,
    isActive: false,
    isDisabled: true,
    icon: 'user-check'
  }
];
