import { useNavigate } from "react-router-dom";
import { toPersianDigits } from "@utils/numeralHelpers";

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: PaginationLink[];
  baseUrl: string;
  replaceUrl: string;
}

const Pagination = ({ links, baseUrl, replaceUrl }: PaginationProps) => {
  const navigate = useNavigate();

  if (!links || links.length <= 3) return null;

  const handleNavigation = (url: string | null) => {
    if (url) {
      const newUrl = url.replace(baseUrl, replaceUrl);
      navigate(newUrl);
    }
  };

  return (
    <div className="flex flex-row flex-wrap items-center justify-center py-8 gap-2">
      {links.map((link, idx) => (
        <button
          key={idx}
          disabled={link.url === null}
          onClick={() => handleNavigation(link.url)}
          className={`
            2xl:px-4 2xl:py-2 rounded-md cursor-pointer
            2xl:text-sm
            text-xs px-2 py-1
            disabled:cursor-not-allowed
            transition-all duration-300 ease-in-out
            hover:bg-CarbonicBlue-500/80 hover:text-white
            ${
              link.active
                ? "bg-CarbonicBlue-500 text-white"
                : "bg-gray-300 text-black"
            }
          `}
        >
          {toPersianDigits(
            link.label === "&laquo; Previous"
              ? "قبلی"
              : link.label === "Next &raquo;"
              ? "بعدی"
              : link.label
          )}
        </button>
      ))}
    </div>
  );
};

export default Pagination;