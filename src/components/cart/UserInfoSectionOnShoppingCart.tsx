import JumpingDots from '@components/JumpingDots';
import { faCheck, faCircleInfo, faPenToSquare, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileService } from '@services/ProfileService';
import { useUserStore } from '@store/UserStore';
import { toPersianDigits } from '@utils/numeralHelpers';
import { useState } from 'react';

const UserInfoSectionOnShoppingCart = () => {
    const { user, updateUser } = useUserStore();
    const [toggleEditAddress, setToggleEditAddress] = useState(false);
    const [address, setAddress] = useState(user?.Address || '')
    const [isPending, setIsPending] = useState(false);


    const handleSubmitChangeAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ProfileService.updateUserAddress(user, updateUser, address, setAddress, isPending, setIsPending);
        setToggleEditAddress(false);
    }
    if (isPending) return <JumpingDots />
    return (
        !toggleEditAddress ? (
            <div className='w-full flex flex-col justify-center items-center '>
                <div className="flex flex-row justify-between items-center w-full  pb-0.5">
                    <div className="flex flex-row gap-3 items-center">
                        <FontAwesomeIcon icon={faCircleInfo} className='text-blue-500'
                            title='اطلاعات شخصی' />
                        <div className="flex flex-col gap-0.5">
                            <p className='w-full text-start font-EstedadLight text-xs text-gray-600'>{user?.Name}</p>
                            <p className='font-EstedadLight text-xs w-full text-start text-gray-600'>{toPersianDigits(user?.Mobile)}</p>
                        </div>
                    </div>
                    <div className="flex items-end justify-end">
                        <button
                            onClick={() => setToggleEditAddress(true)}
                            title='ویرایش آدرس'
                            className='text-base w-fit text-Purple-500 hover:text-purple-800 transition-all ease-in-out duration-150 ' >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center text-start text-gray-800 text-sm leading-loose font-EstedadLight gap-2'>
                    <FontAwesomeIcon icon={faTruckFast}
                        title='آدرس'
                        className='text-blue-500 ' />
                    <p>{user?.Address}</p>
                </div>
            </div>
        ) : (
            <form onSubmit={handleSubmitChangeAddress} className='w-full justify-center flex flex-row'>
                <textarea
                    className="w-full p-1.5 border
                    text-sm font-EstedadLight rounded-r
                    border-CarbonicBlue-500"
                    value={address}
                    rows={4}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button
                    type="submit"
                    title='ثبت تغییر آدرس'
                    className=' w-fit bg-Purple-500 rounded-l
                    text-white font-EstedadExtraBold hover:bg-purple-800
                    transition-all ease-in-out duration-150
                    ' >
                    <FontAwesomeIcon icon={faCheck} className='font-extrabold w-6 h-4' />
                </button>
            </form>
        )


    )
}

export default UserInfoSectionOnShoppingCart