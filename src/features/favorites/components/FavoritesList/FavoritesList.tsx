import React from "react";
import { Pagination, Button } from "@mantine/core";

import { SearchParams } from "@/features/shared/api/superjob/types";

import {
  useSearch,
  DEFAULT_SEARCH_PARAMS,
} from "@/features/shared/api/superjob/hooks";
import { useFavorites } from "@/features/shared/components/FavoritesProvider";

import { VacancyCard } from "@/features/shared/components/VacancyCard/VacancyCard";

interface FavoritesListProps {
  filters?: {
    ids?: number[];
  };
}

export const FavoritesList = ({ filters = {} }: FavoritesListProps) => {
  const totalValue = React.useRef(0);
  const [searchParams, setSearchParams] = React.useState<SearchParams>({
    ...DEFAULT_SEARCH_PARAMS,
    page: DEFAULT_SEARCH_PARAMS.page,
    count: DEFAULT_SEARCH_PARAMS.count,
    ...filters,
  });
  const favorites = useFavorites();

  React.useEffect(() => {
    setSearchParams((oldSearchParams) => {
      const oldCurrentPage = oldSearchParams.page || 0;
      const newTotalPages = oldSearchParams.count
        ? Math.ceil((totalValue.current - 1) / oldSearchParams.count)
        : 0;

      return {
        ...oldSearchParams,
        ...filters,
        page:
          oldCurrentPage > newTotalPages - 1 && newTotalPages > 0
            ? newTotalPages - 1
            : oldCurrentPage,
      };
    });
  }, [filters]);

  const { data: { objects: vacancies = [], total = 0 } = {} } =
    useSearch(searchParams);

  React.useEffect(() => {
    totalValue.current = total;
  }, [total]);

  const pagination = React.useMemo(() => {
    const totalPages = searchParams.count
      ? Math.ceil(total / searchParams.count)
      : 0;

    return {
      page: typeof searchParams.page === "number" ? searchParams.page + 1 : 1,
      totalPages,
      isVisible: totalPages > 1,
    };
  }, [searchParams, total]);

  return (
    <div>
      <ul>
        {vacancies.map((vacancy) => {
          const isFavorite = favorites.has(vacancy.id);

          return (
            <li key={vacancy.id}>
              <VacancyCard vacancy={vacancy} />
              <Button
                onClick={() => {
                  isFavorite
                    ? favorites.remove(vacancy.id)
                    : favorites.add(vacancy.id);
                }}
              >
                {isFavorite ? "Remove" : "Disabled"}
              </Button>
            </li>
          );
        })}
      </ul>

      {pagination.isVisible && (
        <Pagination
          value={pagination.page}
          onChange={(page) =>
            setSearchParams({ ...searchParams, page: page - 1 })
          }
          total={pagination.totalPages}
        />
      )}
    </div>
  );
};
