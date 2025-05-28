import { useContext } from "react";
import { FaHome } from "react-icons/fa";

import { Link } from "react-router-dom";
import UserContext from "@context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faCartShopping,
  faGift,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons";

const MobileNav = () => {
  const { user, cart } = useContext(UserContext);
  return (
    <div className="w-full h-full rotate-180 shadow-black/10 shadow-xl relative">
      <div className="w-full h-full rotate-180 text-white flex flex-row justify-between items-center font-EstedadMedium">
        <div className="w-full grid grid-cols-6 justify-center items-center place-items-stretch h-full">
          <Link
            
            to={"/products"}
            className="flex flex-col items-center space-y-1.5"
          >
            <FontAwesomeIcon icon={faGift} />
            {/* <span className="text-xs">فروشگاه</span> */}
          </Link>
          <Link
            to={"/categories"}
            className="flex flex-col items-center space-y-1 col-span-1 justify-self-center text-center"
          >
            <FontAwesomeIcon icon={faBoxesStacked} />
            {/* <span className="text-xs">دسته بندی</span> */}
          </Link>
          <div className="col-span-2"></div>
          <Link
            
            to={"/shopping-cart"}
            className="flex flex-col items-center py-2"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            {cart?.length > 0 && (
              <span className="absolute px-2 py-1.5 text-xs font-bold leading-none text-center text-white transform translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm top-2 bg-Amber-500 hover:bg-BrightOrange-500 shadow-Silver-900 animate-bounce">
                {cart?.length}
              </span>
            )}
            {/* <span className="text-xs">سبد خرید</span> */}
          </Link>

          {user?.Name !== undefined && user?.UToken !== undefined ? (
            <Link
              
              to={"/profile"}
              className="flex flex-col items-center "
            >
              <FontAwesomeIcon icon={faIdCardClip} />
              <span className="text-xs">{user?.Name.split(" ", 1)}</span>
            </Link>
          ) : (
            <Link
              
              to={"/login"}
              className="flex flex-col items-center"
            >
              <FontAwesomeIcon icon={faIdCardClip} />
              {/* <span className="text-xs">ورود</span> */}
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white w-20 h-20 rounded-full absolute -bottom-4 border-2 border-CarbonicBlue-500 shadow-xl rotate-180 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
        <Link
          
          to={"/"}
          className="text-3xl flex flex-col items-center justify-center text-CarbonicBlue-500"
        >
          <FaHome />
          <span className="text-sm font-EstedadMedium">خانه</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
