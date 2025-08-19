
import { useUnit } from "@hooks/useGeneralSetting";

const Unit = () => {
    const { unit, isPending } = useUnit();


    return (
        <>
            {isPending ? (
                <>...</>
            ) : (
                <>
                    {unit}
                </>
            )}
        </>
    )
}

export default Unit