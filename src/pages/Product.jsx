/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { formatCurrencyDisplay } from "../../utils/numeralHelpers";
import UserContext from "../../UserContext";
import { userPriceSelect } from "../../utils/userPriceHelper";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Product = () => {
  const { productCode } = useParams();
  const [product, setProduct] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [unitQuantity, setUnitQuantity] = useState(0);
  const [subCategories, setSubCatgeoires] = useState([]);
  const [packQuantity, setPackQuantity] = useState(0);
  const [sameProducts, setSameProducts] = useState([]);
  const [presentUnitQuantity, setPresentUnitQuantity] = useState(0);
  const [presentPackQuantity, setPresentPackQuantity] = useState(0);
  const { cart, updateCart, user } = useContext(UserContext);

  const fetchProduct = async () => {
    try {
      const { data, status } = await axios.get(
        `https://kidsshopapi.electroshop24.ir/api/v1/show-product/${productCode}`,
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 200) throw new Error("server error : " + data?.message);
      setProduct(data?.result);
      setProductLoading(false);
    } catch (error) {
      toast.error(
        " دریافت اطلاعات محصول  " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
      setProductLoading(true);
    }
  };

  const fetchSameProduct = async () => {
    try {
      const { data, status } = await axios.get(
        `https://kidsshopapi.electroshop24.ir/api/v1/same-price/${Math.floor(
          productCode
        )}`,
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 200) throw new Error(data?.message);
      setSameProducts(data?.result?.data?.slice(0, 5));
      setProductLoading(false);
    } catch (error) {
      toast.error(
        "  محصولات هم قیمت  " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
      setProductLoading(true);
    }
  };

  const fetchSubCategoryProducts = async () => {
    try {
      const { data, status } = await axios.get(
        `https://kidsshopapi.electroshop24.ir/api/v1/list-subcategory-products-for-website-with-PCode/${Math.floor(
          productCode
        )}/UCode`,
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 200) throw new Error(data?.message);
      setSubCatgeoires(data?.result?.data?.slice(0, 5));
    } catch (error) {
      toast.error(
        " محصولات هم دسته : " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    }
  };

  const getProductCartQuantity = () => {
    const isProductExists = cart.find(
      (item) => Math.floor(item.Code) == productCode
    );
    if (isProductExists) {
      setPresentUnitQuantity(isProductExists?.unitQuantity || 0);
      setPresentPackQuantity(isProductExists?.packQuantity || 0);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
    fetchSubCategoryProducts();
    fetchSameProduct();
  }, [productCode]);

  useEffect(() => {
    getProductCartQuantity();
  }, [cart]);

  const increment = (type) => {
    if (type === "unit") {
      setUnitQuantity(unitQuantity + 1);
    } else if (type === "pack") {
      setPackQuantity(packQuantity + 1);
    }
  };

  const decrement = (type) => {
    if (type === "unit" && unitQuantity > 0) {
      setUnitQuantity(unitQuantity - 1);
    } else if (type === "pack" && packQuantity > 0) {
      setPackQuantity(packQuantity - 1);
    } else {
      toast.error("تعداد محصول باید بیشتر از صفر باشد");
    }
  };

  const changeQuantity = (type, operation) => {
    if (operation === "increment") {
      increment(type);
    } else if (operation === "decrement") {
      decrement(type);
    }
  };

  const addToCart = () => {
    if (unitQuantity === 0 && packQuantity === 0) {
      return;
    }
    if (cart?.length >= 1) {
      const isProductExists = cart.find((item) => item.Code === product?.Code);
      if (isProductExists) {
        const newCart = cart.map((item) => {
          if (Math.floor(item.Code) === Math.floor(product?.Code)) {
            return {
              ...item,
              unitQuantity: item.unitQuantity + unitQuantity,
              packQuantity: item.packQuantity + packQuantity,
            };
          }
          return item;
        });
        updateCart(newCart);
        setPackQuantity(0);
        setUnitQuantity(0);
        toast.success("سبد خرید بروز رسانی شد");
      } else {
        const newCart = [
          ...cart,
          {
            ...product,
            unitQuantity: unitQuantity,
            packQuantity: packQuantity,
          },
        ];
        updateCart(newCart);
        setPackQuantity(0);
        setUnitQuantity(0);
        toast.success("سبد خرید بروز رسانی شد");
      }
    } else if (cart?.length === 0) {
      const newCart = [
        {
          ...product,
          unitQuantity: unitQuantity,
          packQuantity: packQuantity,
        },
      ];
      updateCart(newCart);
      setPackQuantity(0);
      setUnitQuantity(0);
      toast.success("سبد خرید بروز رسانی شد");
    }
  };

  return (
    <div className="lg:p-4 lg:m-4 ">
      {productLoading ? (
        <div className="text-center min-h-screen flex justify-center items-center  ">
          <FontAwesomeIcon icon={faSpinner} spin className="text-3xl" />
        </div>
      ) : (
        <>
          <nav
            className="flex w-full px-5 py-3 text-gray-700 border border-gray-200 mb-4 mt-14 lg:my-4 rounded-lg bg-gray-50 "
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 lg:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center font-EstedadMedium">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 lg:gap-10 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <div className="flex items-center font-EstedadMedium">
                  <svg
                    className="block w-3 h-3 mx-1 text-gray-400 rtl:rotate-180 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to={`/category/${Math.floor(product.GCode)}`}
                    className="text-sm font-medium text-gray-700 ms-1 hover:text-blue-600 lg:ms-2 dark:text-gray-400 dark:hover:text-gray-800"
                  >
                    {product.GName}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center font-EstedadMedium">
                  <svg
                    className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to={`/sub-category-products/${Math.floor(product.SCode)}`}
                    className="text-sm font-medium text-gray-700 ms-1 hover:text-blue-600 lg:ms-2 dark:text-gray-400 dark:hover:text-gray-800"
                  >
                    {product?.SName}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col justify-around lg:justify-between my-3 w-full mx-auto">
            <div className="grid grid-cols-1 w-full lg:grid-cols-12">
              <div className="col-span-1 lg:col-span-3 w-full  top-0  ">
                <div className="mx-auto p-6">
                  {product?.productImages?.length > 0 &&
                    product?.productImages?.map((image) => (
                      <img
                        key={image}
                        src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                          product?.GCode
                        )}/${Math.floor(product?.SCode)}/${image}.webp`}
                        alt={product?.Name}
                        className="w-full transition-transform duration-300 transform hover:scale-105 ease-in-out object-cover rounded-2xl shadow-lg shadow-gray-300"
                      />
                    ))}
                </div>
              </div>
              <div className="col-span-1 px-6 lg:col-span-6 w-full flex flex-col justify-start gap-4">
                <div className="lg:text-2xl font-EstedadExtraBold text-xl py-5 text-center lg:text-start border-b text-CarbonicBlue-500 drop-shadow-sm my-6 ">
                  {product?.Name}
                </div>
                <div className="flex flex-col text-center lg:text-start lg:flex-row justify-between w-full text-gray-700 px-4 border-b">
                  <div className="flex flex-col gap-3">
                    <div className="font-EstedadMedium px-2 flex flex-row gap-2 items-center justify-start ">
                      <span className="block text-sm font-EstedadMedium text-Purple-500">
                        دسته بندی :
                      </span>
                      <Link
                        className="block text-sm  font-EstedadMedium text-black/80 underline underline-offset-8 hover:text-CarbonicBlue-500 duration-300 ease-in-out"
                        to={`/category/${Math.floor(product?.GCode)}`}
                      >
                        {product?.GName}
                      </Link>
                    </div>
                    {product?.Comment?.length > 0 && (
                      <div className="w-full my-3 ">
                        <div className="font-EstedadExtraBold text-start  text-Purple-500 text-xl py-4">
                          توضیحات :
                        </div>
                        <ul className="list-disc marker:text-CarbonicBlue-500 lg:pr-6 space-y-2 text-start font-EstedadLight">
                          {product?.Comment.split("\r\n").map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <span className="font-EstedadMedium  py-4 ">
                    <p className="font-EstedadExtraBold text-Purple-500 text-xl py-4 border-t lg:border-t-0 text-start">
                      شرایط فروش :{" "}
                    </p>
                    <ul className="list-disc marker:text-CarbonicBlue-500 lg:pr-6 space-y-3 text-start">
                      <li className="">
                        <span className="text-Amber-500">واحد :</span>
                        <span className="mx-2 ">
                          {product?.Megdar} {product.Vahed}
                        </span>
                      </li>
                      <li>
                        <span className="text-Amber-500">
                          تعداد در هر {product?.KVahed} :
                        </span>
                        <span className="mx-2">
                          {Math.floor(product.KMegdar) === 0
                            ? formatCurrencyDisplay(1)
                            : formatCurrencyDisplay(
                                Math.floor(product.KMegdar)
                              )}
                        </span>
                        <span>{product?.Vahed}</span>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
              <div className="m-5 col-span-1 lg:col-span-3 flex flex-col gap-6 justify-around items-center bg-white rounded-2xl shadow-lg shadow-gray-300 p-6 ">
                <p className="text-sm w-full font-EstedadMedium py-6 text-center ">
                  شما از این محصول
                  <span className="text-Amber-500 px-2">
                    {formatCurrencyDisplay(presentPackQuantity)} بسته{" "}
                  </span>{" "}
                  و
                  <span className="text-Amber-500 px-2">
                    {formatCurrencyDisplay(presentUnitQuantity)} عدد
                  </span>{" "}
                  در سبد خود دارید
                </p>

                <div className="space-y-4 flex flex-col justify-evenly items-center gap-8 ">
                  <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2">
                    <div className=" pl-2 grid place-items-center gap-1 font-EstedadExtraBold text-sm text-center">
                      <div>
                        <span className=""> قیمت هر </span>
                        <span className="text-Purple-500">
                          {product?.Vahed}
                        </span>
                      </div>
                      <div>
                        <span className="font-EstedadExtraBold text-CarbonicBlue-500">
                          {formatCurrencyDisplay(
                            userPriceSelect(product, user)
                          )}
                        </span>
                        <span className="text-xs px-2">ریال</span>
                      </div>
                    </div>
                    <div className="flex lg:flex-row items-center justify-center gap-2">
                      <button
                        className="px-4 py-2 m-2 text-CarbonicBlue-500 font-EstedadExtraBold rounded-lg bg-Amber-500 hover:bg-Amber-500/80 shadow duration-300 ease-in-out hover:shadow-md hover:shadow-gray-800/60"
                        onClick={() => changeQuantity("unit", "decrement")}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        onChange={(e) => setUnitQuantity(e.target.value)}
                        maxLength={1}
                        className="w-16 py-2 pl-1 pr-4 m-2 border border-gray-300 rounded-lg "
                        min={1}
                        value={unitQuantity}
                      />
                      <button
                        className="px-4 py-2 m-2 text-CarbonicBlue-500 font-EstedadExtraBold rounded-lg bg-Amber-500 hover:bg-Amber-500/80 shadow duration-300 ease-in-out hover:shadow-md hover:shadow-gray-800/60"
                        onClick={() => changeQuantity("unit", "increment")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-between ">
                    <div className=" pl-2 grid place-items-center gap-1 font-EstedadExtraBold text-sm text-start">
                      <div>
                        <span className=""> قیمت هر </span>
                        <span className="text-Purple-500">
                          {product?.KVahed}
                        </span>
                      </div>
                      <div>
                        <span className="mx-2 font-EstedadExtraBold text-CarbonicBlue-500">
                          {Math.floor(product.KMegdar) === 0
                            ? formatCurrencyDisplay(
                                userPriceSelect(product, user)
                              )
                            : formatCurrencyDisplay(
                                userPriceSelect(product, user) *
                                  Math.floor(product.KMegdar)
                              )}
                        </span>
                        <span> ریال</span>
                      </div>
                    </div>
                    <div className="flex flex-row text-start items-center justify-center gap-2">
                      <button
                        className="px-4 py-2 m-2 text-CarbonicBlue-500 font-EstedadExtraBold rounded-lg bg-Amber-500 hover:bg-Amber-500/80 shadow duration-300 ease-in-out hover:shadow-md hover:shadow-gray-800/60"
                        onClick={() => changeQuantity("pack", "decrement")}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        onChange={(e) => setPackQuantity(e.target.value)}
                        maxLength={1}
                        className="w-16 py-2 pl-1 pr-4 mx-2 mt-2 border border-gray-300 rounded-lg "
                        min={1}
                        value={packQuantity}
                      />
                      <button
                        className="px-4 py-2 m-2 text-CarbonicBlue-500 font-EstedadExtraBold rounded-lg bg-Amber-500 hover:bg-Amber-500/80 shadow duration-300 ease-in-out hover:shadow-md hover:shadow-gray-800/60"
                        onClick={() => changeQuantity("pack", "increment")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center my-8">
                  <button
                    onClick={addToCart}
                    disabled={unitQuantity === 0 && packQuantity === 0}
                    className={`w-full  py-4 my-2 z-50 font-EstedadMedium disabled:opacity-60
                                         text-white rounded-xl shadow-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500 duration-300 shadow-gray-800/60 hover:shadow-md hover:shadow-gray-800/90 ease-in-out
                                         ${
                                           unitQuantity === 0 &&
                                           packQuantity === 0 &&
                                           "opacity-90 cursor-not-allowed "
                                         }`}
                  >
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* same price */}
          <h2 className="lg:text-start my-8 text-center px-10 bg-CarbonicBlue-500 py-8 text-white font-EstedadMedium">
            دیگر محصولات با رنج قیمت یکسان
          </h2>
          <div className="gap-4 grid grid-cols-12 py-6  lg:px-10  px-4  ">
            {sameProducts &&
              sameProducts?.map((item, idx) => (
                <ProductCard item={item} key={idx} />
              ))}
          </div>

          {/* same category */}

          {/* same price */}
          <h2 className="lg:text-start my-8 text-center px-10 bg-CarbonicBlue-500 py-8 text-white font-EstedadMedium">
            محصولات مشابه پیشنهادی
          </h2>
          <div className="gap-4 grid grid-cols-12 py-6 lg:px-10 px-4  ">
            {subCategories &&
              subCategories?.map((item, idx) => (
                <ProductCard item={item} key={idx} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
