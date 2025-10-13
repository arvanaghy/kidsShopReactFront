import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faCartShopping,
  faHouse,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useUserStore } from "@store/UserStore";
import { useCartStore } from "@store/CartStore";
import { toPersianDigits } from "@utils/numeralHelpers";

const MobileNav = () => {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  return (
    <div className="w-full h-full rotate-180 shadow-black/10 shadow-xl relative">
      <div className="w-full h-full rotate-180 text-white flex flex-row justify-between items-center font-EstedadMedium">
        <div className="w-full grid grid-cols-6 justify-center items-center place-items-stretch h-full">
          <Link
            to={"/products"}
            className="flex flex-col items-center space-y-1.5"
          >
            <FontAwesomeIcon icon={faStore} />
            <span className="text-xs line-clamp-1">محصولات</span>
          </Link>
          <Link
            to={"/categories"}
            className="flex flex-col items-center space-y-1.5 col-span-1 justify-self-center text-center"
          >
            <FontAwesomeIcon icon={faBoxesStacked} />
            <span className="text-xs line-clamp-1">دسته بندی</span>
          </Link>
          <div className="col-span-2"></div>
          <Link
            to={"/shopping-cart"}
            className="flex flex-col items-center space-y-1.5 col-span-1 justify-self-center text-center"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="text-xs">سبد خرید</span>
            {cart?.length > 0 && (
              <span className="absolute px-2 py-1.5 text-xs font-bold leading-none text-center text-white transform translate-x-1/2 -translate-y-/2 rounded-full shadow top-1 bg-fuchsia-700/90 hover:bg-fuchsia-700 shadow-purple-500 animate-bounce">
                {toPersianDigits(cart?.length)}
              </span>
            )}
          </Link>

          {user?.Name ? (
            <Link
              to={"/login"}
              className="flex flex-col items-center space-y-1.5 col-span-1 justify-self-center text-center "
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="text-xs line-clamp-1">
                {user?.Name.split(" ", 1)}
              </span>
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="flex flex-col items-center space-y-1.5 col-span-1 justify-self-center text-center "
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="text-xs line-clamp-1">حساب کاربری</span>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white w-20 h-20 rounded-full absolute -bottom-4 border-2 border-CarbonicBlue-500 shadow-xl rotate-180 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
        <Link
          to={"/"}
          className="text-3xl flex flex-col items-center justify-center text-CarbonicBlue-500"
        >
          <FontAwesomeIcon icon={faHouse} />
          <span className="text-sm font-EstedadMedium line-clamp-1">خانه</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
