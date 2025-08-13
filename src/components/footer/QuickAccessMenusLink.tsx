import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

interface QuickAccessMenusLinkProps {
    icon: IconProp
    title?: string
    link?: string
}


const QuickAccessMenusLink: React.FC<QuickAccessMenusLinkProps> = ({ icon, title, link }) => {
    return (
        <Link
            to={link || "/"}
            className="flex flex-row items-center font-EstedadMedium  gap-4 text-gray-600 group"
        >
            <FontAwesomeIcon
                icon={icon}
                className="text-base md:text-2xl group-hover:text-green-700 duration-300 transition-all ease-in-out"
            />
            <div
                className=" text-sm xl:text-base 2xl:text-lg
                      group-hover:text-green-700
                      group-hover:-translate-x-2
                      duration-300 transition-all ease-in-out"
            >
                {title}
            </div>
        </Link>
    )
}

export default QuickAccessMenusLink