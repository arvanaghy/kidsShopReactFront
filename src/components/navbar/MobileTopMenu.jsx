import {
  faBookmark,
  faBoxesPacking,
  faCertificate,
  faMagnifyingGlass,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import secondLogo from "@assets/images/secondLogo.png";
import MobileNavbarSearch from "@components/navbar/MobileNavbarSearch";
import { useNavbarVisibility } from "@hooks/useMenu";

const MobileTopMenu = () => {
  const isNavbarVisible = useNavbarVisibility(true, 500);
  const [searchModal, setSearchModal] = useState(false);

  return (
    <div
      className={`md:hidden ${
        !isNavbarVisible
          ? "-translate-y-full duration-300 ease-in-out transition-all"
          : "translate-y-0 duration-300 ease-in-out transition-all "
      }  flex flex-col justify-center items-center sticky top-0 
      shadow-md shadow-gray-600/70 z-50 font-EstedadMedium bg-gray-100 w-full text-gray-600 p-0.5 overflow-y-auto`}
    >
      <Link to="/">
        <img
          src={secondLogo}
          alt="لوگو کیدزشاپ"
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
          className="w-fit flex flex-col justify-center items-center
        space-y-1.5
            "
          title="مقایسه محصولات"
        >
          <FontAwesomeIcon
            icon={faRestroom}
            className="p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all"
          />
          <p className="text-xs line-clamp-1"> مقایسه محصولات</p>
        </Link>
        <Link
          to={"/my-favorite"}
          className="w-fit flex flex-col justify-center items-center space-y-1.5
            "
          title="علاقه مندی ها"
        >
          <FontAwesomeIcon
            icon={faBookmark}
            className=" p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all"
          />
          <p className="text-xs line-clamp-1"> علاقه مندی </p>
        </Link>
        <Link
          to={"/offered-products"}
          className="
             w-fit flex flex-col justify-center items-center
             space-y-1.5
             "
          title="محصولات ویژه"
        >
          <FontAwesomeIcon
            icon={faCertificate}
            className=" p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all"
          />
          <span className="text-xs line-clamp-1">حراجی</span>
        </Link>
        <Link
          to={"/best-selling-products"}
          className="w-fit flex flex-col justify-center items-center space-y-1.5
             "
          title="پرفروش ترین ها"
        >
          <FontAwesomeIcon
            icon={faBoxesPacking}
            className="p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all"
          />
          <p className="text-xs line-clamp-1">پرفروش ترین</p>
        </Link>
        <button
          onClick={() => setSearchModal((prev) => !prev)}
          className="w-fit flex flex-col justify-center items-center 
          space-y-1.5
        "
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="p-1.5 bg-gray-600 rounded-md text-gray-50
        hover:bg-gray-900 duration-300 ease-in-out transition-all"
          />
          <p className="text-xs line-clamp-1">جستجو</p>
        </button>
      </div>
      {searchModal && <MobileNavbarSearch setSearchModal={setSearchModal} />}
    </div>
  );
};

export default MobileTopMenu;
