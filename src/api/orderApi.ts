import axios from "axios";

export const fetchOrdersApi = async (token: string) => {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data: data.result, status };
  } catch (error) {
    throw error;
  }
};

export const fetchOrderDetailsApi = async (token: string, id: string) => {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data : data.result, status };
  } catch (error) {
    throw error;
  }
};
