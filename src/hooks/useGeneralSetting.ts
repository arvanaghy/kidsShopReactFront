import { useState, useEffect } from "react";
import { CompanyProps } from "@definitions/CompanyType";
import { GeneralSettingService } from "@services/GeneralSettingService";
import { AboutProps } from "@definitions/CompanyType";

export const useAboutUsInfo = () => {
  const [aboutUsInfo, setAboutUsInfo] = useState<AboutProps[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const getAboutUsInfo = async () => {
    await GeneralSettingService.aboutUs(setAboutUsInfo, setIsPending , isPending);
  };

  useEffect(() => {
    getAboutUsInfo();
  }, []);

  return { aboutUsInfo, isPending };
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
  const [isPending, setIsPending] = useState<boolean>(false);

  const getCompanyInfo = async () => {
    await GeneralSettingService.companyInfo(
      setCompanyInfo,
      setIsPending,
      isPending
    );
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  return { companyInfo, isPending };
};

export const useContactForm = () => {
  const [isPending, setIsPending] = useState(false);

  const submitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    await GeneralSettingService.submitContactForm(e, setIsPending, isPending);
  };
  return { isPending, submitContactForm };
};

export const useFAQ = () => {
  const [faqInfo, setFaqInfo] = useState();
  const [isPending, setIsPending] = useState<boolean>(false);

  const getFAQ = async () => {
    await GeneralSettingService.getFAQ(setFaqInfo, setIsPending, isPending);
  };

  useEffect(() => {
    getFAQ();
  }, []);

  return { faqInfo, isPending };
};
