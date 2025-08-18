import { useState } from "react";
import { AuthService } from "@services/AuthService";
import { useUserStore } from "@store/UserStore";

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
  const { updateUser } = useUserStore();
  const loginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void
  ) => {
    await AuthService.loginSubmit(e, redirect, navigate, setIsPending , updateUser);
  };
  return { loginSubmit, isPending };
};
