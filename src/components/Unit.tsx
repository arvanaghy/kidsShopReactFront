import { useGeneralStore } from "@store/GeneralStore";
import { useEffect, useState } from "react";

const Unit = ({ forced = false }: { forced?: boolean }) => {
    const { unit, getUnit } = useGeneralStore();
    useEffect(() => {
        getUnit(forced);
    }, []);

    return (
        <span className="w-fit flex flex-row items-center justify-center px-1.5 text-xs text-gray-700 font-EstedadLight">
            {unit?.value}
        </span>
    )
}

export default Unit