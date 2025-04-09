import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const SubCategories = () => {
  const { categoryCode } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    data: [],
    links: [],
  });
  const [subCategories, setSubCategories] = useState({
    data: [],
    links: [],
  });
  const [category, setCategory] = useState(null);

  const fetchData = async (_url) => {
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
      setSubCategories({
        data: data?.result?.subcategories?.data,
        links: data?.result?.subcategories?.links,
      });
      setCategory(data?.result?.category);
      setProducts({
        data: data?.result?.categoryProducts?.data,
        links: data?.result?.categoryProducts?.links,
      });
    } catch (error) {
      toast.error(
        "دسته بندی: " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(
      `https://kidsshopapi.electroshop24.ir/api/v2/list-subcategories/${categoryCode}?page=1`
    );
  }, [categoryCode]);

  if (loading) return <Loading />;
  return (
    <div className="w-full m-h-[65vh] flex inset-0 flex-col justify-center items-center">
      {/* categories */}
      <section className="w-full  py-14 ">
        <div className="w-full px-4 mx-auto text-gray-600 lg:px-8  py-10">
          <div className="w-full relative  mx-auto sm:text-center">
            <div className="relative z-10 w-full">
              <div className=" w-full">
                <h3 className="w-fit text-lg lg:text-2xl font-EstedadExtraBold py-4 text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
                  زیر دسته بندی های {category?.Name} :

                  {categoryCode}
                </h3>
                {category?.Comment && (
                  <p className="mt-4 text-gray-600 font-EstedadMedium">
                    {category?.Comment}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="relative mt-12 font-EstedadLight text-center">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 w-full">
              {subCategories?.data?.length > 0 ? (
                subCategories?.data?.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/sub-category-products/${Math.floor(item?.Code)}`}
                    className="w-full flex flex-row justify-between
                    items-center  border rounded-r-full shadow-lg duration-300 shadow-CarbonicBlue-500 hover:scale-105 ease-in-out "
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
                          "https://kidsshopapi.electroshop24.ir/subCategory-images/webp/" +
                          `${item.PicName}.webp`
                        }
                        alt={item?.Name}
                        className="w-24 h-24 m-2 rounded-full shadow-md shadow-gray-300"
                      />
                    </div>
                    <div className="flex flex-col px-3">
                      <h4 className="mx-2 text-lg text-center text-CarbonicBlue-500 font-EstedadMedium">
                        {item?.Name}
                      </h4>
                      <p className=" font-EstedadLight ">{item?.Comment}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div
                  className="w-full text-xl font-EstedadExtraBold py-4 text-center leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
                  "
                >
                  هیج دسته بندی وجود ندارد
                </div>
              )}
            </ul>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center my-8">
            {subCategories?.links?.length > 3 &&
              subCategories?.links.map((link, idx) => (
                <button
                  disabled={link.url === null}
                  key={idx}
                  onClick={() => {
                    fetchData(link?.url);
                  }}
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
      </section>
      {/* categories */}
      {/* products */}
      <section className="min-h-[32rem] w-full py-10 lg:px-8 ">
        <div className=" w-full ">
          <h3
            className="w-fit text-xl lg:text-3xl mx-4 font-EstedadExtraBold py-4 text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
        "
          >
            محصولات {category?.Name} :
          </h3>
        </div>

        <ul className="grid gap-8 grid-cols-12 w-full px-10 py-10">
          {products?.data?.length > 0 ? (
            products?.data?.map((item, idx) => (
              <ProductCard item={item} key={idx} />
            ))
          ) : (
            <div
              className="w-fit  text-xl font-EstedadExtraBold py-4 text-center leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500 
              "
            >
              هیج محصولی وجود ندارد
            </div>
          )}
        </ul>

        <div className="flex flex-row flex-wrap items-center justify-center my-8">
          {products?.links?.length > 3 &&
            products?.links?.map((link, idx) => (
              <button
                key={idx}
                disabled={link.url === null}
                onClick={() => fetchData(link.url)}
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
      </section>
      {/* Pagination Controls */}
    </div>
  );
};

export default SubCategories;
