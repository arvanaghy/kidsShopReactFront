import ProductCard from "@components/product/ProductCard";
import { Product } from "@types/ProductType";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (!products.length) return null;
  return (
    <>
      <h2 className="lg:text-start my-8 text-center px-10 bg-CarbonicBlue-500 py-8 text-white font-EstedadMedium">
        دیگر محصولات مشابه
      </h2>
      <div className="gap-4 grid grid-cols-12 py-6 lg:px-10 px-4">
        {products.map((item, idx) => (
          <ProductCard
            item={item}
            key={idx}
            colSpan="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
          />
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;