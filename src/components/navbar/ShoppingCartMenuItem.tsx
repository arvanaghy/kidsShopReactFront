import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatCurrencyDisplay } from '@utils/numeralHelpers'
import { Link } from 'react-router-dom'
import { useCartStore } from '@store/CartStore'

const ShoppingCartMenuItem = () => {
    const { cart } = useCartStore();
    return (
        <Link
            to={"/shopping-cart"}
            className="relative flex items-center justify-center text-center text-gray-700 group"
        >
            {cart?.length > 0 && (
                <span
                    className=" flex items-center justify-center absolute 
                      leading-none
                      bg-green-600/80 rounded-full
                      text-center text-CarbonicBlue-600 
                      text-white
                      xl:p-2
                      p-1
                      -top-3
                      left-2
                    group-hover:bg-white
                     group-hover:text-gray-600
                      duration-300 transition-all ease-in-out
                      lg:animate-bounce
                      text-xs
                      font-EstedadLight
                      z-50
                      "
                >
                    {formatCurrencyDisplay(cart?.length)}
                </span>
            )}
            <FontAwesomeIcon
                icon={faBagShopping}
                className="text-gray-600
                   md:text-base xl:text-xl 2xl:text-3xl
                  group-hover:text-green-600 mx-2 md:mx-5
                  group-hover:scale-105 drop-shadow-md duration-300 transition-all ease-in-out"
            />
        </Link>
    )
}

export default ShoppingCartMenuItem