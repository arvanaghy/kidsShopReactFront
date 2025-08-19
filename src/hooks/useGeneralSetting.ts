import { useState, useEffect } from "react";
import { getCompanyInfo } from "@api/companyInfo";
import { CompanyInfoType } from "@types/CompanyInfoType";
import { GeneralSettingService } from "@services/GeneralSettingService";

export const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoType>({
    Address: "",
    Phone: "",
    Email: "",
    Instagram: "",
    Telegram: "",
    Whatsapp: "",
    Comment: "",
    latitude: 0,
    longitude: 0,
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

export const useUnit = () => {
  const [isPending, setIsPending] = useState(false);
  const [unit, setUnit] = useState("");
  const getUnit = async () => {
    await GeneralSettingService.getUnit(setUnit, setIsPending);
  };
  useEffect(() => {
    getUnit();
  }, []);

  return { unit, isPending };
};
