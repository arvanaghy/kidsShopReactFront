import axios from "axios";
import { AboutInfoResponse, AboutInfoType } from "../types/AboutInfoType";
import toast from "react-hot-toast";

export const getAboutUsInfo = async (): Promise<AboutInfoType[]> => {
  try {
    const { data, status } = await axios.get<AboutInfoResponse>(
      `${import.meta.env.VITE_API_URL}/v1/about-us`
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");

    console.log("data", data);

    return data.result; // چون آرایه هست
  } catch (error: any) {
    toast.error("درباره شرکت: " + error?.message);
    throw error;
  }
};
