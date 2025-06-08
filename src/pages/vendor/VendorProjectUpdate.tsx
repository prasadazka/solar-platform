import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { useThemeStore } from '../../store';

const VendorProjectUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { language } = useThemeStore();

  const [formData, setFormData] = useState({
    status: 'in_progress',
    progress: 65,
    expectedCompletion: '2024-12-15',
    notes: '',
    currentMilestone: 'installation'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'pending', label: language === 'en' ? 'Pending' : 'في الانتظار' },
    { value: 'in_progress', label: language === 'en' ? 'In Progress' : 'قيد التنفيذ' },
    { value: 'completed', label: language === 'en' ? 'Completed' : 'مكتمل' },
    { value: 'on_hold', label: language === 'en' ? 'On Hold' : 'معلق' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(language === 'en' ? 'Project updated successfully!' : 'تم تحديث المشروع بنجاح!');
    setIsSubmitting(false);
    navigate(`/vendor/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="mb-6">
            <button
              onClick={() => navigate(`/vendor/projects/${projectId}`)}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'en' ? 'Back to Project Details' : 'العودة لتفاصيل المشروع'}</span>
            </button>
          </div>

          <h1 className="text-3xl font-bold gradient-text mb-4">
            {language === 'en' ? 'Update Project' : 'تحديث المشروع'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'en' ? 'Update project status, progress, and other details' : 'تحديث حالة المشروع والتقدم والتفاصيل الأخرى'}
          </p>
        </motion.div>

        {/* Update Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Update */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Project Status' : 'حالة المشروع'}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="input-field"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Progress Update */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Progress Percentage' : 'نسبة التقدم'}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>0%</span>
                  <span className="font-medium text-emerald-600">{formData.progress}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Expected Completion Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Expected Completion Date' : 'تاريخ الإنجاز المتوقع'}
              </label>
              <input
                type="date"
                value={formData.expectedCompletion}
                onChange={(e) => setFormData({...formData, expectedCompletion: e.target.value})}
                className="input-field"
              />
            </div>

            {/* Progress Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {language === 'en' ? 'Progress Notes' : 'ملاحظات التقدم'}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={4}
                className="input-field"
                placeholder={language === 'en' ? 'Add notes about current progress, challenges, or updates...' : 'أضف ملاحظات حول التقدم الحالي أو التحديات أو التحديثات...'}
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center space-x-2 rtl:space-x-reverse flex-1"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>{isSubmitting ? (language === 'en' ? 'Updating...' : 'جاري التحديث...') : (language === 'en' ? 'Update Project' : 'تحديث المشروع')}</span>
              </button>
              
              <button
                type="button"
                onClick={() => navigate(`/vendor/projects/${projectId}`)}
                className="btn-secondary"
              >
                {language === 'en' ? 'Cancel' : 'إلغاء'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorProjectUpdate;