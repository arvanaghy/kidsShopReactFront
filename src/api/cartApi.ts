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

export const onlinePaymentAvailability = async () => {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/check-online-payment-available`
    );
    if (status !== 201) throw new Error(data?.message);
    return true;
  } catch (error: any) {
    return false;
  }
};

export const submitOrderPost = async (token: string, info: any) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/submit-order`,
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (status !== 201) throw new Error(data?.message);
    return data.result;
  } catch (error: any) {
    return false;
  }
};
