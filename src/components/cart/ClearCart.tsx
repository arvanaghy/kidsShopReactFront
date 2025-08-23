import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCartStore } from '@store/CartStore';
import { confirmToast } from "@utils/confirmToast";


const ClearCart = () => {
    const { cart, ClearCart } = useCartStore();
    return (
        <div
            className={`${cart?.length === 0 ? "opacity-60 cursor-not-allowed" : ""
                } absolute left-4 top-4 w-14 flex flex-col justify-center items-center text-center space-y-2 text-red-500 hover:text-red-700 duration-300 cursor-pointer transition-all ease-in-out`}
        >
            <FontAwesomeIcon
                icon={faTrashCan}
                className={`text-lg lg:text-2xl ${cart?.length === 0 ? "" : "cursor-pointer"}`}
                onClick={async () => {
                    const isConfirmed = await confirmToast("آیا از حذف همه آیتم ها مطمئن هستید؟");
                    if (!isConfirmed) return;
                    ClearCart();
                }}
            />
            <p className="text-xs w-full cursor-pointer">حذف همه</p>
        </div>
    )
}

export default ClearCart