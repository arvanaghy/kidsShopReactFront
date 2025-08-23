import axios from "axios";
import {
  CompanyProps,
  CompanyPropsResponse,
  AboutProps,
  AboutPropsResponse,
} from "@types/CompanyType";

export const fetchAboutUsInfo = async (): Promise<AboutProps[]> => {
  try {
    const { data, status } = await axios.get<AboutPropsResponse>(
      `${import.meta.env.VITE_API_URL}/v1/about-us`
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return data.result;
  } catch (error: any) {
    throw new Error("درباره شرکت: " + error?.message);
  }
};
export const fetchFAQ = async () => {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/faq`
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return data.result;
  } catch (error: any) {
    throw new Error("فاک: " + error?.message);
  }
};

export const fetchCompanyInfo = async (): Promise<CompanyProps> => {
  try {
    const { data, status } = await axios.get<CompanyPropsResponse>(
      `${import.meta.env.VITE_API_URL}/v2/company-info`
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return {
      Address:
        data.company_info.Address || import.meta.env.VITE_CONTACT_INFO_ADDRESS,
      Phone: data.company_info.Phone || import.meta.env.VITE_CONTACT_INFO_PHONE,
      Email: data.company_info.Email || import.meta.env.VITE_CONTACT_INFO_EMAIL,
      Instagram:
        data.company_info.Instagram ||
        import.meta.env.VITE_SOCIAL_MEDIA_INSTAGRAM,
      Telegram:
        data.company_info.Telegram ||
        import.meta.env.VITE_SOCIAL_MEDIA_TELEGRAM,
      Whatsapp:
        data.company_info.Whatsapp ||
        import.meta.env.VITE_SOCIAL_MEDIA_WHATSAPP,
      Comment: data.company_info.Comment || "",
      latitude:
        data?.company_info?.latitude ||
        import.meta.env.VITE_CONTACT_INFO_LATITUDE,
      longitude:
        data?.company_info?.longitude ||
        import.meta.env.VITE_CONTACT_INFO_LONGITUDE,
    };
  } catch (error: any) {
    throw new Error("اطلاعات شرکت: " + error?.message);
  }
};

export const fetchUnit = async () => {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/unit`
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return data?.result || import.meta.env.VITE_UNIT;
  } catch (error: any) {
    throw new Error("واحد پولی" + error?.message || "خطا در اتصال");
  }
};

export const sendContactForm = async (info) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/contact-us`,
      info,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status !== 200) throw new Error(data?.message);
  } catch (error: any) {
    throw new Error("ارسال پیام" + error?.message);
  }
};
