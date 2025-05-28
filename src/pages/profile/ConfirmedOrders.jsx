/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "@context/UserContext";
import { formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import ProfileLayout from "./ProfileLayout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "@components/Loading";

const ConfirmedOrders = () => {
  const { user } = useContext(UserContext);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const navigateTo = useNavigate();

  const [detailsLink, setDetailsLink] = useState([]);


  const fetchOrders = async (
    orderUrl = "https://api.kidsshop110.ir/api/v1/list-past-orders?page=1"
  ) => {
    try {
      const { data, status } = await axios.get(orderUrl, {
        headers: {
          Authorization: `Bearer ${user.UToken}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
      if (status !== 201) throw new Error(data?.message);
      setOrderList(data?.result?.data);
      setTotalOrder(data?.result?.total);
      setLinks(data?.result?.links);
      setLoading(false);
    } catch (error) {
      toast.error(
        "سفارش " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
      setLoading(true);
    }
  };

  const getDetails = async (orderCode) => {
    if (!orderCode) return;
    navigateTo(`/order-details/${Math.floor(orderCode)}`);
    return;
  
  };

  useEffect(() => {
    if (
      !user ||
      !user?.UToken ||
      user?.UToken === null ||
      user?.UToken === ""
    ) {
      toast.error("برای مشاهده این صفحه باید وارد شوید");
      navigateTo("/Login");
    }
  }, [user]);

  useEffect(() => {
    if (user?.UToken !== "") {
      fetchOrders(
        "https://api.kidsshop110.ir/api/v1/list-past-orders?page=1"
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start" >
        <p className="text-lg md:text-xl font-EstedadExtraBold">
          سفارشات تایید شده
        </p>
        <p className="text-lg md:text-xl font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
          {totalOrder && formatCurrencyDisplay(totalOrder)}
        </p>
      </div>

      <div className="w-full overflow-x-auto py-4">
        <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg lg:text-xl text-md">
          <thead>
            <tr className="bg-CarbonicBlue-500 text-white">
              <th className="p-1.5 lg:p-4 text-right text-sm">کد فاکتور</th>
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
                      {formatCurrencyDisplay(orderItem?.SumTedad)}
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {formatCurrencyDisplay(orderItem?.SumKala)}{" "}
                      <span className="text-xs">تومان</span>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex flex-row items-center justify-center mx-auto flex-warp py-5">
        {links?.length > 0 &&
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

export default ConfirmedOrders;
