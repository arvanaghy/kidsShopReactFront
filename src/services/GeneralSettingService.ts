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
import { getErrorMessage } from "@utils/getErrorMessage";

export const GeneralSettingService = {
  aboutUs: async (
    setAboutUsInfo: any,
    setIsPending: (pending: boolean) => void,
    isPending: boolean
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchAboutUsInfo();
      setAboutUsInfo(data);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setIsPending(false);
    }
  },

  companyInfo: async (
    setCompanyInfo: any,
    setIsPending: (pending: boolean) => void,
    isPending: boolean
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchCompanyInfo();
      setCompanyInfo(data);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setIsPending(false);
    }
  },

  submitContactForm: async (
    e: React.FormEvent<HTMLFormElement>,
    setIsPending: (pending: boolean) => void,
    isPending: boolean
  ) => {
    e.preventDefault();
    if (isPending) return;
    const formData = new FormData(e.currentTarget);
    const info = formData.get("info")?.toString() || "";
    const contact = formData.get("contact")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    if (!validateUsername(info)) {
      e.target.info.focus();
      toast.error(nameValidationMessage);
      return;
    }
    if (!contactValidation(contact)) {
      e.target.contact.focus();
      toast.error(contactValidationMessage);
      return;
    }
    if (!messageValidation(message)) {
      e.target.message.focus();
      toast.error(messageValidationMessage);
      return;
    }
    setIsPending(true);
    try {
      await sendContactForm({
        info: info,
        contact: contact,
        message: message,
      });
      toast.success("پیام شما با موفقیت ارسال شد");
    } catch (error) {
      getErrorMessage(error);
    } finally {
      e.target.reset();
      setIsPending(false);
    }
  },

  getFAQ: async (
    setFaqInfo: any,
    setIsPending: (pending: boolean) => void,
    isPending: boolean
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchFAQ();
      setFaqInfo(data);
    } catch (error) {
      getErrorMessage(error);
    } finally {
      setIsPending(false);
    }
  },
};
