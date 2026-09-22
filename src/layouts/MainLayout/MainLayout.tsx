import { Outlet } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="bg-background-5">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
