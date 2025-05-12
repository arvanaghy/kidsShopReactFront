/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileLayout from "./ProfileLayout";
import UserContext from "@context/UserContext";
import axios from "axios";
import Loading from "@components/Loading";
import toast from "react-hot-toast";
import {
  formatCurrencyDisplay,
} from "@utils/numeralHelpers";

const OrderDetails = () => {
  const { orderCode } = useParams();
  const { user } = useContext(UserContext);
  const [isloading, setIsloading] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [detailsLink, setDetailsLink] = useState([]);

  const getOrderDetails = async (url) => {
    if (!user?.UToken) return;
    if (isloading) return;
    try {
      setIsloading(true);
      const { data, status } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.UToken}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      });
      if (status !== 201) throw new Error(data?.message);
      setOrderDetail(data?.result?.data);
      setDetailsLink(data?.result?.links);
    } catch (error) {
      toast.error(
        "جزییات سفارش " + (error?.response?.data?.message || error?.message) ||
          "خطا در اتصال"
      );
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (!orderCode) return;
    if (!user?.UToken) return;
    getOrderDetails(
      `https://api.kidsshop110.ir/api/v1/list-past-orders-products/${Math.floor(
        orderCode
      )}?page=1`
    );
  }, [orderCode]);

  if (isloading) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start" >
        <p className="text-lg md:text-xl font-EstedadExtraBold">
         جزییات فاکتور 
        </p>
        <p className="text-lg md:text-xl font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
          {orderCode && formatCurrencyDisplay(orderCode)}
        </p>
      </div>

      <div className="w-full overflow-x-auto py-4">
        <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-CarbonicBlue-500 text-white">
              <th className="p-1.5 lg:p-4 text-right text-sm">گروه</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">زیرگروه</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">نام</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">تعداد</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">فی</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">جمع</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail &&
              orderDetail?.length > 0 &&
              orderDetail.map((orderDetail, idx) => (
                <tr
                  key={idx}
                  className="border-b cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out"
                >
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {orderDetail.GroupName}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {orderDetail.SubGroupName}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {orderDetail.Name}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {Math.floor(orderDetail.Tedad)} {orderDetail.Vahed},{" "}
                    {Math.floor(orderDetail.KTedad)} {orderDetail.KVahed}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {formatCurrencyDisplay(orderDetail.Fee)}{" "}
                    <span className="text-xs">ریال</span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {formatCurrencyDisplay(orderDetail.AllSum)}{" "}
                    <span className="text-xs">ریال</span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {orderDetail.Comment ? orderDetail.Comment : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex flex-row items-center justify-center mx-auto flex-warp py-5">
        {detailsLink?.length > 0 &&
          detailsLink.map((link, idx) => (
            <button
              key={idx}
              disabled={link.active}
              onClick={() => {
                link?.url ? getOrderDetails(link?.url) : null;
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

export default OrderDetails;
