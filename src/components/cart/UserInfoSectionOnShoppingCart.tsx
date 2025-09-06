import JumpingDots from '@components/JumpingDots';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileService } from '@services/ProfileService';
import { useUserStore } from '@store/UserStore';
import { useState } from 'react';

const UserInfoSectionOnShoppingCart = () => {
    const { user, updateUser } = useUserStore();
    const [toggleEditAddress, setToggleEditAddress] = useState(false);
    const [address, setAddress] = useState(user?.Address || '')
    const [isPending, setIsPending] = useState(false);


    const handleSubmitChangeAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ProfileService.updateUserAddress(user, updateUser, address, isPending, setIsPending);
        setToggleEditAddress(false);
    }
    if (isPending) return <JumpingDots />
    return (
        !toggleEditAddress ? (
            <div className='flex flex-row justify-start items-center gap-x-1.5'>
                <button
                    onClick={() => setToggleEditAddress(true)}
                    className='text-base w-fit text-Purple-500' >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <p className='w-fit text-gray-600 text-sm leading-loose font-EstedadLight'>{user?.Address}</p>
            </div>
        ) : (
            <form onSubmit={handleSubmitChangeAddress} className='w-full justify-center flex flex-row'>
                <textarea
                    className="w-full p-1.5 border
                    text-sm font-EstedadLight rounded-r
                    border-CarbonicBlue-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button
                    type="submit"
                    className=' w-fit bg-Purple-500 rounded-l
                    text-white font-EstedadExtraBold' >
                    <FontAwesomeIcon icon={faCheck} className='font-extrabold w-6 h-4' />
                </button>
            </form>
        )


    )
}

export default UserInfoSectionOnShoppingCart