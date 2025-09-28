import React from 'react'
import { Link } from 'react-router-dom'

const SortFilters = (
    { sort_price, searchPhrase, size, color , navigation }: { sort_price: string, searchPhrase: string | null, size: string | null, color: string | null , navigation: string }
) => {
    return (
        <div className="w-full col-span-12 gap-3 flex flex-row justify-start items-center">
            <Link
                to={`/${navigation}?product_page=${1}${size != null ? `&size=${size}` : ""
                    }${color != null ? `&color=${color}` : ""}${searchPhrase != null ? `&search=${searchPhrase}` : ""
                    }`}
                className={`font-EstedadLight text-sm  border border-CarbonicBlue-500 rounded-lg p-2
               ${sort_price != "asc" && sort_price != "desc"
                        ? "bg-CarbonicBlue-500 text-white border-gray-100 hover:bg-CarbonicBlue-500/80 "
                        : "bg-Cream-500 text-gray-800 border-CarbonicBlue-500  hover:text-black border-CarbonicBlue-500/40  hover:bg-Cream-500/50"
                    }
               `}
            >
                جدید ترین ها
            </Link>
            <Link
                to={`/${navigation}?product_page=${1}${searchPhrase != null ? `&search=${searchPhrase}` : ""
                    }${size != null ? `&size=${size}` : ""}${color != null ? `&color=${color}` : ""
                    }&sort_price=asc`}
                className={`font-EstedadLight text-sm  border  rounded-lg p-2
               transition-all duration-300 ease-in-out
               ${sort_price == "asc"
                        ? "bg-CarbonicBlue-500 text-white border-gray-100 hover:bg-CarbonicBlue-500/80 "
                        : "bg-Cream-500 text-gray-800 border-CarbonicBlue-500  hover:text-black border-CarbonicBlue-500/40  hover:bg-Cream-500/50"
                    }
               `}
            >
                ارزان ترین ها
            </Link>
            <Link
                to={`/${navigation}?product_page=${1}${size != null ? `&size=${size}` : ""
                    }${searchPhrase != null ? `&search=${searchPhrase}` : ""}${color != null ? `&color=${color}` : ""
                    }&sort_price=desc`}
                className={`font-EstedadLight text-sm  border  rounded-lg p-2
               transition-all duration-300 ease-in-out
               ${sort_price == "desc"
                        ? "bg-CarbonicBlue-500 text-white border-gray-100 hover:bg-CarbonicBlue-500/80 "
                        : "bg-Cream-500 text-gray-800 border-CarbonicBlue-500  hover:text-black border-CarbonicBlue-500/40  hover:bg-Cream-500/50"
                    }
               `}
            >
                گرانترین ها
            </Link>
        </div>
    )
}

export default SortFilters