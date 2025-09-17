/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProductCard from "@components/product/ProductCard";
import Loading from "@components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import ColorFilter from "@components/filters/ColorFilter";
import SizeFilter from "@components/filters/SizeFilter";
import ProductSearch from "@components/filters/ProductSearch";
import { useNavbarVisibility } from "@hooks/useMenu";
import {
  useFilters,
  useRemoveFilters,
  useSubCategory,
} from "@hooks/useCategories";
import ListAsBar from "@components/subcategoris/ListAsBar";
import Pagination from "@components/Pagination";

const SubCategories = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || null;
  const product_page = searchParams.get("product_page") || 1;
  const subcategory_page = searchParams.get("subcategory_page") || 1;
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;
  const sort_price = searchParams.get("sort_price") || null;
  const mobileFilterRef = useRef(null);
  const { categoryCode } = useParams();

  const navigate = useNavigate();

  const [sizeSets, setSizeSets] = useState([]);
  const [colorSets, setColorSets] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isNavbarVisible = useNavbarVisibility();

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

  const { subCategories, isPending, category, products, sizes, colors } =
    useSubCategory(
      categoryCode,
      product_page,
      subcategory_page,
      search,
      size,
      color,
      sort_price
    );

  const { isPending: isPendingFilters, applyFilters } = useFilters(
    isModal,
    setIsModal,
    categoryCode,
    search,
    sort_price,
    sizeSets,
    colorSets
  );

  const { isPending: isPendingRemove, removeFilters } = useRemoveFilters(
    categoryCode,
    setSizeSets,
    setColorSets,
    setIsModal
  );

  if (isPending || isPendingFilters || isPendingRemove) return <Loading />;

  return (
    <div className="relative w-full min-h-[65vh] grid grid-cols-12 justify-center items-start gap-2 py-4 xl:py-6 xl:gap-4">
      {/* subcategories */}
      {subCategories?.data && subCategories?.data?.length > 0 && (
        <ListAsBar info={subCategories?.data} />
      )}
      {subCategories?.links?.length > 3 && (

        <Pagination
          links={subCategories?.links}
          replace={{
            url: `/category/${categoryCode}`,
            phrase: category?.name,
          }}
        />
        // <div className="col-span-12 flex flex-row flex-wrap items-center justify-center py-8 gap-2">
        //   {subCategories?.links?.map((link, idx) => (
        //     <button
        //       key={idx}
        //       disabled={link.url === null}
        //       onClick={() => {
        //         navigate(
        //           link?.url.replace(
        //             `${
        //               import.meta.env.VITE_API_URL
        //             }/v2/list-subcategories/${categoryCode}`,
        //             `/category/${categoryCode}`
        //           )
        //         );
        //       }}
        //       className={`2xl:px-4 2xl:py-2 rounded-md cursor-pointer 
        //           2xl:text-sm
        //           text-xs px-2 py-1
        //           disabled:cursor-not-allowed
        //           transition-all duration-300 ease-in-out
        //           hover:bg-CarbonicBlue-500/80 hover:text-white
        //           ${
        //             link.active
        //               ? "bg-CarbonicBlue-500 text-white"
        //               : "bg-gray-300 text-black"
        //           }`}
        //     >
        //       {link.label === "&laquo; Previous"
        //         ? "قبلی"
        //         : link.label === "Next &raquo;"
        //         ? " بعدی"
        //         : link.label}
        //     </button>
        //   ))}
        // </div>
      )}
      {/* subcategories */}
      {/* modal */}
      {isModal && (
        <div
          ref={mobileFilterRef}
          className="fixed inset-2 max-h-[75vh] top-[15vh] rounded-xl bg-stone-100 p-1.5 overflow-y-scroll z-50 md:hidden flex flex-col items-center justify-between space-y-2 shadow-lg shadow-gray-600 "
        >
          <div className="flex flex-row items-center justify-between w-full">
            <button
              className={`flex flex-row items-center justify-center font-EstedadLight gap-x-1.5
             bg-red-600 text-white rounded-lg p-1.5`}
              onClick={removeFilters}
            >
              <FontAwesomeIcon icon={faEraser} className="text-sm" />
              <span className="block text-xs">پاک کردن فیلتر ها</span>
            </button>
            <button
              onClick={applyFilters}
              className="flex flex-row items-center justify-center font-EstedadLight gap-x-1.5
             bg-green-600 text-white rounded-lg p-1.5 
              "
            >
              <FontAwesomeIcon icon={faFilter} className="text-sm" />
              <span className="block text-xs">اعمال فیلتر ها</span>
            </button>
            <button
              onClick={() => setIsModal(false)}
              className="bg-red-500 px-1.5 text-white rounded-xl hover:bg-red-700"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>

          <ProductSearch search={search} />
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
          <FontAwesomeIcon icon={faFilter} />
        </button>
      )}
      {/* remove filters */}
      {/* side bar */}
      <div className="w-full col-span-12 md:col-span-4 xl:col-span-3 h-full order-2 md:order-1">
        {/* category details */}
        <div
          className={`w-full sticky space-y-1
            ${
              isNavbarVisible
                ? "md:top-[21vh] lg:top-[19vh] xl:top-[23vh] 2xl:top-[21.5vh]"
                : "md:top-[12vh] lg:top-[9vh] xl:top-[14vh] 2xl:top-[13vh]"
            }
            `}
        >
          {/* remove filters or apply filters */}
          <div className="flex md:flex-col lg:flex-row items-center justify-between gap-1.5 ">
            <button
              className={`hidden md:flex 
              group
             bg-red-600 text-white rounded-lg w-full py-2 items-center justify-center 
             hover:bg-red-800 transition-all duration-300 ease-in-out gap-x-2`}
              onClick={removeFilters}
            >
              <FontAwesomeIcon icon={faEraser} className="text-lg" />
              <span className="group-hover:-translate-x-1 duration-300 ease-in-out font-EstedadMedium">
                پاک کردن فیلتر
              </span>
            </button>
            <button
              onClick={applyFilters}
              className="hidden md:flex  flex-row gap-x-2 bg-green-600 text-white rounded-lg w-full py-2 items-center justify-center group hover:bg-green-800 transition-all duration-300 ease-in-out 
              "
            >
              <FontAwesomeIcon icon={faFilter} />
              <p className="group-hover:-translate-x-1 duration-300 ease-in-out font-EstedadMedium">
                اعمال فیلتر
              </p>
            </button>
          </div>

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
        </div>
      </div>
      {/* main content */}
      <div className="w-full col-span-12 md:col-span-8 xl:col-span-9 grid grid-cols-12 md:order-2 space-y-6 order-1 ">
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
                        `${
                          import.meta.env.VITE_API_URL
                        }/v2/list-subcategories/${categoryCode}`,
                        `/category/${categoryCode}`
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

export default SubCategories;
