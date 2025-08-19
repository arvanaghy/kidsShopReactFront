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
import { faInstagram, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { toPersianDigits } from "@utils/numeralHelpers";
import { useCompanyInfo } from "@hooks/useGeneralSetting";
import ContactInfoLink from "@components/footer/ContactInfoLink";
import SocialMediaLink from "@components/footer/SocialMediaLink";
import Copyright from "@components/footer/Copyright";
import QuickAccessMenusLink from "@components/footer/QuickAccessMenusLink";
import ScrollToTop from "@components/footer/ScrollToTop";
import Loading from "@components/Loading";

const quickAccessLinks = [
  { icon: faCertificate, title: "محصولات ویژه کیدزشاپ", link: "/offered-products" },
  { icon: faBoxesPacking, title: "پرفروش‌ترین محصولات کیدزشاپ", link: "/best-selling-products" },
  { icon: faList, title: "دسته‌بندی محصولات", link: "/categories" },
  { icon: faCircleInfo, title: "پرسش و پاسخ سوالات پرتکرار", link: "/faq" },
  { icon: faCircleInfo, title: "درباره ما", link: "/about-us" },
  { icon: faAddressBook, title: "تماس با ما", link: "/contact-us" },
];

const Footer: React.FC = () => {
  const { companyInfo, loading, error } = useCompanyInfo();
  window.scrollTo(0, 0);
  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500">خطا: {error}</div>;

  return (
    <footer className="w-full bg-gray-100 text-gray-700">
      <div className="px-8 py-4 md:py-6 font-EstedadMedium rounded-b-xl">
        <ScrollToTop />
        <div className="my-2 md:my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 gap-2 md:gap-6 lg:py-2">
          <div className="col-span-12 md:col-span-6 p-3 space-y-6">
            <p className="font-EstedadExtraBold text-sm lg:text-base xl:text-lg py-5 tracking-wide">
              پشتیبانی {toPersianDigits(9)} تا {toPersianDigits(17)} در ایتا و تلگرام
            </p>
            {companyInfo.Address && (
              <ContactInfoLink companyInfo={companyInfo.Address} icon={faLocationDot} type="CONTACT_INFO_ADDRESS" />
            )}
            {companyInfo.Phone && (
              <ContactInfoLink companyInfo={companyInfo.Phone} icon={faPhoneVolume} type="CONTACT_INFO_PHONE" />
            )}
            {companyInfo.Email && (
              <ContactInfoLink companyInfo={companyInfo.Email} icon={faEnvelope} type="CONTACT_INFO_EMAIL" />
            )}
            <div className="flex items-center justify-start gap-6">
              {companyInfo.Whatsapp && (
                <SocialMediaLink info={companyInfo.Whatsapp} icon={faWhatsapp} type="SOCIAL_MEDIA_WHATSAPP" />
              )}
              {companyInfo.Telegram && (
                <SocialMediaLink info={companyInfo.Telegram} icon={faTelegram} type="SOCIAL_MEDIA_TELEGRAM" />
              )}
              {companyInfo.Instagram && (
                <SocialMediaLink info={companyInfo.Instagram} icon={faInstagram} type="SOCIAL_MEDIA_INSTAGRAM" />
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 p-3 space-y-6">
            <h3 className="text-sm lg:text-lg 2xl:text-2xl font-EstedadExtraBold">دسترسی سریع</h3>
            {quickAccessLinks.map((link) => (
              <QuickAccessMenusLink key={link.link} icon={link.icon} title={link.title} link={link.link} />
            ))}
          </div>
        </div>
        <div className="my-1 md:my-3 border-b-2 border-gray-300"></div>
        <div className="grid grid-cols-12 gap-2 md:gap-6 py-2 lg:py-4">
          <div className="col-span-12 md:col-span-8 space-y-6">
            <h2 className="text-base xl:text-xl 2xl:text-3xl font-EstedadExtraBold">
              {import.meta.env.VITE_APP_NAME}
            </h2>
            {companyInfo.Comment && (
              <p className="text-xs xl:text-base leading-relaxed xl:leading-loose tracking-wide font-EstedadLight" >
                {companyInfo.Comment}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-row items-center justify-center">
            <img src="/images/samandehi.png" className="w-1/2 h-full" alt="samandehi" />
            <img src="/images/enamad-1.png" className="w-1/2 h-full" alt="enamad" />
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;