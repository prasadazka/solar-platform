import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types for the quote system
export interface UserQuoteRequest {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  propertyType: 'residential' | 'commercial' | 'industrial';
  propertyAddress: string;
  city: string;
  monthlyBill: number;
  budget: string;
  systemSize?: number;
  roofArea?: number;
  description?: string;
  submittedAt: string;
  status: 'pending' | 'active' | 'completed';
  urgency: 'low' | 'medium' | 'high';
  quotesReceived: number;
  quotesRequested: number;
  vendorResponses: VendorQuoteResponse[];
}

export interface VendorQuoteResponse {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  vendorPhone: string;
  vendorEmail: string;
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
  submittedAt: string;
  vendorInfo?: {
    phone: string;
    email: string;
    address: string;
    licenseNumber: string;
    experience: string;
    specializations: string[];
  };
}

// Dummy data generator
const generateDummyData = (userId: string): { requests: UserQuoteRequest[], responses: VendorQuoteResponse[] } => {
  const dummyResponses: VendorQuoteResponse[] = [
    {
      id: 'resp-001',
      vendorId: 'vendor-001',
      vendorName: 'Alpha Solar Solutions',
      vendorRating: 4.8,
      vendorPhone: '+966-11-234-5678',
      vendorEmail: 'contact@alphasolar.sa',
      requestId: 'req-001',
      systemSize: 8.5,
      totalPrice: 45000,
      pricePerKW: 5294,
      monthlyPayment: 850,
      installationTimeframe: 2,
      warranty: 25,
      installationDate: '2025-07-15',
      equipmentBrand: 'Tier 1 Equipment',
      panelType: 'Monocrystalline',
      inverterType: 'String Inverter',
      highlights: ['25-year warranty', 'Free maintenance', 'Monitoring app'],
      terms: 'Standard installation terms apply',
      validUntil: '2025-07-01',
      includedServices: ['Installation', 'Maintenance', 'Monitoring'],
      paymentTerms: 'BNPL available',
      status: 'submitted',
      submittedAt: '2025-06-01T10:00:00Z'
    },
    {
      id: 'resp-002',
      vendorId: 'vendor-002',
      vendorName: 'Green Energy KSA',
      vendorRating: 4.6,
      vendorPhone: '+966-11-345-6789',
      vendorEmail: 'info@greenenergy.sa',
      requestId: 'req-001',
      systemSize: 9.0,
      totalPrice: 48000,
      pricePerKW: 5333,
      monthlyPayment: 900,
      installationTimeframe: 3,
      warranty: 20,
      installationDate: '2025-07-20',
      equipmentBrand: 'Premium Solar',
      panelType: 'Bifacial',
      inverterType: 'Power Optimizer',
      highlights: ['20-year warranty', 'Premium equipment', 'Smart monitoring'],
      terms: 'Professional installation included',
      validUntil: '2025-06-30',
      includedServices: ['Installation', 'Smart monitoring', 'Annual cleaning'],
      paymentTerms: 'Multiple payment options',
      status: 'submitted',
      submittedAt: '2025-06-02T14:30:00Z'
    },
    {
      id: 'resp-003',
      vendorId: 'vendor-003',
      vendorName: 'Solar Tech Arabia',
      vendorRating: 4.9,
      vendorPhone: '+966-11-456-7890',
      vendorEmail: 'sales@solartech.sa',
      requestId: 'req-001',
      systemSize: 8.0,
      totalPrice: 42000,
      pricePerKW: 5250,
      monthlyPayment: 800,
      installationTimeframe: 2,
      warranty: 25,
      installationDate: '2025-07-10',
      equipmentBrand: 'SolarMax Pro',
      panelType: 'Monocrystalline',
      inverterType: 'Hybrid Inverter',
      highlights: ['Best value', 'Fast installation', 'Hybrid system'],
      terms: 'Complete turnkey solution',
      validUntil: '2025-07-05',
      includedServices: ['Installation', 'Grid connection', 'Performance guarantee'],
      paymentTerms: 'Flexible financing',
      status: 'submitted',
      submittedAt: '2025-06-03T09:15:00Z'
    },
    {
      id: 'resp-004',
      vendorId: 'vendor-004',
      vendorName: 'Riyadh Solar Co.',
      vendorRating: 4.7,
      vendorPhone: '+966-11-567-8901',
      vendorEmail: 'projects@riyadhsolar.sa',
      requestId: 'req-002',
      systemSize: 12.0,
      totalPrice: 65000,
      pricePerKW: 5416,
      monthlyPayment: 1200,
      installationTimeframe: 4,
      warranty: 25,
      installationDate: '2025-08-01',
      equipmentBrand: 'Commercial Grade',
      panelType: 'High Efficiency',
      inverterType: 'Central Inverter',
      highlights: ['Commercial grade', 'High efficiency', 'Extended warranty'],
      terms: 'Commercial installation standards',
      validUntil: '2025-07-15',
      includedServices: ['Installation', 'O&M contract', 'Performance monitoring'],
      paymentTerms: 'Business financing available',
      status: 'submitted',
      submittedAt: '2025-05-28T16:45:00Z'
    },
    {
      id: 'resp-005',
      vendorId: 'vendor-005',
      vendorName: 'Eco Power Systems',
      vendorRating: 4.5,
      vendorPhone: '+966-11-678-9012',
      vendorEmail: 'support@ecopower.sa',
      requestId: 'req-002',
      systemSize: 10.0,
      totalPrice: 55000,
      pricePerKW: 5500,
      monthlyPayment: 1000,
      installationTimeframe: 3,
      warranty: 20,
      installationDate: '2025-07-25',
      equipmentBrand: 'EcoPro Series',
      panelType: 'Polycrystalline',
      inverterType: 'Micro Inverter',
      highlights: ['Eco-friendly', 'Micro inverters', 'Smart grid ready'],
      terms: 'Eco-friendly installation',
      validUntil: '2025-07-10',
      includedServices: ['Installation', 'Eco certification', 'Grid tie'],
      paymentTerms: 'Green financing options',
      status: 'submitted',
      submittedAt: '2025-05-30T11:20:00Z'
    },
    {
      id: 'resp-006',
      vendorId: 'vendor-006',
      vendorName: 'Saudi Solar Excellence',
      vendorRating: 4.6,
      vendorPhone: '+966-11-789-0123',
      vendorEmail: 'info@saudisolar.sa',
      requestId: 'req-003',
      systemSize: 6.5,
      totalPrice: 35000,
      pricePerKW: 5384,
      monthlyPayment: 700,
      installationTimeframe: 2,
      warranty: 25,
      installationDate: '2025-07-20',
      equipmentBrand: 'Saudi Pro Series',
      panelType: 'Monocrystalline',
      inverterType: 'String Inverter',
      highlights: ['Made in KSA', 'Local support', 'Fast response'],
      terms: 'Local installation and support',
      validUntil: '2025-07-15',
      includedServices: ['Installation', 'Local warranty', '24/7 support'],
      paymentTerms: 'Saudi financing available',
      status: 'submitted',
      submittedAt: '2025-06-01T12:00:00Z'
    },
    {
      id: 'resp-007',
      vendorId: 'vendor-007',
      vendorName: 'Gulf Energy Solutions',
      vendorRating: 4.4,
      vendorPhone: '+966-11-890-1234',
      vendorEmail: 'quotes@gulfenergy.sa',
      requestId: 'req-003',
      systemSize: 7.0,
      totalPrice: 38000,
      pricePerKW: 5428,
      monthlyPayment: 750,
      installationTimeframe: 3,
      warranty: 20,
      installationDate: '2025-08-01',
      equipmentBrand: 'Gulf Power Series',
      panelType: 'Bifacial',
      inverterType: 'Power Optimizer',
      highlights: ['High efficiency', 'Weather resistant', 'Extended warranty'],
      terms: 'Professional installation with warranty',
      validUntil: '2025-07-20',
      includedServices: ['Installation', 'Monitoring system', 'Maintenance'],
      paymentTerms: 'Flexible payment plans',
      status: 'submitted',
      submittedAt: '2025-06-02T09:30:00Z'
    }
  ];

  const dummyRequests: UserQuoteRequest[] = [
    {
      id: 'req-001',
      userId: userId,
      customerName: 'Ahmed Al-Mansouri',
      customerEmail: 'ahmed@email.com',
      customerPhone: '+966-50-123-4567',
      propertyType: 'residential',
      propertyAddress: 'Al Olaya District, Villa 45, Prince Sultan Road',
      city: 'Riyadh',
      monthlyBill: 850,
      budget: '40,000 - 50,000 SAR',
      systemSize: 8,
      roofArea: 120,
      description: 'Looking for a high-quality solar system for my villa. Interested in battery backup options.',
      submittedAt: '2025-05-30T08:00:00Z',
      status: 'active',
      urgency: 'high',
      quotesReceived: 3,
      quotesRequested: 5,
      vendorResponses: dummyResponses.filter(r => r.requestId === 'req-001')
    },
    {
      id: 'req-002',
      userId: userId,
      customerName: 'Fatima Al-Zahra',
      customerEmail: 'fatima@business.com',
      customerPhone: '+966-50-234-5678',
      propertyType: 'commercial',
      propertyAddress: 'King Fahd Road, Office Complex Building A',
      city: 'Jeddah',
      monthlyBill: 1200,
      budget: '60,000 - 80,000 SAR',
      systemSize: 12,
      roofArea: 200,
      description: 'Commercial building needs solar installation. Looking for maximum efficiency and quick ROI.',
      submittedAt: '2025-05-28T14:30:00Z',
      status: 'active',
      urgency: 'medium',
      quotesReceived: 2,
      quotesRequested: 4,
      vendorResponses: dummyResponses.filter(r => r.requestId === 'req-002')
    },
    {
      id: 'req-003',
      userId: userId,
      customerName: 'Mohammed Al-Rashid',
      customerEmail: 'mohammed@home.sa',
      customerPhone: '+966-50-345-6789',
      propertyType: 'residential',
      propertyAddress: 'Al Andalus District, House 78, Abdullah Road',
      city: 'Dammam',
      monthlyBill: 650,
      budget: '30,000 - 40,000 SAR',
      systemSize: 6,
      roofArea: 90,
      description: 'Small residential system for family home. Budget conscious but want quality equipment.',
      submittedAt: '2025-05-29T16:45:00Z',
      status: 'active',
      urgency: 'low',
      quotesReceived: 2,
      quotesRequested: 4,
      vendorResponses: dummyResponses.filter(r => r.requestId === 'req-003')
    },
    {
      id: 'req-004',
      userId: userId,
      customerName: 'Sarah Al-Otaibi',
      customerEmail: 'sarah@residence.sa',
      customerPhone: '+966-50-456-7890',
      propertyType: 'residential',
      propertyAddress: 'Al Malqa District, Villa 123, Northern Ring Road',
      city: 'Riyadh',
      monthlyBill: 750,
      budget: '35,000 - 45,000 SAR',
      systemSize: 7,
      roofArea: 110,
      description: 'Modern villa with good roof space. Interested in smart monitoring and energy management.',
      submittedAt: '2025-06-02T10:15:00Z',
      status: 'pending',
      urgency: 'medium',
      quotesReceived: 0,
      quotesRequested: 4,
      vendorResponses: []
    },
    {
      id: 'req-005',
      userId: userId,
      customerName: 'Khalid Al-Dosari',
      customerEmail: 'khalid@enterprise.sa',
      customerPhone: '+966-50-567-8901',
      propertyType: 'industrial',
      propertyAddress: 'Industrial City, Warehouse Complex 7',
      city: 'Jubail',
      monthlyBill: 2500,
      budget: '100,000+ SAR',
      systemSize: 25,
      roofArea: 500,
      description: 'Large industrial facility requiring comprehensive solar solution. Need detailed engineering study.',
      submittedAt: '2025-06-01T13:20:00Z',
      status: 'pending',
      urgency: 'high',
      quotesReceived: 0,
      quotesRequested: 6,
      vendorResponses: []
    }
  ];

  return { requests: dummyRequests, responses: dummyResponses };
};

