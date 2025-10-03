import { useParams, useSearchParams } from "react-router-dom";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useUserStore } from "@store/UserStore";
import Loading from "@components/Loading";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import Unit from "@components/Unit";
import { useConfirmedOrderDetails } from "@hooks/useProfile";
import ProfilePagination from "@components/profile/ProfilePagination";

interface orderDetails {
  GroupName: string;
  ProductName: string;
  SubGroupName: string;
  Name: string;
  Vahed: string;
  AllSum: number;
  Comment: string;
  Tedad: number;
  Fee: number;
}

const ConfirmedOrderDetails = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { orderCode } = useParams() || "0";
  const { user } = useUserStore();
  const replacement = { path: "/confirmed-order-details", url: `${import.meta.env.VITE_API_URL}/v1/list-past-orders-products` };

  const { confirmedOrderDetailsList, confirmedOrderDetailsLinks, isPending } =
    useConfirmedOrderDetails(user, orderCode, page);

  if (isPending) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start font-EstedadLight">
        <p className="text-lg md:text-xl font-EstedadExtraBold -tracking-wider">
          جزییات فاکتور
        </p>
        <p className="text-lg md:text-xl font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
          {orderCode && formatCurrencyDisplay(orderCode)}
        </p>
      </div>
 
      <div className="w-full overflow-x-auto py-4">
        <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg font-EstedadLight">
          <thead>
            <tr className="bg-CarbonicBlue-500 text-white">
              <th className="p-1.5 lg:p-4 text-center text-sm">گروه</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">زیرگروه</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">نام</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">تعداد</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">فی</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">جمع</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {confirmedOrderDetailsList?.length > 0 &&
              confirmedOrderDetailsList.map((orderDetail: orderDetails, idx: number) => (
                <tr
                  key={idx}
                  className="border-b cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out font-EstedadLight"
                >
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {orderDetail.GroupName}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {orderDetail.SubGroupName}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap font-EstedadMedium">
                    {orderDetail.Name}
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap ">
                    {formatCurrencyDisplay(Math.floor(orderDetail.Tedad))}
                    <span className="text-sm p-1.5">
                      {orderDetail.Vahed}
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <p className="flex flex-row items-center justify-center gap-1 ">
                      {formatCurrencyDisplay(orderDetail.Fee)} <Unit />
                    </p>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <p className="flex flex-row items-center justify-center gap-1 font-EstedadMedium">
                      {formatCurrencyDisplay(orderDetail.AllSum)} <Unit />
                    </p>
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
