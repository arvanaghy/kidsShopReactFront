import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

interface UsefulLinksProps {
    title?: string
    link?: string
}


const UsefulLinks: React.FC<UsefulLinksProps> = ({ title, link }) => {
    return (
        <Link
            to={link || "/"}
            target="_blank"
            className="flex flex-row items-center font-EstedadMedium gap-4 text-gray-600 group"
        >
            <div
                className=" text-sm xl:text-base
                      group-hover:text-green-700
                      group-hover:-translate-x-2
                      duration-300 transition-all ease-in-out"
            >
                {title}
            </div>
        </Link>
    )
}

export default UsefulLinks