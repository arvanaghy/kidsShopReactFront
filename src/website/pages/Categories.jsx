/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const [categories, setCatgeoires] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const fetchCategories = async (_url) => {
    if (isCategoryLoading) return;
    try {
      setIsCategoryLoading(true);
      const { data, status } = await axios.get(_url, {
        headers: {
          cache: "no-cache",
        },
      });
      if (status !== 200) throw new Error(data?.message);
      setCatgeoires(data?.result?.data);
      setLinks(data?.result?.links);
    } catch (error) {
      toast.error(
        " دسته بندی :" + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
      );
    } finally {
      setIsCategoryLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories(
      `https://kidsshopapi.electroshop24.ir/api/v1/list-categories?page=1`
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full flex inset-0 flex-col justify-center items-center">
      {/* categories */}
      <section className="w-full py-14">
        <div className="w-full px-4 mx-auto text-gray-600 lg:px-8">
          <div className="w-full relative mx-auto sm:text-center">
            <div className="relative z-10">
              <h3
                className="w-fit text-right text-lg lg:text-2xl font-EstedadExtraBold py-4 leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
        "
              >
                دسته بندی های الکتروشاپ
              </h3>
            </div>
          </div>
          <div className="relative mt-12">
            {isCategoryLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="flex flex-row items-center justify-center mx-auto text-7xl"
              />
            ) : (
              <ul
                className="w-full grid grid-cols-12
              gap-2
              
              md:gap-4
              lg:gap-6
              2xl:gap-8
              "
              >
                {categories &&
                  categories.map((item, idx) => (
                    <li
                      key={idx}
                      className="items-center justify-center duration-300 border rounded-r-full shadow-lg 
                    hover:scale-105 hover:shadow-lg
                    col-span-12 sm:col-span-6 md:col-span-4
                    lg:col-span-3
                    2xl:col-span-2

                    "
                    >
                      <Link
                        to={`/category/${Math.floor(item.Code)}`}
                        className="flex flex-row items-center justify-between"
                      >
                        <div className="flex flex-row">
                          <img
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23FFFFFF'/%3E%3C/svg%3E";
                            }}
                            src={
                              "https://kidsshopapi.electroshop24.ir/category-images/webp/" +
                              `${item.PicName}.webp`
                            }
                            alt={item.Name}
                            className="w-24 h-24 m-2 rounded-full shadow-md shadow-gray-300"
                          />
                        </div>
                        <div className="flex flex-col px-3">
                          <h4
                            className="mx-2 
                          text-sm
                          leading-relaxed
                          2xl:text-lg text-center text-CarbonicBlue-500 font-EstedadMedium"
                          >
                            {item?.Name}
                          </h4>
                          <p className="text-CarbonicBlue-500 font-EstedadLight text-xs 2xl:text-sm ">
                            {item?.Comment}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      {/* categories */}

      {/* Pagination Controls */}

      <div className="flex flex-row flex-wrap items-center justify-center my-8 ">
        {links.length > 3 &&
          links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => fetchCategories(link.url)}
              disabled={link.url === null}
              className={`2xl:px-4 2xl:py-2 rounded-md cursor-pointer 2xl:mx-2
                2xl:text-sm

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
