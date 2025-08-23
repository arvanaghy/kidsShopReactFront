import toast from "react-hot-toast";
import { fetchCategory } from "@api/categoryApi";
import { validateSearch } from "@entity/validations";
import { searchValidationMessage } from "@entity/validationMessages";

export const CategoryService = {

  getCategories: async ({
    setIsPending,
    setCategories,
    setLinks,
    search,
    page,
  }) => {
    setIsPending(true);
    try {
      const data = await fetchCategory({ search, page });
      setCategories(data?.data);
      setLinks(data?.links);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },

  handleSearch: async (
    e: React.FormEvent<HTMLFormElement>,
    setIsPending: (pending: boolean) => void,
    navigate: (url: string) => void
  ) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const search = e.target.search.value;
      if (!validateSearch(search)) {
        throw new Error(searchValidationMessage);
      }
      navigate(`/categories?search=${search}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
};
