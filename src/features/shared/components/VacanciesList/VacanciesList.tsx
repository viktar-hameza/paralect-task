import React from "react";
import { useSearch } from "./hooks";
import { VacancyCard } from "./components/VacancyCard";
import { Pagination, Button } from "@mantine/core";
import Cookie from "js-cookie";
import { DEFAULT_SEARCH_PARAMS } from "./hooks";

export const VacanciesList = () => {
  const [page, setPage] = React.useState(DEFAULT_SEARCH_PARAMS.page + 1);
  const [count] = React.useState(DEFAULT_SEARCH_PARAMS.count);
  const { data: { objects: vacancies = [], total = 0 } = {} } = useSearch({
    page: page - 1,
    count,
  });
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
