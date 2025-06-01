/* eslint-disable react/prop-types */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductSearch = ({ search, page = "products" }) => {
  const navigate = useNavigate();
  const letsSearch = (e) => {
    e.preventDefult();
    try {
      const searchPhrase = e.target.search.value;
      if (searchPhrase?.length <= 0)
        throw new Error("نام دسته بندی مورد نظر را وارد کنید");
      navigate(`/${page}?search=${searchPhrase}`);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <form
      onSubmit={letsSearch}
      className="w-full relative flex flex-row flex-wrap justify-between items-center group"
    >
      <input
        type="text"
        className="border  text-sm font-EstedadLight w-full p-1.5 rounded placeholder:text-sm placeholder:font-EstedadLight         active:border-blue-600 
        "
        placeholder={search != null ? search : "جستجو محصول ..."}
        name="search"
      />
      <button
        type="submit"
        className="hover:bg-green-500
        hover:text-gray-50 duration-300 ease-in-out transition-all px-1.5 absolute left-1.5  rounded  "
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default ProductSearch;
