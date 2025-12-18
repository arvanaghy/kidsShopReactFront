import { fetchOrdersApi } from "@api/orderApi";

export const OrderService = {
  getProformaOrders: async () => {
    try {
      const { data, status } = await fetchOrdersApi();
      return { data, status };
    } catch (error) {
      throw error;
    }
  },
};
