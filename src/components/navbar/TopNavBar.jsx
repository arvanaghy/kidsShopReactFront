/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "@context/UserContext";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBookmark,
  faBoxesPacking,
  faCertificate,
  faChevronUp,
  faHeadphones,
  faMagnifyingGlass,
  faRestroom,
  faSpinner,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const TopNavBar = () => {
  const categoryRef = useRef(null);
  const [categories, setCatgeoires] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { user, cart } = useContext(UserContext);
  const [categoryImage, setCategoryImage] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {}, [cart]);
  useEffect(() => {}, [user]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const letsSearch = (e) => {
    e.preventDefault();
    try {
      const searchPhrase = e.target.topNavBarSearch.value;
      if (searchPhrase?.length <= 0)
        throw new Error("نام کالای مورد نظر را وارد کنید");
      e.target.topNavBarSearch.value = "";
      navigate(`/products?search=${searchPhrase}`);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <header
      className={`hidden md:block sticky top-0 shadow-md shadow-gray-600/70 z-50 font-EstedadMedium bg-gray-100 w-full text-gray-600
        xl:p-6
        xl:space-y-8
        `}
      style={{ zIndex: 9999 }}
    >
      <section className="w-full grid grid-cols-12 items-center md:justify-center xl:justify-between md:p-2 xl:p-0 md:text-xs 2xl:text-xl">
        <div className="w-full md:col-span-3 xl:col-span-3">logo</div>
        <form
          className="w-full md:col-span-4 xl:col-span-5 bg-gray-200 rounded-xl relative"
          onSubmit={letsSearch}
        >
          <input
            type="text"
            name="topNavBarSearch"
            placeholder="جستجو محصول ..."
            className="w-full p-2 bg-gray-200 rounded-xl text-gray-600 placeholder:text-gray-600 2xl:py-4 "
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
        <div className="md:col-span-5 xl:col-span-4 w-full flex flex-row items-center justify-end md:gap-x-5 xl:gap-x-4">
          <div className="flex flex-row items-center justify-center gap-x-2">
            <FontAwesomeIcon
              icon={faHeadphones}
              className="block md:text-base xl:text-lg font-bold 2xl:text-2xl "
            />
            <span>{toPersianDigits("۰۹۱۴۹۲۷۶۵۹۰")}</span>
          </div>

          {user?.Name !== undefined && user?.UToken !== undefined ? (
            <div>
              <Link
                onContextMenu={(e) => e.preventDefault()}
                to="/profile"
                className="flex flex-row items-center justify-center text-center align-middle  
                  hover:text-green-700 text-green-500 duration-300 transition-all ease-in-out 
                  gap-x-1.5
                  "
              >
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="block 2xl:text-2xl"
                />
                <span>{user?.Name}</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-row">
              <Link
                onContextMenu={(e) => e.preventDefault()}
                to={"/login"}
                className="flex flex-row items-center justify-center 
                    text-center text-gray-600 align-middle
                    hover:text-green-600 duration-300 transition-all ease-in-out
                    gap-x-1.5
                    "
              >
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="block md:text-base xl:text-lg 2xl:text-2xl"
                />
                <span className="block">ورود | ثبت نام</span>
              </Link>
            </div>
          )}
          <Link
            onContextMenu={(e) => e.preventDefault()}
            to={"/shopping-cart"}
            className="relative flex items-center justify-center text-center text-gray-700 group
            
            "
          >
            {cart?.length > 0 && (
              <span
                className=" flex items-center justify-center absolute 
                  leading-none
                  bg-green-600/80 rounded-full
                  text-center text-CarbonicBlue-600 
                  text-white
                  xl:p-2
                  p-1
                  -top-3
                  left-2
                group-hover:bg-white
                 group-hover:text-gray-600
                  duration-300 transition-all ease-in-out
                  lg:animate-bounce
                  text-xs
                  font-EstedadLight
                  z-50
                  "
              >
                {formatCurrencyDisplay(cart?.length)}
              </span>
            )}
            <FontAwesomeIcon
              icon={faBagShopping}
              className="text-gray-600
               md:text-base xl:text-xl 2xl:text-3xl
              group-hover:text-green-600 mx-2 md:mx-5
              group-hover:scale-105 drop-shadow-md duration-300 transition-all ease-in-out"
            />
          </Link>
        </div>
      </section>

      <section className="w-full grid grid-cols-12 items-center justify-between 2xl:text-xl">
        <nav
          className={`md:col-span-12 lg:col-span-8 xl:col-span-9 w-full flex md:justify-start md:py-5 xl:justify-start xl:py-0 items-center md:px-2 xl:px-0`}
        >
          <div
            className="inset-0 items-center justify-center text-gray-600 text-center align-middle flex flex-row  
        md:text-xs lg:text-xs md:gap-x-6 lg:gap-x-4 xl:gap-x-6 xl:text-sm 2xl:gap-x-8 2xl:text-xl"
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
                      onContextMenu={(e) => e.preventDefault()}
                      onClick={() => setDropDown(false)}
                      className="flex items-center justify-center w-full"
                      to={item.path}
                    >
                      {item?.title}
                    </Link>
                  )}
                </div>
                {item?.navs?.length > 0 && dropDown && (
                  <div className="relative w-full " ref={categoryRef}>
                    {categoryLoading ? (
                      <div
                        className="absolute z-50
                      md:w-[80vw] md:min-h-[50vh]  md:top-14                   
                      lg:w-[80vw] lg:min-h-[50vh] lg:top-8 
                      xl:w-[90vw] xl:min-h-[50vh] xl:top-8
                      
                      text-center bg-gray-100 font-EstedadLight text-gray-600 flex flex-row items-center justify-center shadow-md rounded-lg "
                      >
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="mx-auto
                          md:text-2xl
                          lg:text-4xl
                          xl:text-6xl"
                          spin
                        />
                      </div>
                    ) : (
                      <div
                        className="absolute
                        md:w-[85vw] md:top-14 md:px-1.5 py-6
                        lg:w-[90vw] lg:top-8 lg:px-2
                        xl:w-[80vw] xl:top-8 xl:px-4 
                        2xl:w-[85vw] 2xl:top-8 2xl:px-6 
                        z-50 text-center bg-gray-100 font-EstedadLight text-gray-600 grid grid-cols-12 items-center justify-center shadow-md md:rounded-b-lg md:rounded-t-none xl:rounded-lg"
                      >
                        <div
                          className="w-full md:col-span-9 grid grid-cols-12 
                        md:gap-3 lg:gap-4 xl:gap-5
                        2xl:gap-6"
                        >
                          {item?.navs.map((dropdownItem, idx) => (
                            <Link
                              onContextMenu={(e) => e.preventDefault()}
                              onMouseEnter={() => {
                                setCategoryImage(dropdownItem);
                              }}
                              onMouseLeave={() => {
                                setCategoryImage(null);
                              }}
                              onFocus={() => {
                                setCategoryImage(dropdownItem);
                              }}
                              onAbort={() => {
                                setCategoryImage(null);
                              }}
                              onClick={() => setDropDown(false)}
                              key={idx}
                              className="w-fit col-span-4 
                              md:pr-1
                              lg:pr-1.5
                              xl:pr-2
                              2xl:pr-3
                              lg:hover:-translate-x-2
                              hover:text-green-600
                              transition-all ease-in-out duration-300
                              md:border-r
                              lg:border-r-2
                              xl:border-r-4
                               border-blue-500  items-center 
                              justify-center
                              font-EstedadExtraBold
                              tracking-wider
                              "
                              to={`/category/${Math.floor(dropdownItem?.Code)}`}
                            >
                              {dropdownItem?.Name}
                            </Link>
                          ))}
                        </div>
                        <div className="w-full col-span-3">
                          {categoryImage && (
                            <div
                              className="flex flex-col items-center
                            justify-center"
                            >
                              <img
                                src={`https://kidsshopapi.electroshop24.ir/category-images/webp/${categoryImage?.PicName}.webp`}
                                alt={categoryImage?.Name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
                                }}
                                className=" rounded-lg 
                                md:w-32 md:h-32
                                lg:w-36 lg:h-36
                                xl:w-40 xl:h-40
                                2xl:w-64 2xl:h-64 object-scale-down drop-shadow-lg shadow-black"
                              />
                            </div>
                          )}
                        </div>

                        <Link
                          onContextMenu={(e) => e.preventDefault()}
                          onClick={() => setDropDown(false)}
                          to="/categories"
                          className="col-span-12 
pt-8 flex items-center justify-center text-center text-green-600 hover:text-green-900 duration-300
                          hover:scale-105
                          transition-all ease-in-out
                          font-EstedadExtraBold
                          "
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
        <div className="w-full md:col-span-12 lg:col-span-4 xl:col-span-3 flex flex-row items-center md:justify-end xl:justify-end md:gap-x-5 md:px-2 xl:px-0 xl:gap-x-4 md:pb-2 lg:pb-0 md:text-xs 2xl:text-xl">
          <Link
            onContextMenu={(e) => e.preventDefault()}
            to={"/compare-products"}
            className="flex flex-row items-center
            hover:scale-105
            hover:text-green-600 transition-all ease-in-out duration-300"
            title="مقایسه محصولات"
          >
            <FontAwesomeIcon
              icon={faRestroom}
              className="md:text-base xl:text-xl 2xl:text-2xl"
            />
          </Link>
          <Link
            onContextMenu={(e) => e.preventDefault()}
            to={"/my-favourite"}
            className="flex flex-row items-center
            hover:scale-105
            hover:text-green-600 transition-all ease-in-out duration-300"
            title="علاقه مندی ها"
          >
            <FontAwesomeIcon
              icon={faBookmark}
              className="md:text-base xl:text-xl 2xl:text-2xl"
            />
          </Link>
          <Link
            onContextMenu={(e) => e.preventDefault()}
            to={"/offered-products"}
            className="
            flex flex-row  items-center justify-center
            hover:scale-105 
            hover:text-green-600 transition-all ease-in-out duration-300
            gap-x-1.5
            "
            title="محصولات ویژه"
          >
            <FontAwesomeIcon
              icon={faCertificate}
              className="md:text-base xl:text-xl 2xl:text-2xl"
            />
            <span className="text-xs leading-relaxed 2xl:text-xl">
              محصولات ویژه
            </span>
          </Link>
          <Link
            onContextMenu={(e) => e.preventDefault()}
            to={"/best-selling-products"}
            className="
            flex flex-row  items-center justify-center
            hover:scale-105 
            hover:text-green-600 transition-all ease-in-out duration-300
            gap-x-1.5
            "
            title="پرفروش ترین ها"
          >
            <FontAwesomeIcon
              icon={faBoxesPacking}
              className="md:text-base xl:text-xl 2xl:text-2xl"
            />
            <span className="text-xs 2xl:text-xl leading-relaxed">
              پرفروش ترین ها
            </span>
          </Link>
        </div>
      </section>
    </header>
  );
};

export default TopNavBar;
