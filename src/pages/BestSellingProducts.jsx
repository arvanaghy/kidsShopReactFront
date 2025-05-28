/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import ColorFilter from "../components/filters/ColorFilter";
import SizeFilter from "../components/filters/SizeFilter";
import ProductSearch from "../components/filters/ProductSearch";

const BestSellingProducts = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || null;
  const product_page = searchParams.get("product_page") || 1;
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;
  const min_price = searchParams.get("min_price") || null;
  const max_price = searchParams.get("max_price") || null;
  const sort_price = searchParams.get("sort_price") || null;
  const mobileFilterRef = useRef(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    data: [],
    links: [],
  });

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState({ max_price: 0, min_price: 0 });
  const [sizeSets, setSizeSets] = useState([]);
  const [colorSets, setColorSets] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);

  useEffect(() => {
    // set is modal false click outside
    const handleClickOutside = (event) => {
      if (
        mobileFilterRef.current &&
        !mobileFilterRef.current.contains(event.target)
      ) {
        setIsModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const fetchData = async (_url) => {
    window.scrollTo(0, 0);
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(_url, {
        headers: {
          cache: "no-cache",
        },
      });
      if (status !== 200) throw new Error(data?.message);
      setProducts({
        data: data?.result?.products?.data,
        links: data?.result?.products?.links,
      });
      setSizes(data?.result?.sizes);
      setColors(data?.result?.colors);
      setPrice(data?.result?.prices);
    } catch (error) {
      toast.error(
        "دسته بندی: " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchData(
    //   `https://api.kidsshop110.ir/api/v2/list-all-offers?product_page=${product_page}${
    //     search != null ? `&search=${search}` : ""
    //   }${size != null ? `&size=${size}` : ""}${
    //     color != null ? `&color=${color}` : ""
    //   }${sort_price != null ? `&sort_price=${sort_price}` : ""}${
    //     priceRange?.min_price != 0 ? `&min_price=${priceRange?.min_price}` : ""
    //   }${
    //     priceRange?.max_price != 100000000
    //       ? `&max_price=${priceRange?.max_price}`
    //       : ""
    //   }`
    // );
    fetchData(
      `https://api.kidsshop110.ir/api/v2/list-best-seller?product_page=${product_page}${
        search != null ? `&search=${search}` : ""
      }${size != null ? `&size=${size}` : ""}${
        color != null ? `&color=${color}` : ""
      }${sort_price != null ? `&sort_price=${sort_price}` : ""}`
    );
  }, [
    product_page,
    search,
    size,
    color,
    sort_price,
    // priceRange?.min_price,
    // priceRange?.max_price,
  ]);

  const applyFilters = () => {
    try {
      // const minPriceInput =
      //   document.getElementById("minPriceInput")?.value || price?.min_price;
      // const maxPriceInput =
      //   document.getElementById("maxPriceInput")?.value || price?.max_price;

      // if (minPriceInput < price?.min_price)
      //   throw new Error("حداقل قیمت نمیتواند کمتر از حداقل قیمت باشد");

      // if (maxPriceInput > price?.max_price)
      //   throw new Error("حداکثر قیمت نمیتواند بزرگتر از حداکثر قیمت باشد");

      // if (minPriceInput > price?.max_price)
      //   throw new Error(
      //     "قیمت خارج از محدوده است، حداقل قیمت باید کمتر از حداکثر قیمت باشد"
      //   );
      // setPriceRange({
      //   min_price: minPriceInput,
      //   max_price: maxPriceInput,
      // });
      // navigate(
      //   `/best-selling-products?product_page=${1}${
      //     search != null ? `&search=${search}` : ""
      //   }${sizeSets.length > 0 ? `&size=${sizeSets.join(",")}` : ""}${
      //     colorSets.length > 0 ? `&color=${colorSets.join(",")}` : ""
      //   }${
      //     minPriceInput >= priceRange?.min_price
      //       ? `&min_price=${minPriceInput}`
      //       : ""
      //   }${
      //     maxPriceInput <= priceRange?.max_price
      //       ? `&max_price=${maxPriceInput}`
      //       : ""
      //   }${sort_price != null ? `&sort_price=$setColorSets{sort_price}` : ""}`
      // );
      isModal && setIsModal(false);
      navigate(
        `/best-selling-products?product_page=${1}${
          search != null ? `&search=${search}` : ""
        }${sizeSets.length > 0 ? `&size=${sizeSets.join(",")}` : ""}${
          colorSets.length > 0 ? `&color=${colorSets.join(",")}` : ""
        }${sort_price != null ? `&sort_price=${sort_price}` : ""}`
      );
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const removeFilters = () => {
    setSizeSets;
    setSizeSets([]);
    setColorSets([]);
    setIsModal(false);

    // setPriceRange({ min_price: price?.min_price, max_price: price?.max_price });

    navigate(`/best-selling-products`);
  };

  if (loading) return <Loading />;

  return (
    <div className="relative w-full min-h-[65vh] grid grid-cols-12 justify-center items-start gap-2 py-4 xl:py-6 xl:gap-4">
      <div
        className="col-span-12 text-center  font-EstedadExtraBold tracking-wider leading-relaxed
            text-lg py-4
            sm:text-xl sm:py-4
            md:text-2xl md:py-6
            lg:text-3xl lg:py-7
            xl:text-4xl xl:py-8 
            2xl:text-5xl 2xl:py-10
            text-transparent bg-clip-text bg-gradient-to-r  from-Amber-500 to-CarbonicBlue-500            "
      >
        پرفروش ترین محصولات کیدزشاپ
      </div>
      {/* modal */}
      {isModal && (
        <div
          ref={mobileFilterRef}
          className="fixed inset-2 max-h-[74vh] top-[15vh] rounded-xl bg-stone-100 p-1.5 overflow-y-scroll z-50 md:hidden flex flex-col items-center justify-between space-y-4 shadow-lg shadow-gray-600 "
        >
          <button
            className={` md:flex 
            hover:-translate-x-2 duration-300 ease-in-out 
            font-EstedadExtraBold text-yellow-700 py-4  gap-x-2`}
            onClick={removeFilters}
          >
            <FontAwesomeIcon icon={faEraser} className="text-lg" />
            <span>پاک کردن فیلتر ها</span>
          </button>
          <ProductSearch search={search} page="best-selling-products" />
          {sizes?.length > 0 && (
            <SizeFilter
              sizes={sizes}
              sizeSets={sizeSets}
              setSizeSets={setSizeSets}
            />
          )}
          {colors?.length > 0 && (
            <ColorFilter
              colors={colors}
              colorSets={colorSets}
              applyFilters={applyFilters}
              setColorSets={setColorSets}
            />
          )}
          <div className="w-full flex items-end justify-between">
            <button
              onClick={applyFilters}
              className="w-full text-base font-EstedadExtraBold p-2  leading-relaxed rounded-xl mx-auto text-center
              justify-items-end
              bg-green-800 text-white hover:bg-green-900 transition-all duration-300 ease-in-out
              border border-green-600 hover:border-green-700 
              "
            >
              اعمال فیلتر ها
            </button>
          </div>
          <button
            onClick={() => setIsModal(false)}
            className="absolute top-2 left-2 bg-red-500 px-1.5 text-white rounded-xl hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      )}

      {/* modal Toggle */}

      {!isModal && (
        <button
          onClick={() => setIsModal(true)}
          className="md:hidden fixed bottom-[10vh] z-50 left-4 bg-blue-700/90 p-4 px-5 rounded-full text-white shadow-md shadow-black/80 
          hover:bg-blue-900/90
          "
        >
          <FontAwesomeIcon icon={faFilter} className="" />
        </button>
      )}
      {/* remove filters */}
      {/* side bar */}
      <div className="w-full col-span-12 md:col-span-4 xl:col-span-3 h-full order-2 md:order-1">
        {/* category details */}
        <div className="w-full sticky md:top-[18vh] xl:top-[18vh] xl:space-y-3 space-y-1">
          {/* remove filters */}
          <button
            className={`hidden md:flex 
            hover:-translate-x-2 duration-300 ease-in-out 
            font-EstedadExtraBold text-yellow-700 py-4  gap-x-2`}
            onClick={removeFilters}
          >
            <FontAwesomeIcon icon={faEraser} className="text-lg" />
            <span>پاک کردن فیلتر ها</span>
          </button>
          {/* search */}
          {!isMobile && <ProductSearch search={search} />}
          {sizes?.length > 0 && !isMobile && (
            <SizeFilter
              sizes={sizes}
              sizeSets={sizeSets}
              setSizeSets={setSizeSets}
            />
          )}
          {colors?.length > 0 && !isMobile && (
            <ColorFilter
              colors={colors}
              colorSets={colorSets}
              applyFilters={applyFilters}
              setColorSets={setColorSets}
            />
          )}
          {/* {price?.min_price > 0 && price?.max_price > 0 && (
            <div className="w-full">
              <h3 className="w-full text-base xl:text-lg px-2 font-EstedadExtraBold py-2  text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 tracking-wide">
                قیمت :
              </h3>
              <div className="w-full flex flex-row flex-wrap justify-start items-start gap-2 py-4">
                <input
                  type="number"
                  id="minPriceInput"
                  placeholder={formatCurrencyDisplay(price?.min_price)}
                  name="minPriceInput"
                  min={price?.min_price}
                  max={price?.}
                />
                <span>تومان</span>
                <span>تا</span>
                <input
                  type="number"
                  id="maxPriceInput"
                  placeholder={formatCurrencyDisplay(price?.max_price)}
                  name="maxPriceInput"

                />
                <span>تومان</span>
              </div>
            </div>
          )} */}
          <div className="w-full hidden md:flex items-end justify-between">
            <button
              onClick={applyFilters}
              className="w-full text-base font-EstedadExtraBold p-2  leading-relaxed rounded-xl mx-auto text-center
              justify-items-end
              bg-green-800 text-white hover:bg-green-900 transition-all duration-300 ease-in-out
              border border-green-600 hover:border-green-700 
              "
            >
              اعمال فیلتر ها
            </button>
          </div>
        </div>
      </div>
      {/* main content */}
      <div className="w-full col-span-12 md:col-span-8 xl:col-span-9 grid grid-cols-12 md:order-2 space-y-6 order-1 ">
        {/* sort filters */}
        <div className="w-full col-span-12 gap-3 flex flex-row justify-start items-center">
          <Link
            
            to={`/best-selling-products?product_page=${1}${
              size != null ? `&size=${size}` : ""
            }${color != null ? `&color=${color}` : ""}${
              search != null ? `&search=${search}` : ""
            }`}
            className={`font-EstedadLight text-sm  border border-CarbonicBlue-500 rounded-lg p-2
              ${
                sort_price != "asc" && sort_price != "desc"
                  ? "bg-CarbonicBlue-500 text-white border-gray-100 hover:bg-CarbonicBlue-500/80 "
                  : "bg-Cream-500 text-gray-800 border-CarbonicBlue-500  hover:text-black border-CarbonicBlue-500/40  hover:bg-Cream-500/50"
              }
              `}
          >
            جدید ترین ها
          </Link>
          <Link
            
            to={`/best-selling-products?product_page=${1}${
              search != null ? `&search=${search}` : ""
            }${size != null ? `&size=${size}` : ""}${
              color != null ? `&color=${color}` : ""
            }&sort_price=asc`}
            className={`font-EstedadLight text-sm  border  rounded-lg p-2
              transition-all duration-300 ease-in-out
              ${
                sort_price == "asc"
                  ? "bg-CarbonicBlue-500 text-white border-gray-100 hover:bg-CarbonicBlue-500/80 "
                  : "bg-Cream-500 text-gray-800 border-CarbonicBlue-500  hover:text-black border-CarbonicBlue-500/40  hover:bg-Cream-500/50"
              }
              `}
          >
            ارزان ترین ها
          </Link>
          <Link
            
            to={`/best-selling-products?product_page=${1}${
              size != null ? `&size=${size}` : ""
            }${search != null ? `&search=${search}` : ""}${
              color != null ? `&color=${color}` : ""
            }&sort_price=desc`}
            className={`font-EstedadLight text-sm  border  rounded-lg p-2
              transition-all duration-300 ease-in-out
              ${
                sort_price == "desc"
                  ? "bg-CarbonicBlue-500 text-white border-gray-100 hover:bg-CarbonicBlue-500/80 "
                  : "bg-Cream-500 text-gray-800 border-CarbonicBlue-500  hover:text-black border-CarbonicBlue-500/40  hover:bg-Cream-500/50"
              }
              `}
          >
            گرانترین ها
          </Link>
        </div>
        {/* products */}
        <div className="w-full col-span-12 bg-Cream-500 p-6 flex flex-col">
          <div className="w-full grid grid-cols-12 gap-6">
            {products?.data?.length > 0 ? (
              products?.data?.map((item, idx) => (
                <ProductCard
                  item={item}
                  key={idx}
                  colSpan="col-span-12
                md:col-span-6 xl:col-span-3"
                />
              ))
            ) : (
              <div
                className="w-fit col-span-12  text-xl font-EstedadExtraBold py-4 text-center leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
              "
              >
                هیج محصولی وجود ندارد
              </div>
            )}
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center py-8 gap-2">
            {products?.links?.length > 3 &&
              products?.links?.map((link, idx) => (
                <button
                  key={idx}
                  disabled={link.url === null}
                  onClick={() => {
                    navigate(
                      link?.url.replace(
                        "https://api.kidsshop110.ir/api/v2/list-best-seller",
                        "/best-selling-products"
                      )
                    );
                  }}
                  className={`2xl:px-4 2xl:py-2 rounded-md cursor-pointer 
                  2xl:text-sm
  
                  text-xs px-2 py-1
                  disabled:cursor-not-allowed
                  transition-all duration-300 ease-in-out
                  hover:bg-CarbonicBlue-500/80 hover:text-white
                  ${
                    link.active
                      ? "bg-CarbonicBlue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {link.label === "&laquo; Previous"
                    ? "قبلی"
                    : link.label === "Next &raquo;"
                    ? " بعدی"
                    : link.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
