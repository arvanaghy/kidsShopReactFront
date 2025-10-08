import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuService } from "@services/MenuService";
import { throttle } from "lodash";

export const searchProduct = (setSearchModal: (value: boolean) => void) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    setSearchModal(false);
    await MenuService.handleSearch(e, setIsPending, navigate, isPending);
  };

  return { handleSearch, isPending };
};

export const getCategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const getCategoryList = async () => {
    await MenuService.getCategoryList(setCategoryList, isPending, setIsPending);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return { categoryList, isPending };
};

export const useNavbarVisibility = (
  initialVisibility = false,
  throttleDelay = 300
) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(initialVisibility);

  useEffect(() => {
    if (window.scrollY === 0) {
      setIsNavbarVisible(true);
    }

    let lastScrollY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      setIsNavbarVisible(currentScrollY <= lastScrollY);
      lastScrollY = currentScrollY;
    }, throttleDelay);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [throttleDelay]);

  return isNavbarVisible;
};
