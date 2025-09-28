import { useCompanyInfo } from "@hooks/useGeneralSetting";
import JumpingDots from "@components/JumpingDots";
import { companyInfoResponse, ContactKeyValues } from "@definitions/CompanyType";

const ContactInfo = () => {
    const { companyInfo, isPending }: companyInfoResponse = useCompanyInfo();
    if (isPending) return <JumpingDots />;

    const contactsInfoArray: ContactKeyValues[] = [
        {
            title: 'شماره تماس',
            value: companyInfo.Phone
        },
        {
            title: 'آدرس',
            value: companyInfo.Address
        }
    ]

    return (
        <ul className="flex flex-col p-4 space-y-2 font-EstedadMedium bg-gray-50/80 rounded-xl  ">
            {contactsInfoArray.map((item: ContactKeyValues, index: number) => (
                <li key={index} className="text-sm xl:text-base leading-relaxed text-CarbonicBlue-500">
                    <span className="font-bold">{item.title}:</span>
                    <span className="text-black text-sm xl:text-base px-1.5">
                        {item.value}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default ContactInfo