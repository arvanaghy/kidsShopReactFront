import axios from "axios";
import toast from "react-hot-toast";
import { CompanyInfoType, CompanyInfoResponse } from "@types/CompanyInfoType";

export const getCompanyInfo = async (): Promise<CompanyInfoType> => {
  try {
    const { data, status } = await axios.get<CompanyInfoResponse>(
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
    toast.error("اطلاعات شرکت: " + error?.message);
    throw error;
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
    toast.error("واحد پولی: " + error?.message);
    throw error;
  }
};
