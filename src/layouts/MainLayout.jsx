import { Outlet } from "react-router-dom";
import TopMenu from "@components/navbar/TopMenu";
import Footer from "@layouts/Footer";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import MobileNav from "@components/navbar/MobileNav";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const MainLayout = () => {
  // show scroll to top button if scroll more than screen
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        document.getElementById("scrollToTop").style.display = "block";
      } else {
        document.getElementById("scrollToTop").style.display = "none";
      }
    });
  }, []);
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
        <div className="max-w-[95vw] xl:max-w-[80vw] mx-auto">
          <Outlet />
        </div>
      </div>
      {/* scroll to top */}
      <button
        id="scrollToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-0 right-8 z-50 hidden lg:block p-0 m-0
        
        "
      >
        <FontAwesomeIcon icon={faChevronUp} className="text-2xl bg-black/60 text-white px-5 py-3  rounded-t-2xl hover:bg-green-700 transation-all duration-300 ease-in-out" />
      </button>
      <div
        className="md:hidden fixed h-[8vh] bottom-0 w-full bg-CarbonicBlue-500 rounded-t-lg"
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
