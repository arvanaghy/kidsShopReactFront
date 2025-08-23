import React from 'react'
import { formatCurrencyDisplay, toPersianDigits } from '@utils/numeralHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Unit from '@components/Unit';

const CartItem = ({ item }: { item: any }) => {
    return (
        <div className="grid grid-cols-12 w-full p-4 place-items-center border-b gap-2">
            <div className="col-span-12 flex flex-col md:flex-row gap-3 md:gap-5 justify-center items-center w-full order-last text-center bg-gray-200 rounded-sm py-3">
                <div className="border-b py-1 md:py-0">جمع مبلغ این کالا</div>
                <div className="text-sm text-CarbonicBlue-500 font-EstedadExtraBold">
                    {item?.basket?.length > 0 &&
                        formatCurrencyDisplay(
                            item.basket.reduce(
                                (total: number, basketItem: any) =>
                                    total + (basketItem?.SPrice * basketItem?.quantity || 0),
                                0
                            )
                        )}
                    <Unit />
                </div>
            </div>
            <div className="col-span-12 md:col-span-3 flex flex-col justify-around gap-2">
                {item?.item?.product_images?.length > 0 ? (
                    item.item.product_images
                        .filter((img: any) => img?.Def == 1)
                        .map((img: any, idx: number) => (
                            <img
                                key={idx}
                                src={`${import.meta.env.VITE_CDN_URL}/products-image/webp/${img?.PicName}.webp`}
                                alt={item?.item?.Name}
                                className="w-full object-cover rounded-xl"
                            />
                        ))
                ) : (
                    <img
                        src={import.meta.env.VITE_NO_IMAGE_URL}
                        className="w-full object-cover rounded-2xl shadow-lg shadow-gray-300"
                    />
                )}
            </div>
            <div className="col-span-12 md:col-span-9 flex flex-col place-self-start w-full text-black space-y-3 p-1 lg:p-3">
                <Link
                    to={`/product/${item?.item?.Code}`}
                    className="text-base line-clamp-1 font-bold text-CarbonicBlue-500 text-center lg:text-start w-full py-2 lg:py-0"
                >
                    {item?.item?.Name}
                </Link>
                <div className="w-full flex flex-row items-center gap-3 text-sm text-center">
                    <Link
                        className="block text-gray-500 hover:text-gray-700 duration-300 ease-in-out transition-all"
                        to={`/category/${Math.floor(item?.item?.GCode)}`}
                    >
                        {item?.item?.GName}
                    </Link>
                    <Link
                        className="block text-gray-500 hover:text-gray-700 duration-300 ease-in-out transition-all"
                        to={`/sub-category-products/${Math.floor(item?.item?.SCode)}`}
                    >
                        {item?.item?.SName}
                    </Link>
                </div>
                <div className="flex flex-col text-xs lg:text-sm">
                    {item?.item?.Comment && (
                        <div className="text-justify line-clamp-4 px-4 leading-loose">
                            {item?.item?.Comment}
                        </div>
                    )}
                </div>
                {item?.basket?.length > 0 &&
                    item.basket.map((basketItem: any, idx: number) => (
                        <div
                            key={idx}
                            className="px-1.5 flex flex-row gap-2 text-gray-500 text-sm leading-loose"
                        >
                            <FontAwesomeIcon icon={faSquareCheck} className="text-green-600" />
                            {formatCurrencyDisplay(basketItem?.quantity)} {item?.item?.Vahed}{" "}
                            {item?.item?.Name} <b>{basketItem?.feature?.ColorName} </b> رنگ به سایز{" "}
                            <b>{toPersianDigits(basketItem?.feature?.SizeNum)}</b> و جمع مبلغ{" "}
                            {formatCurrencyDisplay(basketItem?.SPrice * basketItem?.quantity)}{" "}
                            <Unit />
                        </div>
                    ))}
            </div>
        </div>

    )
}

export default CartItem