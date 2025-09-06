import { getErrorMessage } from "@utils/getErrorMessage";
import axios from "axios";
import toast from "react-hot-toast";

export const registerUser = async (info: any) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/register`,
      info,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status != 202 && status != 201) throw new Error(data?.message);
    return { data, status };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (info: any) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/login`,
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
      `${import.meta.env.VITE_API_URL}/v1/verify-sms`,
      info,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status != 202) throw new Error(data?.message);
    return { data, status };
  } catch (error) {
    throw error;
  }
};

export const resendMSApi = async (info: any) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/resend-sms`,
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
      `${import.meta.env.VITE_API_URL}/v1/verify-token`,
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
      `${import.meta.env.VITE_API_URL}/v1/log-out`,
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
