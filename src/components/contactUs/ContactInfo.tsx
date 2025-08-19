import { useCompanyInfo } from "@hooks/useGeneralSetting";
interface ContactInfoType {
    title: string;
    value: string;
}
interface CompanyInfoType {
    Address: string;
    Phone: string;
    Email: string;
    Instagram: string;
    Telegram: string;
    Whatsapp: string;
    Comment: string;
}

const ContactInfo = () => {
    const { companyInfo, isPending } = useCompanyInfo<CompanyInfoType>();
    if (isPending) return <>درحال بارگذاری...</>;

    const contactsInfoArray = [
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
            {contactsInfoArray.map((item: ContactInfoType, index: number) => (
                <li key={index} className="text-sm xl:text-xl leading-relaxed text-CarbonicBlue-500">
                    <span className="font-bold">{item.title}:</span>
                    <span className="text-black text-sm xl:text-lg px-1.5">
                        {item.value}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default ContactInfo