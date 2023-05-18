import React from "react";
import {
  useSearch,
  DEFAULT_SEARCH_PARAMS,
} from "@/features/shared/api/superjob/hooks";
import { VacancyCard } from "../../../shared/components/VacancyCard/VacancyCard";
import { Pagination, Button } from "@mantine/core";
import Cookie from "js-cookie";

interface VacanciesListProps {
  filters?: {
    ids?: number[];
  };
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
      page: page - 1,
      count,
      ...filters,
    },
    { enabled }
  );
  const [favorites, setFavorites] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    const favoritesFromCookie = JSON.parse(Cookie.get("favorites") || "[]");
    setFavorites(new Set(favoritesFromCookie));
  }, []);

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
                    ? favorites.delete(vacancy.id)
                    : favorites.add(vacancy.id);
                  setFavorites(new Set(favorites));
                  Cookie.set(
                    "favorites",
                    JSON.stringify(Array.from(favorites)),
                    {
                      expires: 365,
                    }
                  );
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
