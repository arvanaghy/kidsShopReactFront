import { useCompareStore } from "@store/CompareStore";
import CompareCard from "@components/product/CompareCard";
import EmptyList from "@components/EmptyList";
import CompareFavoriteListHeader from "@components/product/CompareFavoriteListHeader";

const ComparePage = () => {
  const { compareList } = useCompareStore();

  if (compareList?.length === 0) return <EmptyList title="مقایسه محصولات" />;

  return (
    <div className="p-0.5 md:p-4 min-h-screen bg-white text-black font-EstedadLight">
      <CompareFavoriteListHeader title="مقایسه محصولات" type="compare" />
      <div className="w-full flex flex-col justify-center items-center ">
        <div
          className="w-full overflow-x-auto py-10 grid grid-cols-12
          items-start justify-center lg:gap-6 gap-1 md:gap-3 "
        >
          {compareList.map((product, index) => (
            <CompareCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
