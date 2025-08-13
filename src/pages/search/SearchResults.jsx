/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@components/ProductCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMainStore } from "@store/useMainStore";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [links, setLinks] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortType, setSortType] = useState("UCode");
  const { user, searchPhrase, setSearchPhrase } = useMainStore();
  const navigation = useNavigate();

  const fetchProducts = async () => {
    if (user & user?.Utoken) {
      try {
        const { data, status } = await axios.get(
          `https://api.kidsshop110.ir/api/v1/search/${searchPhrase}?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${user.UToken}`,
              cache: "no-cache",
            },
          }
        );
        if (status !== 200) throw new Error(data?.message);

        setTotal(data?.total);
        setProducts(data);
        setLinks(data?.links);
        setIsProductsLoading(false);
      } catch (error) {
        toast.error(
          " محصولات" + err?.response?.data?.message ||
            err?.message ||
            "خطا در اتصال"
        );
      }
    } else {
      try {
        const { data, status } = await axios.get(
          `https://api.kidsshop110.ir/api/v1/search/${searchPhrase}?page=${currentPage}`,
          {
            headers: {
              cache: "no-cache",
            },
          }
        );
        if (status !== 200) throw new Error(data?.message);

        setProducts(data);
        setTotal(data?.total);
        setLinks(data?.links);
        setIsProductsLoading(false);
      } catch (error) {
        toast.error(
          " محصولات" + err?.response?.data?.message ||
            err?.message ||
            "خطا در اتصال"
        );
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [currentPage, user, sortType]);

  const handlePagination = (url) => {
    setCurrentPage(parseInt(url.split("=")[1]));
  };

  const letsSearch = async () => {
    if (searchPhrase?.length > 0) {
      setIsProductsLoading(true);
      setCurrentPage(1);
      setLinks([]);
      setProducts([]);
      navigation("/search-result");
    } else {
      return;
    }
  };

  return (
    <div className="w-full m-h-[65vh] flex inset-0 flex-col justify-center items-center">
      {/* products */}
      <section className="w-full p-2 lg:p-8">
        <div className="w-full mx-auto">
          <h1 className="pb-6 text-3xl text-center text-CarbonicBlue-500 font-EstedadExtraBold sm:text-5xl">
            نتایج جستجو {searchPhrase}
          </h1>
          <hr />
          <div className="flex flex-row flex-wrap items-start justify-center w-full">
            {total > 0 ? (
              <div className="w-full lg:w-9/12">
                <ul className="grid mt-16 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  {products?.data?.map((product, key) => (
                    <ProductCard item={product} user={user} key={key} />
                  ))}
                </ul>

                <div className="flex flex-row flex-wrap items-center justify-center my-8">
                  {links?.length > 3 &&
                    links?.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePagination(link.url)}
                        className={`lg:px-4 lg:py-2 p-1 rounded-md cursor-pointer m-2 ${
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
            ) : (
              <div className="w-full lg:w-9/12">
                <p>محصولی یافت نشد</p>
              </div>
            )}

            <div className="sticky flex flex-col flex-wrap justify-center w-full text-center top-24 lg:w-3/12">
              <div className="flex flex-col items-center justify-center w-full px-4 mx-auto my-2 font-EstedadMedium">
                <span className="mx-1 my-3">
                  به دنبال کالای خاصی میگردید ؟{" "}
                </span>
                <input
                  type="text"
                  onChange={(e) => setSearchPhrase(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  onClick={letsSearch}
                  className="w-full h-10 my-3 font-bold rounded-lg text-CarbonicBlue-500 bg-Amber-500"
                >
                  جستجو
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* products */}
    </div>
  );
};

export default Products;
