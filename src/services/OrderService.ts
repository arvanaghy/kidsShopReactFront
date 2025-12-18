import { fetchOrderDetailsApi, fetchOrdersApi } from "@api/orderApi";

export const OrderService = {
  getProformaOrders: async (token: string) => {
    try {
      const { data, status } = await fetchOrdersApi(token);
      return { data, status };
    } catch (error) {
      throw error;
    }
  },
  getProformaDetails: async (id: string, token: string) => {
    try {
      const { data, status } = await fetchOrderDetailsApi(token, id);
      return { data, status };
    } catch (error) {
      throw error;
    }
  },
};
