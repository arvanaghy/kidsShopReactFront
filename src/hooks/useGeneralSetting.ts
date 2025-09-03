import { useState, useEffect } from "react";
import { CompanyProps } from "@types/CompanyType";
import { GeneralSettingService } from "@services/GeneralSettingService";
import { AboutProps } from "@types/CompanyType";

export const useAboutUsInfo = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutProps[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const getAboutUsInfo = async () => {
    await GeneralSettingService.aboutUs(setAboutUsInfo, setIsPending);
  };

  useEffect(() => {
    getAboutUsInfo();
  }, []);

  return { aboutUsInfo, isPending, refetch: getAboutUsInfo };
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
  const [isPending, setIsPending] = useState<boolean>(true);

  const getCompanyInfo = async () => {
    await GeneralSettingService.companyInfo(setCompanyInfo, setIsPending);
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  return { companyInfo, isPending, refetch: getCompanyInfo };
};

export const useContactForm = () => {
  const [isPending, setIsPending] = useState(false);

  const submitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    await GeneralSettingService.submitContactForm(e, setIsPending);
  };
  return { isPending, submitContactForm };
};

export const useFAQ = () => {
  const [faqInfo, setFaqInfo] = useState();
  const [isPending, setIsPending] = useState<boolean>(false);

  const getFAQ = async () => {
    await GeneralSettingService.getFAQ(setFaqInfo, setIsPending);
  };

  useEffect(() => {
    getFAQ();
  }, []);

  return { faqInfo, isPending };
};
