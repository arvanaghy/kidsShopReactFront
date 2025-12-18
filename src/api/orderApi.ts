import axios from "axios";

export const fetchOrdersApi = async () => {
  try {
    const { data, status } = await axios.get("/api/orders");
    return { data, status };
  } catch (error) {
    throw error;
  }
};
