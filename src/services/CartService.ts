import { fetchTransferServicesList } from "@api/cartApi";
import toast from "react-hot-toast";
import { AuthService } from "@services/AuthService";

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
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  payBill: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    user: any,
    cart: any,
    transfer: any,
    navigate: (url: string) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      if (!cart || !cart?.length) {
        navigate("/");
        throw new Error("سبد خرید خالی است");
      }
      if (!(await AuthService.isUserValid(user.PhoneNumber, user.UToken))) {
        navigate("/login?redirect=/shopping-cart");
        throw new Error("باید ابتدا وارد شوید");
      }
      if (!transfer) {
        toast.error("خدمات انتقال انتخاب نشده است");
        throw new Error("خدمات انتقال انتخاب نشده است");
      }
      toast.success("پرداخت شما با موفقیت انجام شد");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
};
