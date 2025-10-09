import { getErrorMessage } from "@utils/getErrorMessage";
import axios from "axios";

export const submitUserInfoEdit = async (info: any, token: string) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/edit-user-info`,
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 202) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchConfirmedOrders = async (token: string, page = 1) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/list-past-orders?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 201) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchBalance = async (token: string) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/account-balance`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 201) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchInvoice = async (token: string, page: number = 1) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/list-past-invoice?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 201) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchConfirmedOrderDetails = async (
  token: string,
  code: number,
  page = 1
) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/list-past-orders-products/${code}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 201) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const submitUserAddressUpdate = async (address: any, token: string) => {
  try {
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/update-user-address`,
      { address },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 202) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchUnconfirmedOrders = async (token: string, page = 1) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/list-unverified-orders?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 201) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchUnconfirmedOrderDetails = async (
  token: string,
  code: number,
  page = 1
) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/list-unverified-orders-products/${code}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      }
    );
    if (status !== 201) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
