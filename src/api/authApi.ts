import { getErrorMessage } from "@utils/getErrorMessage";
import axios from "axios";
import toast from "react-hot-toast";

export const registerUser = async (info: any) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/general/customer-auth/register`,
      info,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );

    return { data, status };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (info: any) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/general/customer-auth/login`,
      info,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status != 201 && status != 202) {
      throw new Error(data?.message);
    }
    return { data, status };
  } catch (error) {
    throw error;
  }
};

export const otpApi = async (info: any) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/general/customer-auth/verify-sms`,
      info,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status != 202) throw new Error(data?.message);
    return { data: data?.customer, status };
  } catch (error) {
    throw error;
  }
};

export const resendSMSApi = async (info: any) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/general/customer-auth/resend-sms`,
    info,
    {
      headers: {
        cache: "no-cache",
      },
    }
  );
  if (status == 202) {
    toast.success(data?.message);
    return { status };
  } else {
    throw new Error(data?.message);
  }
};

export const isUserValidApi = async (info: any) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/general/customer-auth/verify-token`,
      info,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status != 202) {
      throw new Error(data?.message);
    }
    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const logOutApi = async (token: string) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/general/customer-auth/log-out`,
      {
        UToken: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          cache: "no-cache",
        },
      }
    );
    if (status !== 202) throw new Error(data?.message);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
