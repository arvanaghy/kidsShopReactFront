import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'

const ToTopButton = () => {

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById("scrollToTop");
            if (element) {
                if (window.scrollY > 100) {
                    element.style.display = "block";
                } else {
                    element.style.display = "none";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        < button
            id="scrollToTop"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-[7vh] right-4 md:bottom-0 md:right-8 z-50 p-0 m-0"
        >
            <FontAwesomeIcon
                icon={faChevronUp}
                className="
        text-lg  px-2 py-2
        md:text-2xl md:px-5 md:py-3 bg-black/60 text-white   rounded-t-2xl hover:bg-green-700 transaction-all duration-300 ease-in-out"
            />
        </button >
    )
}

export default ToTopButton