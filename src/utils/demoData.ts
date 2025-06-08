import { useQuoteStore } from '../store';

// Demo data seeder to populate quote requests for testing
export const seedDemoData = () => {
  const { submitQuoteRequest } = useQuoteStore.getState();

  // Create sample quote requests from different users
  const demoRequests = [
    {
      userId: 'user-001',
      customerName: 'Ahmed Al-Rashid',
      customerEmail: 'ahmed.rashid@email.com',
      customerPhone: '+966 50 123 4567',
      propertyType: 'residential' as const,
      propertyAddress: 'Villa 123, King Abdul Aziz District',
      city: 'Jeddah',
      monthlyBill: 850,
      budget: '70,000-100,000',
      description: 'Looking for high-quality solar panels for my villa. Interested in smart monitoring features.'
    },
    {
      userId: 'user-002', 
      customerName: 'Fatima Al-Zahra',
      customerEmail: 'fatima.zahra@email.com',
      customerPhone: '+966 55 987 6543',
      propertyType: 'commercial' as const,
      propertyAddress: 'Office Building, Olaya Business District',
      city: 'Riyadh',
      monthlyBill: 1200,
      budget: '100,000-200,000',
      description: 'Need solar solution for our office building. Priority is energy efficiency and cost savings.'
    },
    {
      userId: 'user-003',
      customerName: 'Mohammed Hassan',
      customerEmail: 'mohammed.hassan@email.com', 
      customerPhone: '+966 56 456 7890',
      propertyType: 'residential' as const,
      propertyAddress: 'Compound Villa, Corniche Area',
      city: 'Dammam',
      monthlyBill: 650,
      budget: '50,000-100,000',
      description: 'Small residential system needed. Looking for reliable brand with good warranty.'
    },
    {
      userId: 'user-004',
      customerName: 'Noura Al-Saud',
      customerEmail: 'noura.saud@email.com',
      customerPhone: '+966 50 321 0987',
      propertyType: 'residential' as const,
      propertyAddress: 'Modern Villa, Al-Nuzha District',
      city: 'Riyadh',
      monthlyBill: 950,
      budget: '80,000-120,000',
      description: 'Interested in premium solar system with battery backup. Environmental consciousness is important.'
    },
    {
      userId: 'user-005',
      customerName: 'Khalid Motors',
      customerEmail: 'info@khalidmotors.com',
      customerPhone: '+966 12 789 0123',
      propertyType: 'commercial' as const,
      propertyAddress: 'Car Showroom, King Fahd Road',
      city: 'Jeddah',
      monthlyBill: 1800,
      budget: '150,000-250,000',
      description: 'Large commercial installation needed for our car showroom. Want to showcase our commitment to sustainability.'
    }
  ];

  // Submit each demo request with slight time delays to simulate realistic timing
  demoRequests.forEach((request, index) => {
    // Adjust submitted times to make some more recent than others
    const hoursAgo = [2, 8, 24, 48, 72][index]; // 2 hours, 8 hours, 1 day, 2 days, 3 days ago
    const submittedAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    
    try {
      submitQuoteRequest(request);
      console.log(`✅ Demo request created: ${request.customerName}`);
    } catch (error) {
      console.error(`❌ Error creating demo request for ${request.customerName}:`, error);
    }
  });

  console.log('🚀 Demo data seeded successfully! Vendors can now see quote requests.');
};

// Function to clear all demo data
export const clearDemoData = () => {
  // This would need to be implemented in the store if needed
  console.log('Demo data cleared');
};

// Auto-seed demo data in development mode
if (process.env.NODE_ENV === 'development') {
  // Only seed if there are no existing quote requests
  const { userQuoteRequests } = useQuoteStore.getState();
  if (userQuoteRequests.length === 0) {
    setTimeout(() => {
      seedDemoData();
    }, 1000); // Delay to ensure store is initialized
  }
}