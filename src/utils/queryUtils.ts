// utils/queryUtils.ts
export const buildQueryString = (
  searchPhrase: string | null,
  sizeSets: string[],
  colorSets: string[],
  sort_price: string | null,
  product_page: string = "1"
) => {
  const query = new URLSearchParams({
    product_page,
    ...(searchPhrase && { search: searchPhrase }),
    ...(sizeSets.length > 0 && { size: sizeSets.join(",") }),
    ...(colorSets.length > 0 && { color: colorSets.join(",") }),
    ...(sort_price && { sort_price }),
  });
  return query.toString();
};