/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import UserContext from "@context/UserContext";
import { userPriceSelect } from "@utils/userPriceHelper";
import toast from "react-hot-toast";
import ProductCard from "@components/ProductCard";
import Loading from "@components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHouse } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

const Product = () => {
  const { productCode } = useParams();

  const [presentUnitQuantity, setPresentUnitQuantity] = useState(0);
  const [presentPackQuantity, setPresentPackQuantity] = useState(0);
  const { cart, updateCart, user } = useContext(UserContext);

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
      console.log(data?.product);
    } catch (error) {
      toast.error(
        " دریافت اطلاعات محصول  " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setLoading(false);
    }
  };

  const getProductCartQuantity = () => {
    const isProductExists = cart.find(
      (item) => Math.floor(item.Code) == productCode
    );
    if (isProductExists) {
      setPresentUnitQuantity(isProductExists?.unitQuantity || 0);
      setPresentPackQuantity(isProductExists?.packQuantity || 0);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData(
      `https://kidsshopapi.electroshop24.ir/api/v2/show-product/${productCode}`
    );
  }, [productCode]);

  useEffect(() => {
    getProductCartQuantity();
  }, [cart]);

  const addProductToCart = (item)=> {
    if (loading) return;
    try{
      setLoading(true);

      toast.success(JSON.stringify(item?.Code))

    }catch(error){
      toast.error(
        " دریافت اطلاعات محصول  " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    }finally{
      setLoading(false);
    }
  } 

  if (loading) return <Loading />;

  return (
    <div className=" ">
      <nav
        className="flex w-full px-5 py-3 text-gray-700 border border-gray-200 mb-4 mt-14 lg:my-4 rounded-lg bg-gray-50 "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center font-EstedadMedium">
            <Link
              to="/"
              className="inline-flex items-center gap-2 lg:gap-10 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faHouse} className="text-lg" />
              صفحه اصلی
            </Link>
          </li>
          <li>
            <div className="flex items-center font-EstedadMedium">
              <FontAwesomeIcon icon={faChevronLeft} />
              <Link
                to={`/category/${Math.floor(data?.product?.GCode)}`}
                className="text-sm font-medium text-gray-700 ms-1 hover:text-blue-600 lg:ms-2 dark:text-gray-400 dark:hover:text-gray-800"
              >
                {data?.product?.GName}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center font-EstedadMedium">
              <FontAwesomeIcon icon={faChevronLeft} />
              <Link
                to={`/sub-category-products/${Math.floor(
                  data?.product?.SCode
                )}`}
                className="text-sm font-medium text-gray-700 ms-1 hover:text-blue-600 lg:ms-2 dark:text-gray-400 dark:hover:text-gray-800"
              >
                {data?.product?.SName}
              </Link>
            </div>
          </li>
        </ol>
      </nav>

      <div className="relative flex flex-col justify-around lg:justify-between w-full mx-auto">
        <div className="grid grid-cols-1 w-full lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-4 w-full space-y-3  ">
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
                        src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                          data?.product?.GCode
                        )}/${Math.floor(data?.product?.SCode)}/${
                          imageItem?.PicName
                        }.webp`}
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
                      src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                        data?.product?.GCode
                      )}/${Math.floor(data?.product?.SCode)}/${
                        imageItem?.PicName
                      }.webp`}
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
                          image: `https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                            data?.product?.GCode
                          )}/${Math.floor(data?.product?.SCode)}/${
                            imageItem?.PicName
                          }.webp`,
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
          <div className="col-span-1 px-6 lg:col-span-6 w-full flex flex-col justify-start gap-4">
            <div className="lg:text-2xl font-EstedadExtraBold text-xl py-5 text-center lg:text-start border-b text-CarbonicBlue-500 drop-shadow-sm my-6 ">
              {data?.product?.Name}
            </div>
            <div className="flex flex-col text-center lg:text-start lg:flex-row justify-between w-full text-gray-700 px-4 border-b">
              <div className="flex flex-col gap-3">
                <div className="font-EstedadMedium px-2 flex flex-row gap-2 items-center justify-start ">
                  <span className="block text-sm font-EstedadMedium text-Purple-500">
                    دسته بندی :
                  </span>
                  <Link
                    className="block text-sm  font-EstedadMedium text-black/80 underline underline-offset-8 hover:text-CarbonicBlue-500 duration-300 ease-in-out"
                    to={`/category/${Math.floor(data?.product?.GCode)}`}
                  >
                    {data?.product?.GName}
                  </Link>
                  <Link
                    className="block text-sm  font-EstedadMedium text-black/80 underline underline-offset-8 hover:text-CarbonicBlue-500 duration-300 ease-in-out"
                    to={`/sub-category-products/${Math.floor(
                      data?.product?.SCode
                    )}`}
                  >
                    {data?.product?.SName}
                  </Link>
                </div>
                {data?.product?.product_size_color?.length > 0 && (
                  <div className="font-EstedadMedium px-2 flex flex-col gap-4  items-center justify-start">
                    {data?.product?.product_size_color.map((item, index) => (
                      <button
                        disabled={item?.Mande <= 0}
                        onClick={() => {
                          addProductToCart(item);
                        }}
                        key={index}
                        className="flex flex-row gap-2 text-sm  font-EstedadMedium text-black/80 underline underline-offset-8 duration-300 ease-in-out
                        border-2 border-CarbonicBlue-500 rounded-md px-2 py-1 bg-white

                        disabled:cursor-not-allowed

                        hover:bg-CarbonicBlue-500 hover:text-white
                        "
                      >
                        <span className="block text-sm font-EstedadMedium text-Purple-500">
                          رنگ :
                        </span>
                        <span className="text-3xl text-black">{item?.Code}</span>
                        <span>{item.ColorName}</span>
                        <span className="block text-sm font-EstedadMedium text-Purple-500">
                          سایز :
                        </span>
                        <span>{item.SizeNum}</span>
                        <span className="block text-sm font-EstedadMedium text-Purple-500">
                          مبلغ :
                        </span>
                        <span>{formatCurrencyDisplay(item?.Mablag)}</span>
                        <span>ریال</span>
                      </button>
                    ))}
                  </div>
                )}
                {data?.product?.Comment?.length > 0 && (
                  <div className="w-full  ">
                    <div className="font-EstedadExtraBold text-start  text-Purple-500 text-xl py-4">
                      توضیحات :
                    </div>
                    <ul className="list-disc marker:text-CarbonicBlue-500 lg:pr-6 space-y-2 text-start font-EstedadLight">
                      {data?.product?.Comment.split("\r\n").map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 justify-around items-center bg-white rounded-2xl shadow-lg shadow-gray-300 p-6 ">


            <div className="space-y-4 flex flex-col justify-evenly items-center gap-8 ">
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2">
                <div className=" pl-2 grid place-items-center gap-1 font-EstedadExtraBold text-sm text-center">
                  <div>
                    <span className=""> قیمت هر </span>
                    <span className="text-Purple-500">
                      {data?.product?.Vahed}
                    </span>
                  </div>
                  <div>
                    <span className="font-EstedadExtraBold text-CarbonicBlue-500">
                      {formatCurrencyDisplay(
                        userPriceSelect(data?.product, user)
                      )}
                    </span>
                    <span className="text-xs px-2">ریال</span>
                  </div>
                </div>
                <div className="flex lg:flex-row items-center justify-center gap-2"></div>
              </div>



            </div>
            <div className="w-full flex justify-center items-center my-8"></div>
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
      <h2 className="lg:text-start my-8 text-center px-10 bg-CarbonicBlue-500 py-8 text-white font-EstedadMedium">
        دیگر محصولات مشابه
      </h2>
      <div className="gap-4 grid grid-cols-12 py-6  lg:px-10  px-4  ">
        {data?.relatedProducts?.length > 0 &&
          data?.relatedProducts?.map((item, idx) => (
            <ProductCard item={item} key={idx} />
          ))}
      </div>

      {/* same category */}

      {/* same price */}
      <h2 className="lg:text-start my-8 text-center px-10 bg-CarbonicBlue-500 py-8 text-white font-EstedadMedium">
        محصولات پیشنهادی
      </h2>
      <div className="gap-4 grid grid-cols-12 py-6 lg:px-10 px-4  ">
        {data?.offeredProducts?.length > 0 &&
          data?.offeredProducts?.map((item, idx) => (
            <ProductCard item={item} key={idx} />
          ))}
      </div>
    </div>
  );
};

export default Product;
