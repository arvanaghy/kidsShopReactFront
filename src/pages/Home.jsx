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

import waveImage from "/src/assets/images/wave.svg";
import arrowLeft from "/src/assets/images/left-arrow-direction-svgrepo-com.svg";

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
       bg-yellow-300
       rounded-xl
       "
      >
        <div className="w-full col-span-3">
          <h2
            className="font-EstedadExtraBold  text-center  tracking-wide
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
          <div
            className="grid  grid-cols-12
             gap-2
             md:gap-4
             lg:gap-4
             xl:gap-6
            2xl:gap-12"
          >
            {result?.newestProducts
              ?.slice(0, 4)
              .map((newestProductsItem, idx) => (
                <ProductCard key={idx} item={newestProductsItem} />
              ))}
          </div>
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
      {!result?.offeredProducts?.length > 0 && (
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
              className="font-EstedadExtraBold  text-center  tracking-wide text-gray-700
            text-3xl leading-relaxed py-1.5
            md:text-5xl
            lg:text-2xl
            2xl:text-5xl 2xl:leading-loose
             "
            >
              محصولات پیشنهادی کیدزشاپ
            </h2>
          </div>
          <div className="col-span-9">
          {result?.newestProducts
                ?.slice(0, 1)
                .map((offeredProductsItem, idx) => (
                  <OfferProductCard key={idx} item={offeredProductsItem} />
                ))}

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
     bg-yellow-300
     rounded-xl
     "
        >
          <div className="w-full col-span-3">
            <h2
              className="font-EstedadExtraBold  text-center  tracking-wide
              text-gray-700
            text-3xl leading-relaxed py-1.5
            md:text-5xl
            lg:text-2xl
                        2xl:text-5xl 2xl:leading-loose

             "
            >
              پرفروشترین محصولات کیدزشاپ
            </h2>
          </div>
          <div className="col-span-9">
            <div
              className="grid  grid-cols-12
           gap-2
           md:gap-4
           lg:gap-4
           xl:gap-6
          2xl:gap-12"
            >
              {result?.bestSeller
                ?.slice(0, 4)
                .map((bestSellerProductsItem, idx) => (
                  <ProductCard key={idx} item={bestSellerProductsItem} />
                ))}
            </div>
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
