import { ProductService } from "@services/ProductService";
import { useUserStore } from "@store/UserStore";
import { getErrorMessage } from "@utils/getErrorMessage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  product_page = 1,
  size,
  color,
  sort_price,
}: {
  searchPhrase: string | null | undefined;
  product_page: number | string;
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

export const useImagesUpload = (
  productCode: string | number,
  images: any[],
  setImages: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { user } = useUserStore();
  const router = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const handleProductImagesUpload = async () => {
    setIsPending(true);
    try {
      await ProductService.uploadProductImages(
        productCode,
        images,
        user?.UToken || ""
      );
      toast.success("تصاویر با موفقیت بروزرسانی شد.");
      router(`/admin/product/${productCode}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
      setImages([]);
    }
  };
  return { isPending, handleProductImagesUpload };
};

export const useDeleteProductImage = () => {
  const { user } = useUserStore();
  const [isPending, setIsPending] = useState(false);
  const handleDeleteProductImage = async (
    productCode: string | number,
    imageCode: string | number
  ) => {
    try {
      setIsPending(true);
      await ProductService.deleteProductImage(
        productCode,
        imageCode,
        user?.UToken || ""
      );
      toast.success("تصویر با موفقیت حذف شد.");
      window.location.reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };
  return { handleDeleteProductImage, isPending };
};

export const useMakeProductImageMain = () => {
  const [isPending, setIsPending] = useState(false);
  const { user } = useUserStore();

  const handleMakeProductImageMain = async (
    productCode: string | number,
    imageCode: string | number
  ) => {
    setIsPending(true);
    try {
      await ProductService.makeProductImageMain(
        productCode,
        imageCode,
        user?.UToken || ""
      );
      toast.success("تصویر اصلی با موفقیت تغییر کرد.");
      window.location.reload();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  };
  return { handleMakeProductImageMain, isPending };
};

export const useUpdateComment = (
  productCode: string | number,
  comment: string,
  setComment: React.Dispatch<React.SetStateAction<string>>
) => {
  const { user } = useUserStore();
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);
  const router = useNavigate();
  const handleUpdateComment = async () => {
    setIsUpdatingComment(true);
    try {
      await ProductService.updateComment(
        productCode,
        comment,
        user?.UToken || ""
      );
      setComment(comment);
      router(`/admin/product/${productCode}`);
      toast.success("توضیحات  با موفقیت بروزرسانی شد.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUpdatingComment(false);
    }
  };
  return { handleUpdateComment, isUpdatingComment };
};
