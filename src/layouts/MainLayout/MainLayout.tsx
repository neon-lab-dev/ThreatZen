import { Outlet } from "react-router-dom";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";

const MainLayout = () => {
  return (
    <div className="bg-background-5">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
