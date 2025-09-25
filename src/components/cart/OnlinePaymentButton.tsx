import JumpingDots from "@components/JumpingDots";
import { CartService } from "@services/CartService";
import { useCartStore } from "@store/CartStore";
import { useTransferStore } from "@store/transferStore";
import { useUserStore } from "@store/UserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isOnlinePaymentAvailable as isOnlinePaymentAvailableFunction } from "@hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";


const OnlinePaymentButton = () => {
    const { user } = useUserStore();
    const { cart, clearCart } = useCartStore();
    const { transfer, clearTransfer } = useTransferStore();
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const { description, clearDescription } = useCartStore();

    const { isOnlinePaymentAvailable, isPending: isOnlinePaymentPending } = isOnlinePaymentAvailableFunction();

    const handlePayment = () => {
        CartService.payBill(isPending, setIsPending, user, cart, clearCart, transfer, clearTransfer, navigate, description, clearDescription);
    }

    return (
        <>
            {isOnlinePaymentPending ? <JumpingDots /> : (
                isOnlinePaymentAvailable ? (
                    <button
                        className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-blue-800 cursor-pointer"
                        onClick={handlePayment}
                        disabled={isPending}
                    >
                        {isPending ? <JumpingDots /> :
                            (
                                <p className="group">
                                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="hidden mx-2 group-hover:inline" />
                                    <span>
                                        پرداخت آنلاین
                                    </span>
                                </p>
                            )}
                    </button>
                ) : (
                    <p className="px-6 py-4 text-white duration-150 border rounded-md bg-red-500 hover:bg-red-500/80 cursor-not-allowed">درگاه پرداخت آنلاین موجود نیست</p>
                )
            )
            }

        </>
    )
}

export default OnlinePaymentButton