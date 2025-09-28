import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { ProductProps } from "@definitions/ProductType";

interface BreadcrumbProps {
  product: ProductProps;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ product }) => {
  return (
    <nav
      className="flex flex-row w-fit items-center gap-2 font-EstedadMedium tracking-wide text-pretty text-gray-700 border border-gray-200 rounded-lg bg-gray-50"
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-0.5 md:gap-2 lg:gap-8 p-1.5 text-xs md:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
      >
        <FontAwesomeIcon icon={faHouse} className="text-sm md:text-lg" />
        <span>صفحه اصلی</span>
      </Link>
      <FontAwesomeIcon icon={faChevronLeft} className="text-sm md:text-lg p-1" />
      <Link
        to={`/category/${Math.floor(product?.GCode || 0)}`}
        className="inline-flex items-center gap-0.5 md:gap-2 lg:gap-8 p-1.5 text-xs md:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
      >
        {product?.GName}
      </Link>
      <FontAwesomeIcon icon={faChevronLeft} className="text-sm md:text-lg p-1" />
      <Link
        to={`/sub-category-products/${Math.floor(product?.SCode || 0)}`}
        className="inline-flex items-center gap-0.5 md:gap-2 lg:gap-8 p-1.5 text-xs md:text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-700"
      >
        {product?.SName}
      </Link>
    </nav>
  );
};

export default Breadcrumb;