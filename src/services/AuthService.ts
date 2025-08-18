import { registerUser } from "./authApi";
import toast from "react-hot-toast";

export const AuthService = {
  mobilePattern: /^09[0-9]{9}$/,
  namePattern: /^[a-zA-Z0-9]{3,}$/,

  submitRegister: async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void,
    setIsPending: (pending: boolean) => void
  ) => {
    e.preventDefault();
    
    // Validate phone number
    if (!AuthService.mobilePattern.test(e.target.phoneNumber.value)) {
      toast.error("شماره موبایل را وارد نمایید");
      e.target.phoneNumber.focus();
      return;
    }
    
    // Validate name
    if (!AuthService.namePattern.test(e.target.name.value)) {
      toast.error("نام و نام خانوادگی را وارد نمایید");
      e.target.name.focus();
      return;
    }
    
    // Validate address
    if (!e.target.address.value) {
      toast.error("آدرس را وارد نمایید");
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
      
      // On success (status 202), show success message and navigate
      e.target.reset();
      navigate(
        `/SMS-validate/${e.target.phoneNumber.value}${
          redirect ? "?redirect=" + redirect : ""
        }`
      );
    } catch (error: any) {
      // Handle specific error for status 302
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
};