import ColorFilter from '@components/filters/ColorFilter';
import ProductSearch from '@components/filters/ProductSearch';
import SizeFilter from '@components/filters/SizeFilter';
import { faEraser, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFilterNavigation } from '@hooks/useFilters';
import { useNavbarVisibility } from '@hooks/useMenu';
import { useEffect, useState } from 'react';

const SideFilter = ({
    searchPhrase,
    sizeSets,
    setSizeSets,
    colorSets,
    setColorSets,
    sort_price,
    sizes,
    colors,
    navigation,
}: {
    searchPhrase: string;
    sizeSets: string[];
    setSizeSets: (sizeSets: string[]) => void;
    colorSets: string[];
    setColorSets: (colorSets: string[]) => void;
    sort_price: string | undefined | null;
    sizes: string[];
    colors: string[];
    navigation: string;
}) => {
    const isNavbarVisible = useNavbarVisibility();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { removeFilters, applyFilters } = useFilterNavigation(
        navigation,
        searchPhrase,
        sizeSets,
        colorSets,
        sort_price,
        setSizeSets,
        setColorSets
    );


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full col-span-12 md:col-span-4 xl:col-span-3 h-full order-2 md:order-1 p-4 bg-gray-600 rounded-lg">
            <div
                className={`w-full sticky space-y-1
                ${isNavbarVisible
                        ? 'md:top-[21vh] lg:top-[19vh] xl:top-[23vh] 2xl:top-[21.5vh]'
                        : 'md:top-[12vh] lg:top-[9vh] xl:top-[14vh] 2xl:top-[13vh]'
                    }`}
            >
                <div className="flex md:flex-col lg:flex-row items-center justify-between gap-3 py-1.5">
                    <button
                        className="hidden md:flex group bg-red-600 text-white rounded-lg w-full py-1.5 items-center justify-center hover:bg-red-800 transition-all duration-300 ease-in-out gap-x-2"
                        onClick={removeFilters}
                    >
                        <FontAwesomeIcon icon={faEraser} className="text-lg" />
                        <span className="group-hover:-translate-x-1 duration-300 ease-in-out font-EstedadMedium text-sm">
                            پاک کردن فیلتر
                        </span>
                    </button>
                    <button
                        onClick={applyFilters}
                        className="hidden md:flex flex-row gap-x-2 bg-green-600 text-white rounded-lg w-full py-1.5 items-center justify-center group hover:bg-green-800 transition-all duration-300 ease-in-out"
                    >
                        <FontAwesomeIcon icon={faFilter} />
                        <p className="group-hover:-translate-x-1 duration-300 ease-in-out font-EstedadMedium text-sm">
                            اعمال فیلتر
                        </p>
                    </button>
                </div>

                {!isMobile && <ProductSearch search={searchPhrase} />}
                {sizes?.length > 0 && !isMobile && (
                    <SizeFilter sizes={sizes} sizeSets={sizeSets} setSizeSets={setSizeSets} />
                )}
                {colors?.length > 0 && !isMobile && (
                    <ColorFilter colors={colors} colorSets={colorSets} setColorSets={setColorSets} />
                )}
            </div>
        </div>
    );
};

export default SideFilter;