import { toPersianDigits } from "@utils/numeralHelpers";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AdminPaginationProps {
    links?: PaginationLink[];
    replacement?: {
        url?: string;
        path?: string;
    };
}

const AdminPagination: FC<AdminPaginationProps> = ({
    links = [],
    replacement = {
        url: "",
        path: "",
    },
}) => {
    const navigate = useNavigate();
    if (!links.length) {
        return null;
    }

    const handleNavigation = (link: string | null) => {
        if (link && replacement?.url && replacement?.path) {
            navigate(link.replace(replacement.url, replacement.path));
        }
    };

    return (
        <div className="flex flex-row items-center justify-center mx-auto flex-wrap py-5 gap-2 font-EstedadLight">
            {links.map((link) => {
                const label =
                    link.label === "&laquo; Previous"
                        ? "قبلی"
                        : link.label === "Next &raquo;"
                            ? "بعدی"
                            : link.label;

                return (
                    <button
                        key={link.url || link.label}
                        disabled={!link.url || link.active}
                        onClick={() => handleNavigation(link.url)}
                        className={`
              rounded-md
              m-1 px-3 py-1.5 text-sm
              lg:px-4 lg:py-2 
              transition duration-200
              ${link.active ? "bg-CarbonicBlue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"}
              ${!link.url || link.active ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            `}
                    >
                        {toPersianDigits(label)}
                    </button>
                );
            })}
        </div>
    );
};

export default AdminPagination;