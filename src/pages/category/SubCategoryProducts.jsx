/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "@components/product/ProductCard";
import Loading from "@components/Loading";
import Pagination from "@components/product/Pagination";
import SortFilters from "@components/product/filter/SortFilters";
import SideFilter from "@components/product/filter/SideFilter";
import MobileFilterModal from "@components/product/filter/MobileFilterModal";
import MobileFilterToggle from "@components/product/filter/MobileFilterToggle";
import { useFilters } from "@hooks/useFilters";
import { useSubcategoryProducts } from "@hooks/useProduct";

const SubCategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const searchPhrase = searchParams.get("search") || null;
  const product_page = searchParams.get("product_page") || 1;
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;

  const sort_price = searchParams.get("sort_price") || null;
  const { subCategoryCode } = useParams() || "";

  const [isModal, setIsModal] = useState(false);

  const { sizeSets, setSizeSets, colorSets, setColorSets } = useFilters();

  const {
    subcategory,
    subcategoryProducts,
    subcategoryProductsSizes,
    subcategoryProductsColors,
    isPending,
  } = useSubcategoryProducts({
    subCategoryCode,
    searchPhrase,
    product_page: Number(product_page),
    size,
    color,
    sort_price,
  });

  if (isPending) return <Loading />;

  return (
    <div className="relative w-full min-h-[65vh] grid grid-cols-12 justify-center items-start gap-2 py-4 xl:py-6 xl:gap-4">
      <MobileFilterModal
        searchPhrase={searchPhrase}
        sizeSets={sizeSets}
        setSizeSets={setSizeSets}
        colorSets={colorSets}
        setColorSets={setColorSets}
        isModal={isModal}
        setIsModal={setIsModal}
        sort_price={sort_price}
        sizes={subcategoryProductsSizes}
        colors={subcategoryProductsColors}
        navigation={`sub-category-products/${subCategoryCode}`}
      />
      <MobileFilterToggle setIsModal={setIsModal} />
      {/* remove filters */}
      {/* side bar */}
      <SideFilter
        searchPhrase={searchPhrase}
        sizeSets={sizeSets}
        setSizeSets={setSizeSets}
        colorSets={colorSets}
        setColorSets={setColorSets}
        sort_price={sort_price}
        sizes={subcategoryProductsSizes}
        colors={subcategoryProductsColors}
        navigation={`sub-category-products/${subCategoryCode}`}
      />
      {/* main content */}
      <div className="w-full col-span-12 md:col-span-8 xl:col-span-9 grid grid-cols-12 md:order-2 space-y-6 order-1 ">
        {/* sort filters */}
        <SortFilters
          sort_price={sort_price}
          searchPhrase={searchPhrase}
          size={size}
          color={color}
          navigation={`sub-category-products/${subCategoryCode}`}
        />
        {/* products */}
        <div className="w-full col-span-12 bg-Cream-500 p-6 flex flex-col">
          <div className="w-full grid grid-cols-12 gap-6">
            {subcategoryProducts?.data?.length > 0 ? (
              subcategoryProducts?.data?.map((item, idx) => (
                <ProductCard
                  item={item}
                  key={idx}
                  colSpan="col-span-6
                md:col-span-4 xl:col-span-3"
                />
              ))
            ) : (
              <div
                className="w-fit col-span-12  text-xl font-EstedadExtraBold py-4 text-center leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
              "
              >
                هیج محصولی وجود ندارد
              </div>
            )}
          </div>
          <Pagination
            links={subcategoryProducts?.links || []}
            baseUrl={`${
              import.meta.env.VITE_API_URL
            }/v2/list-subcategory-products/${subCategoryCode}`}
            replaceUrl={`/sub-category-products/${subCategoryCode}`}
          />
        </div>
      </div>

      {/* <div
        className="col-span-12 grid grid-cols-12 
        items-center justify-center 
        px-2
        py-3
        md:gap-2
        xl:p-4
      "
      >
        <img
          src={`${import.meta.env.VITE_CDN_URL}/subCategory-images/webp/${
            subcategory?.PicName
          }.webp`}
          alt={subcategory?.Name}
          onError={(e) => {
            e.target.src = import.meta.env.VITE_NO_IMAGE_URL;
          }}
          className="col-span-5 md:col-span-4 w-full object-scale-down rounded-xl shadow-sm shadow-black/60"
        />
        <div className="col-span-7 md:col-span-8 w-full items-center justify-center ">
          <h1
            className=" text-center  font-EstedadExtraBold tracking-wider leading-relaxed
      text-lg py-4
      sm:text-4xl sm:py-4
      md:text-2xl md:py-6
      lg:text-3xl lg:py-7
      xl:text-4xl xl:py-8 
      2xl:text-5xl 2xl:py-10
      text-transparent bg-clip-text bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500 
      "
          >
            {subcategory?.Name}
          </h1>
          <p
            className="font-EstedadMedium tracking-wide leading-loose 
          p-1.5
          md:text-sm md:p-2

          xl:text-base xl:p-4 text-justify  "
          >
            {subcategory?.Comment}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default SubCategoryProducts;
