import axios from "axios";

export const fetchMenuSubItems = async () => {
  const { data, status } = await axios.get(
    `${import.meta.env.VITE_API_URL}/v2/top-menu`,
    {
      headers: {
        cache: "no-cache",
      },
    }
  );
  if (status != 200) {
    throw new Error(data?.message);
  }
  return data?.result;
};
