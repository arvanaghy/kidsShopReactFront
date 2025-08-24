import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCompanyInfo } from '@hooks/useGeneralSetting'
import { toPersianDigits } from '@utils/numeralHelpers'
import JumpingDots from '@components/JumpingDots'
const CallButton = () => {
    const { companyInfo, isPending } = useCompanyInfo();
    return (
        <button type='button' onClick={() => window.open(`tel:${companyInfo.Phone}`)} className='flex items-center gap-2'>
            <FontAwesomeIcon
                icon={faHeadphones}
                className="block md:text-base xl:text-lg font-bold 2xl:text-2xl "
            />
            {isPending ? <JumpingDots /> :
                <span>{toPersianDigits(companyInfo.Phone)}</span>
            }
        </button>
    )
}

export default CallButton