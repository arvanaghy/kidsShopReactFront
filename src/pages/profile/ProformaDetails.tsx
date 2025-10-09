/* eslint-disable react/prop-types */
import { useParams, useSearchParams } from "react-router-dom";
import ProfileLayout from "@layouts/user/ProfileLayout";
import { useUserStore } from "@store/UserStore";
import Loading from "@components/Loading";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import Unit from "@components/Unit";
import ProfilePagination from "@components/profile/ProfilePagination";
import { RGBtoHexConverter } from "@utils/RGBtoHexConverter";
import { useUnconfirmedOrderDetails } from "@hooks/useProfile";

interface OrderItem {
  Code: number;
  Name: string;
  Tedad: number;
  Vahed: number;
  Fee: number;
  JamKol: number;
  Comment: string;
  SizeNum: string | number;
  ColorName: string;
  RGB: string;
}

const ProformaDetails = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { orderCode } = useParams() || "0";
  const { user } = useUserStore();
  const replacement = { path: "/proforma-details", url: `${import.meta.env.VITE_API_URL}/v2/list-past-orders-products` };

  const { unconfirmedOrderDetailsList, unconfirmedOrderDetailsLinks, isPending } =
    useUnconfirmedOrderDetails(user, orderCode, page);

  if (isPending) return <Loading />;


  return (
    <ProfileLayout>
      <div className="w-full bg-CarbonicBlue-500 p-2 md:p-4 rounded-xl text-white flex flex-row items-center justify-between self-start place-self-start justify-self-start font-EstedadLight">
        <p className="text-lg md:text-xl font-EstedadExtraBold">
          جزییات پیش فاکتور
        </p>
        <p className="text-lg md:text-xl font-EstedadExtraBold text-Amber-500 underline underline-offset-8">
          {orderCode && formatCurrencyDisplay(orderCode)}
        </p>
      </div>
      <div className="w-full overflow-x-auto py-4">
        <table className="w-full border-collapse bg-stone-100 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-CarbonicBlue-500 text-white font-EstedadLight">
              <th className="p-1.5 lg:p-4 text-center text-sm">نام</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">تعداد</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">فی</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">جمع</th>
              <th className="p-1.5 lg:p-4 text-center text-sm">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {unconfirmedOrderDetailsList &&
              unconfirmedOrderDetailsList?.length > 0 &&
              unconfirmedOrderDetailsList.map((orderDetail: OrderItem, idx: number) => (
                <tr
                  key={idx}
                  className="border-b cursor-pointer hover:bg-stone-200 transition duration-300 ease-in-out font-EstedadLight"
                >
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <div className="flex  flex-row items-center justify-center gap-1.5 ">
                      <p className="font-EstedadMedium">
                        {orderDetail?.Name}
                      </p>
                      <p>
                        سایز
                      </p>
                      <p className="font-EstedadMedium">
                        {orderDetail?.SizeNum}
                      </p>

                      <p>
                        رنگ
                      </p>
                      <p
                        className="w-5 h-5 rounded-full"
                        style={{
                          backgroundColor: RGBtoHexConverter(
                            orderDetail?.RGB
                          ),
                        }}
                      ></p>
                      <p className="font-EstedadMedium">
                        {orderDetail?.ColorName}
                      </p>

                    </div>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <div className=" flex flex-row items-center justify-center font-EstedadMedium">
                      {formatCurrencyDisplay(Math.floor(orderDetail?.Tedad))}
                      <p className="text-sm p-1.5 font-EstedadLight">
                        {orderDetail?.Vahed}
                      </p>
                    </div>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <p className="flex flex-row items-center justify-center">
                      {formatCurrencyDisplay(orderDetail?.Fee)} <Unit />
                    </p>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    <p className="flex flex-row items-center justify-center">

                      {formatCurrencyDisplay(orderDetail?.JamKol)} <Unit />
                    </p>
                  </td>
                  <td className="p-1.5 lg:p-4 text-center leading-relaxed text-nowrap whitespace-nowrap">
                    {orderDetail?.Comment ? orderDetail?.Comment : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <ProfilePagination links={unconfirmedOrderDetailsLinks} replacement={replacement} />
    </ProfileLayout>
  );
};

export default ProformaDetails;
