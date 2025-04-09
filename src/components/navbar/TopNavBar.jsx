import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "@context/UserContext";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import logoImage from "@assets/images/HPE-self.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronUp,
  faIdCardClip,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const TopNavBar = () => {

    const [categories, setCatgeoires] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const { user, cart } = useContext(UserContext);
  
    const fetchCategories = async (_url) => {
      if (categoryLoading) return;
      try {
        setCategoryLoading(true);
        const { data, status } = await axios.get(_url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            cache: "no-cache",
          },
        });
  
        if (status !== 200) throw new Error(data?.message);
        setCatgeoires(data?.result?.categories);
      } catch (error) {
        toast.error(
          "لیست دسته بندی ها :  " + error?.response?.data?.message ||
            error?.message ||
            "خطا در اتصال"
        );
      } finally {
        setCategoryLoading(false);
      }
    };
  
    const navigation = [
      { title: "برگه نخست", path: "/" },
      {
        title: "دسته بندی ها",
        path: "#",
        navs: categories,
      },
      { title: "محصولات", path: "/products" },
      { title: "درباره کیدزشاپ", path: "/about-us" },
      { title: "تماس باما", path: "/contact-us" },
    ];
  
    useEffect(() => {
      if (!user) return;
      fetchCategories("https://kidsshopapi.electroshop24.ir/api/v2/top-menu");
    }, [user, cart]);

    

  return (
    <nav
      className={`block sticky top-0 shadow-md shadow-gray-700/70 z-50 font-EstedadMedium bg-CarbonicBlue-500 w-full`}
      style={{ zIndex: 9999 }}
    >
      <div
        className="flex flex-row items-center justify-around mx-auto
    lg:px-4 lg:max-w-screen-lg
    xl:px-6 xl:max-w-screen-2xl
    2xl:px-8 2xl:max-w-screen-3xl
    "
      >
        {/* logo img */}
        <div className="relative flex items-center justify-between   ">
          <div
            className="absolute w-full bg-white rounded-b-full 
        h-[18vh]
        sm:h-[18vh]
        lg:h-[15vh]
        xl:h-[15vh]
        top-0 shadow-md shadow-black z-10 "
          ></div>
          <Link to={"/"} className="z-50 ">
            <img
              src={logoImage}
              className="flex h-[13vh]
              
              mx-auto w-full lg:hidden"
              alt="الکتروشاپ"
            />
          </Link>
          <Link to={"/"} className="z-50 ">
            <img
              src={logoImage}
              className="
            hidden
            lg:block
            lg:h-16 
            xl:h-20
            2xl:h-24
            mx-auto w-full "
              alt="الکتروشاپ"
            />
          </Link>
        </div>
        {/* logo img */}
        {/* nav items */}
        <div
          className={`hidden nav-menu lg:flex justify-center items-center mx-auto align-middle text-center`}
        >
          <div
            className="inset-0 items-center justify-center text-white text-center align-middle flex flex-row  
        lg:text-xs lg:gap-x-4
        xl:gap-x-6 xl:text-sm
        2xl:gap-x-8 2xl:text-base
        "
          >
            {navigation.map((item, idx) => (
              <div key={idx}>
                <div
                  className="
              hover:scale-105
              hover:text-Amber-500 transition-all ease-in-out duration-300"
                >
                  {item?.navs !== undefined ? (
                    <button
                      className="flex items-center justify-center w-full"
                      onClick={() => {
                        setDropDown(!dropDown);
                      }}
                    >
                      {item?.title}
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`mx-1.5 ${dropDown ? "" : "rotate-180"}
                      transation-all ease-in-out duration-300
                      `}
                      />
                    </button>
                  ) : (
                    <Link
                      onClick={() => setDropDown(false)}
                      className="flex items-center justify-center w-full"
                      to={item.path}
                    >
                      {item?.title}
                    </Link>
                  )}
                </div>
                {item?.navs?.length > 0 && dropDown && (
                  <div className="w-full inset-x-0 z-45 bg-CarbonicBlue-500 lg:top-16 2xl:top-20 lg:pt-6 2xl:pt-8 lg:absolute lg:border-y-2 lg:border-CarbonicBlue-500 lg:shadow-md">
                    {categoryLoading ? (
                      <div className="w-full text-center font-EstedadLight text-white animate-pulse">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="mx-auto"
                          spin
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full inset-x-0 z-50  grid grid-cols-12 items-center justify-between
                  lg:gap-4
                  "
                      >
                        {item?.navs.map((dropdownItem, idx) => (
                          <Link
                            onClick={() => setDropDown(false)}
                            key={idx}
                            className="lg:col-span-3 group  2xl:col-span-4 flex flex-col items-center justify-center"
                            to={`/category/${Math.floor(dropdownItem?.Code)}`}
                          >
                            <div
                              className="flex flex-col items-center justify-center
                              lg:space-y-2 xl:space-y-4
                              2xl:space-y-6
                              "
                            >
                              <img
                                src={`https://kidsshopapi.electroshop24.ir/category-images/webp/${dropdownItem?.PicName}.webp`}
                                alt={dropdownItem?.Name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23FFFFFF'/%3E%3C/svg%3E";
                                }}
                                className="w-10 h-10 lg:h-16 lg:w-16 mx-2 rounded-full group-hover:scale-105 drop-shadow-lg shadow-black"
                              />
                              <div
                                className="md:text-xs
                                xl:text-sm
                                2xl:text-xl 
                                 backdrop-shadow-lg  group-hover:text-stone-50 lg:text-base group-hover:scale-105 duration-150"
                              >
                                {dropdownItem?.Name}
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link
                          onClick={() => setDropDown(false)}
                          to="/categoires"
                          className="col-span-12 p-3 flex items-center justify-center text-center text-Amber-500 hover:text-white duration-150"
                        >
                          لیست تمامی دسته بندی ها
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* nav items */}
        {/* desktop nav */}
        <div className="hidden lg:flex flex-row items-center justify-center">
          {/* login and shopping cart */}
          <div className="flex items-center justify-center gap-x-6 ">
            <Link
              to={"/shopping-cart"}
              className="relative flex items-center justify-center 2xl:py-2 text-center text-gray-700 group"
            >
              {cart?.length > 0 && (
                <span
                  className=" flex items-center justify-center absolute 
                  font-bold leading-none
                  bg-Amber-500 rounded-full
                  text-center text-CarbonicBlue-500 transform shadow-sm
                  lg:-right-3 text-xs 
                  lg:top-2  
                  2xl:-top-2 2xl:-right-3  2xl:py-2 2xl:px-3

                  group-hover:bg-white
                  group-hover:text-black
                  duration-300 transition-all ease-in-out
                  animate-bounce"
                >
                  {formatCurrencyDisplay(cart?.length)}
                </span>
              )}
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-white group-hover:text-Amber-500  drop-shadow-md duration-300 transition-all ease-in-out"
              />
            </Link>
            {user?.Name !== undefined && user?.UToken !== undefined ? (
              <div>
                <Link
                  to="/profile"
                  className="flex flex-row items-center justify-center text-center align-middle  
                  hover:text-Amber-500 duration-300 transition-all ease-in-out text-white lg:text-xs xl:text-sm 2xl:text-base gap-x-1.5"
                >
                  <FontAwesomeIcon icon={faUser} className="block" />
                  {user?.Name}
                </Link>
              </div>
            ) : (
              <div className="flex flex-row">
                <Link
                  to={"/login"}
                  className="block flex flex-row items-center justify-center 
                    text-center text-white align-middle
                    lg:gap-x-1.5 lg:text-xs
                    xl:gap-x-2 xl:text-sm
                    2xl:gap-x-3 2xl:text-base
                    hover:text-Amber-500 duration-300 transition-all ease-in-out  "
                >
                  <FontAwesomeIcon icon={faIdCardClip} className="block" />
                  <span className="block">ورود عضویت</span>
                </Link>
              </div>
            )}
          </div>
          {/* login and shopping cart */}
        </div>
        {/* desktop nav */}
      </div>
    </nav>
  );
};

export default TopNavBar;
