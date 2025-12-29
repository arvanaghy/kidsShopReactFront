import axios from "axios";

export const fetchMenuSubItems = async () => {
  try {
    const categoryImageMode = import.meta.env
      .VITE_CATEGORY_AND_SUBCATEGORY_IMAGE_MODE;
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_URL}/general/ui-ux/top-menu`,
      {
        params: {
          categoryImageMode,
        },
        headers: {
          cache: "no-cache",
        },
      }
    );
    if (status != 200) {
      throw new Error(data?.message);
    }
    return data?.result;
  } catch (error) {
    throw new Error("دسته بندی: " + error?.message);
  }
};
