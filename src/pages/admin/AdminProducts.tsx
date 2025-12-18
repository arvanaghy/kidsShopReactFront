import AdminPagination from "@components/admin/AdminPagination";
import Loading from "@components/Loading";
import Unit from "@components/Unit";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "@hooks/useProduct";
import AdminLayout from "@layouts/admin/AdminLayout";
import { formatCurrencyDisplay } from "@utils/numeralHelpers";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchPhrase = searchParams.get("search") || "";
  const product_page = searchParams.get("product_page") || 1;
  const { isPending, products } = useProducts(
    { searchPhrase: searchPhrase, product_page: product_page, size: null, color: null, sort_price: null }
  );

  const handleSearchProduct = (e: any) => {
    e.preventDefault();
    const _searchPhrase = e.target.searchPhrase.value;
    _searchPhrase.trim();
    navigate(`/admin/products?search=${_searchPhrase}`);
  }

  const replacement = { path: "/admin/products", url: `${import.meta.env.VITE_API_URL}/v2/products/list-all-products` };

  if (isPending) return <Loading />;

  return (
    <AdminLayout>
      <div className="w-full items-center h-full justify-center text-center font-EstedadMedium">
        <div className="border rounded-2xl  bg-white flex flex-col justify-between items-center py-3">
          <h2 className="text-base mb-0.5">مدیریت کالاها</h2>
          <p className="text-sm mb-4">در این بخش می‌توانید کالاهای موجود در فروشگاه را مدیریت کنید.</p>
          {/* search box */}
          <form
            onSubmit={handleSearchProduct}
            className="px-4 mb-2 w-full flex flex-row items-center justify-center gap-2">
            <input
              defaultValue={searchPhrase}
              type="text"
              name="searchPhrase"
              placeholder="جستجوی کالا..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {
              searchPhrase && (
                <button
                  type="reset"
                  onClick={() => navigate("/admin-products")}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 text-xs">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )
            }
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-200">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
          <div className="overflow-x-auto text-xs w-full px-2">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="text-sm font-EstedadMedium">
                  <th className="p-0.5 border border-gray-300">کد</th>
                  <th className="p-0.5 border border-gray-300">عنوان</th>
                  <th className="p-0.5 border border-gray-300">دسته بندی</th>
                  <th className="p-0.5 border border-gray-300">قیمت</th>
                  <th className="p-0.5 border border-gray-300">عملیات</th>
                </tr>
              </thead>
              <tbody className="space-y-1.5">
                {products?.data?.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-xs font-EstedadLight">
                    <td className="p-0.5 border border-gray-300">{product?.CodeKala}</td>
                    <td className="p-0.5 border border-gray-300">{product?.Name}</td>
                    <td className="p-0.5 border border-gray-300 text-xs">{product?.GName} / {product?.SName}</td>
                    <td className="p-0.5 border border-gray-300 flex justify-center items-center">{formatCurrencyDisplay(product?.SPrice)} <Unit /></td>
                    <td className="p-0.5 border border-gray-300 ">
                      <a href={`/admin/product/${product?.Code}`} className="block  bg-blue-500 hover:bg-blue-700 duration-300 ease-in-out text-white px-2 py-1 rounded text-xs">ویرایش</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AdminPagination links={products?.links} replacement={replacement} />

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