interface QuoteStore {
  userQuoteRequests: UserQuoteRequest[];
  vendorQuoteResponses: VendorQuoteResponse[];
  isInitialized: boolean;
  
  // Initialize dummy data
  initializeDummyData: (userId: string) => void;
  clearAndReinitialize: (userId: string) => void;
  
  // User actions
  submitQuoteRequest: (request: Omit<UserQuoteRequest, 'id' | 'submittedAt' | 'quotesReceived' | 'vendorResponses'>) => string;
  getUserQuoteRequests: (userId: string) => UserQuoteRequest[];
  
  // Vendor actions  
  getAvailableQuoteRequests: (vendorId?: string) => UserQuoteRequest[];
  submitVendorQuote: (quote: Omit<VendorQuoteResponse, 'id' | 'submittedAt'>) => void;
  getVendorQuoteResponses: (vendorId: string) => VendorQuoteResponse[];
  
  // Shared actions
  getQuoteRequestById: (requestId: string) => UserQuoteRequest | undefined;
  acceptVendorQuote: (requestId: string, responseId: string) => void;
  rejectVendorQuote: (requestId: string, responseId: string) => void;
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      userQuoteRequests: [],
      vendorQuoteResponses: [],
      isInitialized: false,

      // Clear existing data and reinitialize (for development)
      clearAndReinitialize: (userId) => {
        set({
          userQuoteRequests: [],
          vendorQuoteResponses: [],
          isInitialized: false
        });
        get().initializeDummyData(userId);
      },

