import Unit from '@components/Unit'
import { getTransfer } from '@hooks/useCart';
import { useTransferStore } from '@store/transferStore';
import { formatCurrencyDisplay } from '@utils/numeralHelpers'

const SelectTransferService = () => {
    const { transfer, clearTransfer, setTransfer } = useTransferStore();
    const { transferServices } = getTransfer();
    return (
        <>
            {transfer && transfer?.Name ?

                (<div className="w-full text-sm text-CarbonicBlue-500 flex flex-row items-center justify-between">
                    <div className="w-fit flex flex-row items-center justify-center">
                        {transfer?.Name} : {formatCurrencyDisplay(transfer?.Mablag)} <Unit />
                    </div>
                    <button
                        type="button"
                        className="text-amber-700 hover:text-amber-500 duration-200 delay-150 ease-in-out transition-all font-EstedadLight "
                        onClick={clearTransfer}
                    >
                        تغییر نحوه ارسال
                    </button>
                </div>) :
                (
                    <select
                        className="ring-CarbonicBlue-500"
                        onChange={(e) =>
                            setTransfer(
                                transferServices.find((s) => s.Code === e.target.value)
                            )
                        }
                    >
                        <option value="" className="rounded-md">
                            انتخاب نحوه ارسال
                        </option>
                        {transferServices.map((service: any, idx: number) => (
                            <option key={idx} value={service.Code}>
                                {service.Name} - {formatCurrencyDisplay(service.Mablag)} <Unit />
                            </option>
                        ))}
                    </select>

                )}

        </>
    )
}

export default SelectTransferService