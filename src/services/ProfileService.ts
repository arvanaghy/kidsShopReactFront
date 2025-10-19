import {
  fetchBalance,
  fetchConfirmedOrderDetails,
  fetchConfirmedOrders,
  fetchInvoice,
  fetchUnconfirmedOrderDetails,
  fetchUnconfirmedOrders,
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
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  updateUserAddress: async (
    user: any,
    updateUser: (user: any) => void,
    address: any,
    updateAddress: (address: string) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);

    try {
      if (!validateAddress(address)) {
        throw new Error(addressValidationMessage);
      }
      if (address == user?.Address) {
        throw new Error("تغییری در آدرس وجود ندارد");
      }
      const result = await submitUserAddressUpdate(address, user?.UToken);
      updateUser(result);
      updateAddress(result?.Address);
    } catch (error) {
      updateAddress(user?.Address);
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
      const result = await fetchInvoice(user.UToken, page);
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

  getUnconfirmedOrders: async (
    user: any,
    page: number,
    setUnconfirmedOrdersTotal: (total: number) => void,
    setUnconfirmedOrdersList: (list: any) => void,
    setUnconfirmedOrdersLinks: (links: any) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const result = await fetchUnconfirmedOrders(user.UToken, (page = 1));
      setUnconfirmedOrdersTotal(result?.total);
      setUnconfirmedOrdersList(result?.data);
      setUnconfirmedOrdersLinks(result?.links);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  navigateToUnconfirmedOrderDetails: (
    orderCode: number,
    navigate: any,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      if (!orderCode) throw new Error("کد سفارش وارد نشده است");
      navigate(`/proforma-details/${Math.floor(orderCode)}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getUnconfirmedOrderDetails: async (
    page: number,
    user: any,
    orderCode: number,
    setUnconfirmedOrderDetailsList: (list: any) => void,
    setUnconfirmedOrderDetailsLinks: (links: any) => void,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      if (!orderCode) throw new Error("کد سفارش وارد نشده است");
      const result = await fetchUnconfirmedOrderDetails(
        user.UToken,
        orderCode,
        (page = 1)
      );
      setUnconfirmedOrderDetailsList(result?.data);
      setUnconfirmedOrderDetailsLinks(result?.links);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },
};
