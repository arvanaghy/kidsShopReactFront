import axios from "axios";

export const fetchCategories = async ({
  search,
  page,
}: {
  search: string | undefined | null;
  page: number | string | undefined | null;
}) => {
  try {
    const categoryImageMode = import.meta.env.VITE_CATEGORY_AND_SUBCATEGORY_IMAGE_MODE;
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/general/list-categories`,
      {
        params: {
          search,
          page,
          categoryImageMode,
        },
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return data.result;
  } catch (error: any) {
    throw new Error("دسته بندی: " + error?.message);
  }
};

export const fetchRelatedSubCategories = async (
  categoryCode: number | string,
  product_page: number | string | null | undefined,
  subcategory_page: number | string | null | undefined,
  search: string | undefined | null,
  size: string | undefined | null,
  color: string | undefined | null,
  sort_price: string | undefined | null
) => {
  try {
    const categoryImageMode = import.meta.env.VITE_CATEGORY_AND_SUBCATEGORY_IMAGE_MODE;
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/categories-and-subcategories/list-category-subcategories-and-products/${categoryCode}`,
      {
        params: {
          product_page,
          subcategory_page,
          search,
          size,
          color,
          sort_price,
          categoryImageMode,
        },
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return data.result;
  } catch (error: any) {
    throw new Error(" زیردسته بندی: " + error?.message);
  }
};
