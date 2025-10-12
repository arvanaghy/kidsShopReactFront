import { useEffect, useState } from "react";
import { CategoryService } from "@services/CategoryService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Categories {
  categories: any;
  isPending: boolean;
  links: any;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Category {
  id: number;
  title: string;
  image: string;
  slug: string;
  description: string;
  parent: number;
  children: any;
}

export const listCategory = (search: string, page: number): Categories => {
  const [categories, setCategories] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [links, setLinks] = useState([]);

  const getCategories = async (
    search: string | undefined | null,
    page: number | string | undefined | null
  ): Promise<void> => {
    await CategoryService.getCategories({
      setIsPending,
      setCategories,
      setLinks,
      search,
      page,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    getCategories(search, page);
  }, [search, page]);

  return { categories, isPending, links };
};

export const searchCategory = () => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    await CategoryService.handleSearch(e, setIsPending, navigate);
  };

  const removeSearchParam = () => navigate("/categories");

  return { removeSearchParam, handleSearch, isPending };
};

export const useSubCategory = (
  categoryCode?: number | string,
  product_page: number | string | null | undefined,
  subcategory_page: number | string | null | undefined,
  search: string | undefined | null,
  size: string | undefined | null,
  color: string | undefined | null,
  sort_price: string | undefined | null
) => {
  const [isPending, setIsPending] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const getSubCategories = async (
    categoryCode: string | number
  ): Promise<void> => {
    await CategoryService.getSubCategories(
      isPending,
      setIsPending,
      setSubCategories,
      setCategory,
      setProducts,
      setSizes,
      setColors,
      categoryCode,
      product_page,
      subcategory_page,
      search,
      size,
      color,
      sort_price
    );
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    getSubCategories(categoryCode);
  }, [
    categoryCode,
    product_page,
    subcategory_page,
    search,
    size,
    color,
    sort_price,
  ]);
  return { subCategories, isPending, category, products, sizes, colors };
};

export const useFilters = (
  isModal: boolean,
  setIsModal: (modal: boolean) => void,
  categoryCode: number | string,
  search: string | undefined | null,
  sort_price: string | undefined | null,
  sizeSets: string[],
  colorSets: string[]
) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const applyFilters = () => {
    if (isPending) return;
    setIsPending(true);
    try {
      isModal && setIsModal(false);
      navigate(
        `/category/${categoryCode}?product_page=${1}&subcategory_page=${1}${
          search != null ? `&search=${search}` : ""
        }${sizeSets.length > 0 ? `&size=${sizeSets.join(",")}` : ""}${
          colorSets.length > 0 ? `&color=${colorSets.join(",")}` : ""
        }${sort_price != null ? `&sort_price=${sort_price}` : ""}`
      );
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, applyFilters };
};

export const useRemoveFilters = (
  categoryCode: number | string,
  setSizeSets: any,
  setColorSets: any,
  setIsModal: (modal: boolean) => void
) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const removeFilters = () => {
    if (isPending) return;
    setIsPending(true);
    try {
      setSizeSets([]), setColorSets([]), setIsModal(false);
      navigate(
        `/category/${categoryCode}?product_page=${1}&subcategory_page=${1}`
      );
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsPending(false);
    }
  };
  return { isPending, removeFilters };
};
