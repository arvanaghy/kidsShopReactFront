import {
  fetchBalance,
  fetchConfirmedOrderDetails,
  fetchConfirmedOrders,
  fetchInvoice,
  submitUserAddressUpdate,
  submitUserInfoEdit,
} from "@api/profileApi";
import {
  addressValidationMessage,
  nameValidationMessage,
} from "@entity/validationMessages";
import { validateAddress, validateUsername } from "@entity/validations";
import { getErrorMessage } from "@utils/getErrorMessage";
import toast from "react-hot-toast";

export const ProfileService = {
  updateUserInfo: async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    navigate: (url: string) => void,
    user: any,
    updateUser: (user: any) => void,
    setIsPending: (pending: boolean) => void
  ) => {
    e.preventDefault();
    if (!validateUsername(e.target.name.value)) {
      toast.error(nameValidationMessage);
      e.target.name.focus();
      return;
    }
    if (!validateAddress(e.target.address.value)) {
      toast.error(addressValidationMessage);
      e.target.address.focus();
      return;
    }
    setIsPending(true);
    const info = {
      Name: e.target.name.value,
      Address: e.target.address.value,
    };
    try {
      const result = await submitUserInfoEdit(info, user?.UToken);
      updateUser(result);
      toast.success("اطلاعات شما با موفقیت ویرایش شد");
      navigate(redirect ? redirect : "/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  updateUserAddress: async (
    user: any,
    updateUser: (user: any) => void,
    address: any,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = await submitUserAddressUpdate(address, user?.UToken);
      updateUser(result);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getConfirmedOrders: async (
    page: number,
    user: any,
    setConfirmedOrdersTotal: (total: number) => void,
    setConfirmedOrdersList: (list: any) => void,
    setConfirmedOrdersLinks: (links: any) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = await fetchConfirmedOrders(user.UToken, (page = 1));
      setConfirmedOrdersList(result?.data);
      setConfirmedOrdersTotal(result?.total);
      setConfirmedOrdersLinks(result?.links);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  navigateToConfirmedOrderDetails: (
    orderCode: number,
    navigate: any,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      if (!orderCode) throw new Error("کد سفارش وارد نشده است");
      navigate(`/confirmed-order-details/${Math.floor(orderCode)}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getBalance: async (
    user: any,
    setBalance: (balance: number) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = await fetchBalance(user.UToken);
      setBalance(result);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getInvoice: async (
    page: number,
    user: any,
    setInvoiceList: (list: any) => void,
    setInvoiceLinks: (links: any) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = await fetchInvoice(user.UToken, (page = 1));
      setInvoiceList(result?.data);
      setInvoiceLinks(result?.links);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getConfirmedOrderDetails: async (
    page: number,
    user: any,
    orderCode: number,
    setConfirmedOrderDetailsList: (list: any) => void,
    setConfirmedOrderDetailsLinks: (links: any) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      if (!orderCode) throw new Error("کد سفارش وارد نشده است");
      const result = await fetchConfirmedOrderDetails(
        user.UToken,
        orderCode,
        (page = 1)
      );
      setConfirmedOrderDetailsList(result?.data);
      setConfirmedOrderDetailsLinks(result?.links);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },
};
