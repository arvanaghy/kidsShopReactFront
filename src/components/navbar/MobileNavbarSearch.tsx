import JumpingDots from "@components/JumpingDots";
import { searchProduct } from "@hooks/useMenu";

const MobileNavbarSearch = () => {
    const { handleSearch, isPending } = searchProduct();
    return (
        <form
            onSubmit={handleSearch}
            className="w-full flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50 gap-1
        hover:bg-gray-900 duration-300 ease-in-out transition-all
        z-50"
        >
            <input
                type="text"
                name="search"
                placeholder="عنوان محصول ..."
                className="w-full bg-gray-100 text-gray-700 rounded-md p-1.5 text-xs"
            />
            <button
                disabled={isPending}
                type="submit"
                className="w-fit flex flex-row justify-center items-center p-1.5 bg-gray-600 rounded-md text-gray-50
            font-EstedadLight
            text-xs
        hover:bg-gray-900 duration-300 ease-in-out transition-all
        "
            >
                {isPending ? <JumpingDots /> : <>جستجو</>}

            </button>
        </form>
    )
}

export default MobileNavbarSearch