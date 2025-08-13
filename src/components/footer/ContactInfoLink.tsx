import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ContactInfoLinkProps {
    companyInfo?: string;
    icon: IconProp;
    type?: string;
}

const ContactInfoLink: React.FC<ContactInfoLinkProps> = ({ companyInfo, icon, type }) => {
    const fallback: string = type ? (import.meta.env[`VITE_${type}`] as string) || "" : "";

    return (
        <>
            <FontAwesomeIcon
                icon={icon}
                className="text-lg md:text-3xl"
            />
            <p className="leading-relaxed tracking-widest text-xs lg:text-sm xl:text-base 2xl:text-lg">
                {companyInfo || fallback}
            </p>
        </>
    );
};

export default ContactInfoLink;
