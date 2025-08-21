import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuService } from "@services/MenuService";

export const searchProduct = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    await MenuService.handleSearch(e, setIsPending, navigate);
  };

  return { handleSearch, isPending };
};



