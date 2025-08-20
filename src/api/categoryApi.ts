import axios from "axios";

export const fetchCategory = async ({
  search,
  page,
}: {
  search: string | undefined | null;
  page: number | string | undefined | null;
}) => {
  try {
    const { data, status } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/v1/list-categories?search=${search}&page=${page}`
    );
    if (status !== 200) throw new Error(data?.message || "خطا در اتصال");
    return data.result;
  } catch (error: any) {
    throw new Error("دسته بندی: " + error?.message);
  }
};
