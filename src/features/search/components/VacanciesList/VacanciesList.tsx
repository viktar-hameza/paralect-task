import React from "react";

import { Pagination, Button } from "@mantine/core";

import { SearchParams } from "@/features/shared/api/superjob/types";

import {
  useSearch,
  DEFAULT_SEARCH_PARAMS,
} from "@/features/shared/api/superjob/hooks";
import { useFavorites } from "@/features/shared/components/FavoritesProvider";

import { VacancyCard } from "@/features/shared/components/VacancyCard/VacancyCard";

interface VacanciesListProps {
  filters?: SearchParams;
  enabled?: boolean;
}

export const VacanciesList = ({
  filters = {},
  enabled = true,
}: VacanciesListProps) => {
  const [page, setPage] = React.useState(DEFAULT_SEARCH_PARAMS.page + 1);
  const [count] = React.useState(DEFAULT_SEARCH_PARAMS.count);
  const { data: { objects: vacancies = [], total = 0 } = {} } = useSearch(
    {
      ...DEFAULT_SEARCH_PARAMS,
      page: page - 1,
      count,
      ...filters,
    },
    { enabled }
  );
  const favorites = useFavorites();

  const pagesTotal = React.useMemo(() => {
    return Math.ceil(total / count);
  }, [total, count]);

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
                {isFavorite ? "Remove" : "Add"}
              </Button>
            </li>
          );
        })}
      </ul>
      {Boolean(pagesTotal) && (
        <Pagination value={page} onChange={setPage} total={pagesTotal} />
      )}
    </div>
  );
};
