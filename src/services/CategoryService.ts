import toast from "react-hot-toast";
import { fetchCategory } from "@api/categoryApi";

export const CategoryService = {
  searchPattern: /^.{2,}$/,

  searchValidationMessage: "نام دسته بندی را بطور کامل وارد نمایید",

  validateSearch: (search: string) =>
    search?.match(CategoryService.searchPattern),

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
      if (!CategoryService.validateSearch(search)) {
        throw new Error(CategoryService.searchValidationMessage);
      }
      navigate(`/categories?search=${search}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setIsPending(false);
    }
  },
};
