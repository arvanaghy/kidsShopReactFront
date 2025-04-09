import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
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

import contactUsImage from "../../assets/images/Contact.webp";
import faqImage from "../../assets/images/FAQ.webp";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../components/Loading";

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

  const handleSearch = (e) => {
    e.preventDefault();
    const searchPhrase = e.target.search.value;
    if (searchPhrase?.length > 0) {
      navigate(`/search/${searchPhrase}`);
    } else {
      toast.error("نام محصول مورد نظر را وارد کنید");
    }
  };

  if (loading) return <Loading />;

  return (
    <>


      {/* Hero Section */}
      {/* CTA */}
      <section className="py-16 bg-CarbonicBlue-500 ">
        {/* lets search */}
        <div className="max-w-screen-xl  px-4 mx-auto lg:text-center lg:px-8">
          <div className="max-w-xl space-y-3 lg:mx-auto">
            <p className="text-white font-EstedadMedium text-center text-xl drop-shadow-2xl lg:text-3xl">
              بدنبال کالای خاصی میگردید؟
            </p>
          </div>
          <form
            onSubmit={(e) => {
              handleSearch(e);
            }}
            className="max-w-md px-4 mx-auto mt-7 lg:mt-12"
          >
            <div className="relative">
              <button
                type="submit"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 cursor-pointer left-3 hover:scale-105  hover:text-gray-900 transition-all duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input
                type="text"
                name="search"
                placeholder="جستجوی محصول"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none font-EstedadLight bg-gray-50 focus:bg-white focus:border-CarbonicBlue-500"
              />
            </div>
          </form>
        </div>
      </section>
      {/* CTA */}
      {/* categories */}
      <section className="py-8 lg:py-14">
        <div className="xl:max-w-screen-xl xl:px-4 mx-auto text-CarbonicBlue-500 ">
          <h3
            className="  font-EstedadExtraBold text-center text-2xl drop-shadow-2xl
            pb-6
              lg:text-3xl
              xl:text-4xl xl:font-bold xl:pb-12
              text-transparent bg-clip-text bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500
              "
          >
            دسته بندی محصولات
          </h3>
          <div
            className="w-full 
          px-6
          "
          >
            <div
              className="w-full grid grid-cols-12 items-center justify-center 
            
            lg:gap-4
            2xl:gap-8 "
            >
              <div
                className="w-full 
              col-span-12 gap-2
            md:gap-4

              lg:col-span-10 lg:gap-8
               grid grid-cols-12
              
               "
              >
                {result?.categories?.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/category/${Math.floor(item?.Code)}`}
                    className="w-full flex lg:flex-row justify-between
                    items-center border rounded-r-full shadow-md duration-300 shadow-CarbonicBlue-500/50 
                    col-span-12 
                    md:col-span-6 
                    lg:col-span-4 
                    xl:col-span-3
                    hover:scale-105 ease-in-out transition-all "
                  >
                    <div className="flex flex-row">
                      <img
                        src={
                          "https://kidsshopapi.electroshop24.ir/category-images/webp/" +
                          `${item?.PicName}.webp`
                        }
                        alt={item?.Name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23FFFFFF'/%3E%3C/svg%3E";
                        }}
                        className="w-24 h-24 m-2 rounded-full shadow-md shadow-gray-300"
                      />
                    </div>
                    <div className="flex flex-col px-3">
                      <h4 className="mx-2 text-lg text-center text-CarbonicBlue-500 font-EstedadMedium">
                        {item?.Name}
                      </h4>
                      <p className=" font-EstedadLight ">{item?.Comment}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="w-full col-span-12 lg:col-span-2 lg:mt-0 mt-20 ">
                <Link
                  to={"/categoires"}
                  className="block w-fit mx-auto lg:mx-0  text-white shadow-sm shadow-purple-500 font-semibold hover:bg-CarbonicBlue-500/20  font-EstedadMedium rounded-full text-sm p-2 duration-300  text-center"
                >
                  <img
                    src={arrowLeft}
                    className="text-white -rotate-90 lg:rotate-0 mx-auto hover:stroke-[#fff]"
                    alt="left arrow to categories"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
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
