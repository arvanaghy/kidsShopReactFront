import toast from "react-hot-toast";
import { fetchAboutUsInfo } from "@api/generalApi";
import { fetchCompanyInfo } from "@api/generalApi";
import { sendContactForm } from "@api/GeneralApi";
import { fetchFAQ } from "@api/GeneralApi";
import {
  contactValidationMessage,
  messageValidationMessage,
  nameValidationMessage,
} from "@entity/validationMessages";
import {
  contactValidation,
  messageValidation,
  validateUsername,
} from "@entity/validations";

export const GeneralSettingService = {
  aboutUs: async (setAboutUsInfo: any, setIsPending: any) => {
    setIsPending(true);
    try {
      const data = await fetchAboutUsInfo();
      setAboutUsInfo(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  companyInfo: async (setCompanyInfo: any, setIsPending: any) => {
    setIsPending(true);
    try {
      const data = await fetchCompanyInfo();
      setCompanyInfo(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  submitContactForm: async (
    e: React.FormEvent<HTMLFormElement>,
    setIsPending: (pending: boolean) => void
  ) => {
    e.preventDefault();
    if (!validateUsername(e.target.info.value)) {
      e.target.info.focus();
      toast.error(nameValidationMessage);
      return;
    }
    if (!contactValidation(e.target.contact.value)) {
      e.target.contact.focus();
      toast.error(contactValidationMessage);
      return;
    }
    if (!messageValidation(e.target.message.value)) {
      e.target.message.focus();
      toast.error(messageValidationMessage);
      return;
    }
    setIsPending(true);
    try {
      await sendContactForm({
        info: e.target.info.value,
        contact: e.target.contact.value,
        message: e.target.message.value,
      });
      toast.success("پیام شما با موفقیت ارسال شد");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      e.target.reset();
      setIsPending(false);
    }
  },

  getFAQ: async (setFaqInfo: any, setIsPending: any) => {
    setIsPending(true);
    try {
      const data = await fetchFAQ();
      setFaqInfo(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
};
