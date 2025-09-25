import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductSearch from "@components/filters/ProductSearch";
import SizeFilter from "@components/filters/SizeFilter";
import ColorFilter from "@components/filters/ColorFilter";
import { buildQueryString } from "@utils/queryUtils";
import { useFilterNavigation } from "@hooks/useFilters";

interface MobileFilterModalProps {
    searchPhrase: string | null;
    sizeSets: string[];
    setSizeSets: (sizeSets: string[]) => void;
    colorSets: string[];
    setColorSets: (colorSets: string[]) => void;
    isModal: boolean;
    setIsModal: (modal: boolean) => void;
    sort_price: string | null;
    sizes: string[];
    colors: string[];
    navigation: string;
}

const MobileFilterModal = ({
    searchPhrase,
    sizeSets,
    setSizeSets,
    colorSets,
    setColorSets,
    isModal,
    setIsModal,
    sort_price,
    sizes,
    colors,
    navigation,
}: MobileFilterModalProps) => {
    const navigate = useNavigate();
    const mobileFilterRef = useRef<HTMLDivElement>(null);

    const { removeFilters, applyFilters } = useFilterNavigation(
        navigation,
        searchPhrase,
        sizeSets,
        colorSets,
        sort_price,
        setSizeSets,
        setColorSets,
        setIsModal
    );

    useEffect(() => {
        if (isModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModal]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileFilterRef.current &&
                !mobileFilterRef.current.contains(event.target as Node)
            ) {
                setIsModal(false);
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);


    if (!isModal) return null;

    return (
        <div
            ref={mobileFilterRef}
            className="fixed inset-2 max-h-[75vh] top-[15vh] rounded-xl bg-stone-100 p-1.5 overflow-y-scroll z-50 md:hidden flex flex-col items-center justify-between space-y-2 shadow-lg shadow-gray-600"
        >
            <div className="flex flex-row items-center justify-between w-full">
                <button
                    className="flex flex-row items-center justify-center font-EstedadLight gap-x-1.5 bg-red-600 text-white rounded-lg p-1.5"
                    onClick={removeFilters}
                >
                    <FontAwesomeIcon icon={faEraser} className="text-sm" />
                    <span className="block text-xs">پاک کردن فیلترها</span>
                </button>
                <button
                    onClick={applyFilters}
                    className="flex flex-row items-center justify-center font-EstedadLight gap-x-1.5 bg-green-600 text-white rounded-lg p-1.5"
                >
                    <FontAwesomeIcon icon={faFilter} className="text-sm" />
                    <span className="block text-xs">اعمال فیلترها</span>
                </button>
                <button
                    onClick={() => setIsModal(false)}
                    className="bg-red-500 px-1.5 text-white rounded-xl hover:bg-red-700"
                >
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
            <ProductSearch search={searchPhrase} />
            {sizes?.length > 0 && (
                <SizeFilter
                    sizes={sizes}
                    sizeSets={sizeSets}
                    setSizeSets={setSizeSets}
                />
            )}
            {colors?.length > 0 && (
                <ColorFilter
                    colors={colors}
                    colorSets={colorSets}
                    setColorSets={setColorSets}
                />
            )}
        </div>
    );
};

export default MobileFilterModal;