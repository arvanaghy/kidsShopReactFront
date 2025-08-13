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

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      const data = await getCompanyInfo();
      setCompanyInfo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  return { companyInfo, loading };
};

export default useCompanyInfo;
