import { useState, useEffect } from "react";
import { getCompanyInfo } from "@api/companyInfo";
import { CompanyInfoType } from "@types/CompanyInfoType";

const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoType>({
    Address: "",
    Phone: "",
    Email: "",
    Instagram: "",
    Telegram: "",
    Whatsapp: "",
    Comment: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCompanyInfo();
      setCompanyInfo(data);
    } catch (error: any) {
      setError(error.message || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return { companyInfo, loading, error, refetch: fetchCompanyInfo };
};

export default useCompanyInfo;
