import toast from "react-hot-toast";
import { searchValidationMessage } from "@entity/validationMessages";
import { validateSearch } from "@entity/validations";

export const MenuService = {

  handleSearch: async (
    e: React.FormEvent<HTMLFormElement>,
    setIsPending: (pending: boolean) => void,
    navigate: (url: string) => void
  ) => {
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
};
