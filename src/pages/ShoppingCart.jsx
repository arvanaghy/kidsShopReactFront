/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect, useReducer } from "react";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { userPriceSelect } from "@utils/userPriceHelper";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "@context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user, cart, updateCart, updateOrder } = useContext(UserContext);

  const cartReducer = (state, action) => {
    switch (action.type) {
      case "INCREMENT_UNIT": {
        const updatedCart = state.map((item) => {
          if (item.Code === action.payload.Code) {
            return {
              ...item,
              unitQuantity: item.unitQuantity + 1,
            };
          }
          return item;
        });
        return updatedCart;
      }

      case "INCREMENT_PACK": {
        const updatedCart = state.map((item) => {
          if (item.Code === action.payload.Code) {
            return {
              ...item,
              packQuantity: item.packQuantity + 1,
            };
          }
          return item;
        });
        return updatedCart;
      }

      case "DECREMENT_UNIT": {
        const updatedCart = state
          .map((item) => {
            if (item.Code === action.payload.Code && item.unitQuantity > 0) {
              return {
                ...item,
                unitQuantity: item.unitQuantity - 1,
              };
            }
            return item;
          })
          .filter(
            (item) => !(item.unitQuantity === 0 && item.packQuantity === 0)
          );
        return updatedCart;
      }

      case "DECREMENT_PACK": {
        const updatedCart = state
          .map((item) => {
            if (item.Code === action.payload.Code && item.packQuantity > 0) {
              return {
                ...item,
                packQuantity: item.packQuantity - 1,
              };
            }
            return item;
          })
          .filter(
            (item) => !(item.unitQuantity === 0 && item.packQuantity === 0)
          );
        return updatedCart;
      }

      case "CLEAR_CART": {
        if (state?.length === 0) {
          toast.error("سبد خرید شما خالی است.");
          return [];
        } else {
          toast.success("سبد خرید شما با موفقیت پاک شد.");
          updateCart([]);
          return [];
        }
      }
      default:
        return state;
    }
  };

  const [description, setDescription] = useState("");
  const [transferServices, setTransferServices] = useState([]);
  const [selectedTransferService, setSelectedTransferService] = useState();
  const [isPending, setIsPending] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, cart);
  const [isDefaultUser, setIsDefaultUser] = useState("کاربران پیش فرض");

  const incrementUnit = (product) => {
    dispatch({ type: "INCREMENT_UNIT", payload: product });
  };

  const incrementPack = (product) => {
    dispatch({ type: "INCREMENT_PACK", payload: product });
  };

  const decrementUnit = (product) => {
    dispatch({ type: "DECREMENT_UNIT", payload: product });
  };

  const decrementPack = (product) => {
    dispatch({ type: "DECREMENT_PACK", payload: product });
  };

  const getCustomerGroup = async () => {
    if (user == true) {
      try {
        const { data, status } = await axios.get(
          `https://kidsshopapi.electroshop24.ir/api/v1/customer-category/${Math.floor(
            user?.CodeGroup
          )}`,
          {
            headers: {
              cache: "no-cache",
            },
          }
        );
        if (status !== 200) throw new Error(data?.message);
        setIsDefaultUser(data?.result?.Name);
      } catch (error) {
        toast.error(
          " گروه کاربری: " + error?.response?.data?.message ||
            error?.message ||
            "خطا در اتصال"
        );
      }
    }
  };

  const fetchTransferServices = async () => {
    try {
      const { data, status } = await axios.get(
        "https://kidsshopapi.electroshop24.ir/api/v1/list-transfer-services",
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 200) throw new Error(data?.message);
      setTransferServices(data?.result);
    } catch (error) {
      toast.error(
        " خدمات  حمل و نقل:" + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    updateCart(state);
  }, [state, updateCart]);

  useEffect(() => {
    fetchTransferServices();
  }, []);

  useEffect(() => {
    getCustomerGroup();
  }, [user]);

  const submitOrder = async () => {
    const validation = [
      "",
      null,
      undefined,
      0,
      "0",
      "کاربران پیش فرض اپلیکیشن",
    ];
    if (
      !user ||
      !user?.UToken ||
      user?.UToken === null ||
      user?.UToken === ""
    ) {
      setIsPending(false);
      toast.error("برای ثبت سفارش حتما باید عضو شوید یا ورود کنید.");
      navigate("/login");
    } else if (cart.length === 0) {
      setIsPending(false);
      toast.error("سبد خرید خالی است.");
      return;
    } else if (
      validation.includes(String(user.Name)) ||
      validation.includes(String(user.Address)) ||
      validation.includes(String(user.Mobile))
    ) {
      setIsPending(false);
      toast.error(
        "اطلاعات تماس شما ناقص است لطفا فرم اطلاعات حساب کاربری را  تکمیل نمایید"
      );
      navigate("/edit-info");
    } else {
      setIsPending(false);
      const orderData = [];
      cart.map((item) =>
        orderData.push({
          KCode: item?.Code,
          KTedad: item?.packQuantity || 0,
          Tedad: item?.unitQuantity || 0,
        })
      );
      if (!selectedTransferService) {
        setIsPending(false);
        toast.error("لطفا یک حامل برای تحویل انتخاب کنید");
        return;
      }
      setIsPending(true);
      try {
        const { data, status } = await axios.post(
          "https://kidsshopapi.electroshop24.ir/api/v1/submit-order",
          {
            products: orderData,
            signature: null,
            description: description,
            CodeKhadamat: selectedTransferService?.CodeKhadamat || 0,
            MKhadamat: selectedTransferService?.Mablag || 0,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.UToken}`,
            },
          }
        );

        if (status !== 201) throw new Error(data?.message);
        setIsPending(false);
        toast.success(data?.message);
        setDescription("");
        onlinePayment(data?.result);
      } catch (error) {
        toast.error(
          "ثبت سفارش : " + (error?.response?.data?.message || error?.message) ||
            "خطا در اتصال"
        );
      } finally {
        setIsPending(false);
      }
    }
  };

  const cashPayment = async () => {
    setIsPending(true);
    const validation = [
      "",
      null,
      undefined,
      0,
      "0",
      "کاربران پیش فرض اپلیکیشن",
    ];
    if (!user) {
      setIsPending(false);
      toast.error("برای ثبت سفارش حتما باید عضو شوید یا ورود کنید.");
      navigate("/login");
    } else if (cart.length === 0) {
      setIsPending(false);
      toast.error("سبد خرید خالی است.");
      return;
    } else if (
      validation.includes(String(user?.Name)) ||
      validation.includes(String(user?.Address)) ||
      validation.includes(String(user?.Mobile))
    ) {
      setIsPending(false);
      toast.error(
        "اطلاعات تماس شما ناقص است لطفا فرم اطلاعات حساب کاربری را  تکمیل نمایید"
      );
      navigate("/edit-info");
    } else {
      setIsPending(false);

      const orderData = [];
      cart.map((item) =>
        orderData.push({
          KCode: item?.Code,
          KTedad: item?.packQuantity || 0,
          Tedad: item?.unitQuantity || 0,
        })
      );

      if (!selectedTransferService) {
        setIsPending(false);
        toast.error("لطفا یک حامل برای تحویل انتخاب کنید");
        return;
      }

      setIsPending(true);
      try {
        const { data, status } = await axios.post(
          "https://kidsshopapi.electroshop24.ir/api/v1/submit-order",
          {
            products: orderData,
            description: description,
            CodeKhadamat: selectedTransferService?.CodeKhadamat || 0,
            MKhadamat: selectedTransferService?.Mablag || 0,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.UToken}`,
            },
          }
        );
        if (status !== 201) throw new Error(data?.message);
        updateCart([]);
        updateOrder([]);
        toast.success("پیش فاکتور شما در سیستم ثبت شد. ");
        navigate("/unconfirmed-orders");
        setIsPending(false);
      } catch (e) {
        setIsPending(false);
        toast.error(
          "پرداخت نقدی :  " +  e?.response?.data?.message ||
            e?.message ||
            "خطا در اتصال"
        );
      }
    }
  };

  const onlinePayment = async (_order) => {
    setIsPending(false);
    try {
      const { data, status } = await axios.get(
        `https://kidsshopapi.electroshop24.ir/api/v1/check-online-payment-available`
      );
      if (status !== 201) throw new Error(data?.message);
      setIsPending(false);
      updateCart([]);
      updateOrder([]);
      dispatch({ type: "CLEAR_CART" });
      window.location.href = `https://kidsshopapi.electroshop24.ir/api/v1/checkout-with-order?BearerToken=${user?.UToken}&orderCode=${_order?.Code}`;
      toast.success("پیش فاکتور شما در سیستم ثبت شد. ");
    } catch (error) {
      setIsPending(false);
      toast.error(
        "  پرداخت آنلاین : " +
          (error?.response?.data?.message || error?.message) || "خطا در اتصال"
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center  lg:flex-row font-EstedadMedium">
      <div className="grid lg:grid-cols-12 w-full m-10 min-h-[50rem]">
        <div className="lg:col-span-8 border rounded-xl relative w-full bg-white/50">
          <div
            className={`${
              cart?.length === 0 ? "opacity-60 cursor-not-allowed" : ""
            } absolute left-4 top-4 w-14 flex flex-col justify-center items-center text-center space-y-2 text-rose-600`}
          >
            <IoTrashOutline
              className={`text-3xl ${
                cart?.length === 0 ? "" : "cursor-pointer"
              }`}
              onClick={() => {
                if (cart?.length > 0) {
                  dispatch({ type: "CLEAR_CART" });
                }
              }}
            />
            <p className="text-xs w-full cursor-pointer">حذف همه</p>
          </div>

          <h1 className="w-full font-EstedadExtraBold lg:text-start text-center lg:indent-6 text-lg lg:text-2xl text-CarbonicBlue-500  py-5 ">
            سبد خرید شما
          </h1>
          <hr className="w-1/3 mx-auto mt-2" />
          {cart?.length === 0 ? (
            <p className="text-center">سبد خرید شما خالی است.</p>
          ) : (
            <div className=" flex flex-col  lg:gap-24 my-2 w-full px-5">
              {state?.map((item, idx) => (
                <div key={idx}>
                  <div className="relative grid grid-cols-1 lg:grid-cols-12 w-full pb-14 px-4 place-items-center   border-b ">
                    <div className="absolute bottom-3 lg:bottom-14 lg:left-6 text-center space-y-1">
                      <div className="border-b pb-1">جمع مبلغ این کالا</div>
                      <div className="text-sm">
                        <span className="text-Amber-500 px-1">
                          {formatCurrencyDisplay(
                            item?.KMegdar *
                              item?.packQuantity *
                              item?.KhordePrice +
                              item?.unitQuantity * item?.KhordePrice
                          )}
                        </span>
                        ریال
                      </div>
                    </div>
                    {/* image */}
                    <div className="col-span-3 flex flex-col justify-around gap-4 px-4  h-full">
                      <img
                        src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                          item.GCode
                        )}/${Math.floor(item.SCode)}/${item.PicName}.webp`}
                        alt={item.Name}
                        className="w-full h-full rounded-lg shadow-xl mt-4"
                      />

                      <div className="flex flex-row w-full justify-between px-4 items-center  ">
                        <div>عدد</div>
                        <button
                          className="w-8 h-8 font-bold text-white rounded-lg bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/40 hover:scale-105"
                          onClick={() => decrementUnit(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-16 px-2 border rounded-lg text-center text-CarbonicBlue-500 mx-1"
                          onChange={(e) => handleInputChange(e, item)}
                          min={0}
                          value={
                            (cart &&
                              cart[
                                cart?.findIndex((p) => p.Code === item?.Code)
                              ]?.unitQuantity) ||
                            0
                          }
                        />
                        <button
                          className="w-8 h-8 font-bold text-white rounded-lg bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/40 hover:scale-105"
                          onClick={() => incrementUnit(item)}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-row w-full justify-between px-4 items-center  ">
                        <div>بسته</div>
                        <button
                          className="w-8 h-8 font-bold text-white rounded-lg bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/40 hover:scale-105"
                          onClick={() => decrementPack(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-16 px-2 border rounded-lg text-center text-CarbonicBlue-500 mx-1"
                          onChange={(e) => handleInputChange(e, item)}
                          min={0}
                          value={
                            (cart &&
                              cart[
                                cart?.findIndex((p) => p.Code === item?.Code)
                              ]?.packQuantity) ||
                            0
                          }
                        />
                        <button
                          className="w-8 h-8 font-bold text-white rounded-lg bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/40 hover:scale-105"
                          onClick={() => incrementPack(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* info */}
                    <div className="col-span-9  min-h-[20vh] place-self-start w-full text-black">
                      <div className="flex flex-col justify-around items-start px-4 py-2 ">
                        <p className="text-base line-clamp-1 font-bold text-CarbonicBlue-500 text-center lg:text-start w-full py-4 lg:py-0">
                          {item.Name}
                        </p>
                        <ul className="list-disc list-inside pr-2 py-4 marker:text-Amber-500 space-y-2 text-xs lg:text-base">
                          <li className="space-x-2">
                            دسته بندی :{" "}
                            <Link
                              className="text-Amber-500"
                              to={`/category/${Math.floor(item?.GCode)}`}
                            >
                              {item?.GName}
                            </Link>
                          </li>
                          <li className="space-x-4">
                            قیمت{" "}
                            <span className="px-1 text-CarbonicBlue-500 underline">
                              1
                            </span>{" "}
                            عدد :{" "}
                            <span className=" pr-2 text-CarbonicBlue-500 font-EstedadExtraBold">
                              {formatCurrencyDisplay(item?.KhordePrice)}
                            </span>
                            ریال
                          </li>
                          <li className="space-x-4">
                            قیمت{" "}
                            <span className="px-1 text-CarbonicBlue-500 underline">
                              1
                            </span>{" "}
                            بسته{" "}
                            <span className="pr-2 text-CarbonicBlue-500 font-EstedadExtraBold">
                              {formatCurrencyDisplay(item?.KMegdar)}
                            </span>
                            عددی :{" "}
                            <span className=" pr-2 text-CarbonicBlue-500 font-EstedadExtraBold">
                              {formatCurrencyDisplay(
                                item?.KMegdar * item?.KhordePrice
                              )}
                            </span>
                            ریال
                          </li>
                          {item?.Comment && (
                            <li className="text-justify lg:w-80 line-clamp-4 px-4 leading-relaxed">
                              {item?.Comment}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    {/* lg shown button */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center  lg:col-span-4 w-full text-center lg:sticky lg:top-20 h-fit ">
          <div className=" mt-10 w-full  lg:flex justify-center">
            <div className="flex flex-col space-y-5 h-fit border border-CarbonicBlue-500/20 p-4 rounded-xl bg-stone-100 shadow-xl  justify-around mx-4 lg:mx-0 lg:w-2/4">
              <div className="text-start  ">
                <div className="flex flex-row justify-between px-1 items-center border-b">
                  <p className="text-sm text-start text-CarbonicBlue-500 pb-2">
                    مشخصات پرداخت
                  </p>
                  <p className=" text-sm ">{cart?.length} کالا</p>
                </div>
                <ul className="list-disc list-inside text-xs py-2">
                  {cart?.length === 0 ? (
                    <p className="text-center">سبد خرید شما خالی است.</p>
                  ) : (
                    <div className=" text-gray-600 indent-2 py-2 marker:text-Amber-500 max-h-52 overflow-y-auto">
                      {cart?.map((item, idx) => (
                        <div key={idx} className="space-y-1 border-b py-2">
                          <li className="text-sm font-EstedadMedium">
                            {item?.Name}
                          </li>
                          {item?.unitQuantity > 0 && (
                            <li>
                              {" "}
                              <span className="text-CarbonicBlue-500 underline text-sm px-1">
                                {formatCurrencyDisplay(item?.unitQuantity)}
                              </span>
                              عدد :{" "}
                              <span className="px-1 text-CarbonicBlue-500 underline text-sm">
                                {formatCurrencyDisplay(
                                  item?.unitQuantity * item?.KhordePrice
                                )}
                              </span>
                              ریال
                            </li>
                          )}
                          {item?.packQuantity > 0 && (
                            <li>
                              {" "}
                              <span className="text-CarbonicBlue-500 underline text-sm px-1">
                                {formatCurrencyDisplay(item?.packQuantity)}
                              </span>
                              عدد :{" "}
                              <span className="px-1 text-CarbonicBlue-500 underline text-sm">
                                {formatCurrencyDisplay(
                                  item?.packQuantity *
                                    item?.KMegdar *
                                    item?.KhordePrice
                                )}
                              </span>
                              ریال
                            </li>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ul>
              </div>
              <div className="space-y-2">
                <p>توضیحات پیش فاکتور</p>
                <textarea
                  className="w-full p-2 border-2 rounded-lg border-CarbonicBlue-500 "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <select
                className="ring-CarbonicBlue-500"
                onChange={(e) =>
                  setSelectedTransferService(
                    transferServices.find((s) => s.Code === e.target.value)
                  )
                }
              >
                <option value="">انتخاب نحوه ارسال</option>
                {transferServices &&
                  transferServices.map((service, idx) => (
                    <option key={idx} value={service.Code}>
                      {service.Name} - {formatCurrencyDisplay(service.Mablag)}{" "}
                      ریال
                    </option>
                  ))}
              </select>
              <p className=" text-center text-base lg:text-end">
                <span className="mx-2 text-sm">جمع کل فاکتور :</span>
                <span className="text-xs font-bold text-green-800">
                  {formatCurrencyDisplay(
                    Math.floor(
                      cart?.reduce((acc, item) => {
                        const unitPrice =
                          userPriceSelect(item, user) * item?.unitQuantity || 0;
                        const packPrice =
                          userPriceSelect(item, user) *
                          (item?.packQuantity || 0) *
                          (item.KMegdar || 1);
                        return acc + unitPrice + packPrice;
                      }, 0) +
                        (selectedTransferService
                          ? parseInt(selectedTransferService?.Mablag)
                          : "")
                    )
                  )}
                </span>
                <span className="mx-1 text-sm">ریال</span>
              </p>
              {isPending ? (
                <div className="flex items-center justify-center font-EstedadMedium">
                  <button
                    type="button"
                    className="inline-flex items-center text-white bg-CarbonicBlue-500/80 rounded-lg active:bg-darkgold text-zarblack py-4 px-6 w-full text-center justify-center  disabled:bg-darkgold/30  transition ease-in-out duration-150 cursor-not-allowed"
                    disabled={true}
                  >
                    درحال پردازش
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 hover:text-stone-200 hover:scale-105"
                  onClick={submitOrder}
                >
                  پرداخت آنلاین{" "}
                </button>
              )}
              {isDefaultUser !== "کاربران پیش فرض" &&
                (isPending ? (
                  <div className="flex items-center justify-center font-EstedadMedium">
                    <button
                      type="button"
                      className="inline-flex items-center text-white bg-CarbonicBlue-500/80 rounded-lg active:bg-darkgold text-zarblack py-4 px-6 w-full text-center justify-center disabled:bg-darkgold/30 transition ease-in-out duration-150 cursor-not-allowed"
                      disabled={true}
                    >
                      درحال پردازش
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 hover:text-stone-200 hover:scale-105"
                    onClick={cashPayment}
                  >
                    پرداخت حین تحویل{" "}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
