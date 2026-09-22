import React from 'react';
import ComplianceHero from '../components/ComplianceServicesPage/ComplianceHero';
import TrustedBy from '../components/ComplianceServicesPage/TrustedBy';
import ComplianceTabs from '../components/ComplianceServicesPage/ComplianceTabs';
import WhyChooseUs from '../components/ComplianceServicesPage/WhyChooseUs';
import StatsStrip from '../components/ComplianceServicesPage/StatsStrip';
import { Contact } from '../components/site/Contact (1)';
import CTASection from '../components/ComplianceServicesPage/CTASection';

const ComplianceServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <ComplianceHero />
      <TrustedBy />
      <ComplianceTabs />
      <StatsStrip />
      <WhyChooseUs />
      <Contact />
      <CTASection />
    </div>
  );
};

export default ComplianceServices;