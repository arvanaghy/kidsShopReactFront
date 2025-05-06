/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { userPriceSelect } from "@utils/userPriceHelper";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "@context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faSquareCheck,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { confirmToast } from "@utils/confirmToast";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { user, cart, updateCart, updateOrder } = useContext(UserContext);

  console.log("cart", cart);

  const [description, setDescription] = useState("");
  const [transferServices, setTransferServices] = useState([]);
  const [selectedTransferService, setSelectedTransferService] = useState();
  const [isPending, setIsPending] = useState(false);
  const [isDefaultUser, setIsDefaultUser] = useState("کاربران پیش فرض");

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
          "پرداخت نقدی :  " + e?.response?.data?.message ||
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

  const removeProductFromCart = async (item) => {
    const isConfirmed = await confirmToast("آیا از حذف این آیتم مطمئن هستید؟");

    if (!isConfirmed) return;
    const newCart = [...cart];
    newCart.splice(
      newCart.findIndex(
        (cartItem) =>
          Math.floor(cartItem?.item?.Code) == Math.floor(item?.item?.Code)
      ),
      1
    );
    updateCart(newCart);
  };

  return (
    <div className="grid grid-cols-12 w-full  p-3 gap-2 font-EstedadMedium ">
      <div className="lg:col-span-9 border rounded-xl relative w-full bg-white/50">
        <div
          className={`${
            cart?.length === 0 ? "opacity-60 cursor-not-allowed" : ""
          } absolute left-4 top-4 w-14 flex flex-col justify-center items-center text-center space-y-2 text-red-500
          hover:text-red-700 duration-300 cursor-pointer transition-all
          ease-in-out
          `}
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            className={`
              text-2xl ${cart?.length === 0 ? "" : "cursor-pointer"}`}
            onClick={async () => {
              const isConfirmed = await confirmToast(
                "آیا از حذف همه آیتم ها مطمئن هستید؟"
              );
              if (!isConfirmed) return;
              updateCart([]);
            }}
          />
          <p className="text-xs w-full cursor-pointer">حذف همه</p>
        </div>

        <h1 className="w-full font-EstedadExtraBold lg:text-start text-center lg:indent-6 text-lg lg:text-2xl text-CarbonicBlue-500  py-5 ">
          سبد خرید شما
        </h1>
        <hr className=" mx-auto w-full" />
        {cart?.length === 0 ? (
          <p className="text-center">سبد خرید شما خالی است.</p>
        ) : (
          <div className=" flex flex-col gap-2 w-full ">
            {cart?.map((item, idx) => (
              <div key={idx}>
                <div className="relative grid grid-cols-12 w-full p-4   place-items-center border-b gap-2 ">
                  <div className="absolute bottom-3 lg:bottom-14 lg:left-6 text-center space-y-1">
                    <div className="border-b py-1">جمع مبلغ این کالا</div>
                    <div className="text-sm text-CarbonicBlue-500 font-EstedadExtraBold">
                      {item?.basket?.length > 0 &&
                        formatCurrencyDisplay(
                          item?.basket?.reduce(
                            (total, basketItem) =>
                              total +
                              (basketItem?.feature?.Mablag *
                                basketItem?.quantity || 0),
                            0
                          )
                        )}
                      <span className="text-xs px-1">ریال</span>
                    </div>
                  </div>
                  {/* image */}
                  <div className="col-span-3 flex flex-col justify-around gap-2 ">
                    {item?.item?.product_images?.length > 0 ? (
                      item?.item?.product_images
                        ?.filter((img) => img?.Def == 1)
                        .map((img, idx) => (
                          <img
                            key={idx}
                            src={`https://kidsshopapi.electroshop24.ir/products-image/webp/${Math.floor(
                              item?.item?.GCode
                            )}/${Math.floor(item?.item?.SCode)}/${
                              img?.PicName
                            }.webp`}
                            alt={item?.item?.Name}
                            className="w-full object-cover rounded-xl"
                          />
                        ))
                    ) : (
                      <img
                        src="https://kidsshopapi.electroshop24.ir/No_Image_Available.jpg"
                        className="w-full t object-cover rounded-2xl shadow-lg shadow-gray-300"
                      />
                    )}
                  </div>
                  {/* info */}
                  <div className="col-span-9 flex flex-col place-self-start w-full text-black space-y-3 p-3">
                    <Link
                      to={`/product/${item?.item?.Code}`}
                      className="text-base line-clamp-1 font-bold text-CarbonicBlue-500 text-center lg:text-start w-full py-4 lg:py-0"
                    >
                      {item?.item?.Name}
                    </Link>
                    <div className="w-full flex flex-row items-center gap-3 text-sm">
                      <Link
                        className="block text-gray-500
                                hover:text-gray-700
                                duration-300 ease-in-out transition-all
                                "
                        to={`/category/${Math.floor(item?.item?.GCode)}`}
                      >
                        {item?.item?.GName}
                      </Link>
                      <Link
                        className="block text-gray-500
                        hover:text-gray-700
                        duration-300 ease-in-out transition-all
                        "
                        to={`/sub-category-products/${Math.floor(
                          item?.item?.SCode
                        )}`}
                      >
                        {item?.item?.SName}
                      </Link>
                    </div>
                    <div className="flex flex-col text-xs lg:text-sm">
                      {item?.item?.Comment && (
                        <div className="text-justify line-clamp-4 px-4 leading-relaxed">
                          {item?.item?.Comment}
                        </div>
                      )}
                    </div>
                    {/* basket */}
                    {item?.basket?.length > 0 &&
                      item?.basket?.map((basketItem, idx) => (
                        <div
                          key={idx}
                          className="px-1.5 flex flex-row gap-2 text-gray-500 text-sm"
                        >
                          <FontAwesomeIcon
                            icon={faSquareCheck}
                            className="text-green-600"
                          />{" "}
                          {formatCurrencyDisplay(basketItem?.quantity)}{" "}
                          {item?.item?.Vahed} {item?.item?.Name}{" "}
                          {basketItem?.feature?.ColorName} رنگ به سایز{" "}
                          {basketItem?.feature?.SizeNum} و جمع مبلغ{" "}
                          {formatCurrencyDisplay(
                            basketItem?.feature?.Mablag * basketItem?.quantity
                          )}{" "}
                          ریال
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="
      flex flex-col lg:col-span-3  text-center lg:sticky lg:top-[20vh] h-fit
      w-full  space-y-5  border border-CarbonicBlue-500/20 p-4 rounded-xl bg-stone-100 shadow-xl justify-around "
      >
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
                  <div
                    key={idx}
                    className="space-y-1 border-b py-2 flex  flex-row justify-between items-center"
                  >
                    <li className="text-sm font-EstedadMedium">
                      {item?.item?.Name}
                    </li>
                    <button
                      className=""
                      onClick={() => removeProductFromCart(item)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out"
                      />
                    </button>
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
                {service.Name} - {formatCurrencyDisplay(service.Mablag)} ریال
              </option>
            ))}
        </select>
        <p className="text-center text-base lg:text-end">
          <span className="px-2 text-sm">جمع کل فاکتور :</span>
          <span className="text-xs font-bold text-green-800">
            {cart?.length > 0 &&
              formatCurrencyDisplay(
                cart.reduce(
                  (total, item) =>
                    total +
                    item?.basket?.reduce(
                      (subtotal, basketItem) =>
                        subtotal +
                        (basketItem?.feature?.Mablag * basketItem?.quantity ||
                          0),
                      0
                    ),
                  0
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
              <span>درحال پردازش</span>
              <FontAwesomeIcon icon={faSpinner} spin />
            </button>
          </div>
        ) : (
          <button
            className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 hover:text-stone-200 hover:scale-105"
            onClick={submitOrder}
          >
            پرداخت آنلاین
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
                <span>درحال پردازش</span>
                <FontAwesomeIcon icon={faSpinner} spin />
              </button>
            </div>
          ) : (
            <button
              className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 hover:text-stone-200 hover:scale-105"
              onClick={cashPayment}
            >
              پرداخت حین تحویل
            </button>
          ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
