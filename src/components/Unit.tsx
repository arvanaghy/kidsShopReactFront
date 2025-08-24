
import { useUnit } from "@hooks/useGeneralSetting";

const Unit = () => {
    // const { unit, isPending } = useUnit();

    return (
        <span className="w-fit flex flex-row items-center justify-center px-1.5 text-xs text-gray-700 font-EstedadLight">
            {/* {!isPending && unit} */}
            تومان
        </span>
    )
}

export default Unit