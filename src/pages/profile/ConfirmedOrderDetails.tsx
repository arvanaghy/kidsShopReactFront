import { useParams, useSearchParams } from "react-router-dom";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useUserStore } from "@store/UserStore";
import Loading from "@components/Loading";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import Unit from "@components/Unit";
import { useConfirmedOrderDetails } from "@hooks/useProfile";
import ProfilePagination from "@components/profile/ProfilePagination";

const ConfirmedOrderDetails = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { orderCode } = useParams() || 0;
  const { user } = useUserStore();
  const replacement = { path: "/confirmed-order-details", url: `${import.meta.env.VITE_API_URL}/v1/list-past-orders-products` };

  const { confirmedOrderDetailsList, confirmedOrderDetailsLinks, isPending } =
    useConfirmedOrderDetails(user, orderCode, page);

  if (isPending) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start">
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
            {confirmedOrderDetailsList?.length > 0 &&
              confirmedOrderDetailsList.map((orderDetail, idx) => (
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
                    {Math.floor(orderDetail.Tedad)} {orderDetail.Vahed}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {formatCurrencyDisplay(orderDetail.Fee)} <Unit />
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {formatCurrencyDisplay(orderDetail.AllSum)} <Unit />
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
      <ProfilePagination links={confirmedOrderDetailsLinks} replacement={replacement} />
    </ProfileLayout>
  );
};

export default ConfirmedOrderDetails;
