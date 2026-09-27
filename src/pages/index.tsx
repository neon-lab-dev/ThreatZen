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
