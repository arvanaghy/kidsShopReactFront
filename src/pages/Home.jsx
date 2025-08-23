import BannerGroup from "@components/home/BannerGroup";

import Loading from "@components/Loading";
import useHomePage from "@hooks/useHomePage";
import Category from "@components/home/Category";
import ProductsBanner from "@components/home/ProductsBanner";
import OfferedProductsBanner from "@components/home/OfferedProductsBanner";

import InstagramBanner from "@components/home/InstagramBanner";
const Home = () => {
  const { result, loading } = useHomePage();
  if (loading) return <Loading />;
  return (
    <>
      {/* categories */}
      <Category result={result} />
      {/* categories */}
      {/* first two banners */}
      {result?.banners?.length > 0 && (
        <BannerGroup banners={result?.banners?.slice(0, 2)} />
      )}
      {/* newest products */}
      {result?.newestProducts?.length > 0 && (
        <ProductsBanner
          data={result?.newestProducts}
          link={"/products"}
          title={" جدیدترین محصولات کیدزشاپ"}
          seeMore={" مشاهده همه محصولات"}
        />
      )}
      {/* third and fourth banners */}
      {result?.banners?.length == 4 && (
        <BannerGroup banners={result?.banners?.slice(2, 4)} />
      )}
      {/* offered products */}
      {result?.offeredProducts?.length > 0 && (
        <OfferedProductsBanner data={result?.offeredProducts} />
      )}
      {/* fifth and sixth banners */}
      {result?.banners?.length == 6 && (
        <BannerGroup banners={result?.banners?.slice(4, 6)} />
      )}
      {/* best seller products */}
      {result?.bestSeller?.length > 0 && (
        <ProductsBanner
          data={result?.bestSeller}
          link={"/best-selling-products"}
          title={"پرفروشترین محصولات کیدزشاپ"}
          seeMore={" لیست محصولات پرفروش"}
        />
      )}
      {/* follow us in instagram */}
      <section className="py-4 xl:p-10">
        <InstagramBanner />
      </section>
    </>
  );
};

export default Home;
