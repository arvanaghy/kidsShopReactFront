import { useUserStore } from "@store/UserStore";
import { dateToPersianDigits, formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useSearchParams } from "react-router-dom";
import Loading from "@components/Loading";
import Unit from "@components/Unit";
import { useBalance, useInvoice } from "@hooks/useProfile";
import ProfilePagination from "@components/profile/ProfilePagination";

const Invoice = () => {
  const { user } = useUserStore();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const replacement = {
    path: "/invoice",
    url: `${import.meta.env.VITE_API_URL}/v1/list-past-invoice`,
  };



  const { balance, isPending: balanceIsPending } = useBalance(user);
  const {
    invoiceList,
    invoiceLinks,
    isPending: invoiceIsPending,
  } = useInvoice(user, page);

  if (balanceIsPending || invoiceIsPending) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-4 rounded-xl text-white flex flex-col items-center justify-between md:flex-row">
        <p className="text-lg xl:text-xl font-EstedadExtraBold">مانده حساب </p>
        <div className="flex flex-row items-center font-EstedadExtraBold text-Amber-500 ">
          {balance > 0 && (
            <>
              <span className="underline underline-offset-8">
                {formatCurrencyDisplay(Math.abs(balance))}
              </span>
              <Unit forced textColor="text-Amber-500" />
            </>
          )}

          <span className="px-1 text-Amber-500 text-base no-underline ">
            {balance > 0 && "بدهکار"}
            {balance < 0 && "بستانکار"}
            {balance === 0 && "بی حساب"}
          </span>
        </div>
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
                  <th className="p-1.5 lg:p-4 text-right text-sm">
                    مانده فاکتور
                  </th>
                  <th className="p-1.5 lg:p-4 text-right text-sm">توضیحات</th>
                </tr>
              </thead>
              <tbody>
                {invoiceList.map((invoice, idx) => (
                  <tr
                    key={idx}
                    className="border-b  hover:bg-stone-200 transition duration-300 ease-in-out"
                  >
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      <span className="flex items-center justify-center gap-2">
                        {formatCurrencyDisplay(Math.floor(invoice?.Code))}
                      </span>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      <span className="flex items-center justify-center gap-2">
                        {dateToPersianDigits(invoice?.SDate)}
                      </span>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      <p className="flex  flex-row items-center justify-center">

                        {formatCurrencyDisplay(invoice?.Bestankar)} <Unit />
                      </p>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                      <p className="flex  flex-row items-center justify-center">

                        {formatCurrencyDisplay(invoice?.Bedehkar)} <Unit />
                      </p>
                    </td>
                    <td className="p-1.5 lg:p-4 text-center bg-stone-200 font-EstedadMedium leading-relaxed text-nowrap whitespace-nowrap">
                      <p className="flex  flex-row items-center justify-center">
                        {formatCurrencyDisplay(invoice?.Mande)}
                        <Unit />
                      </p>
                    </td>
                    <td
                      className="p-1.5 lg:p-4 text-center  leading-relaxed text-nowrap whitespace-nowrap
"
                    >
                      <p className="p-0.5 leading-relaxed">
                        {invoice?.Comment ? invoice.Comment : "-"}
                      </p>
                      {invoice?.Comment2 && (
                        <p className="p-0.5 leading-relaxed">
                          {invoice?.Comment2 ? invoice.Comment2 : ""}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ProfilePagination links={invoiceLinks} replacement={replacement} />
      </div>
    </ProfileLayout>
  );
};

export default Invoice;
