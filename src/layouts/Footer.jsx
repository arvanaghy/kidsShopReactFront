import { Link, useLocation } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { ImWhatsapp } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { toPersianDigits } from "@utils/numeralHelpers";

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
          <div className="col-span-3 w-full p-3 space-y-4">
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
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-3xl lg:text-3xl"
              />
              <p className=" leading-relaxed tracking-widest lg:text-sm xl:text-base	">
                <strong className="font-EstedadExtraBold"> آدرس : </strong>
                تبریز ارم
              </p>
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <FontAwesomeIcon
                icon={faPhoneVolume}
                className="text-3xl lg:text-3xl -scale-x-100"
              />
              <p className=" leading-relaxed tracking-widest lg:text-sm xl:text-base	">
                <strong className="font-EstedadExtraBold">شماره تلفن:</strong>
                ۳۵۵۵۱۰۸۰ - ۳۵۵۷۱۴۰۰ - ۳۵۵۴۴۳۹۲
              </p>
            </div>
          </div>

          <div className="col-span-3 w-full p-3 space-y-4"></div>
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
