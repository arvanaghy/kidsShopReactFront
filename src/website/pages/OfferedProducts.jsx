/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const OfferedProducts = () => {
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [products, setProducts] = useState([]);
  const [links, setLinks] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [url, setUrl] = useState(
    `https://api.electroshop24.ir/api/v1/offerd-products?page=1`
  );

  const fetchProducts = async () => {
    try {
      const { data, status } = await axios.get(url, {
        headers: {
          cache: "no-cache",
        },
      });
      if (status !== 200) throw new Error(data?.message);
      setProducts(data?.result?.data);
      setLinks(data?.result?.links);
      setIsProductsLoading(false);
    } catch (error) {
      toast.error(
        " محصولات " + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
      );
    } finally {
      setIsProductsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, [url]);

  return (
    <div className="flex flex-row flex-wrap items-center justify-around w-full ">
      {/* products */}
      <section className="w-full p-2 lg:px-8 py-4">
        <div className="w-full mx-auto">
          <h1 className="w-fit font-EstedadExtraBold lg:text-start text-center mx-auto mt-10  text-lg lg:text-3xl text-transparent bg-clip-text  bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500  border-b-2 py-4 lg:mx-8">
            محصولات ویژه الکتروشاپ
          </h1>
          <hr />
          {isProductsLoading ? (
            <ul className="grid mt-16 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {skeletonArray.map((key, idx) => (
                <li
                  className="w-full mx-auto group sm:max-w-sm animate-pulse"
                  key={idx}
                >
                  <Link className="flex flex-col items-center justify-center">
                    <img
                      loading="lazy"
                      className="w-full h-24 rounded-lg bg-slate-200"
                    />
                    <div className="text-center">
                      <div className="flex my-2">
                        <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
                        <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
                      </div>
                      <div className="flex mx-auto text-center">
                        <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
                        <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
                      </div>
                      <div className="flex my-2">
                        <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
                        <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <span className="block w-32 h-8 text-sm text-indigo-600 bg-slate-200"></span>
                      <h3 className="text-lg font-semibold text-gray-800 duration-150 group-hover:text-indigo-600"></h3>
                      <p className="text-sm text-gray-600 duration-150 group-hover:text-gray-800"></p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-row flex-wrap items-start justify-center w-full">
              <div className="w-full lg:w-9/12">
                <ul className="grid mt-16 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  {products?.map((items, key) => (
                    <ProductCard item={items} key={key} />
                  ))}
                </ul>

                <div className="flex flex-row flex-wrap items-center justify-center my-8">
                  {links &&
                    links?.length > 3 &&
                    links?.map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          link?.url ? setUrl(link?.url) : null;
                        }}
                        className={`px-4 py-2 rounded-md cursor-pointer mx-2 ${
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
            </div>
          )}
        </div>
      </section>
      {/* products */}
    </div>
  );
};

export default OfferedProducts;
