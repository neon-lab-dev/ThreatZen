import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages";
import { About } from "../components/site/About (1)";
import { Contact } from "../components/site/Contact (1)";
import { Partners } from "../components/site/Partners (1)";
import PrivacyPolicy from "../pages/privacy";
import { Solutions } from "../components/site/Solutions (1)";
import TermsAndConditions from "../pages/terms";
import CaseStudy from "../pages/case-studies";
import Industry from "../pages/industries";
import { Services } from "../components/site/Services (1)";
import Blogs from "../pages/blogs";
import BlogDetails from "../pages/BlogDetails";
import AddBlog from "../pages/AddBlog";
import ComplianceServices from "../pages/ComplianceServices";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/case-study",
        element: <CaseStudy />,
      },
      {
        path: "/industries",
        element: <Industry />,
      },
      {
        path: "/partners",
        element: <Partners />,
      },
      {
        path: "/solutions",
        element: <Solutions />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/add/blog",
        element: <AddBlog />,
      },
      {
        path: "/compliance-services",
        element: <ComplianceServices />,
      },
    ],
  },
]);
