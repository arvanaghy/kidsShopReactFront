import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCartStore } from '@store/CartStore';
import { confirmToast } from '@utils/confirmToast';
import { useState } from 'react'
import toast from 'react-hot-toast';

const RemoveProductFromCart = ({ productCode }) => {
    const { cart, removeProductFromCart } = useCartStore();
    const [isPending, setIsPending] = useState(false);
    const handleRemoveProductFromCart = async (productCode) => {
        if (isPending) return;
        try {
            const isConfirmed = await confirmToast("آیا از حذف این آیتم مطمئن هستید؟");
            if (!isConfirmed) return;
            removeProductFromCart(productCode);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    return (
        <button onClick={() => handleRemoveProductFromCart(productCode)}>
            <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out mx-1"
            />
        </button>
    )
}

export default RemoveProductFromCart