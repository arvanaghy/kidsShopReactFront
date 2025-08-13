import {
  faAddressBook,
  faBoxesPacking,
  faCertificate,
  faCircleInfo,
  faEnvelope,
  faList,
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { toPersianDigits } from "@utils/numeralHelpers";
import {
  faInstagram,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import useCompanyInfo from "@hooks/useCompanyInfo";
import ContactInfoLink from "@components/footer/ContactInfoLink";
import SocialMediaLink from "@components/footer/SocialMediaLink";
import Copyright from "@components/footer/Copyright";
import QuickAccessMenusLink from "@components/footer/QuickAccessMenusLink";
import ScrollToTop from "@components/footer/ScrollToTop";

const Footer: React.FC = () => {
  const { companyInfo, loading } = useCompanyInfo();

  if (loading) return null;

  return (
    <footer className="w-full">
      <div className="px-8 py-4 md:py-6 font-semibold font-EstedadMedium text-gray-700  rounded-b-xl w-full bg-gray-100 ">
        <ScrollToTop />
        <div className="my-2 md:my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 items-start justify-around gap-2 md:gap-6 lg:py-2">
          <div className="col-span-12 md:col-span-6 w-full md:p-3 space-y-2 md:space-y-6">
            <p
              className="font-EstedadExtraBold font-bold text-sm lg:text-base
          xl:text-lg
          py-5
          text-gray-700
          tracking-wide
          "
            >
              پشتیبانی {toPersianDigits(9)} تا {toPersianDigits(17)} در ایتا و
              تلگرام
            </p>
            <div className="flex items-center justify-start gap-3 ">
              <ContactInfoLink
                companyInfo={companyInfo?.Address}
                icon={faLocationDot}
                type="CONTACT_INFO_ADDRESS"
              />
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <ContactInfoLink
                companyInfo={companyInfo?.Phone}
                icon={faPhoneVolume}
                type="CONTACT_INFO_PHONE"
              />
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <ContactInfoLink
                companyInfo={companyInfo?.Email}
                icon={faEnvelope}
                type="CONTACT_INFO_EMAIL"
              />
            </div>
            <div className="flex items-center justify-start gap-6 ">
              <SocialMediaLink
                info={companyInfo?.Whatsapp}
                icon={faWhatsapp}
                type="SOCIAL_MEDIA_WHATSAPP"
              />
              <SocialMediaLink
                info={companyInfo?.Telegram}
                icon={faTelegram}
                type="SOCIAL_MEDIA_TELEGRAM"
              />
              <SocialMediaLink
                info={companyInfo?.Instagram}
                icon={faInstagram}
                type="SOCIAL_MEDIA_INSTAGRAM"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 w-full p-3 space-y-6">
            <h3 className="text-sm lg:text-lg 2xl:text-2xl font-EstedadExtraBold">
              دسترسی سریع
            </h3>
            <QuickAccessMenusLink
              icon={faCertificate}
              title="محصولات ویژه کیدزشاپ"
              link="/offered-products"
            />

            <QuickAccessMenusLink
              icon={faBoxesPacking}
              title="پرفروشترین محصولات کیدزشاپ"
              link="/best-selling-products"
            />

            <QuickAccessMenusLink
              icon={faList}
              title="دسته بندی محصولات"
              link="/categories"
            />
            <QuickAccessMenusLink
              icon={faCircleInfo}
              title="پرسش و پاسخ سوالات پرتکرار"
              link="/faq"
            />

            <QuickAccessMenusLink
              icon={faCircleInfo}
              link="/about-us"
              title="درباره ما"
            />

            <QuickAccessMenusLink
              icon={faAddressBook}
              link="/contact-us"
              title="تماس با ما"
            />
          </div>
        </div>
        <div className="my-1 md:my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 items-start justify-around gap-2 md:gap-6 py-2 lg:py-4">
          <div className="col-span-12 md:col-span-8 w-full space-y-6 ">
            <h2 className="text-base xl:text-xl 2xl:text-3xl 2xl:py-10 font-EstedadExtraBold">
              {import.meta.env.VITE_APP_NAME}
            </h2>
            <p className="flex text-xs xl:text-base leading-relaxed tracking-wide  ">
              {companyInfo?.Comment || ""}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 w-full md:space-y-6 flex flex-row items-center justify-center ">
            <img src="/images/samandehi.png" className="w-1/2 h-full" alt="" />
            <img src="/images/enamad-1.png" className="w-1/2 h-full" alt="" />
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
export default Footer;
