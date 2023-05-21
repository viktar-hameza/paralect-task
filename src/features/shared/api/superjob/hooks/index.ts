import { useQuery } from "@tanstack/react-query";
import { SearchParams, QueryOptions, SearchResponse } from "../types";

import { getCatalogues, getVacancies } from "../requests";

export const useSearch = (
  params: SearchParams = DEFAULT_SEARCH_PARAMS,
  queryOptions?: QueryOptions<SearchResponse>
) => {
  return useQuery({
    queryKey: ["vacancies", params],
    queryFn: () => getVacancies({ params }),
    staleTime: 1000 * 60 * 1,
    enabled: true,
    keepPreviousData: true,
    ...queryOptions,
  });
};

export const useCatalogues = () => {
  return useQuery({
    queryKey: ["catalogues"],
    queryFn: () => getCatalogues(),
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: true,
  });
};

export const DEFAULT_SEARCH_PARAMS = {
  keyword: "",
  catalogues: "",
  currency: "rub",
  published: 1,
  no_agreement: 0,
  page: Number(process.env.NEXT_PUBLIC_SEARCH_RESULTS_DEFAULT_PAGE) ?? 0,
  count: Number(process.env.NEXT_PUBLIC_SEARCH_RESULTS_DEFAULT_COUNT) ?? 4,
};
