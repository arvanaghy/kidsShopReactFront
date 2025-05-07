import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "@components/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import BannerGroup from "../components/BannerGroup";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import toast from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "@components/Loading";
import CategoryCircleCard from "@components/category/CategoryCircleCard";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import OfferProductCard from "../components/OfferProductCard";
import { faArrowsToEye, faL } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    categories: [],
    banners: [],
    newestProducts: [],
    offeredProducts: [],
    bestSeller: [],
  });

  const fetchData = async (_url) => {
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(_url);
      if (status !== 200) throw new Error(data?.message);
      setResult(data?.result);
    } catch (error) {
      toast.error(
        "خطا در اتصال" + error?.response?.data?.message || error?.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("https://kidsshopapi.electroshop24.ir/api/v2/home-page");
    // window.scrollTo(0, 0);
  }, []);

  // console.log(result);

  if (loading) return <Loading />;

  return (
    <>
      {/* categories */}
      <section className="w-full max-w-2xl xl:max-w-7xl 2xl:max-w-full mx-auto py-3 xl:py-8 flex overflow-x-auto 2xl:gap-5">
        {result?.categories?.map((item, idx) => (
          <div key={idx} className="flex-shrink-0 w-24 xl:w-30">
            <CategoryCircleCard item={item} />
          </div>
        ))}
        <div className="flex-shrink-0 w-24 xl:w-30">
          <Link
            to={`/categories`}
            className={`w-full flex flex-col justify-center
                                    items-center
                                    cursor-pointer
                                    xl:hover:scale-105  duration-300  ease-in-out transition-all`}
          >
            <FontAwesomeIcon
              icon={faArrowsToEye}
              className="w-10 h-10 p-4 m-2 rounded-full text-gray-500"
            />
            <h4 className="text-xs xl:text-base text-center text-gray-900 font-EstedadMedium">
              تمام دسته بندی ها
            </h4>
          </Link>
        </div>
      </section>
      {/* categories */}

      {/* frist two banners */}
      <BannerGroup banners={result?.banners?.slice(0, 2)} />

      {/* newestproducts */}
      <section
        className="
    xl:my-10
    md:py-5
    xl:p-6
    grid grid-cols-12 items-center justify-center
    bg-Cream-500
    rounded-xl
  "
      >
        <div className="w-full col-span-12 xl:col-span-3">
          <h2
            className="font-EstedadExtraBold text-center xl:tracking-wide
            py-4 md:pb-5 
        text-xl leading-relaxed xl:py-1.5
        md:text-3xl
        lg:text-2xl
       xl:text-4xl 2xl:text-6xl xl:leading-loose 2xl:leading-loose
        text-gray-700
      "
          >
            جدیدترین محصولات کیدزشاپ
          </h2>
        </div>
        <div className="w-full col-span-12 xl:col-span-9">
          <Swiper
            modules={[Autoplay, FreeMode, Pagination, Navigation]}
            className="h-full py-10  mySwiper"
            freeMode={false}
            centeredSlides={false}
            pagination={{ clickable: true }}
            loop={result?.newestProducts?.length >= 4}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },

              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
          >
            {result?.newestProducts?.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="xl:gap-2 justify-center  xl:px-4 flex flex-row  ">
                  <ProductCard item={product} key={index} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="col-span-12 text-center py-6 lg:py-12">
          <Link
            to="/products"
            className="font-EstedadExtraBold text-center bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-xl
        transition-all duration-300 ease-in-out text-xs xl:text-base 2xl:text-2xl 2xl:font-EstedadMedium
      "
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </section>

      {/* thrid and fourth banners */}
      <BannerGroup banners={result?.banners?.slice(2, 4)} />

      {/* offered products */}
      {result?.offeredProducts?.length > 0 && (
        <section
          className="
     xl:my-10
     md:py-5
     xl:py-14
     xl:p-6
     grid grid-cols-12 items-center justify-center
     bg-red-300
     rounded-xl
     "
        >
          <div className="w-full col-span-12 xl:col-span-3 p-2 xl:p-0">
            <h2
              className="font-EstedadExtraBold text-center  xl:tracking-wide text-gray-700
            text-xl leading-loose xl:py-1.5
            md:text-3xl md:pb-2
            lg:text-2xl
            xl:text-4xl 2xl:text-6xl xl:leading-loose 2xl:leading-loose
             "
            >
              محصولات پیشنهادی کیدزشاپ
            </h2>
          </div>
          <div className="col-span-12 xl:col-span-9 h-full rounded-xl p-2 xl:p-0">
            <Swiper
              modules={[Autoplay, FreeMode, Pagination, Navigation]}
              className="h-full w-full "
              freeMode={false}
              navigation={true}
              slidesPerView={1}
              centeredSlides={true}
              spaceBetween={0}
              slidesPerGroup={1}
              loop={true}
              autoplay={{
                delay: 4500,
              }}
            >
              {result?.offeredProducts.map((offeredProductsItem, index) => (
                <SwiperSlide key={index}>
                  <OfferProductCard item={offeredProductsItem} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-span-12 text-center pt-4 xl:pt-12">
            <Link
              to="/offered-products"
              className="font-EstedadExtraBold text-xs text-center bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-xl
          transition-all duration-300 ease-in-out 2xl:text-2xl 2xl:font-EstedadMedium
          "
            >
              تمامی آفرهای کیدزشاپ
            </Link>
          </div>
        </section>
      )}

      {/* fifth and sixth banners */}
      <BannerGroup banners={result?.banners?.slice(4, 6)} />

      {/* best seller products */}
      {result?.bestSeller?.length > 0 && (
        <section
          className="
        xl:my-10
        xl:py-14
        md:py-5
        xl:p-6
        grid grid-cols-12 items-center justify-center
        bg-Cream-500
        rounded-xl
      "
        >
          <div className="w-full col-span-12 xl:col-span-3">
            <h2
              className="font-EstedadExtraBold text-center xl:tracking-wide
            py-4
        text-xl leading-relaxed xl:py-1.5
        md:text-3xl md:pb-4
        lg:text-2xl
        xl:text-4xl 2xl:text-6xl xl:leading-loose 2xl:leading-loose
        text-gray-700
      "
            >
              پرفروشترین محصولات کیدزشاپ
            </h2>
          </div>
          <div className="col-span-12 xl:col-span-9">
            <Swiper
              modules={[Autoplay, FreeMode, Pagination, Navigation]}
              className=" py-10 mySwiper"
              freeMode={false}
              // navigation={true}
              centeredSlides={false}
              pagination={{ clickable: true }}
              slidesPerGroup={1}
              loop={result?.bestSeller?.length >= 4}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },

                480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
            >
              {result?.bestSeller?.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-row gap-2 justify-center  px-4">
                    <div key={index} className="">
                      <ProductCard item={product} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-span-12 text-center py-6 lg:py-12">
            <Link
              to={"/best-seller-products"}
              className="font-EstedadExtraBold text-center bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-xl
        transition-all duration-300 ease-in-out text-xs xl:text-base 2xl:text-2xl 2xl:font-EstedadMedium
      "
            >
              لیست محصولات پرفروش
            </Link>
          </div>
        </section>
      )}

      {/* follow us in instagram */}
      <section className="py-4 xl:p-10">
        <Link
          to="https://www.instagram.com/kids_shop.110/"
          target="_blank"
          className="flex flex-col xl:flex-row items-center justify-center gap-8 bg-gray-900 max-w-4xl mx-auto py-4 rounded-2xl
        hover:shadow-md shadow-black
        md:hover:scale-105
        hover:bg-gray-800
        transition-all duration-300 ease-in-out
        "
        >
          <p className="text-white text-base xl:text-2xl 2xl:text-3xl font-EstedadExtraBold">
            ما را در اینستاگرام دنبال کنید
          </p>
          <div className="flex flex-row items-center justify-center gap-3">
            <p className="text-white text-base xl:text-2xl font-extrabold 2xl:text-4xl">
              kids_shop.110
            </p>
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl xl:text-6xl text-white"
            />
          </div>
        </Link>
      </section>
    </>
  );
};

export default Home;
