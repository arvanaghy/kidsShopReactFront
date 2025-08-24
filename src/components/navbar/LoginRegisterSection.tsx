import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useUserStore } from '@store/UserStore'

const LoginRegisterSection = () => {
    const {user} = useUserStore();
    return (
        <>
            {user?.Name !== "" && user?.UToken !== "" ? (
                <div>
                    <Link
                        to="/profile"
                        className="flex flex-row items-center justify-center text-center align-middle  
                      hover:text-green-700 text-green-500 duration-300 transition-all ease-in-out 
                      gap-x-1.5
                      "
                    >
                        <FontAwesomeIcon
                            icon={faUserTie}
                            className="block 2xl:text-2xl"
                        />
                        <span>{user?.Name}</span>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-row items-center justify-center">
                    <Link
                        to={"/login"}
                        className="flex flex-row items-center justify-center 
                        text-center text-gray-600
                        hover:text-green-600 duration-300 transition-all ease-in-out
                        gap-x-1.5
                        "
                    >
                        <FontAwesomeIcon
                            icon={faUserTie}
                            className="block md:text-base xl:text-lg 2xl:text-2xl"
                        />
                        <span className="block leading-relaxed tracking-wide text-pretty">
                            ورود (عضویت)
                        </span>
                    </Link>
                </div>
            )}
        </>

    )
}

export default LoginRegisterSection