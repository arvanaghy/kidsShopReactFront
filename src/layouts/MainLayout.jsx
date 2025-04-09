import { Outlet } from "react-router-dom";
import TopMenu from "@components/navbar/TopMenu";
import Footer from "@layouts/Footer";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import MobileNav from "@components/navbar/MobileNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full ">
      <TopMenu />
      <div className="min-h-[90vh] bg-gray-50 ">
        <Toaster
          toastOptions={{
            className: "font-EstedadMedium",
            duration: 9000,
            position: "bottom-right",
            style: {
              background: "#333",
              color: "#fff",
              border: "1px solid #333",
              fontSize: "0.8rem",
            },
          }}
        />
        <Outlet />
      </div>
      <div
        className="lg:hidden fixed h-[8vh] bottom-0 w-full bg-CarbonicBlue-500 rounded-t-lg"
        style={{ zIndex: 9999 }}
      >
        <MobileNav />
      </div>
      <div className="min-h-[20vh]">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
