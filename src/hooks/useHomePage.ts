import { GeneralSettingService } from "@services/GeneralSettingService";
import { useEffect, useState } from "react";

interface Result {
  categories?: any;
  banners?: any;
  newestProducts?: any;
  offeredProducts?: any;
  bestSeller?: any;
}

interface Data {
  result?: Result;
  message?: string;
}

const useHomePage = (): { result: Result | null; isPending: boolean } => {
  const [result, setResult] = useState<Result | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const getHomePageData = async () => {
    await GeneralSettingService.getHomePageData(
      setResult,
      setIsPending,
      isPending
    );
  };

  useEffect(() => {
    getHomePageData();
  }, []);

  return { result, isPending };
};

export default useHomePage;
