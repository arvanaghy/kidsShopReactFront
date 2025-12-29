import toast from "react-hot-toast";
import { ProductData } from "@definitions/ProductType";
import { getErrorMessage } from "@utils/getErrorMessage";
import {
  destroyProductImageApi,
  fetchBestSellingProducts,
  fetchOfferedProducts,
  fetchProduct,
  fetchProducts,
  fetchSubcategoryProducts,
  makeProductImageMainApi,
  productImageApi,
  updateCommentApi,
} from "@api/productApi";

export const ProductService = {
  getSingleProduct: async (
    isPending: boolean,
    setIsPending: (pending: boolean) => void,
    setProduct: (product: ProductData) => void,
    setRelatedProducts: (products: any) => void,
    setSuggestedProducts: (products: any) => void,
    id: string | number
  ) => {
    if (isPending) return;
    try {
      setIsPending(true);
      const data = await fetchProduct(id);
      setRelatedProducts(data?.relatedProducts);
      setSuggestedProducts(data?.suggestedProducts);
      setProduct(data?.product);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
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
    searchPhrase: string | null | undefined,
    product_page: number | string,
    size: string | null,
    color: string | null,
    sort_price: string | null
  ) => {
    if (isPending) return;
    setIsPending(true);
    try {
      const data = await fetchProducts(
        product_page,
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

  uploadProductImages: async (
    productCode: string | number,
    images: any[],
    token: string
  ) => {
    try {
      const formData = new FormData();
      images.forEach((imageObj, index) => {
        if (imageObj.file && imageObj.file instanceof File) {
          formData.append(`images[${index}]`, imageObj.file);
        } else if (imageObj instanceof File) {
          formData.append(`images[${index}]`, imageObj);
        }
      });
      const { data, status } = await productImageApi(
        productCode,
        formData,
        token
      );
      return { data, status };
    } catch (error) {
      throw error;
    }
  },

  deleteProductImage: async (
    productCode: string | number,
    imageCode: string | number,
    token: string
  ) => {
    try {
      const { data, status } = await destroyProductImageApi(
        productCode,
        imageCode,
        token
      );
      return { data, status };
    } catch (error) {
      throw error;
    }
  },
  updateComment: async (
    productCode: string | number,
    comment: string,
    token: string
  ) => {
    try {
      const { data, status } = await updateCommentApi(
        productCode,
        comment,
        token
      );
      return { data, status };
    } catch (error) {
      throw error;
    }
  },

  makeProductImageMain: async (
    productCode: string | number,
    imageCode: string | number,
    token: string
  ) => {
    try {
      const { data, status } = await makeProductImageMainApi(
        productCode,
        imageCode,
        token
      );
      return { data, status };
    } catch (error) {
      throw error;
    }
  },
};
