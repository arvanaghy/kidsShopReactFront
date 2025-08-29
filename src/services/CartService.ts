import {
  fetchTransferServicesList,
  onlinePaymentAvailability,
  submitOrderPost,
} from "@api/cartApi";
import toast from "react-hot-toast";
import { AuthService } from "@services/AuthService";
import { useTransferStore } from "@store/transferStore";

export const CartService = {
  getTransfer: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setTransferServices: (data: any) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchTransferServicesList();
      setTransferServices(data);
      const { transfer, clearTransfer } = useTransferStore.getState();
      if (transfer?.Code) {
        const isValidTransfer = data.some(
          (service: any) => service.Code === transfer.Code
        );
        if (!isValidTransfer) {
          clearTransfer();
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  isOnlinePaymentAvailable: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setIsOnlinePaymentAvailable: (available: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await onlinePaymentAvailability();
      setIsOnlinePaymentAvailable(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  submitOrder: async (
    orderData: any,
    token: string,
    description: string,
    transferService: any
  ) => {
    try {
      const info = {
        products: orderData,
        signature: null,
        description,
        CodeKhadamat: transferService?.CodeKhadamat || 0,
        MKhadamat: transferService?.Mablag || 0,
      };
      const result = await submitOrderPost(token, info);
      return result;
    } catch (error: any) {
      toast.error(
        `ثبت سفارش: ${
          error?.response?.data?.message || error?.message || "خطا در اتصال"
        }`
      );
      throw error;
    }
  },

  basket: (cart: any) => {
    try {
      return cart.map((product: any) => ({
        KCode: product?.item?.Code,
        Basket: product?.basket,
      }));
    } catch (error) {
      return [];
    }
  },

  payBill: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    user: any,
    cart: any,
    clearCart: () => void,
    transfer: any,
    clearTransfer: () => void,
    navigate: (url: string) => void,
    description: string,
    clearDescription: () => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      if (!cart || !cart?.length) {
        navigate("/");
        throw new Error("سبد خرید خالی است");
      }
      if (!transfer) {
        throw new Error("خدمات حمل و نقل انتخاب نشده است");
      }
      // if (!(await AuthService.validateUser(user.Mobile, user.UToken))) {
      //   navigate("/login?redirect=/shopping-cart");
      //   throw new Error("باید ابتدا وارد شوید");
      // }
      if (!AuthService.isUserInfoCompleted(user)) {
        navigate("/edit-info?redirect=/shopping-cart");
        throw new Error("اطلاعات کاربری کامل نیست");
      }
      const payResult = await CartService.submitOrder(
        CartService.basket(cart),
        user.UToken,
        description,
        transfer
      );
      clearCart();
      clearTransfer();
      clearDescription();
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/v1/checkout-with-order?BearerToken=${user.UToken}&orderCode=${
        payResult?.Code
      }`;

      toast.success("پرداخت شما با موفقیت انجام شد");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
};
