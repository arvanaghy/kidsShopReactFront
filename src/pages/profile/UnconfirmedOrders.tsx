
import { useUserStore } from "@store/UserStore";
import { dateToPersianDigits, formatCurrencyDisplay } from "@utils/numeralHelpers";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useSearchParams } from "react-router-dom";
import Loading from "@components/Loading";
import Unit from "@components/Unit";
import { useNavigateUnconfirmedOrderDetails, useUnconfirmedOrders } from "@hooks/useProfile";
import ProfilePagination from "@components/profile/ProfilePagination";

interface OrderItem {
  Code: number;
  CodeFactor: number;
  Tedad: number;
  Vahed: string;
  SDate: string;
  JamKol: number;
  JamKK: number;
}

const UnconfirmedOrders = () => {

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { user } = useUserStore();
  const replacement = { path: "/unconfirmed-orders", url: `${import.meta.env.VITE_API_URL}/v2/list-past-orders` };

  const {
    unconfirmedOrdersTotal,
    isPending,
    unconfirmedOrdersList,
    unconfirmedOrdersLinks,
  } = useUnconfirmedOrders(user, page);

  const { navigateToDetails, isPending: isPendingDetails } = useNavigateUnconfirmedOrderDetails();

  const handleNavigateToDetails = (orderCode: number) => {
    if (isPendingDetails) return;
    navigateToDetails(orderCode);
  }

  if (isPending) return <Loading />;


  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start font-EstedadLight">
        <p className="text-lg md:text-xl font-EstedadExtraBold">
          سفارشات در صف انتظار (پیش فاکتور)
        </p>
        <p className="text-lg md:text-xl font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
          {unconfirmedOrdersTotal && formatCurrencyDisplay(unconfirmedOrdersTotal)}
        </p>
      </div>

      <div className="w-full overflow-x-auto py-4">
        <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg lg:text-xl text-md">
          <thead>
            <tr className="bg-CarbonicBlue-500 text-white font-EstedadLight">
              <th className="p-1.5 lg:p-4 text-center text-sm">کد پیش فاکتور</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">تاریخ</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">تعداد</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {unconfirmedOrdersList?.length > 0 &&
              unconfirmedOrdersList.map((orderItem: OrderItem, idx: number) => (
                <tr
                  key={idx}
                  onClick={() => handleNavigateToDetails(orderItem?.Code)}
                  className="border-b cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out font-EstedadLight"
                >
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {formatCurrencyDisplay(Math.floor(orderItem?.Code))}
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {dateToPersianDigits(orderItem?.SDate)}
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {formatCurrencyDisplay(orderItem?.Tedad)}
                      <span className="text-xs">{orderItem?.Vahed}</span>
                    </span>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <span className="flex items-center justify-center gap-2">
                      {formatCurrencyDisplay(orderItem?.JamKK)} <Unit />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <ProfilePagination links={unconfirmedOrdersLinks} replacement={replacement} />

    </ProfileLayout>
  );
};

export default UnconfirmedOrders;
