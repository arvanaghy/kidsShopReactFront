import { faBookmark, faBoxesPacking, faCertificate, faRestroom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useCompareStore } from '@store/CompareStore'
import { useFavoriteStore } from '@store/FavoriteStore'

const CFOBSection = () => {
    const { compareList } = useCompareStore();
    const { favorite } = useFavoriteStore();
    return (
        <>
            <Link
                to={"/compare-products"}
                className={`flex flex-row items-center
            hover:scale-105
            ${compareList.length > 0 ? "text-purple-600" : ""}
            hover:text-green-600 transition-all ease-in-out duration-300`}
                title="مقایسه محصولات"
            >
                <FontAwesomeIcon
                    icon={faRestroom}
                    className="md:text-base xl:text-xl 2xl:text-2xl"
                />
            </Link>
            <Link
                to={"/my-favorite"}
                className={`flex flex-row items-center
            hover:scale-105
            ${favorite.length > 0 ? "text-purple-600" : ""}
            hover:text-green-600 transition-all ease-in-out duration-300`}
                title="علاقه مندی ها"
            >
                <FontAwesomeIcon
                    icon={faBookmark}
                    className="md:text-base xl:text-xl 2xl:text-2xl"
                />
            </Link>
            <Link
                to={"/offered-products"}
                className="
            flex flex-row  items-center justify-center
            hover:scale-105
            hover:text-green-600 transition-all ease-in-out duration-300
            gap-x-1.5
            "
                title="محصولات ویژه"
            >
                <FontAwesomeIcon
                    icon={faCertificate}
                    className="md:text-base xl:text-xl 2xl:text-2xl"
                />
                <span className="text-xs leading-relaxed 2xl:text-lg font-EstedadExtraBold tracking-widest">
                    محصولات ویژه
                </span>
            </Link>
            <Link
                to={"/best-selling-products"}
                className="
            flex flex-row  items-center justify-center
            hover:scale-105 
            hover:text-green-600 transition-all ease-in-out duration-300
            gap-x-1.5
            "
                title="پرفروش ترین ها"
            >
                <FontAwesomeIcon
                    icon={faBoxesPacking}
                    className="md:text-base xl:text-xl 2xl:text-2xl"
                />
                <span className="text-xs 2xl:text-lg leading-relaxed font-EstedadExtraBold tracking-widest">
                    پرفروش ترین ها
                </span>
            </Link>
        </>
    )
}

export default CFOBSection