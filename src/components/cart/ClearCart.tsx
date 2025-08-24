import JumpingDots from '@components/JumpingDots';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCartStore } from '@store/CartStore';
import { confirmToast } from "@utils/confirmToast";
import { useState } from 'react';
import toast from 'react-hot-toast';


const ClearCart = () => {
    const { cart, clearCart } = useCartStore();
    const [isPending, setIsPending] = useState(false);
    const handleClearCart = async () => {
        if (isPending) return;
        setIsPending(true);
        try {
            const isConfirmed = await confirmToast("آیا از حذف همه آیتم ها مطمئن هستید؟");
            if (!isConfirmed) return;
            clearCart();
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setIsPending(false);
        }
    }
    if (!cart?.length) return null;
    return (
        <div
            className={`${cart?.length === 0 ? "opacity-60 cursor-not-allowed" : ""
                } absolute left-4 top-4 w-14 flex flex-col justify-center items-center text-center space-y-2 text-red-500 hover:text-red-700 duration-300 cursor-pointer transition-all ease-in-out`}
        >
            {isPending ? <JumpingDots /> : (
                <>
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        className={`text-lg lg:text-2xl ${cart?.length === 0 ? "" : "cursor-pointer"}`}
                        onClick={handleClearCart}
                    />
                    <p className="hidden lg:block text-xs w-full cursor-pointer">حذف همه</p>
                </>
            )}

        </div>
    )
}

export default ClearCart