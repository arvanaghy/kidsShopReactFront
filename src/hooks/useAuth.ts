import { useEffect, useState } from "react";
import { AuthService } from "@services/AuthService";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@store/UserStore";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const submitRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect?: string | null | undefined
  ) => {
    const params = new URLSearchParams();
    if (redirect) params.set("redirect", redirect);
    const phone_number = e.currentTarget.phoneNumber.value;
    const resultStatusCode = await AuthService.submitRegister(
      e,
      isPending,
      setIsPending
    );
    if (resultStatusCode == 200) {
      params.set("phoneNumber", phone_number);
      navigate(`/login?${params}`);
    }
    if (resultStatusCode == 201) {
      navigate(`/SMS-validate/${encodeURIComponent(phone_number)}?${params}`);
    }
  };

  return { submitRegister, isPending };
};

export const useRegisterOnCart = () => {
  const [isPending, setIsPending] = useState(false);

  const submitRegisterOnCart = async (e: React.FormEvent<HTMLFormElement>) => {
    const resultStatusCode = await AuthService.submitRegister(
      e,
      isPending,
      setIsPending
    );
    return resultStatusCode ?? 404;
  };

  return { submitRegisterOnCart, isPending };
};

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const loginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string | null | undefined,
    navigate: (url: string) => void,
    updateUser: (user: any) => void
  ) => {
    await AuthService.loginSubmit(
      e,
      redirect,
      navigate,
      isPending,
      setIsPending,
      updateUser
    );
  };
  return { loginSubmit, isPending };
};

export const useOtp = () => {
  const [isPending, setIsPending] = useState(false);
  const { updateUser } = useUserStore();
  const navigate = useNavigate();

  const otpVerify = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string | null | undefined
  ) => {
    const { data, status } = (await AuthService.otpVerify(
      e,
      isPending,
      setIsPending
    )) ?? { data: null, status: 404 };
    switch (status) {
      case 202:
        updateUser(data);
        navigate(redirect ? redirect : "/profile");
        break;
    }
  };
  return { otpVerify, isPending };
};

export const useOtpOnCart =  () => {
  const [isPending, setIsPending] = useState(false);
  const { updateUser } = useUserStore();
  const otpVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    const { data, status } = (await AuthService.otpVerify(
      e,
      isPending,
      setIsPending
    )) ?? { data: null, status: 404 };
    switch (status) {
      case 202:
        updateUser(data);
        break;
    }
    return status;
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
  const navigate = useNavigate();
  const logout = async (
    user: any,
    clearUser: () => void,
    clearCart: () => void,
    clearTransfer: () => void,
    clearDescription: () => void,
    clearCompare: () => void,
    clearFavorite: () => void
  ) => {
    const status = await AuthService.logoutSubmit(
      user,
      isPending,
      clearUser,
      clearCart,
      clearTransfer,
      clearDescription,
      clearCompare,
      clearFavorite,
      setIsPending
    );
    if (status == true) navigate("/");
  };
  return { logout, isPending };
};

export const useUserValidation = (user: any) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isUserValidated, setIsUserValidated] = useState<boolean>(false);

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
