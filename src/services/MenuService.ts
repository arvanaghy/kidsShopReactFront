import toast from "react-hot-toast";
import { searchValidationMessage } from "@entity/validationMessages";
import { validateSearch } from "@entity/validations";
import { fetchMenuSubItems } from "@api/menuApi";
import { getErrorMessage } from "@utils/getErrorMessage";

export const MenuService = {
  handleSearch: async (
    e: React.FormEvent<HTMLFormElement>,
    setIsPending: (pending: boolean) => void,
    navigate: (url: string) => void,
    isPending: boolean
  ) => {
    if (isPending) return;
    e.preventDefault();
    const searchPhrase = e.target.search.value;
    if (!validateSearch(searchPhrase)) {
      toast.error(searchValidationMessage);
      e.target.search.focus();
      return;
    }
    setIsPending(true);
    try {
      navigate(`/products?search=${searchPhrase}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
      e.target.reset();
    }
  },

  getCategoryList: async (
    setCategoryList: any,
    isPending: boolean,
    setIsPending: (pending: boolean) => void
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchMenuSubItems();
      setCategoryList(data?.categories);
    } catch (error) {

      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },
};
