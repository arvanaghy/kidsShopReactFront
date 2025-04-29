import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBoxesPacking,
  faCertificate,
  faChevronUp,
  faCircleInfo,
  faCircleQuestion,
  faLocationDot,
  faPersonHalfDress,
  faPhoneVolume,
  faSquareEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { toPersianDigits } from "@utils/numeralHelpers";
import {
  faSquareWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="px-8 py-4 md:py-6 font-semibold font-EstedadMedium text-gray-700  rounded-b-xl w-full bg-gray-100 ">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-fit mx-auto flex flex-row justify-center items-center gap-4 md:gap-6 group"
        >
          <FontAwesomeIcon
            icon={faChevronUp}
            className="text-xs md:text-sm lg:text-2xl p-2 text-white bg-gray-900/80 rounded-lg group-hover:bg-green-700
        transition-all duration-300 ease-in-out
        "
          />
          <p
            className="text-sm md:text-base lg:text-lg 2xl:text-2xl font-semibold text-gray-700
        group-hover:text-green-700 transition-all duration-300 ease-in-out"
          >
            بازگشت به بالا
          </p>
        </button>
        <div className="my-2 md:my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 items-start justify-around gap-2 md:gap-6 lg:py-2">
          <div className="col-span-12 md:col-span-6 w-full md:p-3 space-y-2 md:space-y-6">
            <p
              className="font-EstedadExtraBold font-bold text-sm lg:text-base
          xl:text-lg
          2xl:text-2xl
          py-5
          text-gray-700
          tracking-wide
          "
            >
              پشتیبانی {toPersianDigits(9)} تا {toPersianDigits(17)} در ایتا و
              تلگرام
            </p>
            <div className="flex items-center justify-start gap-3 ">
              <FontAwesomeIcon icon={faLocationDot} className="text-lg md:text-3xl" />
              <p className=" leading-relaxed tracking-widest text-xs lg:text-sm xl:text-base 2xl:text-2xl	">
                تبریز،شهرک ارم، منطقه ۷، دوبانده، ،جنب بیمه ما{" "}
              </p>
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <FontAwesomeIcon
                icon={faPhoneVolume}
                className="text-base md:text-2xl -scale-x-100"
              />
              <p className=" leading-relaxed tracking-widest text-xs lg:text-sm xl:text-base 2xl:text-2xl">
                ۰۹۱۴۹۲۷۶۵۹۰
              </p>
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <FontAwesomeIcon icon={faSquareEnvelope} className="text-lg md:text-3xl" />
              <p className=" leading-relaxed tracking-widest text-xs lg:text-sm xl:text-base 2xl:text-2xl">
                info[at]kidsshop110.ir
              </p>
            </div>
            <div className="flex items-center justify-start gap-6 ">
              <Link
                to={
                  "https://api.whatsapp.com/send?phone=989149276590&text=kidsshop_website"
                }
                target="_blank"
                className="hover:text-green-600 transition-all duration-300 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faSquareWhatsapp}
                  className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl"
                />
              </Link>
              <Link
                to={"https://t.me/kids_shop110"}
                target="_blank"
                className="hover:text-green-600 transition-all duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faTelegram} className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl" />
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 w-full p-3 space-y-6">
            <h3 className="text-sm lg:text-lg 2xl:text-2xl font-EstedadExtraBold">دسترسی سریع</h3>
            <Link
              to="/offered-products"
              className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
            >
              <FontAwesomeIcon
                icon={faCertificate}
                className="text-base md:text-2xl group-hover:text-green-700 duration-300 transition-all ease-in-out"
              />
              <div
                className=" text-xs xl:text-base 2xl:text-2xl
              group-hover:text-green-700
              group-hover:-translate-x-2
              duration-300 transition-all ease-in-out"
              >
                محصولات ویژه کیدزشاپ
              </div>
            </Link>
            <Link
              to="/best-selling-products"
              className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
            >
              <FontAwesomeIcon
                icon={faBoxesPacking}
                className="text-base md:text-2xl group-hover:text-green-700 duration-300 transition-all ease-in-out"
              />
              <div
                className="text-xs xl:text-base 2xl:text-2xl
              group-hover:text-green-700
              group-hover:-translate-x-2
              duration-300 transition-all ease-in-out"
              >
                پرفروشترین محصولات کیدزشاپ
              </div>
            </Link>
            <Link
              to="/categoires"
              className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
            >
              <FontAwesomeIcon
                icon={faPersonHalfDress}
                className="text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="text-xs xl:text-base 2xl:text-2xl
              group-hover:text-green-700
              group-hover:-translate-x-2
              duration-300 transition-all ease-in-out"
              >
                دسته بندی محصولات
              </div>
            </Link>
            <Link
              to="/faq"
              className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
            >
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="text-base md:text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="text-xs xl:text-base 2xl:text-2xl
              group-hover:text-green-700
              group-hover:-translate-x-2
              duration-300 transition-all ease-in-out"
              >
                سوالات متداول
              </div>
            </Link>
            <Link
              to="/about-us"
              className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="text-base md:text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="text-xs xl:text-base 2xl:text-2xl
              group-hover:text-green-700
              group-hover:-translate-x-2
              duration-300 transition-all ease-in-out"
              >
                درباره ما
              </div>
            </Link>
            <Link
              to="/faq"
              className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
            >
              <FontAwesomeIcon
                icon={faAddressBook}
                className="text-base md:text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="text-xs xl:text-base 2xl:text-2xl
              group-hover:text-green-700
              group-hover:-translate-x-2
              duration-300 transition-all ease-in-out"
              >
                تماس با ما
              </div>
            </Link>
          </div>
        </div>
        <div className="my-1 md:my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 items-start justify-around gap-2 md:gap-6 py-2 lg:py-4">
          <div className="col-span-12 md:col-span-8 w-full space-y-6 ">
            <h2 className="text-base xl:text-xl 2xl:text-3xl 2xl:py-10 font-EstedadExtraBold">فروشگاه لباس کودک و نوجوان نهال</h2>
            <p className="text-xs xl:text-base 2xl:text-2xl leading-loose xl:tracking-wider 2xl:leading-10 ">
              فروشگاه اینترنتی لباس بچه گانه نهال، فروشگاه آنلاین و تخصصی لباس
              کودک و نوجوان است. نهال از سال ۱۳۹۴ فعالیت خود را شروع کرده و به
              صورت حضوری در شعب مختلف و همچنین به صورت آنلاین با کیفیت ترین لباس
              های بچه گانه را با ارزان ترین قیمت به فروش می رساند. این فروشگاه
              با بهترین و معتبرترین تولیدی های لباس کودک و نوجوان همکاری می کند
              تا با کیفیت ترین لباس های دخترانه و پسرانه را به دست مشتریان عزیز
              و وفادارش برساند.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 w-full md:space-y-6 flex flex-row items-center justify-center ">
            <img src="/images/samandehi.png" className="w-1/2 h-full" alt="" />
            <img src="/images/enamad-1.png" className="w-1/2 h-full" alt="" />
          </div>
        </div>
      </div>
      <div className="w-full text-xs xl:text-base 2xl:text-2xl text-center leading-relaxed font-medium text-gray-800 flex flex-col md:flex-row items-center justify-center bg-gray-300 mb-10 md:mb-0 py-2 lg:py-4 xl:py-6 gap-x-2 rounded-t-lg">
        تمامی حقوق برای سایت کیذزشاپ محفوظ است! 
        <div className="flex flex-row justify-center items-center gap-5">
        <p>تیم طراحی و توسعه</p>
        <Link
          to="https://hesmasoft.ir"
          target="_blank"
          className="block text-CarbonicBlue-500 hover:text-CarbonicBlue-800 text-xs xl:text-base 2xl:text-2xl
            hover:-translate-x-2
            transition-all duration-300 ease-in-out"
        >
          حسما سافت
        </Link>
        </div>
        
      </div>
    </footer>
  );
};
export default Footer;
