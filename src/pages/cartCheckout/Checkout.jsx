/* eslint-disable no-dupe-else-if */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "@store/useMainStore";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Checkout = () => {
  const { user, order, updateOrder, updateCart } = useMainStore();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const onlinePayment = async () => {
    setIsPending(true);
    try {
      const { data, status } = await axios.get(
        `https://api.kidsshop110.ir/api/v1/check-online-payment-available`,
        {
          headers: {
            cache: "no-cache",
          },
        }
      );
      if (status !== 201) throw new Error(data?.message);
      setIsPending(false);
      updateCart([]);
      updateOrder([]);
      window.location.href = `https://api.kidsshop110.ir/api/v1/checkout-with-order?BearerToken=${user.UToken}&orderCode=${order.Code}`;
      toast.success("پیش فاکتور شما در سیستم ثبت شد. ");
    } catch (error) {
      setIsPending(false);
      toast.error(
        " چرداخت آنلاین: " + error?.message ||
          error?.response?.data?.message ||
          "خطا در اتصال"
      );
    } finally {
      setIsPending(false);
    }
  };

  const cashPayment = () => {
    setIsPending(true);
    try {
      updateCart([]);
      updateOrder([]);
      toast.success("پیش فاکتور شما در سیستم ثبت شد. ");
      navigate("/unconfirmed-orders");
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      toast.error(" ]vnhoj krnd : " + error?.message || "خطا در اتصال");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!order || !user) {
      toast.error("شما اجازه دسترسی به این صفحه را ندارید.");
      navigate("/");
    }
  });

  return (
    <div className="flex flex-col w-full items-center justify-center inset-0 h-[60vh]">
      <div className="flex justify-center w-full mx-auto my-5">
        {isPending ? (
          <div className="flex items-center justify-center font-EstedadMedium">
            <button
              type="button"
              className="inline-flex items-center text-white bg-CarbonicBlue-500  rounded-lg active:bg-darkgold text-zarblack px-20 py-10  disabled:bg-darkgold/30  transition ease-in-out duration-150 cursor-not-allowed"
              disabled={true}
            >
              درحال پردازش
              <FontAwesomeIcon icon={faSpinner} spin />
            </button>
          </div>
        ) : (
          <button
            onClick={cashPayment}
            className="px-20 py-10 rounded-lg shadow-md text-white font-EstedadExtraBold bg-CarbonicBlue-500 hover:scale-105 hover:duration-300"
          >
            پرداخت درب فروشگاه
          </button>
        )}
      </div>
      <div className="flex justify-center w-full mx-auto my-5">
        {isPending ? (
          <div className="flex items-center justify-center font-EstedadMedium">
            <button
              type="button"
              className="inline-flex items-center text-white bg-CarbonicBlue-500  rounded-lg active:bg-darkgold text-zarblack px-12 py-10   disabled:bg-darkgold/30  transition ease-in-out duration-150 cursor-not-allowed"
              disabled={true}
            >
              درحال پردازش
              <FontAwesomeIcon icon={faSpinner} spin />
            </button>
          </div>
        ) : (
          <button
            onClick={onlinePayment}
            className="px-20 py-10 rounded-lg shadow-md text-white font-EstedadExtraBold bg-CarbonicBlue-500 hover:scale-105 hover:duration-300"
          >
            پرداخت آنلاین
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
