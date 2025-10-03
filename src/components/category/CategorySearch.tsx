import {
  faMagnifyingGlass,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchCategory } from "@hooks/useCategories";


const CategorySearch = ({ searchParam = "" }: { searchParam?: string }) => {
  const { removeSearchParam, handleSearch, isPending } = searchCategory();
  return (
    <form
      onSubmit={(e) => handleSearch(e)}
      className="flex items-center p-2 md:pt-0  gap-3"
    >
      <input
        type="text"
        name="search"
        defaultValue={searchParam}
        placeholder="جستجو در دسته بندی ها"
        className="w-full font-EstedadMedium p-2  text-sm text-gray-600 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      {searchParam?.length > 0 && (
        <button
          type="button"
          onClick={removeSearchParam}
          className="text-red-600 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-gray-600 hover:text-gray-700 "
      >
        {isPending ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        )}
      </button>

    </form>
  );
};

export default CategorySearch;
