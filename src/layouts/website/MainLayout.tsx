import { Outlet } from "react-router-dom";
import TopMenu from "@components/navbar/TopMenu";
import Footer from "@layouts/website/Footer";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import MobileNav from "@components/navbar/MobileNav";
import { useEffect } from "react";

import MobileTopMenu from "@components/navbar/MobileTopMenu";
import ScrollToTop from "@components/ScrollToTop";
import { useCartStore } from "@store/CartStore";
import { useUserStore } from "@store/UserStore";
import useCompareStore from "@store/CompareStore";
import { useFavoriteStore } from "@store/FavoriteStore";
import ToTopButton from "@components/layout/ToTopButton";
import ContactModal from "@components/layout/ContactModal";

const MainLayout = () => {


  const { refreshCart } = useCartStore();
  const { refreshUser } = useUserStore();
  const { refreshCompare } = useCompareStore();
  const { refreshFavorite } = useFavoriteStore();

  function handleStorageChange(e: any) {
    if (e.key === "KidsShop_cart") {
      refreshCart();
    }
    if (e.key === "KidsShop_user") {
      refreshUser();
    }
    if (e.key === "KidsShop_compare") {
      refreshCompare();
    }
    if (e.key === "KidsShop_favorite") {
      refreshFavorite();
    }
  }

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <ScrollToTop />
      <TopMenu />
      <MobileTopMenu />
      <div className="min-h-[90vh]">
        <Toaster
          toastOptions={{
            className: "font-EstedadLight text-xs leading-loose tracking-wide",
            duration: 6000,
            position: "top-center",
          }}
        />
        <div className="max-w-[95vw] xl:max-w-[80vw] mx-auto">
          <Outlet />
        </div>
      </div>
      <ContactModal />
      <ToTopButton />
      <div
        className="md:hidden fixed h-[8vh] bottom-0 w-full bg-gray-500 rounded-t-lg"
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
