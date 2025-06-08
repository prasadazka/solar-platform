import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useThemeStore, useAuthStore } from './store';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import MultiStepRegistration from './pages/MultiStepRegistration';
import UserDashboard from './pages/UserDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SolarCalculator from './pages/SolarCalculator';
import Products from './pages/Products';
import UserProfile from './pages/UserProfile';
import Layout from './components/Layout';

// Quote Management
import QuoteManagement from './pages/quotes/QuoteManagement';
import QuoteRequest from './pages/quotes/QuoteRequest';
import QuoteSuccess from './pages/quotes/QuoteSuccess';
import UserQuoteManagement from './pages/quotes/UserQuoteManagement';

// Profile Management
import DocumentManagement from './pages/profile/DocumentManagement';
import PhoneVerification from './pages/profile/PhoneVerification';
import ProfileActivity from './pages/profile/ProfileActivity';

// Financing
import BNPLFinancing from './pages/financing/BNPLFinancing';
import BNPLApplication from './pages/financing/BNPLApplication';
import BNPLApplicationSuccess from './pages/financing/BNPLApplicationSuccess';
import BNPLStatus from './pages/financing/BNPLStatus';

// Additional Pages
import Reports from './pages/Reports';
import Maintenance from './pages/Maintenance';
import Settings from './pages/Settings';
import PaymentManagement from './pages/PaymentManagement';

// Payment Pages
import UserBNPLDashboard from './pages/payments/UserBNPLDashboard';
import EnhancedUserBNPLDashboard from './pages/payments/EnhancedUserBNPLDashboard';

// Vendor Actions
import { 
  VendorQuoteResponse, 
  VendorProjectManagement, 
  VendorProfileManagement, 
  VendorQuoteSuccess,
  VendorQuotesList,
  VendorAnalytics,
  VendorProjectDetails,
  VendorProjectUpdate,
  VendorProjectCompletion,
  VendorCustomerManagement,
  VendorInventoryManagement
} from './pages/vendor';

// Import separately for payments
import VendorPaymentDashboard from './pages/vendor/VendorPaymentDashboard';

// Admin Management Components
import {
  AdminUserManagement,
  AdminVendorApproval,
  AdminBNPLApproval,
  AdminAnalytics,
  AdminSystemSettings,
  AdminSecurityLogs,
  AdminSupportManagement
} from './pages/admin';


function App() {
  const { isDarkMode } = useThemeStore();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Protected Route component
  const ProtectedRoute: React.FC<{ 
    children: React.ReactNode; 
    allowedRoles?: string[] 
  }> = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  // Get dashboard based on user role
  const getDashboardComponent = () => {
    if (!user) return <Navigate to="/" replace />;
    
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 transition-colors duration-300">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          
          <Route path="/signup" element={<SignupPage />} />
          
          <Route path="/register/:type" element={<MultiStepRegistration />} />
          
          <Route path="/registration-success" element={
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🎉</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Registration Submitted!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Your application is now under review. We'll notify you once approved.
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="btn-primary"
                >
                  Return to Home
                </button>
              </div>
            </div>
          } />
          
          <Route path="/calculator" element={
            <Layout>
              <SolarCalculator />
            </Layout>
          } />
          
          <Route path="/products" element={
            <Layout>
              <Products />
            </Layout>
          } />

          {/* Quote Management Routes */}
          <Route path="/quotes" element={
            <ProtectedRoute>
              <Layout>
                <UserQuoteManagement />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/quotes/overview" element={
            <ProtectedRoute>
              <Layout>
                <QuoteManagement />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/quotes/request" element={
            <ProtectedRoute>
              <Layout>
                <QuoteRequest />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/quotes/success" element={
            <ProtectedRoute>
              <Layout>
                <QuoteSuccess />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Profile Management Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile/documents" element={
            <ProtectedRoute>
              <Layout>
                <DocumentManagement />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/verify/phone" element={
            <ProtectedRoute>
              <Layout>
                <PhoneVerification />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile/activity" element={
            <ProtectedRoute>
              <Layout>
                <ProfileActivity />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Financing Routes */}
          <Route path="/financing" element={
            <ProtectedRoute>
              <Layout>
                <BNPLFinancing />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/financing/application" element={
            <ProtectedRoute>
              <Layout>
                <BNPLApplication />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/financing/application-success" element={
            <ProtectedRoute>
              <Layout>
                <BNPLApplicationSuccess />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/financing/status" element={
            <ProtectedRoute>
              <Layout>
                <BNPLStatus />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Additional Feature Routes */}
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/maintenance" element={
            <ProtectedRoute>
              <Layout>
                <Maintenance />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/payments" element={
            <ProtectedRoute>
              <Layout>
                <PaymentManagement />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/payments/bnpl" element={
            <ProtectedRoute>
              <Layout>
                <EnhancedUserBNPLDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Vendor Routes */}
          <Route path="/vendor/profile" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorProfileManagement />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/projects" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorProjectManagement />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/quotes" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorQuotesList />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/quotes/respond/:requestId" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorQuoteResponse />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/quotes/success" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorQuoteSuccess />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/analytics" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorAnalytics />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/projects/:projectId" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorProjectDetails />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/projects/:projectId/update" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorProjectUpdate />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/projects/:projectId/completion" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorProjectCompletion />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/payments" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorPaymentDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/customers" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorCustomerManagement />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/vendor/inventory" element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <Layout>
                <VendorInventoryManagement />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminUserManagement />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/vendors" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminVendorApproval />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/bnpl" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminBNPLApproval />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/analytics" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminAnalytics />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/settings" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminSystemSettings />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/security" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminSecurityLogs />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/admin/support" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <AdminSupportManagement />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                {getDashboardComponent()}
              </Layout>
            </ProtectedRoute>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
