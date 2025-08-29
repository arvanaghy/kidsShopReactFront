import Unit from '@components/Unit';
import { useCartStore } from '@store/CartStore';
import { useTransferStore } from '@store/transferStore';
import { formatCurrencyDisplay } from '@utils/numeralHelpers';

const FactorSum = () => {
    const { cart } = useCartStore();
    const { transfer } = useTransferStore();
    return (
        <p className="flex flex-row items-center justify-end text-center text-base lg:text-end">
            <span className="px-2 text-sm">جمع کل فاکتور :</span>
            <span className="text-xs font-bold text-green-800">
                {cart?.length > 0 &&
                    formatCurrencyDisplay(
                        cart.reduce(
                            (total: number, item: any) =>
                                total +
                                item.basket.reduce(
                                    (subtotal: number, basketItem: any) =>
                                        subtotal + (basketItem?.SPrice * basketItem?.quantity || 0),
                                    0
                                ),
                            0
                        ) + (parseInt(transfer?.Mablag || 0))
                    )}
            </span>
            <Unit />
        </p>
    )
}

export default FactorSum