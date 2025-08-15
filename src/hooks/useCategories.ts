import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Categories {
  categories: any;
  loading: boolean;
  links: any;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Category {
  id: number;
  title: string;
  image: string;
  slug: string;
  description: string;
  parent: number;
  children: any;
}

const useCategories = (search: string, page: number): Categories => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const fetchCategories = async (_url: string): Promise<void> => {
    window.scrollTo(0, 0);
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(_url, {
        headers: {
          cache: "no-cache",
        },
      });
      if (status !== 200) throw new Error(data?.message);
      setCategories(data?.result?.categories?.data);
      setLinks(data?.result?.categories?.links);
    } catch (error) {
      toast.error(
        "دسته بندی: " +
          (error?.message || error?.response?.data?.message || "خطا در اتصال")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(
      `${
        import.meta.env.VITE_API_URL
      }/v2/list-categories?search=${search}&page=${page}`
    );
  }, [page, search]);

  return { categories, loading, links };
};

export default useCategories;
