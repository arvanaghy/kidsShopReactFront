import JumpingDots from "@components/JumpingDots";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchProduct } from "@hooks/useMenu";
import { useState } from "react";

const DesktopNavbarSearch = () => {
    const [searchModal, setSearchModal] = useState(false);
    const { handleSearch, isPending } = searchProduct({setSearchModal});

    return (
        <form
            className="w-full md:col-span-4 xl:col-span-5 bg-gray-200 rounded-xl relative"
            onSubmit={handleSearch}
        >
            <input
                type="text"
                name="search"
                placeholder="جستجو محصول ..."
                className="w-full p-2 bg-gray-200 rounded-xl text-gray-600 placeholder:text-gray-600 2xl:py-4
               focus:bg-gray-50
               "
            />
            <button
                type="submit"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
            >
                {isPending ? (
                    <JumpingDots />
                ) :
                    (

                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="text-gray-600 p-2 rounded-md duration-300 transition-all ease-in-out hover:bg-green-800 hover:text-white "
                        />
                    )}
            </button>
        </form>
    )
}

export default DesktopNavbarSearch