import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchCategory } from "@hooks/useCategories";


const CategorySearch = ({ searchParam = "" }: { searchParam?: string }) => {
  const { handleSearch, isPending } = searchCategory();
  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center pt-2 md:pt-0 "
    >
      <input
        type="text"
        name="search"
        defaultValue={searchParam}
        placeholder="جستجو در دسته بندی ها"
        className="w-full font-EstedadMedium p-2 md:p-3 2xl:p-5 text-sm text-gray-600 border border-gray-300 2xl:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={isPending}
        className="text-gray-600 hover:text-gray-700 absolute left-2.5"
      >
        {isPending ? (
          <FontAwesomeIcon icon={faSpinner} spin className="2xl:text-3xl" />
        ) : (
          <FontAwesomeIcon icon={faMagnifyingGlass} className="2xl:text-3xl" />
        )}
      </button>
    </form>
  );
};

export default CategorySearch;
