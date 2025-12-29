import { getErrorMessage } from "@utils/getErrorMessage";
import axios from "axios";

export const fetchBestSellingProducts = async (
  product_page = 1,
  searchPhrase = null,
  size = null,
  color = null,
  sort_price = null
) => {
  try {
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/products/list-best-seller?product_page=${product_page}${
        searchPhrase != null ? `&search=${searchPhrase}` : ""
      }${size != null ? `&size=${size}` : ""}${
        color != null ? `&color=${color}` : ""
      }${sort_price != null ? `&sort_price=${sort_price}` : ""}`,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );

    if (status !== 200) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchOfferedProducts = async (
  product_page = 1,
  searchPhrase = null,
  size = null,
  color = null,
  sort_price = null
) => {
  try {
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/products/list-all-offers?product_page=${product_page}${
        searchPhrase != null ? `&search=${searchPhrase}` : ""
      }${size != null ? `&size=${size}` : ""}${
        color != null ? `&color=${color}` : ""
      }${sort_price != null ? `&sort_price=${sort_price}` : ""}`,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );

    if (status !== 200) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchProducts = async (
  product_page = 1 as number | string,
  searchPhrase = null as string | null | undefined,
  size = null as string | null,
  color = null as string | null,
  sort_price = null as string | null
) => {
  try {
    const params = new URLSearchParams();
    if (searchPhrase != null) params.append("search", searchPhrase);
    if (size != null) params.append("size", size);
    if (color != null) params.append("color", color);
    if (sort_price != null) params.append("sort_price", sort_price);
    params.append("product_page", product_page.toString());
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/products/list-all-products?${params.toString()}`,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );

    if (status !== 200) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchSubcategoryProducts = async (
  subCategoryCode = null,
  product_page = 1,
  searchPhrase = null,
  size = null,
  color = null,
  sort_price = null
) => {
  try {
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/categories-and-subcategories/list-subcategory-products/${subCategoryCode}?product_page=${product_page}${
        searchPhrase != null ? `&search=${searchPhrase}` : ""
      }${size != null ? `&size=${size}` : ""}${
        color != null ? `&color=${color}` : ""
      }${sort_price != null ? `&sort_price=${sort_price}` : ""}`,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );

    if (status !== 200) throw new Error(data?.message);
    return data?.result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const fetchProduct = async (productCode: string | number) => {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/products/show-product/${productCode}`,
      {
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status !== 200)
      throw new Error(data?.message || "خطا در دریافت اطلاعات");
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const productImageApi = async (
  productCode: string | number,
  formData: FormData,
  token: string
) => {
  try {
    const { data, status } = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/v2/products/${productCode}/upload-product-images`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { data, status };
  } catch (error) {
    throw error;
  }
};

export const destroyProductImageApi = async (
  productCode: string | number,
  imageCode: string | number,
  token: string
) => {
  try {
    const { data, status } = await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/v2/products/${productCode}/delete-product-image/${imageCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, status };
  } catch (error) {
    throw error;
  }
};

export const updateCommentApi = async (
  productCode: string | number,
  comment: string,
  token: string
) => {
  try {
    if (!token) throw new Error("توکن وجود ندارد");
    const { data, status } = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/v2/products/${productCode}/update-product-comment`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return { data, status };
  } catch (error) {
    throw error;
  }
};

export const makeProductImageMainApi = async (
  productCode: string | number,
  imageCode: string | number,
  token: string
) => {
  try {
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v2/products/${productCode}/make-product-image-main/${imageCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data, status };
  } catch (error) {
    throw error;
  }
};
