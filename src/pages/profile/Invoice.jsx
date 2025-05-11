/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "@context/UserContext";
import {
  formatCurrencyDisplay,
  toPersianDigits,
} from "@utils/numeralHelpers";
import ProfileLayout from "./ProfileLayout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "@components/Loading";

const Invoice = () => {
  const { user } = useContext(UserContext);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [links, setLinks] = useState([]);

  const navigateTo = useNavigate();

  const fetchInvoice = async (url) => {
    if (loading) return;
    try {
      setLoading(true);
      const { data, status } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user?.UToken}`,
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
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

  const fetchBalance = async (url) => {
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
    fetchInvoice(
      "https://kidsshopapi.electroshop24.ir/api/v1/list-past-invoice?page=1"
    );
    fetchBalance("https://kidsshopapi.electroshop24.ir/api/v1/account-balance");
  }, []);

  if (loading) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-4 rounded-xl text-white flex flex-col items-center justify-between md:flex-row">
        <p className="text-lg xl:text-xl font-EstedadExtraBold">مانده حساب </p>
        <p className="text-lg xl:text-xl font-EstedadExtraBold text-Amber-500 ">
          <span className="underline underline-offset-8">
            {Math.abs(balance) > 0
              ? formatCurrencyDisplay(Math.abs(balance)) + " ریال "
              : ""}
          </span>

          <span className="px-1 text-Amber-500 text-base no-underline ">
            {balance > 0 && "بدهکار"}
            {balance < 0 && "بستانکار"}
            {balance === 0 && "بی حساب"}
          </span>
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full">
          <p className="w-full p-4 text-xl text-CarbonicBlue-500 text-right font-EstedadExtraBold">
            ریز گردش حساب
          </p>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-CarbonicBlue-500 text-white">
                  <th className="p-1.5 lg:p-4 text-right text-sm">کد فاکتور</th>
                  <th className="p-1.5 lg:p-4 text-right text-sm">تاریخ</th>
                  <th className="p-1.5 lg:p-4 text-right text-sm">بستانکار</th>
                  <th className="p-1.5 lg:p-4 text-right text-sm">بدهکار</th>
                  <th className="p-1.5 lg:p-4 text-right text-sm">مانده فاکتور</th>
                  <th className="p-1.5 lg:p-4 text-right text-sm">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {invoiceList.map((invoice, idx) => (
                  <tr
                    key={idx}
                    className="border-b cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out"
                  >
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      <span className="flex items-center justify-center gap-2">
                        {formatCurrencyDisplay(Math.floor(invoice?.Code))}
                      </span>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      <span className="flex items-center justify-center gap-2">
                        {toPersianDigits(invoice?.SDate)}
                      </span>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      {formatCurrencyDisplay(invoice?.Bestankar)}{" "}
                      <span className="text-xs">ریال</span>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      {formatCurrencyDisplay(invoice?.Bedehkar)}{" "}
                      <span className="text-xs">ریال</span>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center bg-stone-200 font-EstedadMedium leading-relaxed text-nowrap whitespace-nowrap">
                      {formatCurrencyDisplay(invoice?.Mande)}{" "}
                      <span className="text-xs">ریال</span>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center  leading-relaxed text-nowrap whitespace-nowrap
">
                      {invoice?.Comment ? invoice.Comment : "-"}
                      {invoice?.Comment2 ? " - " + invoice.Comment2 : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mx-auto flex-warp py-5">
          {links?.length > 0 &&
            links.map((link, idx) => (
              <button
                key={idx}
                disabled={link.active}
                onClick={() => {
                  link?.url ? fetchInvoice(link?.url) : null;
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
      </div>
    </ProfileLayout>
  );
};

export default Invoice;
