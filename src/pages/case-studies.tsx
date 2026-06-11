import { Clients } from '../components/site/Clients';
import { CaseStudies } from './../components/site/CaseStudies';

const CaseStudy = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
    <CaseStudies /><Clients />
    </div>
  );
};

export default CaseStudy;