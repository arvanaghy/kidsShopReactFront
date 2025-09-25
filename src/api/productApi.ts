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
      }/v2/list-best-seller?product_page=${product_page}${
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
