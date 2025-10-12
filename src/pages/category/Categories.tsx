/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";

import Loading from "@components/Loading";
import CategorySquareCard from "@components/category/CategorySquareCard";
import Pagination from "@components/Pagination";
import CategorySearch from "@components/category/CategorySearch";
import { listCategory } from "@hooks/useCategories";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;

  const { categories, isPending, links } = listCategory(search, page);

  if (isPending) return <Loading />;

  return (
    <div className="w-full h-full flex inset-0 flex-col justify-center items-center">
      {/* categories */}
      <section className="w-full md:pt-7 lg:pt-10">
        <div className="w-full px-4 mx-auto text-gray-600 lg:px-8">
          <div className="w-full flex flex-col md:flex-row justify-between items-center mx-auto sm:text-center">
            <h3
              className="w-fit text-right text-lg lg:text-2xl 2xl:text-4xl font-EstedadExtraBold py-4 leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
        "
            >
              <span>دسته بندی های محصولات کیدزشاپ </span>
              {search?.length > 0 && <span>جستجو شده : {search}</span>}
            </h3>
            <CategorySearch searchParam={search} />
          </div>
          <div
            className="
              pt-4 md:pt-12
              w-full grid grid-cols-12
              gap-x-3
              md:gap-4
              lg:gap-6
              2xl:gap-8
              "
          >
            {categories &&
              categories.map((item : any, idx : number) => (
                <CategorySquareCard key={idx} item={item} />
              ))}
          </div>
        </div>
      </section>
      {/* categories */}

      {/* Pagination Controls */}
      <Pagination
        links={links}
        replace={{ url: "/general/list-categories", phrase: "/categories" }}
      />
    </div>
  );
};

export default Categories;
