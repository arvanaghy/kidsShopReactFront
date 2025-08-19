import { useState, useEffect } from "react";
import { fetchCompanyInfo } from "@api/generalApi";
import { CompanyProps } from "@types/CompanyType";
import { GeneralSettingService } from "@services/GeneralSettingService";

import { fetchAboutUsInfo } from "@api/generalApi";
import { AboutProps } from "@types/CompanyType";

export const useAboutUsInfo = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAboutUsInfo = async () => {
    try {
      setLoading(true);
      const data = await fetchAboutUsInfo();
      setAboutUsInfo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAboutUsInfo();
  }, []);

  return { aboutUsInfo, loading };
};

export const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyProps>({
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

  const getCompanyInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCompanyInfo();
      setCompanyInfo(data);
    } catch (error: any) {
      setError(error.message || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  return { companyInfo, loading, error, refetch: getCompanyInfo };
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
