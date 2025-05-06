/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { formatCurrencyDisplay } from "../utils/numeralHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleCheck,
  faEraser,
  faSearch,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { DecimalToHexConverter } from "../utils/DecimalToHexConverter";

const SubCategories = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || null;
  const subcategory_page = searchParams.get("subcategory_page") || 1;
  const product_page = searchParams.get("product_page") || 1;
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;
  const min_price = searchParams.get("min_price") || null;
  const max_price = searchParams.get("max_price") || null;
  const sort_price = searchParams.get("sort_price") || null;

  const { categoryCode } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    data: [],
    links: [],
  });
  const [subCategories, setSubCategories] = useState({
    data: [],
    links: [],
  });
  const [category, setCategory] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState({ max_price: 0, min_price: 0 });
  const [sizeSets, setSizeSets] = useState([]);
  const [colorSets, setColorSets] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min_price: 0,
    max_price: 100000000,
  });

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
      setSubCategories({
        data: data?.result?.subcategories?.data,
        links: data?.result?.subcategories?.links,
      });
      setCategory(data?.result?.category);
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

  const letsSearch = (e) => {
    e.preventDefult();
    try {
      const searchPhrase = e.target.search.value;
      if (searchPhrase?.length <= 0)
        throw new Error("نام دسته بندی مورد نظر را وارد کنید");
      navigate(`/category/${categoryCode}?search=${searchPhrase}`);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    // fetchData(
    //   `https://kidsshopapi.electroshop24.ir/api/v2/list-subcategories/${categoryCode}?product_page=${product_page}&subcategory_page=${subcategory_page}${
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
      `https://kidsshopapi.electroshop24.ir/api/v2/list-subcategories/${categoryCode}?product_page=${product_page}&subcategory_page=${subcategory_page}${
        search != null ? `&search=${search}` : ""
      }${size != null ? `&size=${size}` : ""}${
        color != null ? `&color=${color}` : ""
      }${sort_price != null ? `&sort_price=${sort_price}` : ""}`
    );
  }, [
    categoryCode,
    product_page,
    subcategory_page,
    search,
    size,
    color,
    sort_price,
    // priceRange?.min_price,
    // priceRange?.max_price,
  ]);

  const addSizeSet = (size) => {
    const newSizeSets = [...sizeSets];
    if (newSizeSets.includes(size)) {
      newSizeSets.splice(newSizeSets.indexOf(size), 1);
      return setSizeSets(newSizeSets);
    } else {
      newSizeSets.push(size);
      setSizeSets(newSizeSets);
    }
  };

  const addColorSet = (color) => {
    const newColorSets = [...colorSets];
    if (newColorSets.includes(color)) {
      newColorSets.splice(newColorSets.indexOf(color), 1);
      return setColorSets(newColorSets);
    } else {
      newColorSets.push(color);
      setColorSets(newColorSets);
    }
  };

  const applyFilters = () => {
    try {
      // const minPriceInput =
      //   document.getElementById("minPriceInput")?.value || price?.min_price;
      // const maxPriceInput =
      //   document.getElementById("maxPriceInput")?.value || price?.max_price;
      // if (minPriceInput > maxPriceInput)
      //   throw new Error("حداکثر قیمت باید بزرگتر از حداقل قیمت باشد");

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
      navigate(
        `/category/${categoryCode}?product_page=${1}&subcategory_page=${1}${
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
    setSizeSets([]);
    setColorSets([]);
    // setPriceRange({ min_price: price?.min_price, max_price: price?.max_price });

    navigate(`/category/${categoryCode}`);
  };

  if (loading) return <Loading />;
  return (
    <div className="w-full m-h-[65vh] grid grid-cols-12 justify-center items-start py-6 gap-4">
      {/* side bar */}
      <div className="w-full col-span-3 h-full ">
        {/* category details */}
        <div className="w-full">
          <img
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
            }}
            src={`https://kidsshopapi.electroshop24.ir/category-images/webp/${category?.PicName}.webp`}
            alt={category?.Name}
            className="w-full h-full object-cover rounded-lg"
          />
          <h3 className="w-fit text-lg lg:text-2xl font-EstedadExtraBold py-4 text-right leading-relaxed">
            {category?.Name} :
          </h3>
          {category?.Comment && (
            <p className="py-4 text-gray-600 font-EstedadMedium">
              {category?.Comment}
            </p>
          )}
        </div>
        <div className="w-full sticky xl:top-[18vh] xl:space-y-3">
          {/* remove filters */}
          <button
            className="flex 
            hover:-translate-x-2 duration-300 ease-in-out 
            font-EstedadExtraBold text-yellow-700 py-4  gap-x-2"
            onClick={removeFilters}
          >
            <FontAwesomeIcon icon={faEraser} className="text-lg" />
            <span>پاک کردن فیلتر ها</span>
          </button>
          {/* search */}
          <form
            onSubmit={letsSearch}
            className="relative flex flex-row flex-wrap justify-between items-center"
          >
            <input
              type="text"
              className="text-lg w-full py-3 px-1.5 rounded-lg shadow-md shadow-gray-300"
              placeholder={search != null ? search : "جستجو محصول ..."}
              name="search"
            />
            <button
              type="submit"
              className="
          hover:bg-gray-200
          duration-300 ease-in-out transition-all
                    absolute left-1.5 text-lg p-1.5 bg-gray-100 rounded-full  "
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          {sizes?.length > 0 && (
            <div className="w-full">
              <h3 className="w-full text-base xl:text-lg px-2 font-EstedadExtraBold py-2  text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 tracking-wide">
                سایز بندی :
              </h3>
              <div className="w-full py-1.5 flex flex-col justify-start items-start gap-1">
                {sizes?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      addSizeSet(item);
                    }}
                    className="w-full flex flex-row justify-start items-center gap-3 duration-300  hover:bg-gray-200 transition-all ease-in-out p-2"
                  >
                    {sizeSets.includes(item) ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-600"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-white border border-black rounded-full "
                      />
                    )}
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          {colors?.length > 0 && (
            <div className="w-full">
              <h3 className="w-full text-base xl:text-lg px-2 font-EstedadExtraBold py-2  text-right leading-relaxed bg-gray-800 rounded-md text-gray-50 tracking-wide">
                رنگ بندی :
              </h3>
              <div className="w-full py-1.5 flex flex-col justify-start items-start gap-1">
                {colors?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      addColorSet(item?.ColorCode);
                    }}
                    className="w-full flex flex-row justify-start items-center gap-3 duration-300  hover:bg-gray-200 transition-all ease-in-out p-2"
                  >
                    {colorSets.includes(item?.ColorCode) ? (
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="text-green-600"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSquare}
                        className="text-white border border-black  "
                      />
                    )}

                    <p
                      className={`w-5 h-5 rounded-full
                      border border-gray-300
                      `}
                      style={{
                        backgroundColor: DecimalToHexConverter(item?.ColorCode),
                      }}
                    ></p>

                    {item?.ColorName}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* {price?.min_price > 0 && price?.max_price > 0 && (
            <div className="w-full">
              <h3 className="w-full text-base xl:text-xl font-EstedadExtraBold py-2 text-right leading-relaxed">
                قیمت :
              </h3>
              <div className="w-full flex flex-row flex-wrap justify-start items-start gap-2 py-4">
                <input
                  type="number"
                  id="minPriceInput"
                  placeholder={formatCurrencyDisplay(price?.min_price)}
                  name="minPriceInput"
                />
                <span>ریال</span>
                <span>تا</span>
                <input
                  type="number"
                  id="maxPriceInput"
                  placeholder={formatCurrencyDisplay(price?.max_price)}
                  name="maxPriceInput"
                />
                <span>ریال</span>
              </div>
            </div>
          )} */}
          {(sizes?.length > 0 || colors?.length > 0) && (
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
          )}
        </div>
      </div>
      {/* main content */}
      <div className="w-full col-span-9 grid grid-cols-12 space-y-6 ">
        {/* subcategories */}
        <div className="w-full col-span-12 p-6 bg-gray-200 rounded-xl">
          <div className="w-full grid grid-cols-12 gap-x-5">
            {subCategories?.data?.length > 0 ? (
              subCategories?.data?.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/sub-category-products/${Math.floor(item?.Code)}`}
                  className="w-full flex flex-col justify-between
                    items-center gap-1.5 duration-300  hover:scale-105 ease-in-out col-span-2"
                >
                  <img
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
                    }}
                    src={
                      "https://kidsshopapi.electroshop24.ir/subCategory-images/webp/" +
                      `${item.PicName}.webp`
                    }
                    alt={item?.Name}
                    className="rounded-full shadow-md shadow-gray-300"
                  />
                  <div className="flex flex-col px-3">
                    <h4 className="px-2 text-lg text-center text-CarbonicBlue-500 font-EstedadMedium">
                      {item?.Name}
                    </h4>
                    <p className=" font-EstedadLight ">{item?.Comment}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div
                className="w-full text-xl col-span-12 font-EstedadExtraBold py-4 text-center leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
                  "
              >
                هیج دسته بندی وجود ندارد
              </div>
            )}
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center">
            {subCategories?.links?.length > 3 &&
              subCategories?.links.map((link, idx) => (
                <button
                  disabled={link.url === null}
                  key={idx}
                  onClick={() => {
                    navigate(
                      link?.url.replace(
                        "https://kidsshopapi.electroshop24.ir/api/v2/list-subcategories",
                        "/category"
                      )
                    );
                  }}
                  className={`2xl:px-4 2xl:py-2 rounded-md cursor-pointer 2xl:mx-2
                    2xl:text-sm
    
                    text-xs px-2 py-1 mx-1
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
        {/* sort filters */}
        <div className="w-full col-span-12 gap-3 flex flex-row justify-start items-center">
          <Link
            to={`/category/${categoryCode}?product_page=${1}&subcategory_page=${1}${
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
            to={`/category/${categoryCode}?product_page=${1}&subcategory_page=${1}${
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
            to={`/category/${categoryCode}?product_page=${1}&subcategory_page=${1}${
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
        <div className="w-full col-span-12 bg-Cream-500 p-6">
          <div className="w-full grid grid-cols-12 gap-6">
            {products?.data?.length > 0 ? (
              products?.data?.map((item, idx) => (
                <ProductCard item={item} key={idx} colSpan="col-span-3" />
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
          <div className="flex flex-row flex-wrap items-center justify-center py-8">
            {products?.links?.length > 3 &&
              products?.links?.map((link, idx) => (
                <button
                  key={idx}
                  disabled={link.url === null}
                  onClick={() => {
                    navigate(
                      link?.url.replace(
                        "https://kidsshopapi.electroshop24.ir/api/v2/list-subcategories",
                        "/category"
                      )
                    );
                  }}
                  className={`2xl:px-4 2xl:py-2 rounded-md cursor-pointer 2xl:mx-2
                  2xl:text-sm
  
                  text-xs px-2 py-1 mx-1
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

export default SubCategories;
