import toast from "react-hot-toast";
import { fetchCategories, fetchRelatedSubCategories } from "@api/categoryApi";
import { validateSearch } from "@entity/validations";
import { searchValidationMessage } from "@entity/validationMessages";
import { getErrorMessage } from "@utils/getErrorMessage";

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
      const data = await fetchCategories({ search, page });
      setCategories(data?.data);
      setLinks(data?.links);
    } catch (error) {
      toast.error(getErrorMessage(error));
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
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getSubCategories: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setSubCategories: (subCategories: any) => void,
    setCategory: (category: any) => void,
    setProducts: (products: any) => void,
    setSizes: (sizes: any) => void,
    setColors: (colors: any) => void,
    categoryCode: number | string,
    product_page: number | string | null | undefined,
    subcategory_page: number | string | null | undefined,
    search: string | undefined | null,
    size: string | undefined | null,
    color: string | undefined | null,
    sort_price: string | undefined | null
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchRelatedSubCategories(
        categoryCode,
        product_page,
        subcategory_page,
        search,
        size,
        color,
        sort_price
      );
      setCategory(data?.category);
      setSubCategories({
        data: data?.subcategories?.data,
        links: data?.subcategories?.links,
      });
      setProducts({
        data: data?.products?.data,
        links: data?.products?.links,
      });
      setSizes(data?.sizes);
      setColors(data?.colors);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },
};
