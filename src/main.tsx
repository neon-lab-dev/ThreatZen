import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { router } from "./routes/routes";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
  <HelmetProvider>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      richColors
      closeButton
    />
    </HelmetProvider>
  </>
);