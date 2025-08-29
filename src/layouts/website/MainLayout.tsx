import { Outlet } from "react-router-dom";
import TopMenu from "@components/navbar/TopMenu";
import Footer from "@layouts/website/Footer";
import toast, { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import MobileNav from "@components/navbar/MobileNav";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faSquarePhoneFlip,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import MobileTopMenu from "@components/navbar/MobileTopMenu";
import axios from "axios";
import ScrollToTop from "@components/ScrollToTop";
import { useCartStore } from "@store/CartStore";
import { useUserStore } from "@store/UserStore";
import useCompareStore from "@store/CompareStore";
import { useFavoriteStore } from "@store/FavoriteStore";

const MainLayout = () => {
  const [contactWithUsModal, setContactWithUsModal] = useState(false);
  const contactWithUsModalRef = useRef(null);
  const contactWithUsButtonRef = useRef(null);

  const { refreshCart } = useCartStore();
  const { refreshUser } = useUserStore();
  const { refreshCompare } = useCompareStore();
  const { refreshFavorite } = useFavoriteStore();

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function handleStorageChange(e : any) {
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
    const handleOutsideClick = (event) => {
      if (
        contactWithUsModalRef.current &&
        contactWithUsButtonRef.current &&
        !contactWithUsModalRef.current.contains(event.target) &&
        !contactWithUsButtonRef.current.contains(event.target)
      ) {
        setContactWithUsModal(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

  const contactWithUsFromSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post(
        "https://api.kidsshop110.ir/api/v1/contact-us",
        {
          info: e.target.info.value,
          contact: e.target.contact.value,
          message: e.target.message.value,
        }
      );
      if (status !== 200) throw new Error(data?.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setContactWithUsModal(false);
      e.target.reset();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <ScrollToTop />
      <TopMenu />
      <MobileTopMenu />
      <div className="min-h-[90vh]">
        <Toaster
          toastOptions={{
            className: "font-EstedadMedium",
            duration: 9000,
            position: "top-center",
          }}
        />
        <div className="max-w-[95vw] xl:max-w-[80vw] mx-auto">
          <Outlet />
        </div>
      </div>
      {/* contact with us pop up */}
      <button
        ref={contactWithUsButtonRef}
        onClick={() => {
          setContactWithUsModal((prev) => !prev);
        }}
        className="fixed bottom-[12vh] md:bottom-[8vh] right-4 md:right-10 z-30 p-0 m-0"
      >
        <FontAwesomeIcon
          icon={faSquarePhoneFlip}
          className={`text-6xl opacity-90 lg:opacity-70
          duration-300 ease-in-out transition-all
        ${contactWithUsModal
              ? "text-green-800 hover:text-green-500"
              : "text-green-500 hover:text-green-700"
            }
          `}
        />
      </button>
      <form
        ref={contactWithUsModalRef}
        onSubmit={(e) => contactWithUsFromSubmit(e)}
        className={`fixed
          
          bottom-[20vh] right-4
          md:bottom-[18vh] md:right-10 z-30 p-3 bg-gray-100 shadow-md shadow-gray-300 rounded-lg flex flex-col justify-center items-center gap-2
          ${contactWithUsModal ? "" : "hidden"}
          `}
      >
        <div className="w-full flex flex-row items-center justify-between">
          <h2 className="font-EstedadExtraBold tracking-wide leading-relaxed py-0.5 text-center w-fit">
            ارتباط با ما
          </h2>
          <button
            onClick={() => setContactWithUsModal(false)}
            className="p-1 w-fit
          hover:text-red-500 transition-all duration-300 ease-in-out
          "
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <input
          required
          type="text"
          name="info"
          placeholder="نام خود را وارد کنید"
          className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight "
        />
        <input
          required
          type="number"
          min={0}
          minLength={10}
          name="contact"
          placeholder="شماره موبایل خود را وارد کنید"
          className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight "
        />
        <textarea
          name="message"
          placeholder="پیام خود را وارد کنید"
          className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight "
        />

        <button
          className="w-full py-2 px-3 rounded-lg shadow-md shadow-gray-300 font-EstedadLight
        text-white
        bg-green-500 hover:bg-green-700 duration-300 ease-in-out
        transition-all
        
        "
        >
          ارسال درخواست
        </button>
      </form>
      {/* scroll to top */}
      <button
        id="scrollToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-[7vh] right-4 md:bottom-0 md:right-8 z-50 p-0 m-0"
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          className="
        text-lg  px-2 py-2
        md:text-2xl md:px-5 md:py-3
         
         bg-black/60 text-white   rounded-t-2xl hover:bg-green-700 transaction-all duration-300 ease-in-out"
        />
      </button>
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
