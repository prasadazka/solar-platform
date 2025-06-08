import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Building, 
  Wallet, 
  Smartphone, 
  CheckCircle, 
  Clock,
  Shield,
  ArrowRight,
  Percent,
  Calendar,
  Star
} from 'lucide-react';

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'available' | 'approved' | 'processing' | 'unavailable';
  interestRate?: string;
  processingTime: string;
  features: string[];
  color: string;
}

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteAmount: number;
  vendorName: string;
  language: 'en' | 'ar';
  onSelectPayment: (paymentMethod: string, paymentData?: any) => void;
}

const PaymentOptionsModal: React.FC<PaymentOptionsModalProps> = ({
  isOpen,
  onClose,
  quoteAmount,
  vendorName,
  language,
  onSelectPayment
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const paymentOptions: PaymentOption[] = [
    {
      id: 'bnpl_approved',
      name: language === 'en' ? 'BNPL - Pre-Approved' : 'التمويل المؤجل - معتمد مسبقاً',
      description: language === 'en' ? 'Your BNPL application is approved!' : 'طلب التمويل المؤجل معتمد!',
      icon: CheckCircle,
      status: 'approved',
      interestRate: '0%',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      features: [
        language === 'en' ? '0% Interest Rate' : 'معدل فائدة 0%',
        language === 'en' ? '24 Month Terms' : '24 شهر',
        language === 'en' ? 'No Hidden Fees' : 'بدون رسوم خفية'
      ],
      color: 'emerald'
    },
    {
      id: 'bnpl_new',
      name: language === 'en' ? 'BNPL - Apply Now' : 'التمويل المؤجل - تقدم الآن',
      description: language === 'en' ? 'Buy now, pay in installments' : 'اشتر الآن وادفع بالتقسيط',
      icon: Calendar,
      status: 'available',
      interestRate: '0%',
      processingTime: language === 'en' ? '1-2 days' : '1-2 يوم',
      features: [
        language === 'en' ? '0% Interest' : 'بدون فوائد',
        language === 'en' ? 'Quick Approval' : 'موافقة سريعة',
        language === 'en' ? 'Flexible Terms' : 'شروط مرنة'
      ],
      color: 'blue'
    },
    {
      id: 'bank_finance',
      name: language === 'en' ? 'Bank Financing' : 'التمويل البنكي',
      description: language === 'en' ? 'Traditional bank loan' : 'قرض بنكي تقليدي',
      icon: Building,
      status: 'available',
      interestRate: '3.5%',
      processingTime: language === 'en' ? '5-7 days' : '5-7 أيام',
      features: [
        language === 'en' ? 'Lower Interest Rate' : 'معدل فائدة أقل',
        language === 'en' ? 'Longer Terms Available' : 'مدد أطول متاحة',
        language === 'en' ? 'Established Banks' : 'بنوك معروفة'
      ],
      color: 'indigo'
    },
    {
      id: 'cash_payment',
      name: language === 'en' ? 'Cash Payment' : 'الدفع النقدي',
      description: language === 'en' ? 'Pay full amount upfront' : 'دفع المبلغ كاملاً مقدماً',
      icon: Wallet,
      status: 'available',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      features: [
        language === 'en' ? '5% Cash Discount' : '5% خصم نقدي',
        language === 'en' ? 'No Interest' : 'بدون فوائد',
        language === 'en' ? 'Immediate Installation' : 'تركيب فوري'
      ],
      color: 'green'
    },
    {
      id: 'digital_wallet',
      name: language === 'en' ? 'Digital Wallet' : 'المحفظة الرقمية',
      description: language === 'en' ? 'STCPay, Mada, Apple Pay' : 'اس تي سي باي، مدى، أبل باي',
      icon: Smartphone,
      status: 'available',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      features: [
        language === 'en' ? 'Quick & Secure' : 'سريع وآمن',
        language === 'en' ? 'Multiple Wallets' : 'محافظ متعددة',
        language === 'en' ? '2% Cashback' : '2% استرداد نقدي'
      ],
      color: 'purple'
    },
    {
      id: 'credit_card',
      name: language === 'en' ? 'Credit Card' : 'بطاقة ائتمانية',
      description: language === 'en' ? 'Visa, Mastercard, Mada' : 'فيزا، ماستركارد، مدى',
      icon: CreditCard,
      status: 'available',
      processingTime: language === 'en' ? 'Instant' : 'فوري',
      features: [
        language === 'en' ? 'Installment Options' : 'خيارات تقسيط',
        language === 'en' ? 'Reward Points' : 'نقاط مكافآت',
        language === 'en' ? 'Purchase Protection' : 'حماية المشتريات'
      ],
      color: 'orange'
    }
  ];

  const getStatusBadge = (status: PaymentOption['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            <CheckCircle className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
            {language === 'en' ? 'Approved' : 'معتمد'}
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
            <Clock className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
            {language === 'en' ? 'Processing' : 'قيد المعالجة'}
          </span>
        );
      case 'unavailable':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
            {language === 'en' ? 'Unavailable' : 'غير متاح'}
          </span>
        );
      default:
        return null;
    }
  };

  const handleSelectPayment = (option: PaymentOption) => {
    setSelectedPayment(option.id);
    
    // Calculate payment details based on option
    let paymentData = {
      method: option.id,
      amount: quoteAmount,
      vendor: vendorName
    };

    switch (option.id) {
      case 'cash_payment':
        paymentData.amount = quoteAmount * 0.95; // 5% discount
        break;
      case 'bnpl_approved':
        paymentData = {
          ...paymentData,
          monthlyPayment: Math.round(quoteAmount / 24),
          term: 24
        };
        break;
      case 'bnpl_new':
        // Will redirect to application
        break;
    }

    setTimeout(() => {
      onSelectPayment(option.id, paymentData);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {language === 'en' ? 'Choose Payment Method' : 'اختر طريقة الدفع'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {language === 'en' 
                        ? `Total: ${quoteAmount.toLocaleString()} SAR for ${vendorName}`
                        : `المجموع: ${quoteAmount.toLocaleString()} ريال لـ ${vendorName}`
                      }
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Payment Options */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedPayment === option.id;
                    const isApproved = option.status === 'approved';
                    
                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? `border-${option.color}-500 bg-${option.color}-50 dark:bg-${option.color}-900/20 shadow-lg`
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        } ${isApproved ? 'ring-2 ring-green-500' : ''}`}
                        onClick={() => handleSelectPayment(option)}
                      >
                        {isApproved && (
                          <div className="absolute -top-2 -right-2">
                            <Star className="w-6 h-6 text-yellow-500 fill-current" />
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 bg-${option.color}-100 dark:bg-${option.color}-900/30 rounded-xl flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${option.color}-600 dark:text-${option.color}-400`} />
                          </div>
                          {getStatusBadge(option.status)}
                        </div>

                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {option.name}
                        </h4>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {option.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          {option.interestRate && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-300">
                                {language === 'en' ? 'Interest Rate:' : 'معدل الفائدة:'}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {option.interestRate}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">
                              {language === 'en' ? 'Processing:' : 'المعالجة:'}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {option.processingTime}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {option.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                              <div className={`w-1.5 h-1.5 bg-${option.color}-500 rounded-full mr-2 rtl:mr-0 rtl:ml-2`}></div>
                              {feature}
                            </div>
                          ))}
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center"
                          >
                            <div className="bg-white dark:bg-gray-800 rounded-full p-2">
                              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentOptionsModal;