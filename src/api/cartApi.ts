import axios from "axios";

export const fetchTransferServicesList = async () => {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/list-transfer-services`
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return data.result;
  } catch (error: any) {
    throw new Error("خدمات حمل و نقل: " + error?.message);
  }
};
