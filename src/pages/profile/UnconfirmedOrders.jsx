/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "@context/UserContext";
import { formatCurrencyDisplay } from "@/utils/numeralHelpers";
import ProfileLayout from "./ProfileLayout";
import toast from "react-hot-toast";
import { CiBarcode } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UnconfirmedOrders = () => {
  const { user } = useContext(UserContext);
  const [orderList, setOrderList] = useState([]);
  const [isOrderloading, setIsOrderloading] = useState(false);
  const [links, setLinks] = useState([]);
  const [totalOrder, setTotalOrder] = useState(0);

  const [orderDetail, setOrderDetail] = useState([]);
  const [detailsLink, setDetailsLink] = useState([]);
  const [isOrderDetailLoading, setIsOrderDetailLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const fetchOrders = async (
    orderUrl = "https://kidsshopapi.electroshop24.ir/api/v1/list-unverified-orders?page=1"
  ) => {
    if (isOrderloading) return;

    try {
      setIsOrderloading(true);
      window.scrollTo(0, 0);

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

  const handleDetailPagination = async (url) => {
    if (!url) return;
    try {
      const { data, status } = await axios.get(url, {
        headers: { Authorization: `Bearer ${user?.UToken}`, cache: "no-cache" },
      });
      if (status !== 201) throw new Error(data?.message);
      setOrderDetail(data?.result?.data);
      setDetailsLink(data?.result?.links);
      setModal(true);
    } catch (error) {
      toast.error(
        " صفحه بندی سفارش " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
      setModal(false);
    }
  };

  const getDetails = async (orderCode = "") => {
    if (isOrderDetailLoading) return;
    setIsOrderDetailLoading(true);
    try {
      const { data, status } = await axios.get(
        `https://kidsshopapi.electroshop24.ir/api/v1/list-unverified-orders-products/${Math.floor(
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
      setIsOrderDetailLoading(false);
      setOrderDetail(data?.result?.data);
      setDetailsLink(data?.result?.links);
      setModal(true);
    } catch (error) {
      toast.error(
        " دریافت ریز سفارش " + error?.response?.data?.message ||
          error?.message ||
          "خطا در اتصال"
      );
      setModal(false);
    }
  };

  const navigateTo = useNavigate();


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
        "https://kidsshopapi.electroshop24.ir/api/v1/list-unverified-orders?page=1"
      );
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full font-EstedadLight   ">
      <div className="flex flex-col h-full lg:flex-row min-h-[90vh]">
        <div className="flex lg:w-1/6  bg-CarbonicBlue-500 lg:py-10  lg:sticky">
          <ProfileLayout />
        </div>
        <div className="lg:w-5/6  overflow-auto overflow-x-hidden h-[100vh] ">
          <div className="lg:w-[95%] mx-4 lg:mx-auto px-10 lg:px-5 mt-14 mb-8 bg-CarbonicBlue-500 p-4 rounded-xl text-white flex flex-col lg:flex-row items-center justify-between">
            <p className=" my-3 text-xl lg:text-3xl font-EstedadExtraBold">
              سفارشات تایید نشده
            </p>
            <p className="text-lg  font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
              {totalOrder && formatCurrencyDisplay(totalOrder)}
            </p>
          </div>

          <ul className="grid lg:grid-cols-4 gap-4 lg:px-10 px-2 py-8 place-items-stretch">
            {isOrderloading ? (
              <p className="inset-0 flex items-center justify-center my-6 text-center duration-200 font-EstedadExtraBold text-CarbonicBlue-500 animate-pulse ">
                در حال بارگذاری ...
              </p>
            ) : (
              orderList &&
              orderList?.map((orderItem, idx) => (
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
                      <span className="text-xl  ">
                        {formatCurrencyDisplay(Math.floor(orderItem?.Code))}
                      </span>
                    </span>
                    <span className="flex flex-row items-center gap-2">
                      <IoCalendarOutline className="text-xl" />
                      <span className="text-xl">{orderItem?.SDate}</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 justify-evenly items-start h-4/6 bg-stone-100 p-6 ">
                    <div className="w-full flex flex-row items-center justify-around gap-2 text-xl ">
                      {orderItem?.Tedad > 0 && (
                        <p className="flex flex-row gap-4 items-center jusstify-center">
                          <FaBoxOpen />
                          {formatCurrencyDisplay(orderItem?.Tedad)}
                        </p>
                      )}

                      {orderItem?.KTedad > 0 && (
                        <p className="flex flex-row gap-4 items-center jusstify-center">
                          <FaBoxes />
                          {formatCurrencyDisplay(orderItem?.KTedad)}
                        </p>
                      )}
                    </div>
                    <span className="w-full flex flex-row items-center justify-center  gap-2 text-xl">
                      <BsCashCoin />
                      <span className="font-EstedadMedium">مبلغ :</span>
                      {formatCurrencyDisplay(orderItem?.JamKol)} {"ریال"}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
          {links && links?.length > 3 && (
            <div className="flex flex-wrap justify-center">
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
          <div className="absolute lg:w-[50%] lg:h-[88vh] flex  items-center justify-center flex-col py-10  w-full top-[11vh] bg-gray-100 shadow-lg rounded-xl  lg:right-[25%] overflow-y-scroll">
            <div className="flex flex-col  w-full px-8">
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
              <div className="lg:text-xl text-md ">
                {isOrderDetailLoading ? (
                  <div className="flex flex-col m-5 lg:m-7">
                    <p className="inset-0 flex items-center justify-center mt-6 text-center duration-200 font-EstedadExtraBold text-CarbonicBlue-500 animate-pulse ">
                      در حال بارگذاری ...
                    </p>
                  </div>
                ) : (
                  <ul>
                    {orderDetail &&
                      orderDetail?.map((orderDetailItem, idx) => (
                        <li
                          key={idx}
                          className="flex flex-col p-3 text-sm border-b-2 border-gray-800 font-EstedadExtraBold"
                        >
                          <div className="flex flex-row flex-wrap w-full text-center">
                            <span>{orderDetailItem?.Name}</span>
                          </div>

                          <div className="flex flex-row flex-wrap items-center justify-between w-full py-2 text-center">
                            <div className="">
                              تعداد : {Math.floor(orderDetailItem?.Tedad)}{" "}
                              {orderDetailItem?.Vahed} {","}{" "}
                              {Math.floor(orderDetailItem?.KTedad)}{" "}
                              {orderDetailItem?.KVahed}
                            </div>
                            <div className="">
                              فی : {formatCurrencyDisplay(orderDetailItem?.Fee)}{" "}
                              {"ريال"}
                            </div>
                            <div className="">
                              جمع :
                              {formatCurrencyDisplay(orderDetailItem?.JamKol)}{" "}
                              {"ريال"}
                            </div>
                          </div>
                          {orderDetailItem?.Comment && (
                            <div className="w-full">
                              <p>{orderDetailItem?.Comment}</p>
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            {detailsLink && detailsLink?.length > 3 && (
              <div className="flex flex-wrap justify-center w-full mt-6 ">
                {detailsLink?.map((link, idx) => (
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

export default UnconfirmedOrders;
