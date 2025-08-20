import { useNavigate } from "react-router-dom";
import { toPersianDigits } from "@utils/numeralHelpers";

interface Link {
  url: string;
  label: string;
  active: boolean;
}

interface Replace {
  url?: string;
  phrase?: string;
}

interface Props {
  links: Link[];
  replace?: Replace;
}

const Pagination = ({ links, replace }: Props) => {
  const navigate = useNavigate();

  console.log('links', links);
  console.log('replace', replace);
  return (
    <div className="flex flex-row gap-y-2 flex-wrap items-center justify-center my-2 md:my-8 2xl:my-16 ">
      {links?.length > 3 &&
        links.map((link, idx) => (
          <button
            key={idx}
            onClick={() =>
              navigate(
                link.url.replace(
                  import.meta.env.VITE_API_URL + replace?.url,
                  replace?.phrase
                )
              )
            }
            disabled={link.url === null}
            className={`2xl:px-4 2xl:py-2 rounded-md cursor-pointer 2xl:mx-2
                2xl:text-2xl
                text-xs px-2 py-1 mx-1
                disabled:cursor-not-allowed
                transition-all duration-300 ease-in-out
                hover:bg-CarbonicBlue-500/80 hover:text-white
                ${link.active
                ? "bg-CarbonicBlue-500 text-white"
                : "bg-gray-300 text-black"
              }`}
          >
            {toPersianDigits(
              link.label === "&laquo; Previous"
                ? "قبلی"
                : link.label === "Next &raquo;"
                  ? " بعدی"
                  : link.label
            )}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
