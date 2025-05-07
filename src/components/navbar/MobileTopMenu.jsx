import {
  faBookmark,
  faBoxesPacking,
  faCertificate,
  faMagnifyingGlass,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const MobileTopMenu = () => {
  const [searchModal, setSearchModal] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const mobileTopMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handelScrollUp = (event) => {
      if (event.deltaY > 0) {
        setHideMenu(true);
      } else {
        setHideMenu(false);
      }
    };

    window.addEventListener("wheel", handelScrollUp);
    return () => {
      window.removeEventListener("wheel", handelScrollUp);
    };
  }, [mobileTopMenuRef]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setHideMenu(true);
      } else {
        setHideMenu(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileTopMenuRef]);

  const letsSearch = (e) => {
    e.preventDefault();
    try {
      const searchPhrase = e.target.search.value;
      if (searchPhrase?.length <= 0)
        throw new Error("نام کالای مورد نظر را وارد کنید");
      e.target.search.value = "";
      navigate(`/products?search=${searchPhrase}`);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setSearchModal(false);
    }
  };

  return (
    <div
      ref={mobileTopMenuRef}
      className={`md:hidden ${
        hideMenu
          ? "-translate-y-full duration-300 ease-in-out transition-all"
          : "translate-y-0 duration-300 ease-in-out transition-all "
      }  flex flex-col justify-center items-center sticky top-0 
      shadow-md shadow-gray-600/70 z-50 font-EstedadMedium bg-gray-100 w-full text-gray-600 p-0.5`}
    >
      <Link to="/">
        <img
          src="https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
          alt="Logo"
          className="h-16 w-full object-scale-down
        py-1.5"
        />
      </Link>
      <div
        className="w-full flex flex-row justify-between
        items-center p-1.5 "
      >
        <Link
          to={"/compare-products"}
          className="w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all
            "
          title="مقایسه محصولات"
        >
          <FontAwesomeIcon icon={faRestroom} />
        </Link>
        <Link
          to={"/my-favourite"}
          className="w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all
            "
          title="علاقه مندی ها"
        >
          <FontAwesomeIcon icon={faBookmark} />
        </Link>
        <Link
          to={"/offered-products"}
          className="
             w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all
             "
          title="محصولات ویژه"
        >
          <FontAwesomeIcon icon={faCertificate} />
        </Link>
        <Link
          to={"/best-selling-products"}
          className="
             w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all
             "
          title="پرفروش ترین ها"
        >
          <FontAwesomeIcon icon={faBoxesPacking} />
        </Link>
        <button
          onClick={() => setSearchModal((prev) => !prev)}
          className="w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all
        "
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      {searchModal && (
        <form
          onSubmit={letsSearch}
          className="w-full flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50 gap-1
        hover:bg-gray-900 duration-300 ease-in-out transition-all
        z-50"
        >
          <input
            type="text"
            name="search"
            placeholder="عنوان محصول ..."
            className="w-full bg-gray-100 text-gray-700 rounded-md p-1.5 text-xs"
          />
          <button
            type="submit"
            className="w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
            font-EstedadLight
            text-xs
        hover:bg-gray-900 duration-300 ease-in-out transition-all
        "
          >
            جستجو
          </button>
        </form>
      )}
    </div>
  );
};

export default MobileTopMenu;
