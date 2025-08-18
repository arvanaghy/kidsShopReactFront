import { registerUser, loginUser } from "@api/authApi";
import toast from "react-hot-toast";

export const AuthService = {
  mobilePattern: /^09[0-9]{9}$/,
  namePattern: /^.{2,}\s.{2,}$/,
  addressPattern: /^.{10,}$/,

  phoneNumberValidationMessage: "شماره موبایل بدرستی وارد نشده است",
  nameValidationMessage:
    "نام و نام خانوادگی خود را بطور کامل وارد کنید  بین نام و نام خانوادگی باید فاصله باشد",
  addressValidationMessage: "آدرس را بطور کامل وارد نمایید",

  validatePhoneNumber: (phoneNumber: string) => {
    return AuthService.mobilePattern.test(phoneNumber);
  },

  validateUsername: (username: string) => {
    return AuthService.namePattern.test(username);
  },

  validateAddress: (address: string) => {
    return AuthService.addressPattern.test(address);
  },

  submitRegister: async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void,
    setIsPending: (pending: boolean) => void
  ) => {
    e.preventDefault();

    if (!AuthService.validateUsername(e.target.name.value)) {
      toast.error(AuthService.nameValidationMessage);
      e.target.name.focus();
      return;
    }
    if (!AuthService.validatePhoneNumber(e.target.phoneNumber.value)) {
      toast.error(AuthService.phoneNumberValidationMessage);
      e.target.phoneNumber.focus();
      return;
    }
    if (!AuthService.validateAddress(e.target.address.value)) {
      toast.error(AuthService.addressValidationMessage);
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
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  loginSubmit: async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void,
    setIsPending: (pending: boolean) => void,
    updateUser: (user: {
      Code: number | string;
      Name: string;
      UToken: string;
    }) => void
  ) => {
    e.preventDefault();
    if (!AuthService.validatePhoneNumber(e.target.phoneNumber.value)) {
      toast.error(AuthService.phoneNumberValidationMessage);
      e.target.phoneNumber.focus();
      return;
    }
    setIsPending(true);
    try {
      const { data } = await loginUser({
        phone_number: e.target.phoneNumber.value,
      });
      updateUser(data?.result);
      navigate(redirect ? redirect : "/profile");
    } catch (error: any) {
      if (error.message && error.response?.status === 202) {
        navigate(
          `/SMS-validate/${e.target.phoneNumber.value}${
            redirect ? "?redirect=" + redirect : ""
          }`
        );
      }
      if (error.message && error.response?.status === 404) {
        navigate(
          `/register?phoneNumber=${e.target.phoneNumber.value}${
            redirect ? "&redirect=" + redirect : ""
          }`
        );
      }
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
};