      // Initialize dummy data for demo
      initializeDummyData: (userId) => {
        if (get().isInitialized) return;
        
        const { requests, responses } = generateDummyData(userId);
        set({
          userQuoteRequests: requests,
          vendorQuoteResponses: responses,
          isInitialized: true
        });
      },

      // Submit a quote request from user
      submitQuoteRequest: (requestData) => {
        const newRequest: UserQuoteRequest = {
          ...requestData,
          id: `req-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          quotesReceived: 0,
          quotesRequested: 5, // Default to 5 vendors
          vendorResponses: [],
          status: 'pending',
          urgency: requestData.monthlyBill > 1000 ? 'high' : requestData.monthlyBill > 500 ? 'medium' : 'low'
        };

        set((state) => ({
          userQuoteRequests: [...state.userQuoteRequests, newRequest]
        }));

        return newRequest.id;
      },

      // Get quote requests for a specific user
      getUserQuoteRequests: (userId) => {
        // Initialize dummy data if needed
        if (!get().isInitialized) {
          get().initializeDummyData(userId);
        }
        return get().userQuoteRequests.filter(request => request.userId === userId);
      },

      // Get available quote requests for vendors (not yet responded to by this vendor)
      getAvailableQuoteRequests: (vendorId) => {
        const { userQuoteRequests, vendorQuoteResponses } = get();
        
        if (!vendorId) return userQuoteRequests.filter(req => req.status === 'pending');
        
        // Filter out requests this vendor has already responded to
        const vendorResponsedRequests = vendorQuoteResponses
          .filter(response => response.vendorId === vendorId)
          .map(response => response.requestId);
          
        return userQuoteRequests.filter(req => 
          req.status === 'pending' && !vendorResponsedRequests.includes(req.id)
        );
      },

      // Submit vendor quote response
      submitVendorQuote: (quoteData) => {
        const newResponse: VendorQuoteResponse = {
          ...quoteData,
          id: `quote-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          status: 'submitted'
        };

        set((state) => {
          // Add to vendor responses
          const updatedVendorResponses = [...state.vendorQuoteResponses, newResponse];
          
          // Update the original request with this response
          const updatedUserRequests = state.userQuoteRequests.map(request => {
            if (request.id === quoteData.requestId) {
              return {
                ...request,
                vendorResponses: [...request.vendorResponses, newResponse],
                quotesReceived: request.quotesReceived + 1,
                status: 'active' as const
              };
            }
            return request;
          });

          return {
            vendorQuoteResponses: updatedVendorResponses,
            userQuoteRequests: updatedUserRequests
          };
        });
      },

