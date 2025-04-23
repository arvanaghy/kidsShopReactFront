import { Link, useLocation } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { ImWhatsapp } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faBoxesPacking,
  faCertificate,
  faChevronUp,
  faCircleInfo,
  faCircleQuestion,
  faDisease,
  faLocationDot,
  faPersonHalfDress,
  faPhoneVolume,
  faQuestion,
  faSquareEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { toPersianDigits } from "@utils/numeralHelpers";
import {
  faSquareWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="px-8 py-6 font-semibold font-EstedadMedium text-gray-700  rounded-b-xl w-full bg-gray-100 ">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-fit mx-auto flex flex-row justify-center items-center gap-6 group"
        >
          <FontAwesomeIcon
            icon={faChevronUp}
            className="text-2xl p-3 text-white bg-gray-900/80 rounded-lg group-hover:bg-green-700
        transition-all duration-300 ease-in-out
        "
          />
          <p
            className="text-lg font-semibold text-gray-700
        group-hover:text-green-700
         transition-all duration-300 ease-in-out
        "
          >
            بازگشت به بالا
          </p>
        </button>
        <div className="my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 items-start justify-around gap-6 py-8">
          <div className="col-span-6 w-full p-3 space-y-6">
            <p
              className="text-base font-EstedadMedium font-semibold lg:text-base
          xl:text-lg
          2xl:text-xl
          py-5
          text-gray-700
          tracking-wide
          "
            >
              پشتیبانی {toPersianDigits(9)} تا {toPersianDigits(17)} در ایتا و
              تلگرام
            </p>
            <div className="flex items-center justify-start gap-3 ">
              <FontAwesomeIcon icon={faLocationDot} className="text-3xl " />
              <p className=" leading-relaxed tracking-widest lg:text-sm xl:text-base	">
                تبریز،شهرک ارم، منطقه ۷، دوبانده، ،جنب بیمه ما{" "}
              </p>
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <FontAwesomeIcon
                icon={faPhoneVolume}
                className="text-2xl -scale-x-100"
              />
              <p className=" leading-relaxed tracking-widest lg:text-sm xl:text-base	">
                ۰۹۱۴۹۲۷۶۵۹۰
              </p>
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <FontAwesomeIcon icon={faSquareEnvelope} className="text-3xl " />
              <p className=" leading-relaxed tracking-widest lg:text-sm xl:text-base	">
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
                  className="text-5xl "
                />
              </Link>
              <Link
                to={"https://t.me/kids_shop110"}
                target="_blank"
                className="hover:text-green-600 transition-all duration-300 ease-in-out"
              >
                <FontAwesomeIcon icon={faTelegram} className="text-5xl " />
              </Link>
            </div>
          </div>

          <div className="col-span-3 w-full p-3 space-y-6">
            <h3 className="text-lg font-EstedadExtraBold">دسترسی سریع</h3>
            <Link
              to="/offered-products"
              className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
            >
              <FontAwesomeIcon
                icon={faCertificate}
                className="text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="
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
                className="text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="
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
                className="
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
                className="text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="
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
                className="text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="
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
                className="text-2xl
                            group-hover:text-green-700
duration-300 transition-all ease-in-out
              "
              />
              <div
                className="
              group-hover:text-green-700
              group-hover:-translate-x-2
              duration-300 transition-all ease-in-out"
              >
                تماس با ما
              </div>
            </Link>
          </div>
        </div>
        <div className="my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 items-start justify-around gap-6 py-8">
          <div className="col-span-8 w-full space-y-6 ">
            <h2>فروشگاه لباس کودک و نوجوان نهال</h2>
            <p className="text-sm leading-loose ">
              فروشگاه اینترنتی لباس بچه گانه نهال، فروشگاه آنلاین و تخصصی لباس
              کودک و نوجوان است. نهال از سال ۱۳۹۴ فعالیت خود را شروع کرده و به
              صورت حضوری در شعب مختلف و همچنین به صورت آنلاین با کیفیت ترین لباس
              های بچه گانه را با ارزان ترین قیمت به فروش می رساند. این فروشگاه
              با بهترین و معتبرترین تولیدی های لباس کودک و نوجوان همکاری می کند
              تا با کیفیت ترین لباس های دخترانه و پسرانه را به دست مشتریان عزیز
              و وفادارش برساند.
            </p>
          </div>
          <div className="col-span-4 w-full space-y-6 flex flex-row items-center justify-center ">
            <img src="/images/samandehi.png" className="w-1/2 h-full" alt="" />
            <img src="/images/enamad-1.png" className="w-1/2 h-full" alt="" />
          </div>
        </div>
      </div>
      <div className="w-full text-center leading-relaxed font-medium text-gray-800 flex flex-row items-center justify-center bg-gray-300 py-4 gap-x-2">
        تمامی حقوق برای سایت کیذزشاپ محفوظ است! تیم طراحی و توسعه
        <Link
          to="https://hesmasoft.ir"
          target="_blank"
          className="block text-CarbonicBlue-500 hover:text-CarbonicBlue-800
            hover:-translate-x-2
            transition-all duration-300 ease-in-out
            "
        >
          حسما سافت
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
