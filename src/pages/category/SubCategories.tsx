/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import {
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProductCard from "@components/product/ProductCard";
import Loading from "@components/Loading";
import {
  useSubCategory,
} from "@hooks/useCategories";
import ListAsBar from "@components/subcategories/ListAsBar";
import Pagination from "@components/product/Pagination";
import PaginationCategory from "@components/Pagination";
import SortFilters from "@components/product/filter/SortFilters";
import SideFilter from "@components/product/filter/SideFilter";
import MobileFilterModal from "@components/product/filter/MobileFilterModal";
import MobileFilterToggle from "@components/product/filter/MobileFilterToggle";
import { useFilters } from "@hooks/useFilters";

const SubCategories = () => {
  const [searchParams] = useSearchParams();
  const searchPhrase = searchParams.get("search") || null;
  const product_page = searchParams.get("product_page") || 1;
  const subcategory_page = searchParams.get("subcategory_page") || 1;
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;
  const sort_price = searchParams.get("sort_price") || null;
  const { categoryCode } = useParams();

  const [isModal, setIsModal] = useState(false);
  const { sizeSets, setSizeSets, colorSets, setColorSets } = useFilters();

  const { subCategories, isPending, category, products, sizes, colors } =
    useSubCategory(
      categoryCode,
      product_page,
      subcategory_page,
      searchPhrase,
      size,
      color,
      sort_price
    );

  if (isPending) return <Loading />;

  console.log("subCategories", subCategories);

  return (
    <div className="relative w-full min-h-[65vh] grid grid-cols-12 justify-center items-start gap-2 py-4 xl:py-6 xl:gap-4">
      {/* subcategories */}
      {subCategories?.data && subCategories?.data?.length > 0 && (
        <ListAsBar info={subCategories?.data} />
      )}
      {subCategories?.links?.length > 3 && (
        <PaginationCategory
          links={subCategories?.links}
          replace={{
            url: `/category/${categoryCode}`,
            phrase: category?.name,
          }}
        />
      )}
      {/* subcategories */}
      <MobileFilterModal
        searchPhrase={searchPhrase}
        sizeSets={sizeSets}
        setSizeSets={setSizeSets}
        colorSets={colorSets}
        setColorSets={setColorSets}
        isModal={isModal}
        setIsModal={setIsModal}
        sort_price={sort_price}
        sizes={sizes}
        colors={colors}
        navigation={`category/${categoryCode}`}
      />
      <MobileFilterToggle setIsModal={setIsModal} />
      {/* side bar */}
      <SideFilter
        searchPhrase={searchPhrase}
        sizeSets={sizeSets}
        setSizeSets={setSizeSets}
        colorSets={colorSets}
        setColorSets={setColorSets}
        sort_price={sort_price}
        sizes={sizes}
        colors={colors}
        navigation={`category/${categoryCode}`}
      />
      {/* main content */}
      <div className="w-full col-span-12 md:col-span-8 xl:col-span-9 grid grid-cols-12 md:order-2 space-y-6 order-1 ">
        {/* sort filters */}
        <SortFilters
          sort_price={sort_price}
          searchPhrase={searchPhrase}
          size={size}
          color={color}
          navigation={`category/${categoryCode}`}
        />
        {/* products */}
        <div className="w-full col-span-12 bg-Cream-500 p-6 flex flex-col">
          <div className="w-full grid grid-cols-12 gap-6">
            {products?.data?.length > 0 ? (
              products?.data?.map((item: any, idx: number) => (
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
            links={products?.links || []}
            baseUrl={`${import.meta.env.VITE_API_URL
              }/v2/categories-and-subcategories/list-category-subcategories-and-products/${categoryCode}`}
            replaceUrl={`/category/${categoryCode}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
