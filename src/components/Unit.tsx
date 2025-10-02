import { useGeneralStore } from "@store/GeneralStore";
import { useEffect } from "react";

const Unit = ({ forced = false, textColor = "text-gray-700" }: { forced?: boolean, textColor?: string }) => {
    const { currencyUnit, getCurrencyUnit } = useGeneralStore();
    useEffect(() => {
        getCurrencyUnit(forced);
    }, []);

    return (
        <span className={`${textColor} w-fit flex flex-row items-center justify-center px-1.5 text-xs  font-EstedadLight`}>
            {currencyUnit?.value}
        </span>
    )
}

export default Unit