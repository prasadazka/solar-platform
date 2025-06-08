export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'vendor' | 'admin';
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
  onboardingStatus: OnboardingStatus;
  profileCompleteness: number;
}

export interface OnboardingStatus {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  pendingSteps: string[];
  status: 'incomplete' | 'pending_review' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface UserRegistrationData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Personal Details
  dateOfBirth?: string;
  nationalId?: string;
  city: string;
  address: string;
  
  // Step 3: Preferences
  languagePreference: 'en' | 'ar';
  energyGoals: string[];
  propertyType: 'residential' | 'commercial' | 'industrial';
  
  // Step 4: Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsUploaded: boolean;
}

export interface VendorRegistrationData {
  // Step 1: Company Info
  companyName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Step 2: Business Details
  commercialRegistration: string;
  vatNumber: string;
  licenseNumber: string;
  establishedYear: string;
  companySize: string;
  
  // Step 3: Location & Services
  headOfficeAddress: string;
  serviceAreas: string[];
  serviceTypes: string[];
  certifications: string[];
  
  // Step 4: Financial Info
  iban: string;
  bankName: string;
  accountHolder: string;
  
  // Step 5: Documents
  documents: UploadedDocument[];
  
  // Step 6: Verification Status
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsVerified: boolean;
  adminApproved: boolean;
}

export interface UploadedDocument {
  id: string;
  type: 'commercial_registration' | 'vat_certificate' | 'sec_license' | 'saso_certificate' | 'insurance' | 'portfolio';
  fileName: string;
  fileUrl: string;
  uploadDate: Date;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
  icon: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'user' | 'vendor' | 'admin';
}

export interface SolarCalculatorInput {
  monthlyBill: number;
  roofArea: number;
  location: string;
  electricityRate: number;
  systemType: 'grid-tied' | 'off-grid' | 'hybrid';
}

export interface SolarCalculatorResult {
  systemSize: number;
  annualSavings: number;
  paybackPeriod: number;
  co2Reduction: number;
  totalCost: number;
  monthlyPayment: number;
  roiPercentage: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  specifications: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface VendorProfile {
  id: string;
  companyName: string;
  licenseNumber: string;
  serviceAreas: string[];
  rating: number;
  completedProjects: number;
  certifications: string[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface Project {
  id: string;
  customerId: string;
  vendorId: string;
  status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  systemSize: number;
  totalCost: number;
  installationDate: Date;
  completionDate?: Date;
  address: string;
  progress: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalProjects: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeProjects: number;
}

// Vendor-specific interfaces for new actions
export interface VendorQuoteRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyType: 'residential' | 'commercial' | 'industrial';
  propertyAddress: string;
  systemSize?: number;
  monthlyBill: number;
  roofArea: number;
  electricityUsage: number;
  preferredInstallationDate?: string;
  description?: string;
  submittedAt: string;
  urgency: 'low' | 'medium' | 'high';
  budget?: {
    min: number;
    max: number;
  };
  attachments?: string[];
}

export interface VendorQuoteResponse {
  id: string;
  vendorId: string;
  requestId: string;
  systemSize: number;
  totalPrice: number;
  pricePerKW: number;
  monthlyPayment: number;
  installationTimeframe: number; // weeks
  warranty: number; // years
  installationDate: string;
  equipmentBrand: string;
  panelType: string;
  inverterType: string;
  highlights: string[];
  terms: string;
  validUntil: string;
  includedServices: string[];
  paymentTerms: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  submittedAt?: string;
}

export interface VendorProject {
  id: string;
  vendorId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  propertyAddress: string;
  propertyType: string;
  systemSize: number;
  totalValue: number;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  startDate: string;
  expectedCompletion: string;
  actualCompletion?: string;
  milestones: ProjectMilestone[];
  urgency: 'low' | 'medium' | 'high';
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  completedDate?: string;
  assignedTo: string;
  photos?: string[];
  notes?: string;
}

export interface VendorProfile {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  website?: string;
  establishedYear: string;
  employeeCount: string;
  serviceAreas: string[];
  specializations: string[];
  certifications: VendorCertification[];
  completedProjects: number;
  customerRating: number;
  responseTime: string;
  isVerified: boolean;
  isActive: boolean;
}

export interface VendorCertification {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate: string;
  verified: boolean;
  documentUrl?: string;
}