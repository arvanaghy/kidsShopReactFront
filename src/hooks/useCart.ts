import { CartService } from "@services/CartService";
import { useEffect, useState } from "react";

export const getTransfer = () => {
  const [isPending, setIsPending] = useState(false);
  const [transferServices, setTransferServices] = useState([]);

  const getTransfer = async () => {
    await CartService.getTransfer(isPending, setIsPending, setTransferServices);
  };
  useEffect(() => {
    getTransfer();
  }, []);
  return { transferServices, isPending };
};

export const isOnlinePaymentAvailable = () => {
  const [isPending, setIsPending] = useState(false);
  const [isOnlinePaymentAvailable, setIsOnlinePaymentAvailable] =
    useState(false);
  const getIsOnlinePaymentAvailable = async () => {
    await CartService.isOnlinePaymentAvailable(
      isPending,
      setIsPending,
      setIsOnlinePaymentAvailable
    );
  };
  useEffect(() => {
    getIsOnlinePaymentAvailable();
  }, []);
  return { isOnlinePaymentAvailable, isPending };
};
