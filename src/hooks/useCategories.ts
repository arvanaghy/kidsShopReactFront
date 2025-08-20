import { useEffect, useState } from "react";
import { CategoryService } from "@services/CategoryService";
import { useNavigate } from "react-router-dom";

interface Categories {
  categories: any;
  isPending: boolean;
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

export const listCategory = (search: string, page: number): Categories => {
  const [categories, setCategories] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [links, setLinks] = useState([]);

  const getCategories = async (
    search: string | undefined | null,
    page: number | string | undefined | null
  ): Promise<void> => {
    await CategoryService.getCategories({
      setIsPending,
      setCategories,
      setLinks,
      search,
      page,
    });
  };

  useEffect(() => {
    getCategories(search, page);
  }, [search, page]);

  return { categories, isPending, links };
};

export const searchCategory = (e: React.FormEvent<HTMLFormElement>) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    await CategoryService.handleSearch(e, setIsPending, navigate);
  };

  return { handleSearch, isPending };
};
