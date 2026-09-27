import { Helmet } from 'react-helmet-async';
import { Industries } from "../components/site/Industries (1)";
import { CTA } from "../components/site/CTA";

const Industry = () => {
  return (
    <div className="pt-24">
      <Helmet>
        <title>Cybersecurity for Regulated Industries | ThreatZen</title>
        <meta
          name="description"
          content="Regulation doesn't look the same in a bank as it does in a hospital, and it definitely doesn't look the same in a school. Yet most cybersecurity providers hand every client the same audit checklist and call it compliance. ThreatZen's approach starts from the opposite direction — we build around the specific rules, risks, and regulators your sector actually answers to."
        />
        <link rel="canonical" href="https://www.threatzen.in/industries" />
      </Helmet>

      <Industries />
      <CTA />
    </div>
  );
};

export default Industry;