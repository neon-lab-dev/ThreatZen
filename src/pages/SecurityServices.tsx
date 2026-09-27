import React from "react";
import SecurityHero from "../components/SecurityServicesPage/SecurityHero";
import SecuritySectors from "../components/SecurityServicesPage/SecuritySectors";
import ManagedServices from "../components/SecurityServicesPage/ManagedServices";
import SecurityFAQ from "../components/SecurityServicesPage/SecurityFAQ";
import CTASection from "../components/ComplianceServicesPage/CTASection";
import { Helmet } from "react-helmet-async";

const SecurityServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>VAPT & Cybersecurity Services India | ThreatZen</title>
        <meta
          name="description"
          content="ThreatZen delivers VAPT, penetration testing & managed cybersecurity services across India. ISO 27001 certified experts securing startups & enterprises."
        />
        <link
          rel="canonical"
          href="https://www.threatzen.in/security-services"
        />
      </Helmet>
      <SecurityHero />
      <SecuritySectors />
      <ManagedServices />
      <SecurityFAQ />
      <CTASection />
    </div>
  );
};

export default SecurityServices;
