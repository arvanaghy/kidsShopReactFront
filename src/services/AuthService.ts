import {
  registerUser,
  loginUser,
  otpApi,
  resendMSApi,
  isUserValidApi,
  logOutApi,
} from "@api/authApi";
import toast from "react-hot-toast";
import {
  validateCity,
  validateProvince,
  validateUsername,
} from "@entity/validations";
import {
  cityValidationMessage,
  nameValidationMessage,
  provinceValidationMessage,
} from "@entity/validationMessages";
import {
  validateAddress,
  validateOtp,
  validatePhoneNumber,
} from "@entity/validations";
import {
  addressValidationMessage,
  otpValidationMessage,
  phoneNumberValidationMessage,
} from "@entity/validationMessages";
import { getErrorMessage } from "@utils/getErrorMessage";
import axios from "axios";

interface User {
  Code: string;
  Name: string;
  UToken: string;
  Address: string;
}

export const AuthService = {
  submitRegister: async (
    e: React.FormEvent<HTMLFormElement>,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    e.preventDefault();
    if (isPending) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() || "";
    const phoneNumber = formData.get("phoneNumber")?.toString() || "";
    const address = formData.get("address")?.toString() || "";
    const province = formData.get("province")?.toString() || "";
    const city = formData.get("city")?.toString() || "";

    if (!validateUsername(name)) {
      toast.error(nameValidationMessage);
      e.currentTarget.querySelector("[name='name']")?.focus();
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(phoneNumberValidationMessage);
      e.currentTarget.querySelector("[name='phoneNumber']")?.focus();
      return;
    }
    if (!validateProvince(province)) {
      toast.error(provinceValidationMessage);
      e.currentTarget.querySelector("[name='province']")?.focus();
      return;
    }
    if (!validateCity(city)) {
      toast.error(cityValidationMessage);
      e.currentTarget.querySelector("[name='city']")?.focus();
      return;
    }
    if (!validateAddress(address)) {
      toast.error(addressValidationMessage);
      e.currentTarget.querySelector("[name='address']")?.focus();
      return;
    }
    setIsPending(true);
    try {
      const { data, status } = await registerUser({
        name: name,
        phone_number: phoneNumber,
        Address: province + " - " + city + " - " + address,
      });
      toast.success(data?.message);
      console.log("sms", data);
      return status;
    } catch (error: any) {
      toast.error(getErrorMessage(error));
      return error?.response?.status;
    } finally {
      if (form && typeof form.reset === "function") {
        form.reset();
      }
      setIsPending(false);
    }
  },

  loginSubmit: async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string | null | undefined,
    navigate: (url: string) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    updateUser: (user: User) => void
  ) => {
    e.preventDefault();
    if (isPending) return;

    const form = e.currentTarget as HTMLFormElement;
    if (!(form instanceof HTMLFormElement)) {
      toast.error("فرم معتبر نیست");
      return;
    }

    const formData = new FormData(form);
    const phoneNumber = formData.get("phoneNumber")?.toString() || "";

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(phoneNumberValidationMessage);
      form.querySelector("[name='phoneNumber']")?.focus();
      return;
    }

    setIsPending(true);
    try {
      const { data, status } = await loginUser({ phone_number: phoneNumber });
      console.log("sms", data);
      if (status === 201) {
        updateUser(data?.customer);
        navigate(redirect || "/profile");
      } else if (status === 202) {
        const params = new URLSearchParams();
        if (redirect) params.set("redirect", redirect);
        toast.success(data?.message);
        navigate(`/SMS-validate/${encodeURIComponent(phoneNumber)}?${params}`);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        const params = new URLSearchParams();
        params.set("phoneNumber", phoneNumber);
        if (redirect) params.set("redirect", redirect);
        navigate(`/register?${params}`);
      }
    } finally {
      if (form && typeof form.reset === "function") {
        form.reset();
      }
      setIsPending(false);
    }
  },
  otpVerify: async (
    e: React.FormEvent<HTMLFormElement>,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    e.preventDefault();
    if (isPending) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const otp = formData.get("otp")?.toString() || "";
    const phoneNumber = formData.get("phoneNumber")?.toString() || "";
    if (!validateOtp(otp)) {
      toast.error(otpValidationMessage);
      e.currentTarget.querySelector("[name='otp']")?.focus();
      return;
    }
    setIsPending(true);
    try {
      const { data, status } = await otpApi({
        phone_number: phoneNumber,
        sms: otp,
      });
      return { data, status };
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      if (form && typeof form.reset === "function") {
        form.reset();
      }
      setIsPending(false);
    }
  },

  resendSMS: async (
    phoneNumber: string,
    setIsPending: (pending: boolean) => void
  ) => {
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(phoneNumberValidationMessage);
      return;
    }
    setIsPending(true);
    try {
      await resendMSApi({
        phone_number: phoneNumber,
      });
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  validateUser: async (
    user: any,
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setIsUserValidated: (userValidated: boolean) => void
  ) => {
    if (isPending) return;
    const phoneNumber = user?.Mobile;
    const token = user?.UToken;
    if (!phoneNumber) {
      return;
    }
    if (!token) {
      return;
    }
    setIsPending(true);
    try {
      await isUserValidApi({
        phone_number: phoneNumber,
        UToken: token,
      });
      setIsUserValidated(true);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  isUserInfoCompleted: (user: any) => {
    try {
      if (
        validateUsername(user.Name) &&
        validatePhoneNumber(user.Mobile) &&
        validateAddress(user.Address)
      ) {
        return true;
      } else {
        throw new Error("اطلاعات کاربری کامل نیست");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  },

  logoutSubmit: async (
    user: any,
    isPending: boolean,
    clearUser: () => void,
    clearCart: () => void,
    clearTransfer: () => void,
    clearDescription: () => void,
    clearCompare: () => void,
    clearFavorite: () => void,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      await logOutApi(user.UToken);
      clearUser();
      clearCart();
      clearTransfer();
      clearDescription();
      clearCompare();
      clearFavorite();
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  validateUserOnCart: async (mobile: string, token: string) => {
    try {
      await isUserValidApi({
        phone_number: mobile,
        UToken: token,
      });
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  },
};
