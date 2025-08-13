import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

interface SocialMediaLinkProps {
    info?: string;
    icon: IconProp;
    type?: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ info, icon, type }) => {
    const fallback: string = type ? (import.meta.env[`VITE_${type}`] as string) || "" : "";

    return (
        <Link
            to={`${info || fallback}`}
            target="_blank"
            className="hover:text-green-600 transition-all duration-300 ease-in-out"
        >
            <FontAwesomeIcon
                icon={icon}
                className="text-3xl md:text-4xl xl:text-5xl 2xl:text-4xl"
            />
        </Link>
    );
};

export default SocialMediaLink;