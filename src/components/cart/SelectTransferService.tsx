import Unit from '@components/Unit'
import { getTransfer } from '@hooks/useCart';
import { useGeneralStore } from '@store/GeneralStore';
import { useTransferStore } from '@store/transferStore';
import { formatCurrencyDisplay } from '@utils/numeralHelpers'
import { useEffect } from 'react';

const SelectTransferService = () => {
    const { transfer, clearTransfer, setTransfer } = useTransferStore();
    const { transferServices } = getTransfer();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedService = transferServices.find((s) => s.Code === e.target.value);
        if (selectedService) {
            setTransfer(selectedService);
        }
    };
    const { currencyUnit, getCurrencyUnit } = useGeneralStore();
    useEffect(() => {
        getCurrencyUnit(true);
    }, []);
    return (
        <>
            {transfer && transfer?.Name ?
                (<div className="w-full text-sm text-CarbonicBlue-500 flex flex-row items-center justify-between ">
                    <div className="w-fit flex flex-row items-center justify-center">
                        {transfer?.Name} : {formatCurrencyDisplay(transfer?.Mablag)} <Unit />
                    </div>
                    <button
                        type="button"
                        className="text-amber-700 font-EstedadExtraBold hover:text-amber-900 duration-200 delay-150 ease-in-out transition-all tracking-widest "
                        onClick={clearTransfer}
                    >
                        تغییر نحوه ارسال
                    </button>
                </div>) :
                (
                    <select
                        className="ring-purple-500 font-EstedadLight rounded-md py-2 px-4 text-sm"
                        onChange={handleChange}
                    >
                        <option value="" className="rounded-md font-EstedadLight">
                            انتخاب نحوه ارسال
                        </option>
                        {transferServices.map((service: any, idx: number) => (
                            <option key={idx} value={service.Code}>
                                {service.Name} - {formatCurrencyDisplay(service.Mablag)} - {currencyUnit?.value}
                            </option>
                        ))}
                    </select>

                )}

        </>
    )
}

export default SelectTransferService