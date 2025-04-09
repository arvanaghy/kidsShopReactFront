import { Link, useLocation } from "react-router-dom";
import Map from "../components/Map";
import { RiInstagramFill } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { ImWhatsapp } from "react-icons/im";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <footer className=" mx-auto px-8 font-semibold font-EstedadMedium text-gray-200 tracking-widest shadow-lg shadow-gray-700/70 rotate-180 rounded-b-xl w-full bg-CarbonicBlue-500">
      <div className="rotate-180 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start justify-around gap-6">
          <div className="p-3">
            <p
              className="my-2 text-base font-EstedadMedium font-semibold lg:text-base
          xl:text-lg
          2xl:text-xl
          border-b py-2"
            >
              تامین لوازم برقی کیدزشاپ
            </p>
            <p className="text-gray-300 font-EstedadLight my-2 leading-relaxed lg:leading-loose	 text-justify text-sm">
              در الکتروشاپ، افتخار داریم که به عنوان یک توزیع کننده لوازم برقی
              در خدمت شما هستیم. با سابقه‌ای فراوان در این حوزه، تعهد ما ارائه‌ی
              بهترین و کیفیتی‌ترین قطعات یدکی برای خودروهای شماست.
            </p>
            <div className="my-2 flex flex-row gap-3 ">
              <Link
                to={"https://www.instagram.com/electro.erfan.tanloo/"}
                target="_blank"
                className="hover:text-stone-800"
              >
                <RiInstagramFill className="text-3xl" />
              </Link>
              <Link
                target="_blank"
                to={"https://t.me/@electroerfan24"}
                className="hover:text-stone-800"
              >
                <LiaTelegramPlane className="text-3xl" />
              </Link>
              <Link
                to={"https://chat.whatsapp.com/JWGqFLsz9Hi4oWjvM2aAA6"}
                className="hover:text-stone-800"
                target="_blank"
              >
                <ImWhatsapp className="text-2xl" />
              </Link>
            </div>
          </div>
          <div className="w-full p-3">
            <p
              className="my-2 text-base font-EstedadMedium font-semibold 
          lg:text-base
          xl:text-lg
          2xl:text-xl
          border-b py-2"
            >
              مجوز ها
            </p>
            <div className="w-full flex flex-row items-center justify-center">
              <img
                src="/images/samandehi.png"
                className="w-1/2 h-full"
                alt=""
              />
              <img src="/images/enamad-1.png" className="w-1/2 h-full" alt="" />
            </div>
          </div>
          <div className="w-full p-3">
            <p
              className="my-2 text-base font-EstedadMedium font-semibold 
          lg:text-base
          xl:text-lg
          2xl:text-xl  border-b py-2"
            >
              اپلیکیشن اندروید الکتروشاپ
            </p>
            <Link
              to={"#"}
              className="block my-4 hover:-translate-x-1 transation-all duration-500 ease-in-out hover:text-stone-800/90 
              lg:text-sm
              xl:text-base
              "
            >
              دانلود از کافه بازار
            </Link>
            <Link
              to={"#"}
              className="block my-4 hover:-translate-x-1 transation-all duration-500 ease-in-out hover:text-stone-800/90
                       lg:text-sm
              xl:text-base
              "
            >
              دانلود از مایکت
            </Link>
            <Link
              to={"#"}
              className="block my-4 hover:-translate-x-1 transation-all duration-500 ease-in-out hover:text-stone-800/90
                       lg:text-sm
              xl:text-base
              "
            >
              لینک دانلود مستقیم
            </Link>
          </div>
        </div>
        <div
          className={`my-10 ${pathname === "/contact-us" ? "hidden" : "block"}`}
        >
          <Map />
          <div className="flex lg:flex-row flex-col items-center justify-center gap-10 lg:gap-0 lg:justify-between mt-8">
            <div className="flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faLocationDot} className="text-3xl lg:text-base" />
              <p className="mr-1.5 lg:mr-3 leading-relaxed py-4 tracking-widest lg:text-sm xl:text-base	">
                <strong className="mx-1.5 text-gray-100"> آدرس : </strong>
                تبریز خیابان فردوسی سرای نصیرزاده پلاک ۱۱ الکترو عرفان
              </p>
            </div>
            <div className="flex items-center justify-center text-white tracking-widest	">
              <FontAwesomeIcon icon={faPhoneVolume} className="-scale-x-100 text-3xl lg:text-base" />
              <p className="mr-1.5 xl:mr-3 lg:text-sm xl:text-base">
                <strong className="mx-1.5 text-gray-100">شماره تلفن:</strong>
                ۳۵۵۵۱۰۸۰ - ۳۵۵۷۱۴۰۰ - ۳۵۵۴۴۳۹۲
              </p>
            </div>
          </div>
        </div>
        <div className="w-full items-center justify-center py-6 mt-8 border-t lg:flex">
          <div className="w-full my-2 text-center leading-relaxed font-medium text-gray-200">
            &copy; تمامی حقوق نشر برای الکتروشاپ محفوظ است
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
