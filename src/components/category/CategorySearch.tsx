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
        className="w-full font-EstedadMedium p-2  text-sm text-gray-600 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={isPending}
        className="text-gray-600 hover:text-gray-700 absolute left-2.5"
      >
        {isPending ? (
          <FontAwesomeIcon icon={faSpinner} spin className="" />
        ) : (
          <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
        )}
      </button>
    </form>
  );
};

export default CategorySearch;
