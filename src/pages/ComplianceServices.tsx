import React from "react";
import { Helmet } from "react-helmet-async";
import ComplianceHero from "../components/ComplianceServicesPage/ComplianceHero";
import TrustedBy from "../components/ComplianceServicesPage/TrustedBy";
import ComplianceTabs from "../components/ComplianceServicesPage/ComplianceTabs";
import WhyChooseUs from "../components/ComplianceServicesPage/WhyChooseUs";
import StatsStrip from "../components/ComplianceServicesPage/StatsStrip";
import { Contact } from "../components/site/Contact (1)";
import CTASection from "../components/ComplianceServicesPage/CTASection";

const ComplianceServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Compliance Services | ISO 27001, SOC 2, DORA & GDPR India</title>
        <meta
          name="description"
          content="ThreatZen simplifies compliance across ISO 27001, SOC 2, GDPR, DPDP, HIPAA, PCI DSS, DORA & the EU AI Act. One accountable partner, audit-ready always."
        />
        <link
          rel="canonical"
          href="https://www.threatzen.in/compliance-services"
        />
      </Helmet>

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
