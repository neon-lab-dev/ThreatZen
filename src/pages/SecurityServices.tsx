import React from 'react';
import SecurityHero from '../components/SecurityServicesPage/SecurityHero';
import SecuritySectors from '../components/SecurityServicesPage/SecuritySectors';
import ManagedServices from '../components/SecurityServicesPage/ManagedServices';
import SecurityFAQ from '../components/SecurityServicesPage/SecurityFAQ';
import CTASection from '../components/ComplianceServicesPage/CTASection';

const SecurityServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SecurityHero />
      <SecuritySectors />
      <ManagedServices />
      <SecurityFAQ />
      <CTASection />
    </div>
  );
};

export default SecurityServices;