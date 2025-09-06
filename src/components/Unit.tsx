import { useGeneralStore } from "@store/GeneralStore";
import { useEffect } from "react";

const Unit = ({ forced = false }: { forced?: boolean }) => {
    const { currencyUnit, getCurrencyUnit } = useGeneralStore();
    useEffect(() => {
        getCurrencyUnit(forced);
    }, []);

    return (
        <span className="w-fit flex flex-row items-center justify-center px-1.5 text-xs text-gray-700 font-EstedadLight">
            {currencyUnit?.value}
        </span>
    )
}

export default Unit