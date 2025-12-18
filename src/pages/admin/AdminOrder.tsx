import AdminPagination from '@components/admin/AdminPagination';
import Loading from '@components/Loading';
import Unit from '@components/Unit';
import { useProformaDetails } from '@hooks/useOrders';
import AdminLayout from '@layouts/admin/AdminLayout';
import { formatCurrencyDisplay, toPersianDigits } from '@utils/numeralHelpers';
import { useParams } from 'react-router-dom';

const AdminOrder = () => {
    const { orderCode } = useParams();

    const { proformaDetailsList, proformaDetailsLinks, loading } = useProformaDetails(orderCode);

    if (loading) return <Loading />;
    const replacement = { path: `/admin/order/${orderCode}`, url: `${import.meta.env.VITE_API_URL}/v2/orders/${orderCode}` };

    return (
        <AdminLayout>
            <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
                <div className="border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around">
                    <div className="w-full overflow-x-auto px-2">
                        <table className="w-full table-auto  border-collapse border border-slate-400 text-xs">
                            <thead>
                                <tr>
                                    <th className="border border-slate-300 p-1.5">کد کالا</th>
                                    <th className="border border-slate-300 p-1.5">نام مشتری</th>
                                    <th className="border border-slate-300 p-1.5">نام کالا</th>
                                    <th className="border border-slate-300 p-1.5">قیمت</th>
                                    <th className="border border-slate-300 p-1.5">واحد</th>
                                    <th className="border border-slate-300 p-1.5">تعداد</th>
                                    <th className="border border-slate-300 p-1.5">جمع کل</th>
                                    <th className="border border-slate-300 p-1.5">سایز</th>
                                    <th className="border border-slate-300 p-1.5">رنگ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proformaDetailsList.map((item: any, index: number) => (
                                    <tr key={index} >
                                        <th className="border border-slate-300 p-1.5">
                                            {item?.KCode}
                                        </th>
                                        <td className="border border-slate-300 p-1.5" >
                                            {item?.CName}
                                        </td>
                                        <td className="border border-slate-300 p-1.5" >
                                            {item?.Name}
                                        </td>
                                        <td className="border border-slate-300 p-1.5" >
                                            {formatCurrencyDisplay(item.Fee)}
                                        </td>
                                        <td className="border border-slate-300 p-1.5"  >
                                            {item.Vahed}
                                        </td>
                                        <td className="border border-slate-300 p-1.5" >
                                            {toPersianDigits(item.Tedad)}
                                        </td>
                                        <td className="border border-slate-300 p-1.5 flex flex-row gap-1.5 justify-center text-center" >
                                            {formatCurrencyDisplay(item.JamKol)} <Unit />
                                        </td>
                                        <td className="border border-slate-300 p-1.5" >
                                            {item.SizeNum}
                                        </td>
                                        <td className="border border-slate-300 p-1.5">
                                            {item.ColorName}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <AdminPagination links={proformaDetailsLinks} replacement={replacement} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminOrder