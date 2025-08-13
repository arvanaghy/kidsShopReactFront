/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@components/Loading";
import CategorySquareCard from "@components/category/CategorySquareCard";
import Pagination from "@components/Pagination";
import CategorySearch from "@components/category/CategorySearch";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const fetchCategories = async (_url) => {
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
        " دسته بندی :" + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
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

  if (loading) return <Loading />;

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
            <CategorySearch />
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
              categories.map((item, idx) => (
                <CategorySquareCard key={idx} item={item} />
              ))}
          </div>
        </div>
      </section>
      {/* categories */}

      {/* Pagination Controls */}
      <Pagination
        links={links}
        replace={{ url: "/v2/list-categories", phrase: "/categories" }}
      />
    </div>
  );
};

export default Categories;
