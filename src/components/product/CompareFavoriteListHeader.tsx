
import { ProductService } from "@services/ProductService";
import { useCompareStore } from "@store/compareStore";
import { useFavoriteStore } from "@store/FavoriteStore";
const CompareFavoriteListHeader = ({ title, type }: { title: string, type: string }) => {

    const { clearCompare } = useCompareStore();
    const { clearFavorite } = useFavoriteStore();
    return (
        <div className="flex flex-row items-center justify-between">
            <h1 className="text-center text-xl lg:text-3xl font-EstedadExtraBold py-4  lg:text-right leading-relaxed text-transparent bg-clip-text bg-gradient-to-r border-b-2 from-Amber-500 to-CarbonicBlue-500">
                {title}
            </h1>
            <button
                onClick={() => ProductService.handleListClear(type, clearFavorite, clearCompare)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700
            w-fit transition-all duration-300 ease-in-out
            self-end
            "
            >
                پاک کردن لیست
            </button>
        </div>
    )
}

export default CompareFavoriteListHeader