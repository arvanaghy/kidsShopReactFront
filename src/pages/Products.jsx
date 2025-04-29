/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SpinnerLoading from "../components/SpinnerLoading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [links, setLinks] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);

  const navigation = useNavigate();

  const fetchProducts = async (url) => {
    if (isProductsLoading) return;
    try {
      setIsProductsLoading(true);
      window.scrollTo(0, 0);
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
        " محصولات" + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setIsProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(
      `https://kidsshopapi.electroshop24.ir/api/v1/list-products-for-website/UCode?page=1`
    );
  }, []);

  const letsSearch = async (e) => {
    const searchPhrase = e.target.search.value;
    if (searchPhrase?.length > 0) {
      navigation("/search/" + searchPhrase);
    } else {
      toast.error("نام محصول مورد نظر را وارد کنید");
    }
  };

  if (isProductsLoading) return <SpinnerLoading />;

  return (
    <div className="w-full m-h-[65vh] flex inset-0 flex-col justify-center items-center">
      <section className="w-full p-2 lg:p-8">
        <div className="mx-auto">
          <h1 className="lg:w-fit text-center mt-10 lg:mt-4 text-xl lg:text-3xl font-EstedadExtraBold py-4  lg:text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
            لیست تمامی محصولات کیدزشاپ :
          </h1>
          <div className="flex flex-row flex-wrap items-start justify-center w-full">
            <div className="w-full lg:w-9/12">
              <ul className="grid mt-16 gap-x-8 gap-y-10 grid-cols-12">
                {products?.map((product, key) => (
                  <ProductCard item={product} key={key} />
                ))}
              </ul>
              <div className="flex flex-row flex-wrap items-center justify-center my-8">
                {links &&
                  links?.length > 3 &&
                  links.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        link?.url ? fetchProducts(link?.url) : null;
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
            <div className="sticky z-10 flex flex-col flex-wrap justify-center w-full text-center top-44 lg:w-3/12">
              <form
                onSubmit={letsSearch}
                className="flex flex-col items-center justify-center w-full px-4 mx-auto my-2 font-EstedadMedium"
              >
                <span className="mx-1 my-3">به دنبال کالای خاصی میگردید ؟</span>
                <input
                  type="text"
                  name="search"
                  className="w-full h-10 px-3 rounded-lg bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="submit"
                  className="w-full h-10 my-3 font-bold rounded-lg text-white duration-150  bg-CarbonicBlue-500 hover:scale-105 hover:bg-CarbonicBlue-500/80 shadow-md shadow-gray-300"
                >
                  جستجو
                </button>
              </form>
              <div className="items-center justify-center w-full px-4 mx-auto my-2 font-EstedadMedium">
                مرتب سازی بر اساس
                <div className="flex flex-col">
                  <div className="flex">
                    <button
                      className="w-full h-10 mx-1 my-3 text-white rounded-lg bg-Amber-500 duration-200 hover:scale-105 hover:bg-Amber-500/80 shadow-md shadow-gray-300"
                      onClick={() =>
                        fetchProducts(
                          `https://kidsshopapi.electroshop24.ir/api/v1/list-products-for-website/price_asc?page=1`
                        )
                      }
                    >
                      بیشترین قیمت
                    </button>
                    <button
                      className="w-full h-10 mx-1 my-3 text-white rounded-lg bg-Amber-500 duration-200 hover:scale-105 hover:bg-Amber-500/80 shadow-md shadow-gray-300"
                      onClick={() =>
                        fetchProducts(
                          `https://kidsshopapi.electroshop24.ir/api/v1/list-products-for-website/price_des?page=1`
                        )
                      }
                    >
                      کمترین قیمت
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      className="w-full h-10 mx-1 my-3 text-white rounded-lg bg-Amber-500 duration-200 hover:scale-105 hover:bg-Amber-500/80 shadow-md shadow-gray-300"
                      onClick={() =>
                        fetchProducts(
                          `https://kidsshopapi.electroshop24.ir/api/v1/list-products-for-website/UCode?page=1`
                        )
                      }
                    >
                      جدیدترین کالاها
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
