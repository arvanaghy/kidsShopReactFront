import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

interface TransferService {
  Code: string;
  Name: string;
  Mablag: number;
  CodeKhadamat?: number;
}

interface CustomerGroup {
  Name: string;
}

interface OrderResponse {
  message: string;
  result: any;
}

export class OrderService {
  private readonly headers = {
    cache: "no-cache" as const,
  };

  async fetchCustomerGroup(codeGroup: number): Promise<CustomerGroup> {
    try {
      const { data, status }: AxiosResponse<CustomerGroup> = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/customer-category/${codeGroup}`,
        { headers: this.headers }
      );
      if (status !== 200) throw new Error(data?.message);
      return data;
    } catch (error: any) {
      toast.error(
        `گروه کاربری: ${
          error?.response?.data?.message || error?.message || "خطا در اتصال"
        }`
      );
      throw error;
    }
  }

  async fetchTransferServices(): Promise<TransferService[]> {
    try {
      const { data, status }: AxiosResponse<{ result: TransferService[] }> =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/list-transfer-services`,
          { headers: this.headers }
        );
      if (status !== 200) throw new Error(data?.message);
      return data.result;
    } catch (error: any) {
      toast.error(
        `خدمات حمل و نقل: ${
          error?.response?.data?.message || error?.message || "خطا در اتصال"
        }`
      );
      throw error;
    }
  }

  async submitOrder(
    orderData: any,
    token: string,
    description: string,
    transferService: TransferService | null
  ): Promise<OrderResponse> {
    try {
      const { data, status }: AxiosResponse<OrderResponse> = await axios.post(
        `${import.meta.env.VITE_API_URL}/v2/submit-order`,
        {
          products: orderData,
          signature: null,
          description,
          CodeKhadamat: transferService?.CodeKhadamat || 0,
          MKhadamat: transferService?.Mablag || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status !== 201) throw new Error(data?.message);
      return data;
    } catch (error: any) {
      toast.error(
        `ثبت سفارش: ${
          error?.response?.data?.message || error?.message || "خطا در اتصال"
        }`
      );
      throw error;
    }
  }

  async checkOnlinePaymentAvailability(): Promise<OrderResponse> {
    try {
      const { data, status }: AxiosResponse<OrderResponse> = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/check-online-payment-available`
      );
      if (status !== 201) throw new Error(data?.message);
      return data;
    } catch (error: any) {
      toast.error(
        `پرداخت آنلاین: ${
          error?.response?.data?.message || error?.message || "خطا در اتصال"
        }`
      );
      throw error;
    }
  }
}
