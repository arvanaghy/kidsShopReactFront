import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductService } from "@services/ProductService";
import Breadcrumb from "@components/product/Breadcrumb";
import ProductImages from "@components/product/ProductImages";
import ProductDetails from "@components/product/ProductDetails";
import CartSidebar from "@components/product/CartSidebar";
import RelatedProducts from "@components/product/RelatedProducts";
import OfferedProducts from "@components/product/OfferedProducts";
import Loading from "@components/Loading";
import { useMainStore } from "@store/useMainStore";
import { ProductData } from "@types/ProductType";

const Product = () => {
  const { productCode } = useParams<{ productCode: string }>();
  const { desktopNavbar } = useMainStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductData>({
    product: {},
    relatedProducts: [],
    offeredProducts: [],
  });
  const [imageModal, setImageModal] = useState<{
    isOpen: boolean;
    image: string | null;
  }>({
    isOpen: false,
    image: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    ProductService.fetchProductData(productCode!, setData, setLoading);
  }, [productCode]);

  if (loading) return <Loading />;

  return (
    <div className="w-full py-6 space-y-3">
      <Breadcrumb product={data.product} />
      <div className="relative flex flex-col justify-around lg:justify-between w-full">
        <div className="grid w-full grid-cols-12 gap-1.5 md:gap-3 lg:gap-5 xl:gap-6">
          <ProductImages
            images={data.product.product_images || []}
            productName={data.product.Name || ""}
            setImageModal={setImageModal}
          />
          <ProductDetails
            product={data.product}
            productCode={productCode!}
          />
          <CartSidebar
            productCode={productCode!}
            product={data.product}
            desktopNavbar={desktopNavbar}
          />
        </div>
        {imageModal.isOpen && (
          <div
            onClick={() => setImageModal({ isOpen: false, image: null })}
            className="absolute inset-0 bg-black/50 w-full h-full flex justify-center items-center z-50"
          >
            <img
              src={imageModal.image || ""}
              alt="product"
              className="w-128 h-128 object-cover"
            />
          </div>
        )}
      </div>
      <RelatedProducts products={data.relatedProducts} />
      <OfferedProducts products={data.offeredProducts} />
    </div>
  );
};

export default Product;