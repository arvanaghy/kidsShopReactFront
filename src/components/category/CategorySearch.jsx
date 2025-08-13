import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CategorySearch = () => {
  const navigate = useNavigate();
  const letsSearchCategory = (e) => {
    e.preventDefault();
    try {
      const searchPhrase = e.target.search.value;
      navigate(`/categories?search=${searchPhrase}`);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <form
      onSubmit={(e) => letsSearchCategory(e)}
      className="relative flex items-center pt-2 md:pt-0 "
    >
      <input
        type="text"
        name="search"
        placeholder="جستجو در دسته بندی ها"
        className="w-full font-EstedadMedium p-2 md:p-3 2xl:p-5 text-sm text-gray-600 border border-gray-300 2xl:text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="text-gray-600 hover:text-gray-700 absolute left-2.5"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="2xl:text-3xl" />
      </button>
    </form>
  );
};

export default CategorySearch;
