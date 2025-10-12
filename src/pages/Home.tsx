import BannerGroup from "@components/home/BannerGroup";

import Loading from '@components/Loading';
import useHomePage from "@hooks/useHomePage";
import Category from "@components/home/Category";
import ProductsBanner from "@components/home/ProductsBanner";
import OfferedProductsBanner from "@components/home/OfferedProductsBanner";
import { DynamicBannerGroupProps } from '@definitions/GeneralTypes'

import InstagramBanner from "@components/home/InstagramBanner";
const Home = () => {
  const { result, isPending } = useHomePage();

  const hasData = (data: any) => Array.isArray(data) && data.length > 0;

  const DynamicBannerGroup = ({ banners, start, end }: DynamicBannerGroupProps) => {
    if (!hasData(banners) || start >= (banners?.length || 0)) return null;
    return <BannerGroup banners={banners && banners.slice(start, end)} />;
  };

  if (isPending) return <Loading />;
  return (
    <>
      {/* categories */}
      {hasData(result?.categories) && <Category result={result} />}

      {/* first two banners */}
      <DynamicBannerGroup banners={result?.banners} start={0} end={2} />
      {/* newest products */}
      {hasData(result?.newestProducts) && (
        <ProductsBanner
          data={result?.newestProducts}
          link={"/products"}
          title={"جدیدترین محصولات کیدزشاپ"}
          seeMore={"مشاهده همه محصولات"}
        />
      )}
      {/* third and fourth banners */}
      <DynamicBannerGroup banners={result?.banners} start={4} end={4} />

      {hasData(result?.offeredProducts) && (
        <OfferedProductsBanner data={result?.offeredProducts} />
      )}
      {/* fifth and sixth banners */}
      <DynamicBannerGroup banners={result?.banners} start={4} end={6} />

      {/* best seller products */}
      {hasData(result?.bestSeller) && (
        <ProductsBanner
          data={result?.bestSeller}
          link={"/best-selling-products"}
          title={"پرفروش‌ترین محصولات کیدزشاپ"}
          seeMore={"لیست محصولات پرفروش"}
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
