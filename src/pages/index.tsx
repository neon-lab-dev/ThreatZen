import { Helmet } from "react-helmet-async";
// import { CaseStudies } from "../components/site/CaseStudies";
import { Clients } from "../components/site/Clients";
import { Compliance } from "../components/site/Compliance";
import { CTA } from "../components/site/CTA";
import { Hero } from "../components/site/Hero";
import { Industries } from "../components/site/Industries (1)";
import { Partners } from "../components/site/Partners (1)";
import { Services } from "../components/site/Services (1)";
import { Stats } from "../components/site/Stats";

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is built in Windows Defender enough for a business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For very small, low risk businesses it can be a reasonable baseline. Larger businesses typically need the deeper visibility EDR provides.",
      },
    },
    {
      "@type": "Question",
      name: "Is EDR overkill for a twenty to fifty person company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Data sensitivity and compliance matter more than headcount.",
      },
    },
    {
      "@type": "Question",
      name: "Is VAPT required for ISO 27001 or SOC 2?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both expect regular security testing as part of risk management, and VAPT is one of the most common ways to demonstrate it.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a firewall and an intrusion prevention system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A firewall controls what traffic is allowed based on rules, while intrusion prevention actively blocks suspicious behavior within that allowed traffic.",
      },
    },
    {
      "@type": "Question",
      name: "What cybersecurity frameworks and standards do you follow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We align with ISO 27001, SOC 2, NIST CSF, CIS Controls, DPDP Act 2023, GDPR, HIPAA, PCI DSS, and SEBI CSCRF. Our team maps controls across frameworks to reduce duplication.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries are most at risk of cyberattacks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Finance, healthcare, legal, manufacturing, and technology face the highest risk — but any organization holding sensitive data is a target. We tailor our approach to your specific industry and regulatory landscape.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a SAQ and a formal QSA audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Self Assessment Questionnaire suits businesses below certain volume thresholds, while a QSA audit involves independent, external verification for higher volume merchants.",
      },
    },
  ],
};

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ThreatZen™ | VAPT, Compliance & Managed Security India</title>
        <meta
          name="description"
          content="ThreatZen delivers VAPT, ISO 27001 & SOC 2 compliance, and managed security for startups and enterprises across India. Book a free risk consultation."
        />
        <link rel="canonical" href="https://www.threatzen.in/" />

        {/*FAQ Schema Injection */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main>
        <Hero />
        <Industries />
        <Services />
        <Stats />
        <Partners />
        <Compliance />
        {/* <CaseStudies /> */}
        <Clients />
        <CTA />
      </main>
    </div>
  );
};

export default Home;
