import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Upload,
  FileText,
  Check,
  X,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Plus,
  Camera,
  Paperclip
} from 'lucide-react';
import { useThemeStore } from '../../store';

interface Document {
  id: string;
  type: 'national_id' | 'address_proof' | 'income_certificate' | 'electricity_bill' | 'property_deed' | 'bank_statement';
  name: string;
  fileName: string;
  fileSize: string;
  uploadDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  isRequired: boolean;
  description: string;
  acceptedFormats: string[];
  maxSize: string;
  preview?: string;
}

const DocumentManagement: React.FC = () => {
  const { language } = useThemeStore();
  const navigate = useNavigate();
  
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [showPreview, setShowPreview] = useState<Document | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      type: 'national_id',
      name: language === 'en' ? 'National ID' : 'الهوية الوطنية',
      fileName: 'national_id_scan.pdf',
      fileSize: '2.1 MB',
      uploadDate: new Date('2024-01-15'),
      status: 'approved',
      isRequired: true,
      description: language === 'en' ? 'Clear scan of your National ID (both sides)' : 'مسح واضح للهوية الوطنية (الوجهين)',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5 MB',
      preview: '/api/documents/national_id_preview.jpg'
    },
    {
      id: '2',
      type: 'electricity_bill',
      name: language === 'en' ? 'Electricity Bill' : 'فاتورة الكهرباء',
      fileName: 'electricity_bill_dec2024.pdf',
      fileSize: '1.8 MB',
      uploadDate: new Date('2024-01-20'),
      status: 'pending',
      isRequired: true,
      description: language === 'en' ? 'Latest 3 months electricity bills' : 'فواتير الكهرباء لآخر 3 أشهر',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5 MB'
    },
    {
      id: '3',
      type: 'address_proof',
      name: language === 'en' ? 'Address Proof' : 'إثبات العنوان',
      fileName: '',
      fileSize: '',
      uploadDate: new Date(),
      status: 'rejected',
      rejectionReason: language === 'en' ? 'Document is unclear, please upload a higher quality image' : 'المستند غير واضح، يرجى تحميل صورة بجودة أعلى',
      isRequired: true,
      description: language === 'en' ? 'Bank statement or utility bill showing your address' : 'كشف حساب بنكي أو فاتورة خدمات تظهر عنوانك',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5 MB'
    }
  ]);

  const documentTypes = [
    {
      type: 'income_certificate',
      name: language === 'en' ? 'Income Certificate' : 'شهادة الدخل',
      description: language === 'en' ? 'Salary certificate or business income proof' : 'شهادة راتب أو إثبات دخل تجاري',
      isRequired: false,
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5 MB'
    },
    {
      type: 'property_deed',
      name: language === 'en' ? 'Property Deed' : 'صك الملكية',
      description: language === 'en' ? 'Official property ownership document' : 'وثيقة ملكية العقار الرسمية',
      isRequired: false,
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5 MB'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return language === 'en' ? 'Approved' : 'موافق عليه';
      case 'rejected':
        return language === 'en' ? 'Rejected' : 'مرفوض';
      case 'pending':
        return language === 'en' ? 'Under Review' : 'قيد المراجعة';
      default:
        return language === 'en' ? 'Not Uploaded' : 'غير محمل';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'rejected':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleFileUpload = async (file: File, documentType: string) => {
    const documentId = Math.random().toString(36).substr(2, 9);
    setUploadProgress(prev => ({ ...prev, [documentId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[documentId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [documentId]: currentProgress + 10 };
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadProgress(prev => {
      const { [documentId]: _, ...rest } = prev;
      return rest;
    });

    const newDocument: Document = {
      id: documentId,
      type: documentType as any,
      name: documentTypes.find(dt => dt.type === documentType)?.name || '',
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date(),
      status: 'pending',
      isRequired: documentTypes.find(dt => dt.type === documentType)?.isRequired || false,
      description: documentTypes.find(dt => dt.type === documentType)?.description || '',
      acceptedFormats: documentTypes.find(dt => dt.type === documentType)?.acceptedFormats || [],
      maxSize: documentTypes.find(dt => dt.type === documentType)?.maxSize || '5 MB'
    };

    setDocuments(prev => [...prev, newDocument]);
  };

  const calculateCompletionRate = () => {
    const requiredDocs = documents.filter(doc => doc.isRequired);
    const approvedRequiredDocs = requiredDocs.filter(doc => doc.status === 'approved');
    return requiredDocs.length > 0 ? (approvedRequiredDocs.length / requiredDocs.length) * 100 : 0;
  };

  const deleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
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
                {language === 'en' ? 'Document Management' : 'إدارة المستندات'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Upload and manage your verification documents'
                  : 'ارفع وأدر مستندات التحقق الخاصة بك'
                }
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <div className="text-right rtl:text-left">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {Math.round(calculateCompletionRate())}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'en' ? 'Completion Rate' : 'معدل الإكمال'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Completion Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {language === 'en' ? 'Verification Progress' : 'تقدم التحقق'}
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {documents.filter(doc => doc.isRequired && doc.status === 'approved').length} / {documents.filter(doc => doc.isRequired).length} {language === 'en' ? 'Required' : 'مطلوب'}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${calculateCompletionRate()}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {documents.filter(doc => doc.status === 'approved').length} {language === 'en' ? 'Approved' : 'موافق عليه'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {documents.filter(doc => doc.status === 'pending').length} {language === 'en' ? 'Under Review' : 'قيد المراجعة'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {documents.filter(doc => doc.status === 'rejected').length} {language === 'en' ? 'Rejected' : 'مرفوض'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Document List */}
        <div className="space-y-6">
          {documents.map((document, index) => (
            <motion.div
              key={document.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="card p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                    <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {document.name}
                        {document.isRequired && (
                          <span className="text-red-500 ml-1 rtl:ml-0 rtl:mr-1">*</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {document.description}
                      </p>
                    </div>
                  </div>

                  {document.fileName && (
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-300">
                        <Paperclip className="w-4 h-4" />
                        <span>{document.fileName}</span>
                        <span>•</span>
                        <span>{document.fileSize}</span>
                        <span>•</span>
                        <span>{document.uploadDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {getStatusIcon(document.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                      {getStatusText(document.status)}
                    </span>
                  </div>

                  {document.status === 'rejected' && document.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        <strong>{language === 'en' ? 'Rejection Reason:' : 'سبب الرفض:'}</strong> {document.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6 rtl:lg:ml-0 rtl:lg:mr-6 flex flex-wrap gap-2">
                  {document.fileName ? (
                    <>
                      <button className="btn-secondary flex items-center space-x-2 rtl:space-x-reverse">
                        <Download className="w-4 h-4" />
                        <span>{language === 'en' ? 'Download' : 'تحميل'}</span>
                      </button>
                      
                      <button
                        onClick={() => deleteDocument(document.id)}
                        className="btn-secondary text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{language === 'en' ? 'Delete' : 'حذف'}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedDocument(document)}
                      className="btn-primary flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{language === 'en' ? 'Upload' : 'رفع'}</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;