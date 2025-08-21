import {
  faBookmark,
  faBoxesPacking,
  faCertificate,
  faMagnifyingGlass,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { throttle } from "lodash";
import secondLogo from "@assets/images/secondLogo.png";
import MobileNavbarSearch from "@components/navbar/MobileNavbarSearch";

const MobileTopMenu = () => {
  const [searchModal, setSearchModal] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setHideMenu(true);
      } else {
        setHideMenu(false);
      }
      lastScrollY = currentScrollY;
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return (
    <div
      className={`md:hidden ${
        hideMenu
          ? "-translate-y-full duration-300 ease-in-out transition-all"
          : "translate-y-0 duration-300 ease-in-out transition-all "
      }  flex flex-col justify-center items-center sticky top-0 
      shadow-md shadow-gray-600/70 z-50 font-EstedadMedium bg-gray-100 w-full text-gray-600 p-0.5 overflow-y-auto`}
    >
      <Link to="/">
        <img
          src={secondLogo}
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
          to={"/my-favorite"}
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
          className="w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
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
      {searchModal && <MobileNavbarSearch />}
    </div>
  );
};

export default MobileTopMenu;
