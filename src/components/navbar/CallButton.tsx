import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useCompanyInfo } from '@hooks/useGeneralSetting'
import { toPersianDigits } from '@utils/numeralHelpers'
import JumpingDots from '@components/JumpingDots'
const CallButton = () => {
    const { companyInfo, isPending } = useCompanyInfo();
    return (
        <Link to={'/'} className='flex items-center gap-2'>
            <FontAwesomeIcon
                icon={faHeadphones}
                className="block md:text-base xl:text-lg font-bold 2xl:text-2xl "
            />
            {isPending ? <JumpingDots /> :
                <span>{toPersianDigits(companyInfo.Phone)}</span>
            }
        </Link>
    )
}

export default CallButton