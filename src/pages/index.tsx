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