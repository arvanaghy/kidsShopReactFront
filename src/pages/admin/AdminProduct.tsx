import Loading from '@components/Loading';
import { faFlag, faKeyboard, faSquarePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteProductImage, useMakeProductImageMain, useSingleProduct } from '@hooks/useProduct';
import AdminLayout from '@layouts/admin/AdminLayout'
import { formatCurrencyDisplay, toPersianDigits } from '@utils/numeralHelpers';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Unit from '@components/Unit';


const AdminProduct = () => {

    const { productCode } = useParams() as { productCode: string | number };
    const navigate = useNavigate();


    const { product,
        isPending,
    } = useSingleProduct(productCode);

    const { handleMakeProductImageMain, isPending: isPendingMakeMain } = useMakeProductImageMain();
    const { handleDeleteProductImage, isPending: isPendingDelete } = useDeleteProductImage();

    if (isPending || isPendingMakeMain || isPendingDelete) return <Loading />;

    return (
        <AdminLayout>
            <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
                <div className="border rounded-2xl shadow-lg bg-white p-4 flex flex-col justify-around space-y-2">
                    <div className="w-full text-sm flex flex-col lg:flex-row items-center justify-around  py-2 px-4 space-y-1">
                        <div className="flex flex-col text-xs gap-2 justify-center items-center text-gray-600">
                            <p>{product?.SName}</p>
                            <p>{product?.GName}</p>
                        </div>
                        <div className="flex flex-col text-sm gap-2 justify-center items-center">
                            <p className='text-blue-800'>{product?.Name}</p>
                            <p className='flex flex-row'>
                                {product?.SPrice ? formatCurrencyDisplay(product?.SPrice) : "۰"}
                                <Unit />
                            </p>
                        </div>
                    </div>
                    <div className=" border-dotted border-2 p-2">
                        {product?.product_size_color?.map((item: any, index: number) => (
                            <div key={index} className="border-b last:border-0 py-2 px-4 flex justify-between text-xs">
                                <p>رنگ: {item.ColorName} - سایز: {item.SizeNum}</p>
                                <p> موجودی: {toPersianDigits(item.Mande)} {product?.Vahed} </p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full text-xs flex flex-col items-center justify-center border-2 border-dotted  p-2">
                        <div className="w-full flex flex-row justify-between items-center border-b pb-0.5">
                            <p>توضیحات:</p>
                            <button
                                onClick={() => {
                                    navigate(`/admin/product/comment/${product?.Code}`);
                                }}
                                className="bg-blue-500 text-white rounded-lg px-2 py-1 mx-2 hover:bg-blue-700">
                                <FontAwesomeIcon icon={faKeyboard} className='text-lg' />
                            </button>
                        </div>
                        <div className="p-2">
                            {parse(product?.Comment || '')}
                        </div>

                    </div>
                    <div className="w-full text-xs flex flex-col items-center justify-center border-2 border-dotted  p-2">
                        <div className="w-full flex flex-row justify-between items-center border-b pb-0.5">
                            <p>تصاویر</p>
                            <button
                                onClick={() => {
                                    navigate(`/admin/product/images/${product?.Code}`);
                                }}
                                className='text-blue-500 text-2xl hover:text-blue-700'>
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </button>
                        </div>
                        <div className="flex flex-row flex-wrap gap-1.5 justify-center items-center">
                            {product?.product_images?.map((img: string, index: number) => (
                                <div className="relative" key={index}>
                                    <img src={`${img?.PicName || ''}`} alt="product" className="w-24 object-scale-down m-2 inline-block" />
                                    <button
                                        onClick={() => handleDeleteProductImage(product?.Code, img?.Code)}
                                        className="absolute bottom-0 left-0 right-0 py-0.5 leading-relaxed hover:bg-red-800 text-xs bg-red-500 text-white rounded-lg">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                    {img?.Def != 1 ? (
                                        <button
                                            onClick={() => handleMakeProductImageMain(product?.Code, img?.Code)}
                                            className='absolute top-0 left-0 p-2 text-xs bg-yellow-500 text-white rounded-lg hover:bg-yellow-700
                                    cursor-pointer transition-all ease-in-out duration-300'
                                            aria-label='انتخاب به عنوان عکس  کاور'
                                        >
                                            <FontAwesomeIcon icon={faFlag} />
                                        </button>
                                    ) : (

                                        <div className="absolute top-0 left-0 p-2 text-xs bg-green-500 text-white rounded-lg ">
                                            <FontAwesomeIcon icon={faFlag} className="text-white" />
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminProduct