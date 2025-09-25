// useFilters.ts
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { buildQueryString } from "@utils/queryUtils";

export const useFilters = () => {
  const [searchParams] = useSearchParams();
  const size = searchParams.get("size") || null;
  const color = searchParams.get("color") || null;
  const [sizeSets, setSizeSets] = useState<string[]>([]);
  const [colorSets, setColorSets] = useState<string[]>([]);

  useEffect(() => {
    setSizeSets(size ? size.split(",") : []);
    setColorSets(color ? color.split(",") : []);
  }, [size, color]);

  return { sizeSets, setSizeSets, colorSets, setColorSets };
};


export const useFilterNavigation = (
  navigation: string,
  searchPhrase: string | null,
  sizeSets: string[],
  colorSets: string[],
  sort_price: string | null,
  setSizeSets: (sizeSets: string[]) => void,
  setColorSets: (colorSets: string[]) => void,
  setIsModal?: (modal: boolean) => void
) => {
  const navigate = useNavigate();

  const removeFilters = () => {
    setSizeSets([]);
    setColorSets([]);
    setIsModal?.(false);
    navigate(`/${navigation}`);
  };

  const applyFilters = () => {
    setIsModal?.(false);
    const query = buildQueryString(searchPhrase, sizeSets, colorSets, sort_price);
    navigate(`/${navigation}?${query}`);
  };

  return { removeFilters, applyFilters };
};