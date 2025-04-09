import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SubCategoryProducts = () => {
  const { subCategoryCode } = useParams();
  const [products, setProducts] = useState([]);
  const [SubCategory, setSubCategory] = useState();
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const navigate = useNavigate();

  const fetchproducts = async (url) => {
    if (productsLoading) return;
    try {
      setProductsLoading(true);
      const { data, status } = await axios.get(url, {
        headers: {
          cache: "no-cache",
        },
      });

      if (status !== 200) throw new Error(data?.message);
      setProducts(data?.result?.data);
      setLinks(data?.result?.links);
    } catch (error) {
      toast.error(
        " محصولات : " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchSubCategory = async (url) => {
    if (subCategoryLoading) return;
    try {
      setSubCategoryLoading(true);
      const { data, status } = await axios.get(url, {
        headers: {
          cache: "no-cache",
        },
      });
      if (status !== 200) throw new Error(data?.message);
      setSubCategory(data?.result);
    } catch (error) {
      toast.error(
        " زیر دسته بندی : " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setSubCategoryLoading(false);
    }
  };

  const letsSearch = (e) => {
    e.preventDefault();
    const searchPhrase = e.target.search.value;
    if (searchPhrase?.length > 0) {
      toast.success("در حال جستجو برای بهترین پاسخ");
      navigate(`/search/${searchPhrase}`);
    } else {
      toast.error("نام محصول مورد نظر را وارد کنید");
    }
  };

  useEffect(() => {
    fetchproducts(
      `https://kidsshopapi.electroshop24.ir/api/v1/list-subcategory-products-for-website/${subCategoryCode}/UCode?page=1`
    );
    fetchSubCategory(
      `https://kidsshopapi.electroshop24.ir/api/v1/search-subcategory-by-code/${subCategoryCode}`
    );
  }, [subCategoryCode]);

  return (
    <div className="w-full min-h-[65vh] flex flex-col ">
      {/* products */}
      <section className="py-4">
        <div className="px-4 mx-auto lg:px-8">
          <div className="mx-auto space-y-5 text-center">
            {subCategoryLoading ? (
           <FontAwesomeIcon icon={faSpinner} spin className="flex flex-row items-center justify-center mx-auto text-7xl" />
            ) : (
              <>
                <h1 className="lg:text-2xl text-lg  font-EstedadExtraBold border-b py-4 text-transparent mt-10 lg:mt-0 lg:w-fit  bg-clip-text bg-gradient-to-r from-Amber-500 to-CarbonicBlue-500 lg:text-start">
                  محصولات {SubCategory?.Name}
                </h1>
                <p className="text-gray-600">{SubCategory?.Comment}</p>
              </>
            )}
          </div>
          {productsLoading ? (
            <div
              className="
            flex flex-row items-center justify-center min-h-screen"
            >
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="flex flex-row items-center justify-center mx-auto text-7xl"
              />
            </div>
          ) : (
            <div className="flex flex-row flex-wrap items-start justify-center w-full">
              <div className="w-full lg:w-9/12">
                <ul className="grid mt-16 gap-x-8 gap-y-10 grid-cols-12">
                  {products &&
                    products?.map((item, key) => (
                      <ProductCard item={item} key={key} />
                    ))}
                </ul>
                <div className="flex flex-row items-center justify-center my-8">
                  {links?.length > 3 &&
                    links?.map((link, idx) => (
                      <button
                        key={idx}
                        disabled={!link?.url}
                        onClick={() =>
                          link?.url ? fetchproducts(link.url) : null
                        }
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

              <div className="sticky flex flex-col flex-wrap justify-center w-full text-center top-24 lg:w-3/12">
                <form
                  onSubmit={letsSearch}
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
                    className="w-full h-10 my-3 font-bold rounded-lg text-white duration-150  bg-CarbonicBlue-500 hover:scale-105 hover:bg-CarbonicBlue-500/80 shadow-md shadow-gray-300 "
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
                          fetchproducts(
                            `https://kidsshopapi.electroshop24.ir/api/v1/list-subcategory-products-for-website/${subCategoryCode}/price_asc?page=1`
                          )
                        }
                      >
                        بیشترین قیمت
                      </button>
                      <button
                        className="w-full h-10 mx-1 my-3 text-white rounded-lg bg-Amber-500 duration-200 hover:scale-105 hover:bg-Amber-500/80 shadow-md shadow-gray-300"
                        onClick={() =>
                          fetchproducts(
                            `https://kidsshopapi.electroshop24.ir/api/v1/list-subcategory-products-for-website/${subCategoryCode}/price_des?page=1`
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
                          fetchproducts(
                            `https://kidsshopapi.electroshop24.ir/api/v1/list-subcategory-products-for-website/${subCategoryCode}/UCode?page=1`
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
          )}
        </div>
      </section>
    </div>
  );
};

export default SubCategoryProducts;
