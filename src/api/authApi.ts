import axios from "axios";
import toast from "react-hot-toast";

export const registerUser = async (info: any) => {
  const { data, status } = await axios.post(
    `${import.meta.env.VITE_API_URL}/v1/register`,
    info
  );
  if (status == 202) {
    toast.success(data?.message);
  } else if (status == 302) {
    throw new Error(data?.message);
  } else {
    throw new Error(data?.message);
  }
};
