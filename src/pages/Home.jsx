import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "@components/ProductCard";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
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

import contactUsImage from "@assets/images/Contact.webp";
import faqImage from "@assets/images/FAQ.webp";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "@components/Loading";
import CategoryCircleCard from "@components/category/CategoryCircleCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    categories: [],
    banners: [],
    newestProducts: [],
    offeredProducts: [],
    bestSeller: [],
  });

  const navigate = useNavigate();

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
    window.scrollTo(0, 0);
  }, []);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const searchPhrase = e.target.search.value;
  //   if (searchPhrase?.length > 0) {
  //     navigate(`/search/${searchPhrase}`);
  //   } else {
  //     toast.error("نام محصول مورد نظر را وارد کنید");
  //   }
  // };

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
      {/* offered products */}
      {result?.offeredProducts?.length > 0 && (
        <section className="py-14">
          <div className="max-w-screen-xl px-4 mx-auto lg:px-8">
            <div className="space-y-5 lg:text-center lg:max-w-md lg:mx-auto">
              <div
                className="font-EstedadExtraBold text-center text-2xl drop-shadow-2xl z-10 lg:text-3xl text-white px-12 py-5 skew-y-2 before:block before:absolute 
              before:-inset-1 before:-skew-y-3 before:-z-10 before:bg-CarbonicBlue-500 before:rounded"
              >
                محصولات ویژه الکتروشاپ
              </div>
            </div>

            <div
              className="grid  grid-cols-12
            my-10 gap-2
            md:my-12 md:gap-4
            lg:my-14 lg:gap-4
            xl:my-16 xl:gap-6
            2xl:my-28 2xl:gap-12 2xl:max-w-7xl mx-auto "
            >
              {result?.offeredProducts?.slice(0, 8)?.map((items, idx) => (
                <ProductCard key={idx} item={items} />
              ))}
            </div>
          </div>
          <div className="mt-12 mb-6 text-center">
            <Link
              to="/offered-products"
              className="text-white bg-CarbonicBlue-500 hover:bg-Purple-500 font-EstedadMedium rounded-lg text-sm px-5 py-2.5 text-center shadow-md duration-300 ease-in-out shadow-Purple-500/80"
            >
              لیست محصولات ویژه
            </Link>
          </div>
        </section>
      )}
      {/* products */}
      <section
        className="relative
       py-14
       2xl:py-28
       "
      >
        <div className="absolute w-full h-full hidden lg:block ">
          <img src={waveImage} className="rotate-0 shadow-black" />
          <img src={waveImage} className="rotate-180 shadow-black" />
        </div>
        <div className="relative top-0 ">
          <div
            className="
            px-4 pt-6
            md:px-6 
            lg:px-4
          xl:px-8
          2xl:px-16
          mx-auto "
          >
            <div className="text-center">
              <div
                className="font-EstedadExtraBold text-transparent bg-clip-text  bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500  text-center  tracking-wider
              text-3xl leading-relaxed py-1.5
              md:text-5xl
              lg:text-2xl
              2xl:text-6xl 2xl:leading-snug
               "
              >
                جدیدترین های الکتروشاپ
              </div>
            </div>

            <div
              className="grid  grid-cols-12
            my-10 gap-2
            md:my-12 md:gap-4
            lg:my-14 lg:gap-4
            xl:my-16 xl:gap-6
            2xl:my-28 2xl:gap-12 2xl:max-w-7xl mx-auto "
            >
              {result?.newestProducts?.slice(0, 4).map((items, idx) => (
                <ProductCard key={idx} item={items} />
              ))}
            </div>
          </div>
          <Link
            to="/products"
            className="block w-fit mx-auto text-white bg-Purple-500 hover:shadow-Purple-500 font-EstedadMedium rounded-lg text-sm px-5 py-2.5 text-center shadow-md duration-300 ease-in-out shadow-Purple-500/80 group "
          >
            <p
              className="w-fit mx-auto group-hover:-translate-x-1
              transition-all duration-300 ease-in-out "
            >
              مشاهده تمامی محصولات
            </p>
          </Link>
        </div>
      </section>
      {/* best seller products */}
      {result?.bestSeller?.length > 0 && (
        <section className="py-14">
          <div className="max-w-screen-xl px-4 mx-auto lg:px-8">
            <div className="space-y-5 lg:text-center lg:max-w-md lg:mx-auto">
              <div
                className="font-EstedadExtraBold text-center text-2xl drop-shadow-2xl z-10 lg:text-3xl text-white px-12 py-5 skew-y-2 before:block before:absolute 
              before:-inset-1 before:skew-y-1 before:-z-10 before:bg-CarbonicBlue-500 before:rounded
              md:max-w-sm mx-auto tracking-wider
              "
              >
                محصولات پرفروش
              </div>
            </div>

            <div className="grid mt-16 gap-6 lg:gap-x-8 lg:gap-y-10 grid-cols-12">
              {result?.bestSeller?.slice(0, 4)?.map((items, idx) => (
                <ProductCard key={idx} item={items} />
              ))}
            </div>
          </div>
          <div className="mt-12 mb-6 text-center">
            <Link
              to="/best-selling-products"
              className="text-white bg-CarbonicBlue-500 hover:bg-Purple-500 font-EstedadMedium rounded-lg text-sm px-5 py-2.5 text-center shadow-md duration-300 ease-in-out shadow-Purple-500/80
              
              "
            >
              لیست محصولات پرفروش
            </Link>
          </div>
        </section>
      )}
      {/* products */}

      <section
        className=" grid grid-cols-12 w-full 
      items-centers justify-center h-full
      p-4
      lg:px-6
      2xl:px-12"
      >
        <div className="w-full col-span-12 lg:col-span-6">
          <p
            className="font-EstedadExtraBold drop-shadow-md text-transparent w-fit mx-auto bg-clip-text bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500 text-center leading-loose	
            text-2xl py-1
            lg:text-4xl lg:py-1.5 
            2xl:text-6xl 2xl:py-2 "
          >
            راه ارتباطی با ما
          </p>
          <img
            className="w-fit hidden lg:block object-scale-down"
            src={contactUsImage}
            alt="راه ارتباطی با ما"
          />
        </div>
        <ContactUs />
      </section>
    </>
  );
};

export default Home;
