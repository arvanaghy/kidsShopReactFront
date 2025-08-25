import { faChevronUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { getCategoryList } from '@hooks/useMenu';
import JumpingDots from '@components/JumpingDots';


const NavBarItems = () => {
    const [dropDown, setDropDown] = useState(false);
    const [categoryImage, setCategoryImage] = useState(null);

    const { categoryList, isPending } = getCategoryList();
    const categoryRef = useRef(null);
    const navigation = [
        { title: "برگه نخست", path: "/" , subItems: null },
        {
            title: "دسته بندی ها",
            path: "#",
            subItems: categoryList,
        },
        { title: "محصولات", path: "/products", subItems: null },
        { title: "درباره کیدزشاپ", path: "/about-us", subItems: null },
        { title: "تماس با ما", path: "/contact-us", subItems: null },
    ];

    useEffect(() => {
        const handleOutsideClick = (even: Event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setDropDown(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    return (
        <nav
            className={`md:col-span-12 lg:col-span-8 xl:col-span-9 w-full  md:justify-start md:py-5 xl:justify-start xl:py-0  md:px-2 xl:px-0 inset-0 items-center justify-center text-gray-600 text-center align-middle flex flex-row
        md:text-xs md:gap-x-6 lg:gap-x-4 xl:gap-x-6 xl:text-base 2xl:gap-x-8 `}
        >
            {navigation.map((item, idx) => (
                <div key={idx}>
                    <div
                        className="
                  font-EstedadExtraBold
                  tracking-wider leading-relaxed text-pretty
              flex flex-row items-center justify-center
              hover:scale-105
              hover:underline
              hover:underline-offset-8
              hover:text-green-600 transition-all ease-in-out duration-300 text-gray-800 "
                    >
                        {item?.subItems !== null ? (
                            <button
                                className="flex items-center justify-center w-full"
                                onClick={() => {
                                    setDropDown((prev) => !prev);
                                }}
                            >
                                <p>{item?.title}</p>
                                <FontAwesomeIcon
                                    icon={faChevronUp}
                                    className={`px-1.5 ${dropDown ? "" : "rotate-180"}
                      transition-all ease-in-out duration-300
                      `}
                                />
                            </button>
                        ) : (
                            <Link
                                onClick={() => setDropDown(false)}
                                className="flex items-center justify-center w-full"
                                to={item.path}
                            >
                                {item?.title}
                            </Link>
                        )}
                    </div>
                    {item?.subItems?.length > 0 && dropDown && (
                        <div className="relative w-full " ref={categoryRef}>
                            {isPending ? (
                                <JumpingDots />
                            ) : (
                                <div
                                    className="absolute
                        md:w-[85vw] md:top-14 md:px-1.5 py-6
                        lg:w-[90vw] lg:top-8 lg:px-2
                        xl:w-[80vw] xl:top-8 xl:px-4 
                        2xl:w-[85vw] 2xl:top-8 2xl:px-6 
                        z-50 text-center bg-gray-100 font-EstedadLight text-gray-600 grid grid-cols-12 items-center justify-center shadow-md md:rounded-b-lg md:rounded-t-none xl:rounded-lg"
                                >
                                    <div
                                        className="w-full md:col-span-9 grid grid-cols-12 
                        md:gap-3 lg:gap-4 xl:gap-5
                        2xl:gap-6"
                                    >
                                        {item?.subItems.map((dropdownItem: any, idx: number) => (
                                            <Link
                                                onMouseEnter={() => {
                                                    setCategoryImage(dropdownItem);
                                                }}
                                                onMouseLeave={() => {
                                                    setCategoryImage(null);
                                                }}
                                                onFocus={() => {
                                                    setCategoryImage(dropdownItem);
                                                }}
                                                onAbort={() => {
                                                    setCategoryImage(null);
                                                }}
                                                onClick={() => setDropDown(false)}
                                                key={idx}
                                                className="w-fit col-span-4 
                              md:pr-1
                              lg:pr-1.5
                              xl:pr-2
                              2xl:pr-3
                              lg:hover:-translate-x-2
                              hover:text-green-600
                              transition-all ease-in-out duration-300
                              md:border-r
                              lg:border-r-2
                              xl:border-r-4
                               border-blue-500  items-center 
                              justify-center
                              font-EstedadExtraBold
                              tracking-wider
                              "
                                                to={`/category/${Math.floor(dropdownItem?.Code)}`}
                                            >
                                                {dropdownItem?.Name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div
                                        className="w-full col-span-3 
                        md:h-36
                        lg:h-40
                        xl:h-44
                        2xl:h-72
                        overflow-y-auto
                        "
                                    >
                                        {categoryImage && (
                                            <div
                                                className="flex flex-col items-center
                            justify-center"
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_CDN_URL}/category-images/webp/${categoryImage?.PicName}.webp`}
                                                    alt={categoryImage?.Name}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            "https://api.kidsshop110.ir/No_Image_Available.jpg";
                                                    }}
                                                    className=" rounded-lg 
                                md:w-32 md:h-32
                                lg:w-36 lg:h-36
                                xl:w-40 xl:h-40
                                2xl:w-64 2xl:h-64 object-scale-down drop-shadow-lg shadow-black"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        onClick={() => setDropDown(false)}
                                        to="/categories"
                                        className="col-span-12 
pt-8 flex items-center justify-center text-center text-green-600 hover:text-green-900 duration-300
                          hover:scale-105
                          transition-all ease-in-out
                          font-EstedadExtraBold
                          "
                                    >
                                        لیست تمامی دسته بندی ها
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    )
}

export default NavBarItems