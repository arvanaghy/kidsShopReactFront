import { useUserStore } from "@store/UserStore";
import { dateToPersianDigits, formatCurrencyDisplay } from "@utils/numeralHelpers";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useSearchParams } from "react-router-dom";
import Loading from "@components/Loading";
import Unit from "@components/Unit";
import { useConfirmedOrders, useNavigateConfirmedOrderDetails } from "@hooks/useProfile";
import ProfilePagination from "@components/profile/ProfilePagination";


const ConfirmedOrders = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { user } = useUserStore();
  const replacement = { path: "/confirmed-orders", url: `${import.meta.env.VITE_API_URL}/v1/list-past-orders` };

  const {
    confirmedOrdersTotal,
    isPending,
    confirmedOrdersList,
    confirmedOrdersLinks,
  } = useConfirmedOrders(user, page);

  const { navigateToDetails, isPending: isPendingDetails } = useNavigateConfirmedOrderDetails();

  const handleNavigateToDetails = (orderCode: number) => {
    if (isPendingDetails) return;
    navigateToDetails(orderCode);
  }

  if (isPending) return <Loading />;

  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start">
        <p className="text-lg md:text-xl font-EstedadExtraBold">
          سفارشات تایید شده
        </p>
        <p className="text-lg md:text-xl font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
          {formatCurrencyDisplay(confirmedOrdersTotal)}
        </p>
      </div>

      <div className="w-full overflow-x-auto py-4">
        <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg lg:text-xl text-md">
          <thead>
            <tr className="bg-CarbonicBlue-500 text-white">
              <th className="p-1.5 lg:p-4 text-right text-sm">کد فاکتور</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">تاریخ</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">تعداد</th>
              <th className="p-1.5 lg:p-4 text-right text-sm">مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {confirmedOrdersList.map((orderItem, idx) => (
              <tr
                key={idx}
                role="button"
                onClick={() => handleNavigateToDetails(orderItem?.Code)}
                className="border-b cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out"
              >
                <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                  <span className="flex items-center justify-center gap-2">
                    {formatCurrencyDisplay(Math.floor(orderItem?.CodeFactor))}
                  </span>
                </td>
                <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                  <span className="flex items-center justify-center gap-2">
                    {dateToPersianDigits(orderItem?.SDate)}
                  </span>
                </td>
                <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                  <span className="flex items-center justify-center gap-2">
                    {formatCurrencyDisplay(orderItem?.SumTedad)}
                  </span>
                </td>
                <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                  <span className="flex items-center justify-center gap-2">
                    {formatCurrencyDisplay(orderItem?.SumKala)} <Unit />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProfilePagination links={confirmedOrdersLinks} replacement={replacement} />

    </ProfileLayout>
  );
};

export default ConfirmedOrders;
