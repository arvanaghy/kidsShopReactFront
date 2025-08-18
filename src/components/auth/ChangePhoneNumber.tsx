import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePhoneNumber = () => {
    const navigate = useNavigate();
    return (
        <button
            className="flex justify-center px-3 py-2 mr-auto text-center text-gray-100 rounded-lg font-EstedadMedium items center bg-Purple-500 hover:bg-CarbonicBlue-500 hover:text-white text-xs"
            onClick={() => {
                navigate("/login");
            }}
        >
            ویرایش شماره همراه
        </button>
    )
}

export default ChangePhoneNumber