      // Get vendor's quote responses
      getVendorQuoteResponses: (vendorId) => {
        return get().vendorQuoteResponses.filter(response => response.vendorId === vendorId);
      },

      // Get specific quote request by ID
      getQuoteRequestById: (requestId) => {
        return get().userQuoteRequests.find(request => request.id === requestId);
      },

      // Accept a vendor quote
      acceptVendorQuote: (requestId, responseId) => {
        set((state) => {
          const updatedUserRequests = state.userQuoteRequests.map(request => {
            if (request.id === requestId) {
              const updatedResponses = request.vendorResponses.map(response => 
                response.id === responseId 
                  ? { ...response, status: 'accepted' as const }
                  : { ...response, status: 'rejected' as const }
              );
              return {
                ...request,
                vendorResponses: updatedResponses,
                status: 'completed' as const
              };
            }
            return request;
          });

          const updatedVendorResponses = state.vendorQuoteResponses.map(response => {
            if (response.requestId === requestId) {
              return {
                ...response,
                status: response.id === responseId ? 'accepted' as const : 'rejected' as const
              };
            }
            return response;
          });

          return {
            userQuoteRequests: updatedUserRequests,
            vendorQuoteResponses: updatedVendorResponses
          };
        });
      },

      // Reject a vendor quote
      rejectVendorQuote: (requestId, responseId) => {
        set((state) => {
          const updatedUserRequests = state.userQuoteRequests.map(request => {
            if (request.id === requestId) {
              const updatedResponses = request.vendorResponses.map(response => 
                response.id === responseId 
                  ? { ...response, status: 'rejected' as const }
                  : response
              );
              return {
                ...request,
                vendorResponses: updatedResponses
              };
            }
            return request;
          });

          const updatedVendorResponses = state.vendorQuoteResponses.map(response => 
            response.id === responseId 
              ? { ...response, status: 'rejected' as const }
              : response
          );

          return {
            userQuoteRequests: updatedUserRequests,
            vendorQuoteResponses: updatedVendorResponses
          };
        });
      }
    }),
    {
      name: 'quote-store',
    }
  )
);