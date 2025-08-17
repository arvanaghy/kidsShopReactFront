import ProductCard from "@components/product/ProductCard";
import { useFavoriteStore } from "@store/FavoriteStore";
import EmptyList from "@components/EmptyList";
import CompareFavoriteListHeader from "@components/product/CompareFavoriteListHeader";
const FavoritesPage = () => {
  const { favorite } = useFavoriteStore();

  if (favorite?.length === 0) return <EmptyList title="علاقه مندی ها" />;

  return (
    <div className="px-4 py-8 min-h-screen bg-white text-black">
      <CompareFavoriteListHeader title="علاقه مندی ها" type="favorite" />

      <div className="grid grid-cols-12 py-6 ">
        <div className="col-span-12 grid grid-cols-12 gap-4">
          {favorite.map((item) => (
            <ProductCard
              key={item.Code}
              item={item}
              colSpan={`col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
