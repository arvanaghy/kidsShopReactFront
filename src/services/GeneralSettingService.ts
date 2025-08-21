import toast from "react-hot-toast";
import { fetchUnit } from "@api/generalApi";
import { fetchAboutUsInfo } from "@api/generalApi";
import { fetchCompanyInfo } from "@api/generalApi";
import { sendContactForm } from "@api/GeneralApi";
import { ReactComponentElement } from "react";

export const GeneralSettingService = {
  mobilePattern: /^09[0-9]{9}$/,
  infoPattern: /^.{2,}\s.{2,}$/,
  emailPattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  messagePattern: /^.{5,}$/,

  mobileValidationMessage: "شماره موبایل بدرستی وارد نشده است",
  infoValidationMessage:
    "نام و نام خانوادگی خود را بطور کامل وارد کنید  بین نام و نام خانوادگی باید فاصله باشد",
  emailValidationMessage: "ایمیل را بطور کامل وارد نمایید",
  messageValidationMessage: "پیام را بطور کامل وارد نمایید",
  contactValidationMessage: " شماره موبایل یا ایمیل باید به درستی وارد شود",

  mobileValidation: (value: any) =>
    GeneralSettingService.mobilePattern.test(value),
  infoValidation: (value: any) => GeneralSettingService.infoPattern.test(value),
  emailValidation: (value: any) =>
    GeneralSettingService.emailPattern.test(value),
  messageValidation: (value: any) =>
    GeneralSettingService.messagePattern.test(value),

  contactValidation: (value: any) =>
    GeneralSettingService.mobileValidation(value) ||
    GeneralSettingService.emailValidation(value),

  getUnit: async (setUnit: any, setIsPending: any) => {
    setIsPending(true);
    try {
      const unit = await fetchUnit();
      setUnit(unit);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
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
    if (!GeneralSettingService.infoValidation(e.target.info.value)) {
      e.target.info.focus();
      toast.error(GeneralSettingService.infoValidationMessage);
      return;
    }
    if (!GeneralSettingService.contactValidation(e.target.contact.value)) {
      e.target.contact.focus();
      toast.error(GeneralSettingService.contactValidationMessage);
      return;
    }
    if (!GeneralSettingService.messageValidation(e.target.message.value)) {
      e.target.message.focus();
      toast.error(GeneralSettingService.messageValidationMessage);
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
};
