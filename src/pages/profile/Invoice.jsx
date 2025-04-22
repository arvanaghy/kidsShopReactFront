/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "@context/UserContext";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import ProfileLayout from "./ProfileLayout";
import toast from "react-hot-toast";
import { CiBarcode } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loading from "@components/Loading";

const Invoice = () => {
  const { user } = useContext(UserContext);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState(
    "https://kidsshopapi.electroshop24.ir/api/v1/list-past-invoice?page=1"
  );

  const navigateTo = useNavigate();

  const fetchInvoice = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.UToken}`,
          "Cache-Control": "no-cache",
        },
      });
      if (status !== 201) throw new Error(data?.message);
      setInvoiceList(data?.result?.data);
      setLinks(data?.result?.links);
    } catch (error) {
      toast.error(
        " دریافت گردش حساب " +
          (error?.response?.data?.message || error?.message) || "خطا در اتصال"
      );
      setInvoiceList([]);
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  const getDetails = async (orderCode) => {
    try {
      const { data, status } = await axios.get(
        `https://kidsshopapi.electroshop24.ir/api/v1/list-past-orders-products/${Math.floor(
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
      console.log('data', data);
    } catch (error) {
      toast.error(
        "جزییات سفارش " + (error?.response?.data?.message || error?.message) ||
          "خطا در اتصال"
      );
    }
  };

  const fetchBalance = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `https://kidsshopapi.electroshop24.ir/api/v1/account-balance`,
        {
          headers: {
            Authorization: `Bearer ${user?.UToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      if (status !== 201) throw new Error(data?.message);
      setBalance(data?.result);
    } catch (error) {
      toast.error(
        " دریافت موجودی " +
          (error?.response?.data?.message || error?.message) || "خطا در اتصال"
      );
      setBalance(0);
    } finally {
      setLoading(false);
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
    window.scrollTo(0, 0);
    fetchInvoice();
    fetchBalance();
  }, [url]);

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-12 min-h-[90vh] w-full items-start justify-center gap-4 ">
      <div className="lg:sticky top-[10vh] lg:col-span-3 bg-CarbonicBlue-500 ">
        <ProfileLayout />
      </div>

      <div className="w-full mt-14 lg:mt-0 mx-auto flex flex-col items-center justify-start py-10 bg-stone-50 lg:col-span-9 font-EstedadMedium">
        <div className="lg:w-full px-10 lg:px-5 my-8 bg-CarbonicBlue-500 p-4 rounded-xl text-white flex flex-col lg:flex-row items-center justify-between">
          <p className=" my-3 text-xl font-EstedadExtraBold">مانده حساب </p>
          <p className="text-lg font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
            {Math.abs(balance) > 0
              ? formatCurrencyDisplay(Math.abs(balance)) + " ریال "
              : ""}
            <span className="mx-1 text-Amber-500 text-base ">
              {balance > 0 && "بدهکار"}
              {balance < 0 && "بستانکار"}
              {balance === 0 && "بی حساب"}
            </span>
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2">
          <div className="w-full">
            <p className="w-full p-4 text-xl text-CarbonicBlue-500 text-right font-EstedadExtraBold">ریز گردش حساب</p>
            <ul className="grid grid-cols-12 gap-4">
              {invoiceList.map((invoice, idx) => (
                <li
                onClick={() => getDetails(invoice?.CodeFactorForoosh)}
                  key={idx}
                  className="w-full col-span-12 bg-stone-100 cursor-pointer rounded-lg border shadow-lg  lg:hover:shadow-2xl duration-300 ease-in-out"
                >
                  <div className="w-full flex flex-row items-center justify-between p-4 bg-CarbonicBlue-500 text-white">
                    <span className="flex flex-row items-center gap-2">
                      <span className="text-xl">
                        {formatCurrencyDisplay(Math.floor(invoice?.Code))}
                      </span>
                      <CiBarcode className="text-xl " />
                    </span>
                    <span className="flex flex-row items-center gap-2">
                      <IoCalendarOutline className="text-xl" />
                      <span className="text-xl  ">{invoice?.SDate}</span>
                    </span>
                  </div>
                  <div className="flex   flex-col gap-2 justify-evenly items-start  p-6 ">
                    <div className="w-full flex -row flex-wrap justify-between gap-2">
                      <div className="">
                        <span className="text-sm">بستانکار : </span>
                        {formatCurrencyDisplay(invoice?.Bestankar)}
                        <span className="text-sm">{"ریال"}</span>
                      </div>
                      <div className="">
                        <span className="text-sm">بدهکار : </span>
                        {formatCurrencyDisplay(invoice?.Bedehkar)}
                        <span className="text-sm">{"ریال"}</span>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-center bg-stone-200 rounded my-2 gap-2 text-lg py-2 text-center w-full ">
                      <span className="font-EstedadMedium text-sm">
                        مانده فاکتور :
                      </span>
                      {formatCurrencyDisplay(invoice.Mande)}
                      <span className="text-sm">{"ریال"}</span>
                    </div>
                    {invoice.Comment && (
                      <div className="flex p-2 text-sm leading-relaxed flex-row flex-wrap items-center justify-center text-center">
                        <b>توضیحات : </b>
                        {invoice.Comment}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row items-center justify-center mx-auto flex-warp">
            {links?.length > 3 &&
              links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    link?.url ? setUrl(link?.url) : null;
                  }}
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
        </div>
      </div>
    </div>
  );
};

export default Invoice;
