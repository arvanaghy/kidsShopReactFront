import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ScrollToTop: React.FC = () => {

    const handleScrollToTop: React.MouseEventHandler = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <button
            onClick={handleScrollToTop}
            className="w-fit mx-auto flex flex-row justify-center items-center gap-4 md:gap-6 group"
        >
            <FontAwesomeIcon
                icon={faChevronUp}
                className="text-xs md:text-sm lg:text-lg p-2 text-white bg-gray-900/80 rounded-lg group-hover:bg-green-700
        transition-all duration-300 ease-in-out
        "
            />
            <p
                className="text-sm md:text-base lg:text-lg font-semibold text-gray-700
        group-hover:text-green-700 transition-all duration-300 ease-in-out"
            >
                بازگشت به بالا
            </p>
        </button>
    )
}

export default ScrollToTop