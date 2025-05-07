/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const [categories, setCatgeoires] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

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
      setCatgeoires(data?.result?.categories?.data);
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
      `https://kidsshopapi.electroshop24.ir/api/v2/list-categories?search=${search}&page=${page}`
    );
  }, [page, search]);

  const letsSearchCategory = (e) => {
    e.preventDefault();
    try {
      const searchPhrase = e.target.search.value;
      // if (searchPhrase?.length <= 0)
      //   throw new Error("نام دسته بندی مورد نظر را وارد کنید");
      navigate(`/categories?search=${searchPhrase}`);
    } catch (error) {
      toast.error(error?.message);
    }
  };

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
            <form
              onSubmit={(e) => letsSearchCategory(e)}
              className="relative flex items-center pt-2 md:pt-0 "
            >
              <input
                type="text"
                name="search"
                placeholder="جستجو در دسته بندی ها"
                className="w-full font-EstedadMedium p-2 md:p-3 2xl:p-5 text-sm text-gray-600 border border-gray-300 2xl:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="text-gray-600 hover:text-gray-700 absolute left-2.5"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="2xl:text-3xl"
                />
              </button>
            </form>
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
                <Link
                  key={idx}
                  to={`/category/${Math.floor(item.Code)}`}
                  className="flex flex-col items-center justify-between
                    duration-300 rounded-xl  
                    group
                    col-span-6  md:col-span-4
                    lg:col-span-3
                    2xl:col-span-3
                    gap-2
                    "
                >
                  <img
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg";
                    }}
                    src={
                      "https://kidsshopapi.electroshop24.ir/category-images/webp/" +
                      `${item.PicName}.webp`
                    }
                    alt={item.Name}
                    className="
                    group-hover:scale-105 duration-300 ease-in-out
                    rounded-xl shadow-md shadow-gray-300"
                  />
                  <div className="flex flex-col px-3 gap-2">
                    <h4
                      className=" 
                          text-sm
                          leading-relaxed
                          2xl:text-3xl 2xl:pt-2 text-center text-gray-500 font-EstedadMedium"
                    >
                      {item?.Name}
                    </h4>
                    <p className="text-gray-300 font-EstedadLight text-xs 2xl:text-sm ">
                      {item?.Comment}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
      {/* categories */}

      {/* Pagination Controls */}
      <div className="flex flex-row gap-y-2 flex-wrap items-center justify-center my-2 md:my-8 2xl:my-16 ">
        {links.length > 3 &&
          links.map((link, idx) => (
            <button
              key={idx}
              onClick={() =>
                navigate(
                  link.url.replace(
                    "https://kidsshopapi.electroshop24.ir/api/v2/list-categories",
                    ""
                  )
                )
              }
              disabled={link.url === null}
              className={`2xl:px-4 2xl:py-2 rounded-md cursor-pointer 2xl:mx-2
                2xl:text-2xl
                text-xs px-2 py-1 mx-1
                disabled:cursor-not-allowed
                transition-all duration-300 ease-in-out
                hover:bg-CarbonicBlue-500/80 hover:text-white
                ${
                  link.active
                    ? "bg-CarbonicBlue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
            >
              {link.label === "&laquo; Previous"
                ? "قبلی"
                : link.label === "Next &raquo;"
                ? " بعدی"
                : link.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Categories;
