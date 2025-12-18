import { OrderService } from "@services/OrderService";
import { getErrorMessage } from "@utils/getErrorMessage";
import { useState } from "react";
import toast from "react-hot-toast";

export const useProforma = async () => {
  const [loading, setLoading] = useState(false);
  const [proformaList, setProformaList] = useState([]);
  try {
    const { data } = await OrderService.getProformaOrders();
    setProformaList(data);
  } catch (error) {
    toast.error(getErrorMessage(error));
  } finally {
    setLoading(false);
  }
  return { proformaList, loading };
};
