import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@components/product/ProductCard";
import Loading from "@components/Loading";
import HeadBar from "@components/product/HeadBar";
import SideFilter from "@components/product/filter/SideFilter";
import { useBestSellingProducts } from "@hooks/useProduct";
import Pagination from "@components/product/Pagination";
import MobileFilterModal from "@components/product/filter/MobileFilterModal";
import MobileFilterToggle from "@components/product/filter/MobileFilterToggle";
import { useFilters } from "@hooks/useFilters";
import SortFilters from "@components/product/filter/SortFilters";

const BestSellingProducts = () => {
  const [searchParams] = useSearchParams();
  const searchPhrase = searchParams.get("search") || "";
  const product_page = searchParams.get("product_page") || 1;
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;
  const sort_price = searchParams.get("sort_price") || null;

  const { sizeSets, setSizeSets, colorSets, setColorSets } = useFilters();

  const {
    bestSellingProducts,
    bestSellingSizes,
    bestSellingColors,
    isPending,
  } = useBestSellingProducts({
    searchPhrase,
    product_page: Number(product_page),
    size,
    color,
    sort_price,
  });

  const [isModal, setIsModal] = useState(false);

  if (isPending) return <Loading />;

  return (
    <div className="relative w-full min-h-[65vh] grid grid-cols-12 justify-center items-start gap-2 py-4 xl:py-6 xl:gap-4">
      <HeadBar text="پرفروش‌ترین محصولات کیدزشاپ" />
      <MobileFilterModal
        searchPhrase={searchPhrase}
        sizeSets={sizeSets}
        setSizeSets={setSizeSets}
        colorSets={colorSets}
        setColorSets={setColorSets}
        isModal={isModal}
        setIsModal={setIsModal}
        sort_price={sort_price}
        sizes={bestSellingSizes}
        colors={bestSellingColors}
        navigation="best-selling-products"
      />
      <MobileFilterToggle setIsModal={setIsModal} />
      <SideFilter
        searchPhrase={searchPhrase}
        sizeSets={sizeSets}
        setSizeSets={setSizeSets}
        colorSets={colorSets}
        setColorSets={setColorSets}
        sort_price={sort_price}
        sizes={bestSellingSizes}
        colors={bestSellingColors}
        navigation="best-selling-products"
      />
      <div className="w-full col-span-12 md:col-span-8 xl:col-span-9 grid grid-cols-12 md:order-2 space-y-6 order-1">
        {/* <SortFilters
          sort_price={sort_price}
          searchPhrase={searchPhrase}
          size={size}
          color={color}
          navigation="best-selling-products"
        /> */}
        <div className="w-full col-span-12 bg-Cream-500 p-6 flex flex-col">
          <div className="w-full grid grid-cols-12 gap-6">
            {bestSellingProducts?.data?.length > 0 ? (
              bestSellingProducts.data.map((item, index) => (
                <ProductCard
                  item={item}
                  key={item.id ?? `product-${index}`}
                  colSpan="col-span-6 md:col-span-4 xl:col-span-3"
                />
              ))
            ) : (
              <div className="w-fit col-span-12 text-xl font-EstedadExtraBold py-4 text-center leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
                هیچ محصولی وجود ندارد
              </div>
            )}
          </div>
          <Pagination
            links={bestSellingProducts?.links || []}
            baseUrl={`${import.meta.env.VITE_API_URL}/v2/products/list-best-seller`}
            replaceUrl="/best-selling-products"
          />
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
