import { About } from "../components/site/About (1)";
import { CaseStudies } from "../components/site/CaseStudies";
import { Clients } from "../components/site/Clients";
import { Compliance } from "../components/site/Compliance";
import { Contact } from "../components/site/Contact (1)";
import { CTA } from "../components/site/CTA";
import { Hero } from "../components/site/Hero";
import { Industries } from "../components/site/Industries (1)";
import { Partners } from "../components/site/Partners (1)";
import { Services } from "../components/site/Services (1)";
import { Solutions } from "../components/site/Solutions (1)";
import { Stats } from "../components/site/Stats";

const Home = () => {
  return (
     <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Partners />
        <About />
        <Services />
        <Solutions />
        <Stats />
        <Industries />
        <Compliance />
        <CaseStudies />
        <Clients />
        <CTA />
        <Contact />
      </main>
    </div>
  );
};

export default Home;