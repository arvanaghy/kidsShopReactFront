import Loading from "@components/Loading";
import { useProforma } from "@hooks/useOrders";
import AdminLayout from "@layouts/admin/AdminLayout";
import AdminPagination from "@components/admin/AdminPagination";
import { dateToPersianDigits, formatCurrencyDisplay, toPersianDigits } from "@utils/numeralHelpers";

const AdminOrders = () => {

  const { proformaList, proformaLinks, loading }: any = useProforma();

  const replacement = { path: "/admin/orders", url: `${import.meta.env.VITE_API_URL}/v2/orders` };

  if (loading) return <Loading />;

  return (
    <AdminLayout>
      <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
        <div className="w-full border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around">
          <h1 className="text-xl mb-4">لیست پیش فاکتورها</h1>

          <div className="w-full overflow-x-auto px-2">
            <table className="w-full table-auto  border-collapse border border-slate-400 text-xs">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-1.5">کد پیش فاکتور</th>
                  <th className="border border-slate-300 p-1.5">نام مشتری</th>
                  <th className="border border-slate-300 p-1.5">آدرس مشتری</th>
                  <th className="border border-slate-300 p-1.5">موبایل مشتری</th>
                  <th className="border border-slate-300 p-1.5">تاریخ</th>
                  <th className="border border-slate-300 p-1.5"> مبلغ</th>
                  <th className="border border-slate-300 p-1.5"> تعداد</th>
                  <th className="border border-slate-300 p-1.5"> خدمات</th>
                  <th className="border border-slate-300 p-1.5">وضعیت ارسال </th>
                  <th className="border border-slate-300 p-1.5">کد ارسال </th>
                  <th className="border border-slate-300 p-1.5">توضیحات ارسال </th>
                  <th className="border border-slate-300 p-1.5">عملیات </th>
                </tr>
              </thead>
              <tbody>
                {proformaList.map((proforma: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className="border border-slate-300 p-1.5">{proforma.CodeFactor}</td>
                    <td className="border border-slate-300 p-1.5">{proforma.CustomerName}</td>
                    <td className="border border-slate-300 p-1.5">{proforma.CustomerAddress}</td>
                    <td className="border border-slate-300 p-1.5">{toPersianDigits(proforma.CustomerMobile)}</td>
                    <td className="border border-slate-300 p-1.5">{dateToPersianDigits(proforma.SDate)}</td>
                    <td className="border border-slate-300 p-1.5">{formatCurrencyDisplay(proforma.SumKala)}</td>
                    <td className="border border-slate-300 p-1.5">{formatCurrencyDisplay(proforma.SumTedad)}</td>
                    <td className="border border-slate-300 p-1.5">{formatCurrencyDisplay(proforma.SumKhadamat)}</td>
                    <td className="border border-slate-300 p-1.5">{proforma.SiteErsalStatus}</td>
                    <td className="border border-slate-300 p-1.5">{proforma.SiteErsalCode}</td>
                    <td className="border border-slate-300 p-1.5">{proforma.SiteErsalComment}</td>
                    <td className="border border-slate-300 p-1.5"><button className="
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded
                    ">
                      <a href={`/admin/order/${proforma.CodeFactor}`}>مشاهده</a></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AdminPagination links={proformaLinks} replacement={replacement} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
