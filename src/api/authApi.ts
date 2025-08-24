import axios from "axios";
import toast from "react-hot-toast";

export const registerUser = async (info: any) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/register`,
    info,
    {
      headers: {
        cache: "no-cache",
      },
    }
  );
  if (status == 202) {
    toast.success(data?.message);
  } else if (status == 302) {
    throw new Error(data?.message);
  } else {
    throw new Error(data?.message);
  }
};

export const loginUser = async (info: any) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/login`,
    info,
    {
      headers: {
        cache: "no-cache",
      },
    }
  );
  if (status == 201) {
    toast.success(data?.message);
    return { data, status };
  } else if (status == 202) {
    toast.success(data?.message);
    return { data, status };
  } else if (status == 404) {
    throw new Error(data?.message);
  } else {
    throw new Error(data?.message);
  }
};

export const otpApi = async (info: any) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/verify-sms`,
    info,
    {
      headers: {
        cache: "no-cache",
      },
    }
  );
  if (status == 202) {
    toast.success(data?.message);
    return { data, status };
  } else {
    throw new Error(data?.message);
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
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/verify-user`,
    info,
    {
      headers: {
        cache: "no-cache",
      },
    }
  );
  return { data, status };
};
