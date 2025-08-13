import { Link } from "react-router-dom"

const Copyright: React.FC = () => {
    return (
        <div className="w-full text-xs xl:text-base 2xl:text-2xl text-center leading-relaxed font-EstedadMedium text-gray-800 flex flex-col md:flex-row items-center justify-center bg-gray-300 py-2 lg:py-4 xl:py-6 gap-x-2 rounded-t-lg">
            تمامی حقوق برای سایت کیدزشاپ محفوظ است!
            <div className="flex flex-row justify-center items-center gap-5">
                <p>تیم طراحی و توسعه</p>
                <Link
                    to="https://hesmasoft.ir"
                    target="_blank"
                    className="block text-CarbonicBlue-500 hover:text-CarbonicBlue-800 text-xs xl:text-base 2xl:text-2xl
            hover:-translate-x-2 font-EstedadExtraBold
            transition-all duration-300 ease-in-out"
                >
                    حسما سافت
                </Link>
            </div>
        </div>
    )
}

export default Copyright