/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../../UserContext";
import { formatCurrencyDisplay } from "../../../utils/numeralHelpers";
import ProfileLayout from "./ProfileLayout";
import toast from "react-hot-toast";
import { CiBarcode } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ConfirmedOrders = () => {
  const { user } = useContext(UserContext);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const navigateTo = useNavigate();

  const [modal, setModal] = useState(false);
  const [detailsLink, setDetailsLink] = useState([]);

  const fetchOrders = async (
    orderUrl = "https://api.electroshop24.ir/api/v1/list-past-orders?page=1"
  ) => {
    try {
      const { data, status } = await axios.get(orderUrl, {
        headers: { Authorization: `Bearer ${user.UToken}`, cache: "no-cache" },
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

  const handleDetailPagination = async (url) => {
    try {
      setModal(true);
      const { data, status } = await axios.get(
        `https://api.electroshop24.ir/api/v1/list-past-orders-products/${Math.floor(
          _order.Code
        )}?page=${parseInt(url.split("=")[1])}`,
        {
          headers: { Authorization: `Bearer ${user.UToken}` },
          cache: "no-cache",
        }
      );

      if (status !== 201) throw new Error(data?.message);
      setOrderDetail(data?.result?.data);
      setDetailsLink(data?.result?.links);
    } catch (error) {
      setModal(false);
      toast.error(
        "صفحه بندی سفارش " +
          (error?.response?.data?.message || error?.message) || "خطا در اتصال"
      );
    } finally {
      setModal(false);
    }
  };

  const getDetails = async (orderCode) => {
    try {
      const { data, status } = await axios.get(
        `https://api.electroshop24.ir/api/v1/list-past-orders-products/${Math.floor(
          orderCode
        )}?page=1`,
        {
          headers: {
            Authorization: `Bearer ${user.UToken}`,
            cache: "no-cache",
          },
        }
      );
      if (status !== 201) throw new Error(data?.message);
      setOrderDetail(data?.result?.data);
      setModal(true);
      setDetailsLink(data?.result?.links);
    } catch (error) {
      setModal(false);
      toast.error(
        "جزییات سفارش " + (error?.response?.data?.message || error?.message) ||
          "خطا در اتصال"
      );
    }
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
    if (user && user?.UToken && user?.UToken !== null && user?.UToken !== "") {
      fetchOrders(
        "https://api.electroshop24.ir/api/v1/list-past-orders?page=1"
      );
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full font-EstedadLight  ">
      <div className="flex flex-col lg:flex-row min-h-[90vh] overflow-hidden">
      <div className="flex lg:w-2/6 xl:w-1/6 bg-CarbonicBlue-500 ">

          <ProfileLayout />
        </div>
        <div className="lg:w-5/6  overflow-auto overflow-x-hidden h-[100vh] ">
          <div className="lg:w-[95%] mx-4 lg:mx-auto px-10 lg:px-5 mt-14 mb-8 bg-CarbonicBlue-500 p-4 rounded-xl text-white flex flex-col lg:flex-row items-center justify-between">
            <p className=" my-3 text-xl lg:text-3xl font-EstedadExtraBold">
              سفارشات تایید شده
            </p>
            <p className="text-lg  font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
              {totalOrder && formatCurrencyDisplay(totalOrder)}
            </p>
          </div>

          <div className="lg:text-xl text-md w-full">
            <ul className="grid lg:grid-cols-4 gap-4 px-10 py-8 place-items-stretch">
              {loading ? (
                <li className="inset-0 flex items-center justify-center my-6 text-center duration-200 font-EstedadExtraBold text-CarbonicBlue-500 animate-pulse ">
                  در حال بارگذاری ...
                </li>
              ) : (
                orderList &&
                orderList.map((orderItem, idx) => (
                  <li
                    className="cursor-pointer h-64 border rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl duration-300 ease-in-out"
                    key={idx}
                    onClick={() => {
                      getDetails(orderItem?.Code);
                    }}
                  >
                    <div className="w-full flex flex-row  items-center h-2/6 justify-between p-3 bg-CarbonicBlue-500 text-white">
                      <span className="flex flex-row items-center gap-2">
                        <CiBarcode className="text-xl " />
                        <span className="text-xl">
                          {formatCurrencyDisplay(
                            Math.floor(orderItem?.CodeFactor)
                          )}
                        </span>
                      </span>
                      <span className="flex flex-row items-center gap-2">
                        <IoCalendarOutline className="text-xl" />
                        <span className="text-xl">{orderItem?.SDate}</span>
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 justify-evenly items-start h-4/6 bg-stone-100 p-6 ">
                      <div className="w-full flex flex-row items-center justify-around gap-2 text-xl ">
                        <p className="flex flex-row gap-4 items-center jusstify-center">
                          <FaBoxOpen />
                          {formatCurrencyDisplay(orderItem?.SumTedad)}
                        </p>
                      </div>
                      <span className="flex flex-row items-center gap-2 text-xl">
                        <BsCashCoin />
                        <span className="font-EstedadMedium">مبلغ :</span>
                        {formatCurrencyDisplay(orderItem.SumKala)} ریال
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* pagination */}
          {links && links?.length > 3 && (
            <div className="flex justify-center w-full mt-5 ">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => (link?.url ? fetchOrders(link?.url) : null)}
                  className={`lg:px-4 lg:py-2 p-1 rounded-md cursor-pointer m-2 ${
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
          )}
        </div>
      </div>

      {/* modal */}
      {modal && (
        <div
          className="fixed top-0 w-full h-full bg-white bg-opacity-80"
          style={{ zIndex: 999999 }}
        >
          <div className="absolute lg:w-[50%] lg:h-[88vh] w-full top-[11vh] bg-gray-100 py-10 shadow-lg rounded-xl lg:right-[25%] overflow-y-scroll flex flex-col justify-center items-center ">
            <div className="flex flex-col items-center justify-center w-full ">
              <div>
                <button onClick={() => setModal(false)}>
                  <svg
                    className="absolute w-8 h-8 top-5 right-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                        fill="#001F3F"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
              <div className="lg:text-xl text-md w-full text-center px-8 ">
                <ul className="flex flex-col justify-center">
                  {orderDetail &&
                    orderDetail?.length > 0 &&
                    orderDetail.map((orderDetail, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col p-3 text-sm font-EstedadExtraBold border-b"
                      >
                        <div className="flex flex-row flex-wrap w-full text-center">
                          <span>{orderDetail.GroupName}</span>
                          <span className="mx-1 text-Amber-500">/</span>
                          <span>{orderDetail.SubGroupName}</span>
                          <span className="mx-1 text-Amber-500">/</span>
                          <span>{orderDetail.Name}</span>
                        </div>

                        <div className="flex flex-row flex-wrap items-center justify-between w-full py-2 text-center">
                          <div className="">
                            تعداد : {Math.floor(orderDetail.Tedad)}{" "}
                            {orderDetail.Vahed} {","}{" "}
                            {Math.floor(orderDetail.KTedad)}{" "}
                            {orderDetail.KVahed}
                          </div>
                          <div className="">
                            فی : {formatCurrencyDisplay(orderDetail.Fee)}{" "}
                            {"ريال"}
                          </div>
                          <div className="">
                            جمع :{formatCurrencyDisplay(orderDetail.AllSum)}{" "}
                            {"ريال"}
                          </div>
                        </div>
                        {orderDetail.Comment && (
                          <div className="w-full">
                            <p>{orderDetail.Comment}</p>
                          </div>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            {detailsLink && detailsLink.length > 3 && (
              <div className="flex flex-wrap justify-center mt-6 ">
                {detailsLink.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDetailPagination(link.url)}
                    className={`lg:px-4 lg:py-2 p-1 rounded-md cursor-pointer m-2 ${
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmedOrders;
