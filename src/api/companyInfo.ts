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
      Address: data.company_info.Address || "",
      Phone: data.company_info.Phone || "",
      Email: data.company_info.Email || "",
      Instagram: data.company_info.Instagram || "",
      Telegram: data.company_info.Telegram || "",
      Whatsapp: data.company_info.Whatsapp || "",
      Comment: data.company_info.Comment || "",
    };
  } catch (error: any) {
    toast.error("درباره ما: " + error?.message);
    throw error;
  }
};
