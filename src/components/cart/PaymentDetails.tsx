import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import RemoveProductFromCart from "@components/cart/RemoveProductFromCart";
import OrderDescription from "@components/cart/OrderDescription";
import OnlinePaymentButton from "@components/cart/OnlinePaymentButton";
import SelectTransferService from "@components/cart/SelectTransferService";
import FactorSum from "@components/cart/FactorSum";
import { useCartStore } from "@store/CartStore";

const PaymentDetails = () => {
    const { cart = [] } = useCartStore();

    return (
        <div className="col-span-12 flex flex-col lg:col-span-3 text-center lg:sticky lg:top-[20vh] h-fit w-full space-y-5 border border-CarbonicBlue-500/20 p-4 rounded-xl bg-stone-100 shadow-xl justify-around">
            <div className="text-start">
                <div className="flex flex-row justify-between px-1 items-center border-b">
                    <p className="text-sm text-start text-CarbonicBlue-500 pb-2">مشخصات پرداخت</p>
                    <p className="text-sm">{formatCurrencyDisplay(cart?.length)} کالا</p>
                </div>
                <ul className="list-disc list-inside text-xs py-2">
                    <div className="w-full text-gray-600 indent-1 py-2 marker:text-Amber-500 max-h-52 overflow-y-auto">
                        {cart?.map((product, idx) => (
                            <div
                                key={idx}
                                className="space-y-1 border-b py-2 flex flex-row justify-between items-center"
                            >
                                <li className="text-xs font-EstedadMedium">{product?.item?.Name}</li>
                                <RemoveProductFromCart productCode={product?.item?.Code} />
                            </div>
                        ))}
                    </div>

                </ul>
            </div>
            <OrderDescription />
            <SelectTransferService />
            <FactorSum />
            <OnlinePaymentButton />
        </div>
    );

}

export default PaymentDetails