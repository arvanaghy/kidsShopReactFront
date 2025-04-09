/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "@context/UserContext";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import logoImage from "@assets/images/HPE-self.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBookmark,
  faBoxesPacking,
  faCartShopping,
  faCertificate,
  faChevronUp,
  faCodeCompare,
  faHeadphones,
  faIdCardClip,
  faMagnifyingGlass,
  faRestroom,
  faSpinner,
  faUser,
  faUserTie,
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
    fetchCategories("https://kidsshopapi.electroshop24.ir/api/v2/top-menu");
  }, []);

  useEffect(() => {}, [user, cart]);

  return (
    <header
      className={`block sticky top-0 shadow-md shadow-gray-600/70 z-50 font-EstedadMedium bg-gray-100 w-full text-gray-600  first-letter:
        xl:p-6
        xl:space-y-8

        `}
      style={{ zIndex: 9999 }}
    >
      <section className="w-full grid grid-cols-12 items-center justify-between">
        <div className="w-full xl:col-span-3"></div>
        <form className="w-full xl:col-span-5 bg-gray-200 rounded-xl relative">
          <input
            type="text"
            placeholder="جستجو"
            onChange={() => {}}
            className="w-full p-2 bg-gray-200 rounded-xl text-gray-800 placeholder:text-gray-600 "
          />
          <button
            type="submit"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-600 hover:text-green-600 duration-300 transition-all ease-in-out"
            />
          </button>
        </form>
        <div className="xl:col-span-4 w-full flex flex-row items-center justify-end gap-x-4">
          <div className="flex flex-row items-center justify-center gap-x-2">
            <FontAwesomeIcon
              icon={faHeadphones}
              className="block text-lg font-bold "
            />
            <span>{toPersianDigits("09144744980")}</span>
          </div>

          {user?.Name !== undefined && user?.UToken !== undefined ? (
            <div>
              <Link
                to="/profile"
                className="flex flex-row items-center justify-center text-center align-middle  
                  hover:text-green-600 duration-300 transition-all ease-in-out text-gray-600
                  gap-x-1.5
                  "
              >
                <FontAwesomeIcon icon={faUserTie} className="block" />
                <span>{user?.Name}</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-row">
              <Link
                to={"/login"}
                className="flex flex-row items-center justify-center 
                    text-center text-gray-600 align-middle
                    hover:text-green-600 duration-300 transition-all ease-in-out
                    gap-x-1.5
                    "
              >
                <FontAwesomeIcon icon={faUserTie} className="block" />
                <span className="block">ورود | ثبت نام</span>
              </Link>
            </div>
          )}
          <Link
            to={"/shopping-cart"}
            className="relative flex items-center justify-center text-center text-gray-700 group
            
            "
          >
            {cart?.length > 0 && (
              <span
                className=" flex items-center justify-center absolute 
                  font-bold leading-none
                  bg-green-600 rounded-full
                  text-center text-CarbonicBlue-600 transform 

                  group-hover:bg-white
                  group-hover:text-gray-600
                  group
                  duration-300 transition-all ease-in-out
                  animate-bounce
                  
                  "
              >
                {formatCurrencyDisplay(cart?.length)}
              </span>
            )}
            <FontAwesomeIcon
              icon={faBagShopping}
              className="text-gray-600 group-hover:text-green-600 
              group-hover:scale-105 drop-shadow-md duration-300 transition-all ease-in-out"
            />
          </Link>
        </div>
      </section>

      <section className="w-full grid grid-cols-12 items-center justify-between">
        <nav
          className={`xl:col-span-9 w-full flex justify-start items-center `}
        >
          <div
            className="inset-0 items-center justify-center text-gray-600 text-center align-middle flex flex-row  
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
              hover:underline
              hover:underline-offset-8
              hover:text-green-600 transition-all ease-in-out duration-300 text-gray-800"
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
                  <div className="w-full inset-x-0 z-45 bg-CarbonicBlue-600 lg:top-16 2xl:top-20 lg:pt-6 2xl:pt-8 lg:absolute lg:border-y-2 lg:border-CarbonicBlue-600 lg:shadow-md">
                    {categoryLoading ? (
                      <div className="w-full text-center font-EstedadLight text-gray-600 animate-pulse">
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
                          className="col-span-12 p-3 flex items-center justify-center text-center text-green-600 hover:text-gray-600 duration-150"
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
        </nav>
        <div className="w-full xl:col-span-3 flex flex-row items-center justify-end gap-x-4">
          <Link
            className="
            hover:scale-105
            hover:text-green-600 transition-all ease-in-out duration-300"
            title="مقایسه محصولات"
          >
            <FontAwesomeIcon icon={faRestroom} className="text-xl" />
          </Link>
          <Link
            className="
            hover:scale-105
            hover:text-green-600 transition-all ease-in-out duration-300"
            title="علاقه مندی ها"
          >
            <FontAwesomeIcon icon={faBookmark} className="text-xl" />
          </Link>
          <Link
            className="
            flex flex-row  items-center justify-center
            hover:scale-105 
            hover:text-green-600 transition-all ease-in-out duration-300
            gap-x-1.5
            "
            title="محصولات ویژه"
          >
            <FontAwesomeIcon icon={faCertificate} className="text-xl" />
            <span className="text-xs leading-relaxed">محصولات ویژه</span>
          </Link>
          <Link
            className="
            flex flex-row  items-center justify-center
            hover:scale-105 
            hover:text-green-600 transition-all ease-in-out duration-300
            gap-x-1.5
            "
            title="پرفروش ترین ها"
          >
            <FontAwesomeIcon icon={faBoxesPacking} className="text-xl" />
            <span className="text-xs leading-relaxed">پرفروش ترین ها</span>
          </Link>
        </div>
      </section>
    </header>
  );
};

export default TopNavBar;
