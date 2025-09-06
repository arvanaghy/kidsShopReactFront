import JumpingDots from "@components/JumpingDots";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogout } from "@hooks/useAuth";
import { useCartStore } from "@store/CartStore";
import useCompareStore from "@store/CompareStore";
import { useFavoriteStore } from "@store/FavoriteStore";
import { useTransferStore } from "@store/transferStore";
import { useUserStore } from "@store/UserStore";

const LogoutButton = () => {
    const { user, clearUser } = useUserStore();
    const { clearCart, clearDescription } = useCartStore();
    const { clearTransfer } = useTransferStore();
    const { logout, isPending } = useLogout();
    const { clearCompare } = useCompareStore();
    const { clearFavorite } = useFavoriteStore();

    const handleLogout = async () => {
        await logout(
            user,
            clearUser,
            clearCart,
            clearTransfer,
            clearDescription,
            clearCompare,
            clearFavorite,
        );
    };
    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className={`w-full flex flex-row items-center font-EstedadMedium
                    justify-around gap-2 text-lg  md:text-sm  lg:text-base border py-4 px-6 md:px-2 lg:px-4 rounded-2xl shadow-xl bg-white text-CarbonicBlue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:scale-95 duration-200 ease-in-out
                    }`}
        >
            <FontAwesomeIcon
                icon={faRightFromBracket}
                className="-scale-x-100"
            />
            {isPending ? <JumpingDots /> : <span>خروج از حساب کاربری</span>}
        </button>
    )
}

export default LogoutButton