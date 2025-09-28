import axios from "axios";
import toast from "react-hot-toast";
import { ProductData } from "@definitions/ProductType";
import { getErrorMessage } from "@utils/getErrorMessage";
import {
  fetchBestSellingProducts,
  fetchOfferedProducts,
  fetchProducts,
  fetchSubcategoryProducts,
} from "@api/productApi";

export const ProductService = {
  fetchProductData: async (
    productCode: string,
    setData: (data: ProductData) => void,
    setLoading: (loading: boolean) => void
  ) => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/show-product/${productCode}`,
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 200)
        throw new Error(data?.message || "خطا در دریافت اطلاعات");
      setData(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  },

  handleListClear: (
    type: "compare" | "favorite",
    clearFavorite: () => void,
    clearCompare: () => void
  ) => {
    switch (type) {
      case "compare":
        clearCompare();
        break;
      case "favorite":
        clearFavorite();
        break;
      default:
        toast.error("نوع لیست نامعتبر است");
        break;
    }
  },

  getBestSellingProducts: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setBestSellingProducts: (products: any) => void,
    setBestSellingSizes: (sizes: any) => void,
    setBestSellingColors: (colors: any) => void,
    searchPhrase: string | null,
    product_page: number | null | undefined,
    size: string | null,
    color: string | null,
    sort_price: string | null
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchBestSellingProducts(
        product_page || 1,
        searchPhrase,
        size,
        color,
        sort_price
      );
      if (!data) throw new Error("داده‌ای دریافت نشد");
      setBestSellingProducts({
        data: data?.products?.data || [],
        links: data?.products?.links || [],
      });
      setBestSellingSizes(data?.sizes || []);
      setBestSellingColors(data?.colors || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getOfferedProducts: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setOfferedProducts: (products: any) => void,
    setOfferedProductsSizes: (sizes: any) => void,
    setOfferedProductsColors: (colors: any) => void,
    searchPhrase: string | null,
    product_page: number | null | undefined,
    size: string | null,
    color: string | null,
    sort_price: string | null
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchOfferedProducts(
        product_page || 1,
        searchPhrase,
        size,
        color,
        sort_price
      );
      if (!data) throw new Error("داده‌ای دریافت نشد");
      setOfferedProducts({
        data: data?.products?.data || [],
        links: data?.products?.links || [],
      });
      setOfferedProductsSizes(data?.sizes || []);
      setOfferedProductsColors(data?.colors || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getProducts: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setProducts: (products: any) => void,
    setProductsSizes: (sizes: any) => void,
    setProductsColors: (colors: any) => void,
    searchPhrase: string | null,
    product_page: number | null | undefined,
    size: string | null,
    color: string | null,
    sort_price: string | null
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchProducts(
        product_page || 1,
        searchPhrase,
        size,
        color,
        sort_price
      );
      if (!data) throw new Error("داده‌ای دریافت نشد");
      setProducts({
        data: data?.products?.data || [],
        links: data?.products?.links || [],
      });
      setProductsSizes(data?.sizes || []);
      setProductsColors(data?.colors || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },

  getSubcategoryProducts: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setSubcategory: (subcategory: any) => void,
    setSubcategoryProducts: (products: any) => void,
    setSubcategoryProductsSizes: (sizes: any) => void,
    setSubcategoryProductsColors: (colors: any) => void,
    subCategoryCode: number | string,
    searchPhrase: string | null,
    product_page: number | null | undefined,
    size: string | null,
    color: string | null,
    sort_price: string | null
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchSubcategoryProducts(
        subCategoryCode,
        product_page || 1,
        searchPhrase,
        size,
        color,
        sort_price
      );
      if (!data) throw new Error("داده‌ای دریافت نشد");
      setSubcategory(data?.subcategory || {});
      setSubcategoryProducts({
        data: data?.products?.data || [],
        links: data?.products?.links || [],
      });
      setSubcategoryProductsSizes(data?.sizes || []);
      setSubcategoryProductsColors(data?.colors || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  },
};