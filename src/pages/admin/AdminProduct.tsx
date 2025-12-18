import Loading from '@components/Loading';
import { faFlag, faKeyboard, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSingleProduct } from '@hooks/useProduct';
import AdminLayout from '@layouts/admin/AdminLayout'
import { formatCurrencyDisplay, toPersianDigits } from '@utils/numeralHelpers';
import { useParams } from 'react-router-dom';

const AdminProduct = () => {

    const { productCode } = useParams() as { productCode: string | number };


    const { product,
        isPending,
    } = useSingleProduct(productCode);

    const makeMainImage = (e: any) => {
        e.preventDefault();
        // Logic to make an image the main image
    }


    if (isPending) return <Loading />;

    console.log(product)

    return (
        <AdminLayout>
            <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
                <div className="border rounded-2xl shadow-lg bg-white py-4 flex flex-col justify-around">
                    <div className="w-full text-sm flex flex-col lg:flex-row items-center justify-around border-b pb-2 px-4 space-y-1">
                        <div className="flex flex-col text-xs">
                            <p>{product?.SName}</p>
                            <p>{product?.GName}</p>
                        </div>
                        <p>{product?.Name}</p>
                    </div>
                    <div className="">
                        <p>
                            {product?.SPrice ? formatCurrencyDisplay(product?.SPrice) : "۰"}
                        </p>
                    </div>
                    <div className="text-xs flex items-center justify-center">
                        {product?.Comment }
                        <button
                        onClick={() => {
                            
                        }
                        className="bg-blue-500 text-white rounded-lg px-2 py-1 mx-2 hover:bg-blue-700">
                           <FontAwesomeIcon icon={faKeyboard} className='text-lg' />
                        </button>
                    </div>
                    <div className="">
                        {product?.product_size_color?.map((item: any, index: number) => (
                            <div key={index} className="border-b last:border-0 py-2 px-4 flex justify-between text-xs">
                                <p>رنگ: {item.ColorName} - سایز: {item.SizeNum}</p>
                                <p> موجودی: {toPersianDigits(item.Mande)} {product?.Vahed} </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row flex-wrap justify-center gap-2">
                        {product?.product_images?.map((img: string, index: number) => (
                            <div className="relative" key={index}>
                                <img src={`https://api.kidsshop110.ir/products-image/webp/${product?.GCode}/${product?.SCode}/${img?.PicName}.webp`} alt="product" className="w-24 object-scale-down m-2 inline-block" />
                                <button
                                    className="absolute bottom-0 left-0 right-0 py-0.5 leading-relaxed hover:bg-red-800 text-xs bg-red-500 text-white rounded-lg">
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                                {img?.Def != 1 ? (
                                    <form onSubmit={makeMainImage} className='absolute top-0 left-0 p-2 text-xs bg-yellow-500 text-white rounded-lg hover:bg-yellow-700
                                    '
                                    aria-label='انتخاب به عنوان عکس  کاور'
                                    >
                                        <input type="hidden" name="imageCode" value={img?.Code} />
                                        <input type="hidden" name="CodeKala" value={img?.CodeKala} />
                                        <button
                                            type="submit"
                                            className="">
                                            <FontAwesomeIcon icon={faFlag} />
                                        </button>
                                    </form>
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
        </AdminLayout>
    )
}

export default AdminProduct