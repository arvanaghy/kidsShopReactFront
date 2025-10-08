import React from 'react'
import { formatCurrencyDisplay, toPersianDigits } from '@utils/numeralHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Unit from '@components/Unit';
import { RGBtoHexConverter } from '@utils/RGBtoHexConverter';

const CartItem = ({ item }: { item: any }) => {
    return (
        <div className="grid grid-cols-12 w-full p-1.5 md:p-4 place-items-center border-b gap-2">

            <div className="col-span-12 md:col-span-3 flex flex-col justify-around md:gap-2 gap-1.5">
                {item?.item?.product_images?.length > 0 ? (
                    item.item.product_images
                        .filter((img: any) => img?.Def == 1)
                        .map((img: any, idx: number) => (
                            <img
                                key={idx}
                                src={`${import.meta.env.VITE_CDN_URL}/products-image/webp/${img?.PicName}.webp`}
                                alt={item?.item?.Name}
                                className="w-full object-cover rounded-xl aspect-square "
                            />
                        ))
                ) : (
                    <img
                        src={import.meta.env.VITE_NO_IMAGE_URL}
                        className="w-full object-cover rounded-xl aspect-square"
                    />
                )}
            </div>
            <div className="w-full col-span-12 md:col-span-9 flex flex-col gap-2  text-black space-y-3 p-1 lg:p-3">
                <div className="w-full flex flex-row justify-center items-center flex-wrap">
                    <Link
                        to={`/product/${item?.item?.Code}`}
                        className="text-base line-clamp-1 font-bold text-CarbonicBlue-500 text-center lg:text-start w-full py-2 lg:py-0"
                    >
                        {item?.item?.Name}
                    </Link>
                    <div className="w-full flex flex-row items-center md:gap-3 text-sm md:justify-end md:text-end flex-wrap">
                        <Link
                            className="whitespace-nowrap block w-fit text-gray-500 hover:text-gray-700 duration-300 ease-in-out transition-all"
                            to={`/category/${Math.floor(item?.item?.GCode)}`}
                        >
                            {item?.item?.GName}
                        </Link>
                        <span className='mx-1'>/</span>
                        <Link
                            className="whitespace-nowrap block w-fit text-gray-500 hover:text-gray-700 duration-300 ease-in-out transition-all"
                            to={`/sub-category-products/${Math.floor(item?.item?.SCode)}`}
                        >
                            {item?.item?.SName}
                        </Link>
                    </div>
                </div>

                {item?.basket?.length > 0 &&
                    item.basket.map((basketItem: any, idx: number) => (
                        <div
                            key={idx}
                            className="w-full px-1.5 flex flex-row gap-2 text-gray-500 text-xs md:text-sm leading-loose items-center flex-wrap"
                        >
                            <p className='font-EstedadExtraBold border-b-2 border-gray-300 '>

                                {formatCurrencyDisplay(basketItem?.quantity)}
                            </p>
                            <p >{item?.item?.Vahed}</p>
                            <p className='font-EstedadExtraBold'>
                                {item?.item?.Name}
                            </p>
                            <p
                                className="w-5 h-5 rounded-full"
                                style={{
                                    backgroundColor: RGBtoHexConverter(
                                        basketItem?.feature?.RGB
                                    ) || "#000000",
                                }}
                            ></p>
                            <p className='border-b-2 border-gray-300'>
                                {basketItem?.feature?.ColorName}
                            </p>
                            <p>
                                به سایز
                            </p>
                            <p className='font-EstedadExtraBold border-b-2 border-gray-300'>
                                {toPersianDigits(basketItem?.feature?.SizeNum)}
                            </p>
                            <p>
                                و جمع مبلغ
                            </p>
                            <p className='font-EstedadExtraBold border-b-2 border-gray-300'>
                                {formatCurrencyDisplay(basketItem?.SPrice * basketItem?.quantity)}
                            </p>
                            <Unit forced={true} />
                        </div>
                    ))}
            </div>
            <div className="col-span-12 flex flex-col md:flex-row gap-3 md:gap-5 justify-center items-center w-full text-center bg-gray-200 rounded-sm py-2">
                <div className="border-b py-1 md:py-0">جمع مبلغ</div>
                <div className="flex flex-row text-sm text-CarbonicBlue-500 font-EstedadExtraBold">
                    {item?.basket?.length > 0 &&
                        formatCurrencyDisplay(
                            item.basket.reduce(
                                (total: number, basketItem: any) =>
                                    total + (basketItem?.SPrice * basketItem?.quantity || 0),
                                0
                            )
                        )}
                    <Unit forced={true} />
                </div>
            </div>
        </div>

    )
}

export default CartItem