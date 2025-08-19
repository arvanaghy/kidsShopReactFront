import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import {useCompanyInfo} from '@hooks/useGeneralSetting'

const InstagramBanner = (): JSX.Element => {

  const { companyInfo } = useCompanyInfo();

  return (
    <Link
      to={companyInfo?.Instagram || import.meta.env.VITE_SOCIAL_MEDIA_INSTAGRAM}
      target="_blank"
      className="flex flex-col xl:flex-row items-center justify-center gap-8 bg-gray-900 max-w-4xl mx-auto py-4 rounded-2xl
        hover:shadow-md shadow-black
        md:hover:scale-105
        hover:bg-gray-800
        transition-all duration-300 ease-in-out
        "
    >
      <p className="text-white text-base xl:text-2xl 2xl:text-3xl font-EstedadExtraBold">
        ما را در اینستاگرام دنبال کنید
      </p>
      <div className="flex flex-row items-center justify-center gap-3">
        <p className="text-white text-base xl:text-2xl font-extrabold 2xl:text-4xl">
          kids_shop.110
        </p>
        <FontAwesomeIcon
          icon={faInstagram}
          className="text-xl xl:text-6xl text-white"
        />
      </div>
    </Link>
  )
}

export default InstagramBanner