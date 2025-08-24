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
