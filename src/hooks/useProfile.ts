import { ProfileService } from "@services/ProfileService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useEditInfo = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const updateUserInfo = async (
    e: React.FormEvent<HTMLFormElement>,
    redirect: string,
    user: any,
    updateUser: (user: any) => void
  ) => {
    await ProfileService.updateUserInfo(
      e,
      redirect,
      navigate,
      user,
      updateUser,
      setIsPending
    );
  };
  return { updateUserInfo, isPending };
};

export const useConfirmedOrders = (user: any = {}, page: number = 1) => {
  const [confirmedOrdersTotal, setConfirmedOrdersTotal] = useState(0);
  const [confirmedOrdersList, setConfirmedOrdersList] = useState([]);
  const [confirmedOrdersLinks, setConfirmedOrdersLinks] = useState([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const getConfirmedOrders = async (user: any) => {
    await ProfileService.getConfirmedOrders(
      page,
      user,
      setConfirmedOrdersTotal,
      setConfirmedOrdersList,
      setConfirmedOrdersLinks,
      isPending,
      setIsPending
    );
  };
  useEffect(() => {
    getConfirmedOrders(user);
  }, []);
  return {
    confirmedOrdersTotal,
    confirmedOrdersList,
    confirmedOrdersLinks,
    isPending,
  };
};

export const useNavigateConfirmedOrderDetails = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateToDetails = (orderCode: number = 0) => {
    ProfileService.navigateToConfirmedOrderDetails(
      orderCode,
      navigate,
      isPending,
      setIsPending
    );
  };
  return { navigateToDetails, isPending };
};

export const useBalance = (user: any) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [balance, setBalance] = useState(0);
  const getBalance = async (user: any) => {
    await ProfileService.getBalance(user, setBalance, isPending, setIsPending);
  };
  useEffect(() => {
    getBalance(user);
  }, []);
  return { balance, isPending };
};

export const useInvoice = (user = {}, page = 1) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceLinks, setInvoiceLinks] = useState([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const getInvoice = async (user: any , page: number) => {
    await ProfileService.getInvoice(
      page,
      user,
      setInvoiceList,
      setInvoiceLinks,
      isPending,
      setIsPending
    );
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getInvoice(user, page);
  }, [page]);
  return { invoiceList, invoiceLinks, isPending };
};

export const useConfirmedOrderDetails = (
  user = {},
  orderCode: number | string = 0,
  page: number = 1
) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [confirmedOrderDetailsList, setConfirmedOrderDetailsList] = useState(
    []
  );
  const [confirmedOrderDetailsLinks, setConfirmedOrderDetailsLinks] = useState(
    []
  );

  const getConfirmedOrderDetails = async (
    user: any = {},
    orderCode: number = 0,
    page: number = 1
  ) => {
    await ProfileService.getConfirmedOrderDetails(
      page,
      user,
      orderCode,
      setConfirmedOrderDetailsList,
      setConfirmedOrderDetailsLinks,
      isPending,
      setIsPending
    );
  };
  useEffect(() => {
    getConfirmedOrderDetails(user, orderCode, page);
  }, []);
  return { confirmedOrderDetailsList, confirmedOrderDetailsLinks, isPending };
};

export const useUnconfirmedOrders = (user = {}, page = 1) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [unconfirmedOrdersTotal, setUnconfirmedOrdersTotal] = useState(0);
  const [unconfirmedOrdersList, setUnconfirmedOrdersList] = useState([]);
  const [unconfirmedOrdersLinks, setUnconfirmedOrdersLinks] = useState([]);
  const getUnconfirmedOrders = async (user: any) => {
    await ProfileService.getUnconfirmedOrders(
      user,
      page,
      setUnconfirmedOrdersTotal,
      setUnconfirmedOrdersList,
      setUnconfirmedOrdersLinks,
      isPending,
      setIsPending
    );
  };
  useEffect(() => {
    getUnconfirmedOrders(user);
  }, []);
  return {
    unconfirmedOrdersTotal,
    unconfirmedOrdersList,
    unconfirmedOrdersLinks,
    isPending,
  };
};

export const useNavigateUnconfirmedOrderDetails = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const navigateToDetails = (orderCode: number = 0) => {
    ProfileService.navigateToUnconfirmedOrderDetails(
      orderCode,
      navigate,
      isPending,
      setIsPending
    );
  };
  return { navigateToDetails, isPending };
};

export const useUnconfirmedOrderDetails = (
  user = {},
  orderCode: number | string = 0,
  page: number = 1
) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [unconfirmedOrderDetailsList, setUnconfirmedOrderDetailsList] =
    useState([]);
  const [unconfirmedOrderDetailsLinks, setUnconfirmedOrderDetailsLinks] =
    useState([]);

  const getUnconfirmedOrderDetails = async (
    user: any = {},
    orderCode: number = 0,
    page: number = 1
  ) => {
    await ProfileService.getUnconfirmedOrderDetails(
      page,
      user,
      orderCode,
      setUnconfirmedOrderDetailsList,
      setUnconfirmedOrderDetailsLinks,
      isPending,
      setIsPending
    );
  };
  useEffect(() => {
    getUnconfirmedOrderDetails(user, orderCode, page);
  }, []);
  return {
    unconfirmedOrderDetailsList,
    unconfirmedOrderDetailsLinks,
    isPending,
  };
};
