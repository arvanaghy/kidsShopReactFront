/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import UserContext from "@context/UserContext";
import toast from "react-hot-toast";
import ProductCard from "@components/ProductCard";
import Loading from "@components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCartPlus,
  faChevronLeft,
  faHeart,
  faHeartBroken,
  faHouse,
  faRestroom,
  faShare,
  faSquareShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

const Product = () => {
  const { productCode } = useParams();

  const { favourite, updateFavourite } = useContext(UserContext);
  const { compareList, updateCompareList } = useContext(UserContext);

  const { cart, updateCart } = useContext(UserContext);

  const [feature, setFeature] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    product: {},
    relatedProducts: [],
    offeredProducts: [],
  });

  const [imageModal, setImageModal] = useState({
    isOpen: false,
    image: null,
  });

  const fetchData = async (url) => {
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(url, {
        headers: {
          cache: "no-cache",
        },
      });
      if (status !== 200) throw new Error(data?.message);
      setData(data);
    } catch (error) {
      toast.error(
        " دریافت اطلاعات محصول  " +
          (error?.response?.data?.message || error?.message) || "خطا در اتصال"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(
      `https://kidsshopapi.electroshop24.ir/api/v2/show-product/${productCode}`
    );
  }, [productCode]);

  const addProductToCart = (item) => {
    if (loading) return;
    if (!item) return;
    try {
      setLoading(true);
      if (!feature || !feature?.SCCode) {
        throw new Error("هیچ سایز و رنگ بندی انتخاب نشده است.");
      }
      const _cart = [...cart];
      const isProductExists = _cart.find(
        (cartItem) =>
          Math.floor(cartItem?.item?.Code) == Math.floor(productCode)
      );
      if (isProductExists) {
        const isFeatureExists = isProductExists.basket.find(
          (basketItem) => basketItem.feature.SCCode == feature.SCCode
        );
        if (isFeatureExists) {
          isFeatureExists.quantity += 1;
        } else {
          isProductExists.basket.push({
            feature: feature,
            quantity: 1,
          });
        }
        updateCart(_cart);
      } else {
        const newItem = {
          item: item,
          basket: [
            {
              feature: feature,
              quantity: 1,
            },
          ],
        };
        _cart.push(newItem);
        updateCart(_cart);
      }
      toast.success("محصول به سبد خرید اضافه شد.");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFeatureFromCart = (item) => {
    if (loading) return;
    if (!item) return;
    try {
      setLoading(true);
      const _cart = [...cart];
      const isProductExists = _cart.find(
        (cartItem) =>
          Math.floor(cartItem?.item?.Code) == Math.floor(productCode)
      );
      if (isProductExists) {
        isProductExists?.basket?.splice(
          isProductExists?.basket?.findIndex(
            (basketItem) => basketItem.feature.SCCode == item?.feature?.SCCode
          ),
          1
        );
        // 33296082
        if (isProductExists?.basket?.length === 0) {
          _cart.splice(
            _cart.findIndex(
              (cartItem) =>
                Math.floor(cartItem?.item?.Code) == Math.floor(productCode)
            ),
            1
          );
        }
        updateCart(_cart);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsFavourite(
      favourite.some((p) => Math.floor(p.Code) == Math.floor(productCode))
    );
  }, [favourite, productCode]);

  useEffect(() => {
    setIsCompared(
      compareList.some((p) => Math.floor(p.Code) == Math.floor(productCode))
    );
  }, [compareList, productCode]);

  const toggleFavourite = (item) => {
    if (isFavourite) {
      updateFavourite(favourite.filter((p) => p.Code !== item?.product?.Code));
      toast.error("محصول مورد نظر از علاقه مندی ها حذف شد.");
    } else {
      updateFavourite([...favourite, item?.product]);
      toast.success("محصول مورد نظر به علاقه مندی ها اضافه شد.");
    }
  };

  const toggleCompare = (item) => {
    if (isCompared) {
      updateCompareList(
        compareList.filter((p) => p.Code !== item?.product?.Code)
      );
      toast.error("محصول مورد نظر از مقایسه ها حذف شد.");
    } else {
      updateCompareList([...compareList, item?.product]);
      toast.success("محصول مورد نظر به مقایسه ها اضافه شد.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full py-6">
      {/* top bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
        <nav
          className="flex flex-row w-fit px-7 py-3 text-gray-700 border border-gray-200  rounded-lg bg-gray-50 "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-2 ">
            <li className="inline-flex items-center font-EstedadMedium">
              <Link
                to="/"
                className="inline-flex items-center gap-0.5 md:gap-2 lg:gap-8 
                text-xs
                md:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
              >
                <FontAwesomeIcon
                  icon={faHouse}
                  className="text-sm md:text-lg"
                />
                <span>صفحه اصلی</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center font-EstedadMedium">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-sm md:text-lg p-1"
                />
                <Link
                  to={`/category/${Math.floor(data?.product?.GCode)}`}
                  className="inline-flex items-center gap-0.5 md:gap-2 lg:gap-8 
                text-xs
                md:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
                >
                  {data?.product?.GName}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center font-EstedadMedium">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="text-sm md:text-lg p-1"
                />
                <Link
                  to={`/sub-category-products/${Math.floor(
                    data?.product?.SCode
                  )}`}
                  className="inline-flex items-center gap-0.5 md:gap-2 lg:gap-8 
                text-xs
                md:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
                >
                  {data?.product?.SName}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        <div className="flex w-fit  flex-row  justify-between items-center gap-6">
          <button
            className="bg-black rounded-lg px-1.5 py-1 hover:bg-purple-500 duration-300 ease-in-out"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("لینک کپی شد");
            }}
          >
            <FontAwesomeIcon
              icon={faSquareShareNodes}
              className="text-xl text-white
                
                "
            />
          </button>
          <button onClick={() => toggleFavourite(data)}>
            <FontAwesomeIcon
              icon={faBookmark}
              className={`text-2xl duration-300 ease-in-out
                    ${
                      isFavourite
                        ? "text-Purple-500 hover:text-gray-500 "
                        : "text-gray-500 hover:text-Purple-500"
                    }`}
            />
          </button>

          <button onClick={() => toggleCompare(data)}>
            <FontAwesomeIcon icon={faRestroom}  className={`text-2xl duration-300 ease-in-out
                    ${
                      isFavourite
                        ? "text-Purple-500 hover:text-gray-500 "
                        : "text-gray-500 hover:text-Purple-500"
                    }`} />
          </button>
        </div>
      </div>

      <div className="relative flex flex-col justify-around lg:justify-between w-full">
        <div
          className="grid w-full grid-cols-12
        gap-1.5 md:gap-3 lg:gap-5 xl:gap-6 
        "
        >
          {/* side Image */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-4 w-full xl:space-y-3  ">
            {data?.product?.product_images?.length > 0 ? (
              <div className="flex flex-col p-6 space-y-3">
                <Swiper
                  modules={[Autoplay, FreeMode, Pagination, Navigation]}
                  className="h-full w-full "
                  freeMode={false}
                  navigation={true}
                  slidesPerView={1}
                  centeredSlides={true}
                  spaceBetween={1}
                  slidesPerGroup={1}
                  loop={true}
                  autoplay={{
                    delay: 4500,
                  }}
                >
                  {data?.product?.product_images.map((imageItem, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${imageItem?.PicName}.webp`}
                        alt={data?.product?.Name}
                        className="p-4 w-full object-cover rounded-2xl
                        bg-gray-100
                        "
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="grid grid-cols-12 items-center justify-center gap-2">
                  {data?.product?.product_images.map((imageItem, index) => (
                    <img
                      key={index}
                      src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${imageItem?.PicName}.webp`}
                      alt={data?.product?.Name}
                      className="col-span-3 w-full object-scale-down rounded-md
                      hover:cursor-pointer
                      hover:scale-105
                      hover:grayscale
                      transition-all
                      duration-300
                      ease-in-out
                      "
                      onClick={() => {
                        setImageModal({
                          isOpen: true,
                          image: `https://kidsshopapi.electroshop24.ir/products-image/webp/${imageItem?.PicName}.webp`,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <img
                src="https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                className="w-full t object-cover rounded-2xl shadow-lg shadow-gray-300"
              />
            )}
          </div>
          {/* center main content */}
          <div
            className="col-span-12 xl:px-6 md:col-span-7
          lg:col-span-5
          xl:col-span-5 w-full flex flex-col justify-start xl:gap-4
          gap-1.5
          "
          >
            <h1 className="lg:text-2xl font-EstedadExtraBold text-xl py-5 text-center lg:text-start border-b text-CarbonicBlue-500 drop-shadow-sm leading-relaxed ">
              {data?.product?.Name}
            </h1>

            <div className="flex flex-col gap-1.5 md:gap-3 flex-wrap">
              {data?.product?.product_size_color?.length > 0 && (
                <div className="font-EstedadMedium px-2 flex flex-col gap-4  items-start justify-start leading-relaxed">
                  {data?.product?.product_size_color.map((item, index) => (
                    <button
                      disabled={item?.Mande <= 0}
                      onClick={() => {
                        setFeature(item);
                      }}
                      key={index}
                      className={`flex flex-row gap-2 text-sm  font-EstedadMedium text-gray-800 
                          bg-gray-100  duration-300 ease-in-out
                        border-2 border-gray-200 rounded-md px-2 py-1
                        disabled:cursor-not-allowed
                      hover:bg-gray-400 hover:text-gray-100
                      ${
                        item?.SCCode === feature?.SCCode
                          ? "bg-green-500 text-white"
                          : ""
                      }
                        `}
                    >
                      <span className="block text-sm font-EstedadMedium ">
                        رنگ
                      </span>
                      <span>{item.ColorName}</span>
                      <span className="block text-sm font-EstedadMedium ">
                        سایز
                      </span>
                      <span>{item.SizeNum}</span>
                      <span className="block text-sm font-EstedadMedium ">
                        مبلغ
                      </span>
                      <span>{formatCurrencyDisplay(item?.Mablag)}</span>
                      <span>ریال</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full flex flex-row justify-end items-center py-3 md:py-6">
              <button
                className="w-fit flex flex-row gap-2 items-center justify-center border-2 border-green-600 rounded-md px-4 py-2 bg-green-500 text-white hover:bg-green-600 hover:text-white space-x-1.5
              duration-300 ease-in-out transition-all
              "
                onClick={() => {
                  addProductToCart(data?.product);
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <div className="font-EstedadMedium">افزودن به سبد خرید</div>
              </button>
            </div>
            {data?.product?.Comment?.length > 0 && (
              <div className="w-full  ">
                <div className="font-EstedadExtraBold text-start  text-Purple-500 text-base lg:text-xl py-4">
                  توضیحات :
                </div>
                <ul
                  className="list-disc marker:text-CarbonicBlue-500 
                md:pr-2
                lg:pr-6 space-y-2 text-start font-EstedadLight"
                >
                  {data?.product?.Comment.split("\r\n").map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* side cart bar */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 justify-start items-start bg-white rounded-2xl shadow-lg shadow-gray-300 p-2">
            {cart?.length > 0 &&
            cart?.find(
              (item) => Math.floor(item?.item?.Code) === Math.floor(productCode)
            ) ? (
              <div className="w-full text-pretty py-2">
                <p className="font-EstedadMedium p-2 text-CarbonicBlue-500 leading-relaxed">
                  لیست آیتم های این محصول در سبد خرید شما
                </p>
                {(() => {
                  const foundItem = cart.find(
                    (item) =>
                      Math.floor(item?.item?.Code) === Math.floor(productCode)
                  );
                  return (
                    <div className="font-EstedadMedium p-2 w-full space-y-3 text-pretty">
                      {foundItem?.basket?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row  w-full  text-pretty leading-loose text-sm text-gray-700 gap-1 items-center justify-between"
                          >
                            <div className="">
                              {formatCurrencyDisplay(item?.quantity)}{" "}
                              {data?.product?.Vahed} {data?.product?.Name}{" "}
                              {item?.feature?.ColorName} رنگ به سایز{" "}
                              {item?.feature?.SizeNum} و جمع مبلغ{" "}
                              {formatCurrencyDisplay(
                                item?.feature?.Mablag * item?.quantity
                              )}{" "}
                              ریال
                            </div>
                            <button
                              onClick={() => {
                                removeFeatureFromCart(item);
                              }}
                              className="text-red-500 p-1.5
                           hover:text-red-700 duration-300 ease-in-out transition-all
                           "
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="font-EstedadMedium p-2 text-pretty leading-relaxed">
                شما از این محصول هیچ آیتمی در سبد خرید ندارید
              </div>
            )}
          </div>
        </div>
        {imageModal?.isOpen && (
          <div
            onClick={() =>
              setImageModal({
                isOpen: false,
                image: null,
              })
            }
            className="absolute inset-0 bg-black/50 w-full h-full flex justify-center items-center z-50"
          >
            <img
              src={imageModal?.image}
              alt="product"
              className="w-128 h-128 object-cover"
            />
          </div>
        )}
      </div>

      {/* same price */}
      {data?.relatedProducts?.length > 0 && (
        <>
          <h2 className="lg:text-start my-8 text-center px-10 bg-CarbonicBlue-500 py-8 text-white font-EstedadMedium">
            دیگر محصولات مشابه
          </h2>
          <div className="gap-4 grid grid-cols-12 py-6 lg:px-10 px-4">
            {data?.relatedProducts?.map((item, idx) => (
              <ProductCard
                item={item}
                key={idx}
                colSpan="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 "
              />
            ))}
          </div>
        </>
      )}
      {/* same category */}

      {data?.offeredProducts?.length > 0 && (
        <>
          <h2 className="lg:text-start my-8 text-center px-10 bg-CarbonicBlue-500 py-8 text-white font-EstedadMedium">
            محصولات پیشنهادی
          </h2>
          <div className="gap-4 grid grid-cols-12 py-6 lg:px-10 px-4">
            {data?.offeredProducts?.map((item, idx) => (
              <ProductCard
                item={item}
                key={idx}
                colSpan="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 "
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
