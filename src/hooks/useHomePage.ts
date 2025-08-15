import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Result {
  categories?: any;
  banners?: any;
  newestProducts?: any;
  offeredProducts?: any;
  bestSeller?: any;
}

interface Data {
  result?: Result;
  message?: string;
}

const useHomePage = () : { result: Result | null; loading: boolean } => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (_url: string) => {
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(_url);
      if (status !== 200) throw new Error(data?.message);
      setResult(data?.result);
    } catch (error: any) {
      toast.error(
        "خطا در اتصال: " +
          (error?.response?.data?.message || error?.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/v2/home-page`);
  }, []);

  return { result, loading }; 
};

export default useHomePage;
