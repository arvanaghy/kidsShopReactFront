import {
  fetchTransferServicesList,
  onlinePaymentAvailability,
  processOrderAndPayment,
  submitOrderPost,
} from "@api/cartApi";
import toast from "react-hot-toast";
import { AuthService } from "@services/AuthService";
import { useTransferStore } from "@store/transferStore";
import { getErrorMessage } from "@utils/getErrorMessage";

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
      const result = cart.flatMap((cartItem: any) =>
        cartItem.basket.map((basketItem: any) => ({
          KCode: basketItem.feature.CodeKala,
          Tedad: basketItem.quantity,
          ColorCode: basketItem.feature.ColorCode,
          RGB: basketItem.feature.RGB,
          SizeNum: basketItem.feature.SizeNum,
        }))
      );
      return result;
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
      if (!user?.Mobile || !user?.UToken) {
        navigate("/login?redirect=/shopping-cart");
        throw new Error("باید ابتدا وارد شوید");
      }
      if (!(await AuthService.validateUserOnCart(user.Mobile, user.UToken))) {
        navigate("/login?redirect=/shopping-cart");
        throw new Error("کاربر وارد شده معتبر نیست");
      }
      if (!AuthService.isUserInfoCompleted(user)) {
        navigate("/edit-info?redirect=/shopping-cart");
        throw new Error("اطلاعات کاربری کامل نیست");
      }
      if (!transfer || transfer?.CodeKhadamat == 0) {
        throw new Error("نحوه ارسال انتخاب نشده است");
      }
      const orderData = CartService.basket(cart);
      const redirectUrl = await processOrderAndPayment({
        token: user.UToken,
        orderData: orderData,
        description,
        transferService: transfer,
      });

      clearCart();
      clearTransfer();
      clearDescription();
      window.location.href = redirectUrl;

      toast.success("در حال انتقال به درگاه پرداخت");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },
};
