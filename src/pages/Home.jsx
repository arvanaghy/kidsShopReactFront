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


import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import toast from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "@components/Loading";
import CategoryCircleCard from "@components/category/CategoryCircleCard";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import OfferProductCard from "../components/OfferProductCard";

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

  if (loading) return <Loading />;

  return (
    <>
      {/* categories */}
      <section
        className="max-w-7xl mx-auto 
        xl:py-8 
        col-span-12 gap-2
        grid grid-cols-12
        grid-rows-1
        overflow-x-scroll"
      >
        {result?.categories?.map((item, idx) => (
          <CategoryCircleCard item={item} key={idx} colSpan="xl:col-span-1" />
        ))}
      </section>
      {/* categories */}

      {/* frist two banners */}
      <section className="p-10">
        <div className="grid grid-cols-12 gap-8">
          {result?.banners?.length > 0 ? (
            result?.banners?.slice(0, 2)?.map((item, idx) => (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6"
                key={idx}
              >
                <img
                  src={item?.image}
                  alt={`${item?.title}`}
                  className="w-full object-cover shadow-sm shadow-black rounded-xl
                  "
                />
              </div>
            ))
          ) : (
            <>
              <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                <img
                  src={
                    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                  }
                  alt="no-image"
                  className="w-full h-96 object-fill shadow-sm shadow-black/60 rounded-xl
                  "
                />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                <img
                  src={
                    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                  }
                  alt="no-image"
                  className="w-full h-96 object-fill shadow-sm shadow-black/60 rounded-xl
                  "
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* newestproducts */}
      <section
        className="
    my-10
    py-14
    p-6
    grid grid-cols-12 items-center justify-center
    bg-Cream-500
    rounded-xl
  "
      >
        <div className="w-full col-span-3">
          <h2
            className="font-EstedadExtraBold text-center tracking-wide
        text-3xl leading-relaxed py-1.5
        md:text-5xl
        lg:text-2xl
        2xl:text-5xl 2xl:leading-loose
        text-gray-700
      "
          >
            جدیدترین محصولات کیدزشاپ
          </h2>
        </div>
        <div className="col-span-9">
          <Swiper
            modules={[Autoplay, FreeMode, Pagination, Navigation]}
            className="h-full w-full  custom-swiper"
            freeMode={false}
            // navigation={true}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={0}
            pagination={{ clickable: true }}
            slidesPerGroup={1}
            loop={result?.newestProducts?.length >= 4}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
          >
            {result?.newestProducts
              ?.reduce((acc, item, index) => {
                if (index % 4 === 0) acc.push([]);
                acc[acc.length - 1].push(item);
                return acc;
              }, [])
              .map((group, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-row gap-2 justify-center w-full px-4">
                    {group.map((product, productIndex) => (
                      <div
                        key={productIndex}
                        className="w-[calc(25%-0.5rem)] flex-shrink-0"
                      >
                        <ProductCard item={product} />
                      </div>
                    ))}
                    {group.length < 4 &&
                      Array.from({ length: 4 - group.length }).map((_, i) => (
                        <div
                          key={`placeholder-${i}`}
                          className="w-[calc(25%-0.5rem)] invisible flex-shrink-0"
                        >
                          <ProductCard item={group[0]} />
                        </div>
                      ))}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="col-span-12 text-center pt-12">
          <Link
            to="/products"
            className="font-EstedadExtraBold text-center bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-xl
        transition-all duration-300 ease-in-out
      "
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </section>
      {/* thrid and fourth banners */}
      <section className="p-10">
        <div className="grid grid-cols-12 gap-8">
          {result?.banners?.length > 0 ? (
            result?.banners?.slice(2, 4)?.map((item, idx) => (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6"
                key={idx}
              >
                <img
                  src={item?.image}
                  alt={`${item?.title}`}
                  className="w-full object-cover shadow-sm shadow-black rounded-xl
                  "
                />
              </div>
            ))
          ) : (
            <>
              <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                <img
                  src={
                    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                  }
                  alt="no-image"
                  className="w-full h-96 object-fill shadow-sm shadow-black/60 rounded-xl
                  "
                />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                <img
                  src={
                    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                  }
                  alt="no-image"
                  className="w-full h-96 object-fill shadow-sm shadow-black/60 rounded-xl
                  "
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* offered products */}
      {result?.offeredProducts?.length > 0 && (
        <section
          className="
     my-10
     py-14
     p-6
     grid grid-cols-12 items-center justify-center
     bg-red-300
     rounded-xl
     "
        >
          <div className="w-full col-span-3">
            <h2
              className="font-EstedadExtraBold text-center  tracking-wide text-gray-700
            text-3xl leading-relaxed py-1.5
            md:text-5xl
            lg:text-2xl
            2xl:text-5xl 2xl:leading-loose
             "
            >
              محصولات پیشنهادی کیدزشاپ
            </h2>
          </div>
          <div className="col-span-9 h-full rounded-xl">
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
          <div className="col-span-12 text-center pt-12">
            <Link
              to="/offered-products"
              className="font-EstedadExtraBold text-center bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-xl
          transition-all duration-300 ease-in-out
          "
            >
              تمامی آفرهای کیدزشاپ
            </Link>
          </div>
        </section>
      )}

      {/* fifth and sixth banners */}
      <section className="p-10">
        <div className="grid grid-cols-12 gap-8">
          {result?.banners?.length > 0 ? (
            result?.banners?.slice(4, 6)?.map((item, idx) => (
              <Link
                to={`/category/${item?.id}`}
                className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6"
                key={idx}
              >
                <img
                  src={item?.image}
                  alt={`${item?.title}`}
                  className="w-full object-cover shadow-sm shadow-black rounded-xl
                  "
                />
              </Link>
            ))
          ) : (
            <>
              <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                <img
                  src={
                    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                  }
                  alt="no-image"
                  className="w-full h-96 object-fill shadow-sm shadow-black/60 rounded-xl
                  "
                />
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                <img
                  src={
                    "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                  }
                  alt="no-image"
                  className="w-full h-96 object-fill shadow-sm shadow-black/60 rounded-xl
                  "
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* best seller products */}
      {result?.bestSeller?.length > 0 && (
        <section
          className="
  my-10
  py-14
  p-6
  grid grid-cols-12 items-center justify-center
  bg-Cream-500
  rounded-xl
"
        >
          <div className="w-full col-span-3">
            <h2
              className="font-EstedadExtraBold text-center tracking-wide
      text-3xl leading-relaxed py-1.5
      md:text-5xl
      lg:text-2xl
      2xl:text-5xl 2xl:leading-loose
      text-gray-700
    "
            >
              پرفروشترین محصولات کیدزشاپ
            </h2>
          </div>
          <div className="col-span-9">
            <Swiper
              modules={[Autoplay, FreeMode, Pagination, Navigation]}
              className="h-full w-full  custom-swiper"
              freeMode={false}
              // navigation={true}
              slidesPerView={1}
              centeredSlides={true}
              spaceBetween={0}
              pagination={{ clickable: true }}
              slidesPerGroup={1}
              loop={result?.bestSeller?.length >= 4}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
            >
              {result?.bestSeller
                ?.reduce((acc, item, index) => {
                  if (index % 4 === 0) acc.push([]);
                  acc[acc.length - 1].push(item);
                  return acc;
                }, [])
                .map((group, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-row gap-2 justify-center w-full px-4">
                      {group.map((product, productIndex) => (
                        <div
                          key={productIndex}
                          className="w-[calc(25%-0.5rem)] flex-shrink-0"
                        >
                          <ProductCard item={product} />
                        </div>
                      ))}
                      {group.length < 4 &&
                        Array.from({ length: 4 - group.length }).map((_, i) => (
                          <div
                            key={`placeholder-${i}`}
                            className="w-[calc(25%-0.5rem)] invisible flex-shrink-0"
                          >
                            <ProductCard item={group[0]} />
                          </div>
                        ))}
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <div className="col-span-12 text-center pt-12">
            <Link
              to="/best-selling-products"
              className="font-EstedadExtraBold text-center bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-xl
      transition-all duration-300 ease-in-out
    "
            >
              لیست محصولات پرفروش
            </Link>
          </div>
        </section>
      )}
      {/* follow us in instagram */}
      <section className="p-10">
        <Link
          to="https://www.instagram.com/kids_shop.110/"
          target="_blank"
          className="flex flex-row items-center justify-center gap-8 bg-gray-900 max-w-4xl mx-auto py-4 rounded-2xl
        hover:shadow-md shadow-black
        md:hover:scale-105
        hover:bg-gray-800
        transition-all duration-300 ease-in-out
        "
        >
          <p className="text-white text-2xl font-EstedadExtraBold">
            مارا در اینستاگرام دنبال کنید
          </p>
          <div className="flex flex-row items-center justify-center gap-3">
            <p className="text-white text-2xl font-extrabold">
              kids_shop.110 @
            </p>
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-7xl text-white"
            />
          </div>
        </Link>
      </section>
    </>
  );
};

export default Home;
