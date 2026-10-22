import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import CookieConsent from "../../components/CookieConsent/CookieConsent";



// Breadcrumbs Schema (Global)
const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "About Us",
      item: "https://www.threatzen.in/about",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Career",
      item: "https://www.threatzen.in/career",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Cybersecurity service",
      item: "https://www.threatzen.in/security-services",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Cybersecurity compliance",
      item: "https://www.threatzen.in/compliance-services",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Blogs",
      item: "https://www.threatzen.in/blogs",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Contact ThreatZen",
      item: "https://www.threatzen.in/contact",
    },
  ],
};

const MainLayout = () => {
  return (
    <div className="bg-background-5">
      <Helmet>
       
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        {/* Open Graph Defaults */}
        <meta
          property="og:title"
          content="ThreatZen™ | VAPT, Compliance & Managed Security India"
        />
        <meta
          property="og:site_name"
          content="ThreatZen™ — Next-Gen Cyber Resilience"
        />
        <meta property="og:url" content="https://www.threatzen.in/" />
        <meta
          property="og:description"
          content="ThreatZen delivers VAPT, ISO 27001 & SOC 2 compliance, and managed security for startups and enterprises across India. Book a free risk consultation."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.threatzen.in/assets/favicon-DkWsy0RU.png"
        />
      </Helmet>
      <CookieConsent />

      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
