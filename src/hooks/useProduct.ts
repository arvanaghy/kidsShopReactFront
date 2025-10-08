import { ProductService } from "@services/ProductService";
import { useEffect, useState } from "react";

export const useBestSellingProducts = ({
  searchPhrase,
  product_page,
  size,
  color,
  sort_price,
}: {
  searchPhrase: string | null;
  product_page: number | null | undefined;
  size: string | null;
  color: string | null;
  sort_price: string | null;
}) => {
  const [bestSellingProducts, setBestSellingProducts] = useState({
    data: [],
    links: [],
  });
  const [bestSellingSizes, setBestSellingSizes] = useState([]);
  const [bestSellingColors, setBestSellingColors] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await ProductService.getBestSellingProducts(
        isPending,
        setIsPending,
        setBestSellingProducts,
        setBestSellingSizes,
        setBestSellingColors,
        searchPhrase,
        product_page,
        size,
        color,
        sort_price
      );
    };
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProducts();
  }, [searchPhrase, product_page, size, color, sort_price]);

  return {
    bestSellingProducts,
    bestSellingSizes,
    bestSellingColors,
    isPending,
  };
};

export const useOfferedProducts = ({
  searchPhrase,
  product_page,
  size,
  color,
  sort_price,
}: {
  searchPhrase: string | null;
  product_page: number | null | undefined;
  size: string | null;
  color: string | null;
  sort_price: string | null;
}) => {
  const [OfferedProducts, setOfferedProducts] = useState({
    data: [],
    links: [],
  });
  const [offeredProductsSizes, setOfferedProductsSizes] = useState([]);
  const [offeredProductsColors, setOfferedProductsColors] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await ProductService.getOfferedProducts(
        isPending,
        setIsPending,
        setOfferedProducts,
        setOfferedProductsSizes,
        setOfferedProductsColors,
        searchPhrase,
        product_page,
        size,
        color,
        sort_price
      );
    };
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProducts();
  }, [searchPhrase, product_page, size, color, sort_price]);

  return {
    OfferedProducts,
    offeredProductsSizes,
    offeredProductsColors,
    isPending,
  };
};

export const useProducts = ({
  searchPhrase,
  product_page,
  size,
  color,
  sort_price,
}: {
  searchPhrase: string | null;
  product_page: number | null | undefined;
  size: string | null;
  color: string | null;
  sort_price: string | null;
}) => {
  const [products, setProducts] = useState({
    data: [],
    links: [],
  });
  const [productsSizes, setProductsSizes] = useState([]);
  const [productsColors, setProductsColors] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await ProductService.getProducts(
        isPending,
        setIsPending,
        setProducts,
        setProductsSizes,
        setProductsColors,
        searchPhrase,
        product_page,
        size,
        color,
        sort_price
      );
    };
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProducts();
  }, [searchPhrase, product_page, size, color, sort_price]);

  return {
    products,
    productsSizes,
    productsColors,
    isPending,
  };
};

export const useSubcategoryProducts = ({
  subCategoryCode,
  searchPhrase,
  product_page,
  size,
  color,
  sort_price,
}: {
  subCategoryCode: string | number;
  searchPhrase: string | null;
  product_page: number | null | undefined;
  size: string | null;
  color: string | null;
  sort_price: string | null;
}) => {
  const [subcategory, setSubcategory] = useState({});
  const [subcategoryProducts, setSubcategoryProducts] = useState({
    data: [],
    links: [],
  });
  const [subcategoryProductsSizes, setSubcategoryProductsSizes] = useState([]);
  const [subcategoryProductsColors, setSubcategoryProductsColors] = useState(
    []
  );
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await ProductService.getSubcategoryProducts(
        isPending,
        setIsPending,
        setSubcategory,
        setSubcategoryProducts,
        setSubcategoryProductsSizes,
        setSubcategoryProductsColors,
        subCategoryCode,
        searchPhrase,
        product_page,
        size,
        color,
        sort_price
      );
    };
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProducts();
  }, [subCategoryCode, searchPhrase, product_page, size, color, sort_price]);

  return {
    subcategory,
    subcategoryProducts,
    subcategoryProductsSizes,
    subcategoryProductsColors,
    isPending,
  };
};

export const useSingleProduct = (id: number | string) => {
  const [product, setProduct] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id === undefined || id === null || id === "") return;
      await ProductService.getSingleProduct(
        isPending,
        setIsPending,
        setProduct,
        setRelatedProducts,
        setSuggestedProducts,
        id
      );
    };
    fetchProduct();
  }, [id]);

  return {
    product,
    isPending,
    relatedProducts,
    suggestedProducts,
  };
};
