import {
  registerUser,
  loginUser,
  otpApi,
  resendMSApi,
  isUserValidApi,
  logOutApi,
} from "@api/authApi";
import toast from "react-hot-toast";
import { validateUsername } from "@entity/validations";
import { nameValidationMessage } from "@entity/validationMessages";
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
    redirect: string,
    navigate: (url: string) => void,
    setIsPending: (pending: boolean) => void
  ) => {
    e.preventDefault();

    if (!validateUsername(e.target.name.value)) {
      toast.error(nameValidationMessage);
      e.target.name.focus();
      return;
    }
    if (!validatePhoneNumber(e.target.phoneNumber.value)) {
      toast.error(phoneNumberValidationMessage);
      e.target.phoneNumber.focus();
      return;
    }
    if (!validateAddress(e.target.address.value)) {
      toast.error(addressValidationMessage);
      e.target.address.focus();
      return;
    }
    setIsPending(true);
    try {
      await registerUser({
        name: e.target.name.value,
        phone_number: e.target.phoneNumber.value,
        Address: e.target.address.value,
      });
      e.target.reset();
      navigate(
        `/SMS-validate/${e.target.phoneNumber.value}${
          redirect ? "?redirect=" + redirect : ""
        }`
      );
    } catch (error: any) {
      if (error.message && error.response?.status === 302) {
        navigate(
          `/login${redirect ? "?redirect=" + redirect : ""}?phoneNumber=${
            e.target.phoneNumber.value
          }`
        );
      }
      toast.error(getErrorMessage(error));
    } finally {
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
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phoneNumber")?.toString() || "";

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(phoneNumberValidationMessage);
      e.currentTarget.querySelector("[name='phoneNumber']")?.focus();
      return;
    }

    setIsPending(true);
    try {
      const { data, status } = await loginUser({ phone_number: phoneNumber });
      console.log("sms", data);
      if (status === 201) {
        updateUser(data?.result);
        navigate(redirect || "/profile");
      } else if (status === 202) {
        const params = new URLSearchParams();
        if (redirect) params.set("redirect", redirect);
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
      e.currentTarget.reset();
      setIsPending(false);
    }
  },
  otpVerify: async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string | null | undefined,
    navigate: (url: string) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    updateUser: (user: {
      Code?: number | string;
      Name?: string;
      UToken?: string;
      Address?: string;
    }) => void
  ) => {
    e.preventDefault();
    if (isPending) return;
    const formData = new FormData(e.currentTarget);
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
      if (status === 202) {
        updateUser(data?.result);
        navigate(redirect ? redirect : "/profile");
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      e.currentTarget.reset();
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
    setIsPending(true);
    const phoneNumber = user?.Mobile;
    const token = user?.UToken;
    try {
      if (!phoneNumber) {
        throw new Error("شماره موبایل وارد نشده است");
      }
      if (!token) {
        throw new Error("توکن وارد نشده است");
      }
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
        validatePhoneNumber(user.Phone_number) &&
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
    setIsPending: (pending: boolean) => void,
    navigate: (url: string) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = await logOutApi(user.UToken);
      if (result) {
        clearUser();
        clearCart();
        clearTransfer();
        clearDescription();
        clearCompare();
        clearFavorite();
        navigate("/login");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },
};
