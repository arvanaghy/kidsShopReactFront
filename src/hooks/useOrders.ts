import { OrderService } from "@services/OrderService";
import { useUserStore } from "@store/UserStore";
import { getErrorMessage } from "@utils/getErrorMessage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProforma = () => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [proformaList, setProformaList] = useState([]);
  const [proformaLinks, setProformaLinks] = useState([]);
  const getProformaLists = async () => {
    try {
      const { data } = await OrderService.getProformaOrders(user?.UToken || "");
      setProformaList(data?.data || []);
      setProformaLinks(data?.links || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProformaLists();
  }, []);

  return { proformaList, proformaLinks, loading };
};

export const useProformaDetails = (id) => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [proformaDetailsList, setProformaDetailsList] = useState<any>(null);
  const [proformaDetailsLinks, setProformaDetailsLinks] = useState<any>(null);
  const getProformaDetails = async () => {
    try {
      const { data } = await OrderService.getProformaDetails(
        id,
        user?.UToken || ""
      );
      setProformaDetailsList(data || []);
      setProformaDetailsLinks(data?.links || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProformaDetails();
  }, []);
  return { proformaDetailsList, proformaDetailsLinks, loading };
};
