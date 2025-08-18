import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePhoneNumber = () => {
    const navigate = useNavigate();
    return (
        <button
            className="flex justify-center px-4 py-3 mx-auto text-sm text-center text-gray-100 rounded-lg font-EstedadMedium items center bg-CarbonicBlue-500 hover:bg-Purple-500 hover:text-white"
            onClick={() => {
                navigate("/login");
            }}
        >
            ویرایش شماره همراه
        </button>
    )
}

export default ChangePhoneNumber