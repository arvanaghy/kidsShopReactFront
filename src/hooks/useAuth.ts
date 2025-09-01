import { useEffect, useState } from "react";
import { AuthService } from "@services/AuthService";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);

  const submitRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void
  ) => {
    await AuthService.submitRegister(e, redirect, navigate, setIsPending);
  };

  return { submitRegister, isPending };
};

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const loginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void
  ) => {
    await AuthService.loginSubmit(
      e,
      redirect,
      navigate,
      setIsPending,
      updateUser
    );
  };
  return { loginSubmit, isPending };
};

export const useOtp = () => {
  const [isPending, setIsPending] = useState(false);
  const { updateUser } = useUserStore();
  const otpVerify = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void
  ) => {
    await AuthService.otpVerify(
      e,
      redirect,
      navigate,
      setIsPending,
      updateUser
    );
  };
  return { otpVerify, isPending };
};

export const useResendSMS = () => {
  const [isPending, setIsPending] = useState(false);
  const resendSMS = async (phoneNumber: string) => {
    await AuthService.resendSMS(phoneNumber, setIsPending);
  };
  return { resendSMS, isPending };
};

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const logout = async (
    user: any,
    clearUser: () => void,
    clearCart: () => void,
    clearTransfer: () => void,
    clearDescription: () => void,
    clearCompare: () => void,
    clearFavorite: () => void,
    navigate: (url: string) => void
  ) => {
    await AuthService.logoutSubmit(
      user,
      isPending,
      clearUser,
      clearCart,
      clearTransfer,
      clearDescription,
      clearCompare,
      clearFavorite,
      setIsPending,
      navigate
    );
  };
  return { logout, isPending };
};

export const useUserValidation = (user: any) => {
  const [isPending, setIsPending] = useState(false);
  const [isUserValidated, setIsUserValidated] = useState(false);

  const validateUser = async () => {
    await AuthService.validateUser(
      user,
      isPending,
      setIsPending,
      setIsUserValidated
    );
  };
  useEffect(() => {
    validateUser();
  }, []);

  return { isPending, isUserValidated };
};
