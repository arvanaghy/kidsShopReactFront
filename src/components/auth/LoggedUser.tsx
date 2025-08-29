import LogoutButton from '@components/profile/LogoutButton'
import { faBoxesStacked, faCartShopping, faGaugeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const LoggedUser = () => {

    return (
        <div className='flex flex-col justify-center items-center space-y-2 gap-2'>
            <p className='text-center font-EstedadExtraBold tracking-wider leading-loose
            '>شما قبلا به حساب کاربری خود وارد شده اید </p>
            <p className='text-center font-EstedadMedium text-sm tracking wide leading-relaxed'>لینک های دسترسی سریع</p>
            <div className="flex flex-col justify-center items-center gap-1.5
            space-y-1.5
            ">
                <Link to="/profile" className='font-EstedadMedium flex flex-row items-center justify-center text-blue-600 tracking-wide hover:text-blue-700 gap-x-3 group'>
                    <FontAwesomeIcon icon={faGaugeHigh} className='text-gray-700' />
                    <span className='group-hover:-translate-x-2 transition-all duration-150 delay-75'>
                        حساب کاربری
                    </span>
                </Link>
                <Link to="/products" className='font-EstedadMedium flex flex-row items-center justify-center text-blue-600 tracking-wide hover:text-blue-700 gap-x-3 group'>
                    <FontAwesomeIcon icon={faBoxesStacked} className='text-gray-700' />
                    <span className='group-hover:-translate-x-2 transition-all duration-150 delay-75' >
                        محصولات
                    </span>
                </Link>
                <Link to="/shopping-cart" className='font-EstedadMedium flex flex-row items-center justify-center text-blue-600 tracking-wide hover:text-blue-700 gap-x-3 group'>
                    <FontAwesomeIcon icon={faCartShopping} className='text-gray-700' />
                    <span className='group-hover:-translate-x-2 transition-all duration-150 delay-75'>
                        سبد خرید
                    </span>
                </Link>
                <LogoutButton />
            </div>
        </div>
    )
}

export default LoggedUser;