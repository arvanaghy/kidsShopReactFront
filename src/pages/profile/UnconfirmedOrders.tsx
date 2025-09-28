/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@store/UserStore";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import ProfileLayout from "@layouts/user/ProfileLayout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "@components/Loading";
import Unit from "@components/Unit";

const UnconfirmedOrders = () => {
  const { user } = useUserStore();
  const [orderList, setOrderList] = useState([]);
  const [isOrderloading, setIsOrderloading] = useState(false);
  const [links, setLinks] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const fetchOrders = async (
    orderUrl = `${import.meta.env.VITE_API_URL}/v1/list-unverified-orders?page=1`
  ) => {
    if (isOrderloading) return;

    try {
      setIsOrderloading(true);

      const { data, status } = await axios.get(orderUrl, {
        headers: { Authorization: `Bearer ${user?.UToken}`, cache: "no-cache" },
      });
      if (status !== 201) throw new Error(data?.message);
      setOrderList(data?.result?.data);
      setTotalOrder(data?.result?.total);
      setLinks(data?.result?.links);
    } catch (error) {
      toast.error(
        " دریافت سفارشات : " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
    } finally {
      setIsOrderloading(false);
    }
  };

  const navigateTo = useNavigate();

  const getDetails = async (orderCode) => {
    if (!orderCode) return;
    navigateTo(`/proforma-details/${Math.floor(orderCode)}`);
    return;
  };

  useEffect(() => {
    if (user?.UToken === "") {
      toast.error("برای مشاهده این صفحه باید وارد شوید");
      navigateTo("/Login");
    }
  }, [user]);

  useEffect(() => {
    if (user?.UToken !== "") {
      fetchOrders(
        `${import.meta.env.VITE_API_URL}/v1/list-unverified-orders?page=1`
      );
    }
  }, [user]);

  if (isOrderloading) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start">
        <p className="text-lg md:text-xl font-EstedadExtraBold">
          سفارشات تایید نشده
        </p>
        <p className="text-lg md:text-xl font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
          {totalOrder && formatCurrencyDisplay(totalOrder)}
        </p>
      </div>

      <div className="w-full overflow-x-auto py-4">
        <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg lg:text-xl text-md">
          <thead>
            <tr className="bg-CarbonicBlue-500 text-white">
              <th className="p-1.5 lg:p-4 text-right text-sm">کد پیش فاکتور</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">تاریخ</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">تعداد</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {orderList?.length > 0 &&
              orderList.map((orderItem, idx) => (
                <tr
                  key={idx}
                  onClick={() => getDetails(orderItem?.Code)}
                  className="border-b cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out"
                >
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {formatCurrencyDisplay(Math.floor(orderItem?.CodeFactor))}
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {toPersianDigits(orderItem?.SDate)}
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {formatCurrencyDisplay(orderItem?.Tedad)}
                      <span className="text-xs">{orderItem?.Vahed}</span>
                      {orderItem?.KTedad > 0 && (
                        <span className="flex items-center justify-center gap-2">
                          {formatCurrencyDisplay(orderItem?.KTedad)}
                          <span className="text-xs">{orderItem?.KVahed}</span>
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {formatCurrencyDisplay(orderItem?.JamKol)} <Unit />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex flex-row items-center justify-center mx-auto flex-warp py-5">
        {links?.length > 3 &&
          links.map((link, idx) => (
            <button
              key={idx}
              disabled={link.active}
              onClick={() => {
                link?.url ? fetchOrders(link?.url) : null;
              }}
              className={`
                rounded-md cursor-pointer
                m-1 text-xs p-1.5
                lg:px-4 lg:py-2 md:m-2 ${
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
    </ProfileLayout>
  );
};

export default UnconfirmedOrders;
