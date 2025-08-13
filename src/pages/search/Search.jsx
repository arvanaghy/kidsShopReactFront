/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "@components/ProductCard";
import toast from "react-hot-toast";

const Search = () => {
  const { searchPhrase } = useParams();
  const [result, setResult] = useState([]);
  const [isResultLoading, setIsResultLoading] = useState(true);
  const [links, setLinks] = useState([]);

  const letsSearch = async (url) => {
    try {
      window.scrollTo(0, 0);
      const { data, status } = await axios.get(url, {
        headers: {
          cache: "no-cache",
        },
      });
      if (status !== 200) throw new Error(data?.message);
      setResult(data?.result?.data);
      setIsResultLoading(false);
      setLinks(data?.result?.links);
      toast.success(data?.message);
    } catch (err) {
      toast.error(
        " جستجو : " + err?.response?.data?.message ||
          err?.message ||
          "خطا در اتصال"
      );
    }
  };

  useEffect(() => {
    letsSearch(`https://api.kidsshop110.ir/api/v1/search/${searchPhrase}`);
  }, [searchPhrase]);

  return (
    <>
      <div className="flex flex-row justify-between px-4 lg:px-10 min-h-screen">
        {isResultLoading ? (
          <p className="text-2xl py-2 inset-0 w-full h-full animate-pulse font-EstedadExtraBold ">
            در حال بارگذاری ...
          </p>
        ) : (
          <div className="flex flex-row flex-wrap items-start lg:mt-4 justify-center w-full">
            <div className="w-full lg:w-9/12">
              <ul className="grid mt-16 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {result.map((searchResult, key) => (
                  <ProductCard item={searchResult} key={key} />
                ))}
              </ul>
              <div className="flex flex-row flex-wrap items-center justify-center my-8">
                {links &&
                  links?.length > 3 &&
                  links.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        link?.url ? letsSearch(link?.url) : null;
                      }}
                      className={`lg:px-4 lg:py-2 p-1 rounded-md cursor-pointer m-2 ${
                        link.active
                          ? "bg-Amber-500 text-white"
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
            <div className="sticky my-10  top-44 lg:w-3/12">
              <div className="flex flex-col flex-wrap justify-center w-full text-center">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    letsSearch(
                      `https://api.kidsshop110.ir/api/v1/search/${e.target.search.value}`
                    );
                  }}
                  className="flex flex-col items-center justify-center w-full px-4 mx-auto my-2 font-EstedadMedium"
                >
                  <span className="mx-1 my-3">
                    به دنبال کالای خاصی میگردید ؟{" "}
                  </span>
                  <input
                    type="text"
                    name="search"
                    className="w-full h-10 px-3 rounded-lg bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <button
                    type="submit"
                    className="w-full h-10 my-3 font-bold rounded-lg text-white duration-150  bg-CarbonicBlue-500 hover:scale-105 hover:bg-CarbonicBlue-500/60 shadow-md shadow-gray-300"
                  >
                    جستجو
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
