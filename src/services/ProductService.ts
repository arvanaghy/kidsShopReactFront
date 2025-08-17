import axios from "axios";
import toast from "react-hot-toast";
import { ProductData } from "@types/ProductType";

export const ProductService = {
  fetchProductData: async (
    productCode: string,
    setData: (data: ProductData) => void,
    setLoading: (loading: boolean) => void
  ) => {
    if (setLoading) setLoading(true);
    try {
      const { data, status } = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/show-product/${productCode}`,
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 200) throw new Error(data?.message);
      setData(data);
    } catch (error: any) {
      toast.error(
        "دریافت اطلاعات محصول " +
          (error?.response?.data?.message || error?.message || "خطا در اتصال")
      );
    } finally {
      setLoading(false);
    }
  },

  handleListClear: (
    type: "compare" | "favorite",
    clearFavoriteList: () => void,
    clearCompareList: () => void
  ) => {
    switch (type) {
      case "compare":
        clearCompareList();
        break;
      case "favorite":
        clearFavoriteList();
        break;
      default:
        toast.error("حذف لیست ناشناخته");
        break;
    }
  },
};
