import JumpingDots from "@components/JumpingDots";
import { CartService } from "@services/CartService";
import { useCartStore } from "@store/CartStore";
import { useTransferStore } from "@store/transferStore";
import { useUserStore } from "@store/UserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnlinePaymentButton = () => {
    const { user } = useUserStore();
    const { cart } = useCartStore();
    const { transfer } = useTransferStore();
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const handlePayment = () => {
        console.log('transfer', transfer);
        console.log('user', user);
        console.log('cart', cart);
        CartService.payBill(isPending, setIsPending, user, cart, transfer, navigate);
    }

    return (
        <button
            className="px-6 py-4 text-white duration-150 border rounded-md bg-CarbonicBlue-500 hover:bg-CarbonicBlue-500/80 hover:text-stone-200 hover:scale-105"
            onClick={handlePayment}
        >
            {isPending ? <JumpingDots /> : 'پرداخت آنلاین'}
        </button>
    )
}

export default OnlinePaymentButton