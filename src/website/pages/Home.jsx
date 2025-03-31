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
  const [categories, setCatgeoires] = useState([]);
  const [offeredProducts, setOfferedProducts] = useState([]);
  const [newestProducts, setNewestProducts] = useState([]);
  const [slider, setSlider] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [faq, setFaq] = useState([]);
  const navigate = useNavigate();

  const fetchData = async (_url) => {
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(_url);
      if (status !== 200) throw new Error(data?.message);
      setCatgeoires(data?.result?.categories);
      setNewestProducts(data?.result?.newestProducts);
      setOfferedProducts(data?.result?.offerdProducts);
      setSlider(data?.result?.banners);
      setBestSellers(data?.result?.bestSeller);
      setFaq(data?.result?.Faq);
    } catch (error) {
      toast.error(
        "خطا در اتصال" + error?.response?.data?.message || error?.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("https://api.electroshop24.ir/api/v2/home-page");
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
      <>
        <section className="hidden p-2 lg:grid lg:grid-cols-12 min-h-[88vh] items-center justify-center gap-2">
          <div className="col-span-4 h-full items-center justify-center ">
            <div className="w-full col-span-4 font-EstedadMedium h-full flex flex-col items-center justify-center">
              <div
                className="text-center leading-relaxed bg-white/80 lg:bg-white/0 py-2 px-2 mx-4 rounded-xl
                font-EstedadExtraBold tracking-wide

                    lg:text-2xl lg:leading-loose
                    xl:text-3xl 
                    2xl:text-4xl
                    "
              >
                فروشگاه لوازم برقی{" "}
                <span
                  className="text-CarbonicBlue-500 mx-1 
                block
                tracking-wide
                lg:text-4xl lg:py-6
                2xl:text-7xl 2xl:py-12  "
                >
                  الکتروشاپ
                </span>
              </div>
              <div
                className="flex items-center justify-center flex-row gap-2
                    text-xs
                    xl:text-sm
                    xl:mt-10  xl:gap-x-3 xl:gap-y-5 "
              >
                <a
                  rel="noreferrer"
                  href="https://cafebazaar.ir/"
                  target="_blank"
                  className="flex flex-col items-center justify-center 
                  hover:bg-green-200 bg-green-200/90 rounded-xl font-EstedadLight hover:scale-105 duration-300 
                  cursor-pointer transation-all ease-in-out 
                  leading-relaxed
                  lg:px-2 lg:py-3
                  2xl:px-6 py-6
                   "
                >
                  <img
                    src="/images/bazar.png"
                    className="
                  lg:w-10 
                  xl:w-12 
                  2xl:w-14 
                  "
                  />
                  <span
                    className="block flex items-center justify-center text-black w-full text-center
                  text-xs
                  lg:mt-2
                  xl:mt-3 xl:text-sm xl:font-bold
                  2xl:mt-4
                  "
                  >
                    دانلود از بازار
                  </span>
                </a>
                <a
                  href="https://myket.ir/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center 
                  hover:bg-green-200 bg-green-200/90 rounded-xl font-EstedadLight hover:scale-105 duration-300 
                  cursor-pointer transation-all ease-in-out 
                  leading-relaxed
                  lg:px-2 lg:py-3
                  2xl:px-6 py-6
                   "
                >
                  <img
                    src="/images/myke.png"
                    className="
                     lg:w-10 
                  xl:w-12 
                  2xl:w-14 
                  
                  "
                  />

                  <span
                    className="block flex items-center justify-center text-black w-full text-center
                  text-xs
                  lg:mt-2
                  xl:mt-3 xl:text-sm xl:font-bold
                  2xl:mt-4"
                  >
                    دانلود از مایکت
                  </span>
                </a>
                <a
                  href="https://cafebazaar.ir/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center 
                       hover:bg-green-200 bg-green-200/90 rounded-xl font-EstedadLight hover:scale-105 duration-300 
                       cursor-pointer transation-all ease-in-out 
                       leading-relaxed
                       lg:px-2 lg:py-3
                       2xl:px-6 py-6
                        "
                >
                  <img
                    src="/images/android.png"
                    className="
                    lg:w-8 
                  xl:w-12 
                  2xl:w-10 "
                  />
                  <span
                    className="block flex items-center justify-center text-black w-full text-center
                  text-xs
                  lg:mt-2
                  xl:mt-3 xl:text-sm xl:font-bold
                  2xl:mt-4"
                  >
                    دانلود مستقیم
                  </span>
                </a>
              </div>
            </div>
          </div>
          {slider?.length > 0 && (
            <Swiper
              scrollbar={{
                hide: true,
              }}
              modules={[Autoplay, FreeMode, Pagination, Navigation]}
              className="h-[88vh] w-full col-span-8"
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
              {slider.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full rounded-xl">
                    <img
                      className="h-full w-full
                    object-scale-down
                    rounded-7xl"
                      src={`https://api.electroshop24.ir/banner-images/webp/${slide?.PicName}_desktop.webp`}
                      alt={`banner-${index}`}
                    />
                    <div
                      className="rotate-180 sepia-50 blur-xs
  w-full absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl 
                   shadow-md shadow-black/40 rounded-b-xl
                  font-EstedadExtraBold tracking-wider text-pretty text-white bg-CarbonicBlue-500/80  py-6 text-center"
                    >
                      <p className="rotate-180">{slide?.Comment}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>
        <section className="lg:hidden min-h-[75vh] relative ">
          <div className="bg-CarbonicBlue-500 w-full pt-[9vh] shadow-md shadow-black ">
            <p
              className="text-center leading-relaxed  rounded-xl
                font-EstedadExtraBold tracking-wide
                    text-white
                    text-xl
                    pb-3
                    "
            >
              فروشگاه لوازم برقی{" "}
              <span
                className="text-stone-100  
                block
                tracking-wide
                text-3xl py-3  "
              >
                الکتروشاپ
              </span>
            </p>
          </div>
          {slider?.length > 0 && (
            <Swiper
              scrollbar={{
                hide: true,
              }}
              modules={[Autoplay, FreeMode, Pagination, Navigation]}
              className="h-[50vh] sm:h-[60vh] md:h-[60vh] w-full "
              freeMode={false}
              slidesPerView={1}
              centeredSlides={true}
              spaceBetween={0}
              slidesPerGroup={1}
              loop={true}
              autoplay={{
                delay: 4500,
              }}
            >
              {slider.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <img
                      className="h-full w-full object-fill"
                      src={`https://api.electroshop24.ir/banner-images/webp/${slide?.PicName}_mobile.webp`}
                      alt={`banner-${index}`}
                    />
                    <div
                      className="rotate-180 sepia-50 blur-xs
w-full absolute bottom-0  text-xl shadow-md shadow-black/40 rounded-b-xl
      font-EstedadExtraBold tracking-wider text-pretty text-white bg-CarbonicBlue-500/80  py-3 text-center"
                    >
                      <p className="rotate-180">{slide?.Comment}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="w-full grid grid-cols-3 gap-1 p-2">
            <a
              rel="noreferrer"
              href="https://cafebazaar.ir/"
              target="_blank"
              title="دانلود از کافه بازار"
              className="flex flex-col items-center justify-center 
                  hover:bg-green-200 bg-green-200/90 rounded-xl font-EstedadLight hover:scale-105 duration-300 
                  cursor-pointer transation-all ease-in-out 
                  leading-relaxed
        py-2
                   "
            >
              <img
                src="/images/bazar.png"
                className="
                    w-12
                  "
              />
              {/* <span
                className="block flex items-center justify-center text-black w-full text-center
                  text-xs py-3

                  "
              >
                دانلود از بازار
              </span> */}
            </a>
            <a
              href="https://myket.ir/"
              target="_blank"
              title="دانلود از مایکت"
              rel="noreferrer"
              className="flex flex-col items-center justify-center 
                  hover:bg-green-200 bg-green-200/90 rounded-xl font-EstedadLight hover:scale-105 duration-300 
                  cursor-pointer transation-all ease-in-out 
                  leading-relaxed
py-2
                   "
            >
              <img
                src="/images/myke.png"
                className="
                  w-10
                  
                  "
              />

              {/* <span
                className="block flex items-center justify-center text-black w-full text-center 
                text-xs py-3
            "
              >
                دانلود از مایکت
              </span> */}
            </a>
            <a
              href="https://cafebazaar.ir/"
              target="_blank"
              rel="noreferrer"
              title="دانلود مستقیم"
              className="flex flex-col items-center justify-center 
                       hover:bg-green-200 bg-green-200/90 rounded-xl font-EstedadLight hover:scale-105 duration-300 
                       cursor-pointer transation-all ease-in-out 
                       leading-relaxed
                   py-2
                        "
            >
              <img
                src="/images/android.png"
                className="
                w-10
                 "
              />
              {/* <span
                className="block flex items-center justify-center text-black w-full text-center
                text-xs py-3
              "
              >
                دانلود مستقیم
              </span> */}
            </a>
          </div>
        </section>
      </>

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
                {categories?.map((item, idx) => (
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
                          "https://api.electroshop24.ir/category-images/webp/" +
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
      {offeredProducts?.length > 0 && (
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
              {offeredProducts?.slice(0, 8)?.map((items, idx) => (
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
              {newestProducts?.slice(0, 4).map((items, idx) => (
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
      {bestSellers?.length > 0 && (
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
              {bestSellers?.slice(0, 4)?.map((items, idx) => (
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

      {faq?.length > 0 && (
        <section className="w-full grid grid-cols-12 w-full ">
          <div className="col-span-12 lg:col-span-6">
            <FAQ  faqData={faq} />
          </div>
          <img
            className="w-full hidden lg:block col-span-6 object-scale-down"
            src={faqImage}
            alt="جواب سوالات پر تکرار مشتریان ما"
          />
        </section>
      )}

      <section
        className="w-full grid grid-cols-12 w-full 
      items-centers justify-center h-full
      p-4
      lg:px-6
      2xl:px-12"
      >
        <div className="w-full col-span-12 lg:col-span-6">
          <p
            className="w-full font-EstedadExtraBold drop-shadow-md text-transparent w-fit mx-auto bg-clip-text bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500 text-center leading-loose	
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
