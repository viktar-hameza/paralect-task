import React from "react";

import {
  SimpleGrid,
  Pagination,
  createStyles,
  LoadingOverlay,
} from "@mantine/core";

import { SearchParams } from "@/features/shared/api/superjob/types";

import {
  useSearch,
  DEFAULT_SEARCH_PARAMS,
} from "@/features/shared/api/superjob/hooks";
import { useFavorites } from "@/features/shared/components/FavoritesProvider";

import { VacancyCard } from "@/features/shared/components/VacancyCard/VacancyCard";
import { Empty } from "@/features/shared/components/Empty/Emty";

interface VacanciesListProps {
  filters?: SearchParams;
  enabled?: boolean;
}

const useStyles = createStyles((theme) => ({
  listCards: {
    display: "Flex",
    flexDirection: "column",
    gap: "16px",
  },
}));

export const VacanciesList = ({
  filters = {},
  enabled = true,
}: VacanciesListProps) => {
  const { classes } = useStyles();
  const [searchParams, setSearchParams] = React.useState<SearchParams>({
    ...DEFAULT_SEARCH_PARAMS,
    page: DEFAULT_SEARCH_PARAMS.page,
    count: DEFAULT_SEARCH_PARAMS.count,
    ...filters,
  });
  const favorites = useFavorites();

  React.useEffect(() => {
    setSearchParams((oldSearchParams) => ({
      ...oldSearchParams,
      ...filters,
      page: DEFAULT_SEARCH_PARAMS.page,
    }));
  }, [filters]);

  const { isFetching, data: { objects: vacancies = [], total = 0 } = {} } =
    useSearch(searchParams, { enabled });

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
    <>
      <LoadingOverlay
        visible={isFetching}
        loaderProps={{ size: "xl" }}
        overlayBlur={2}
      />

      {vacancies.length === 0 && !isFetching && (
        <Empty text="Упс, ничего не найдено!" />
      )}
      <SimpleGrid cols={1} verticalSpacing="xl">
        <ul className={classes.listCards}>
          {vacancies.map((vacancy) => {
            const isFavorite = favorites.has(vacancy.id);

            return (
              <li key={vacancy.id}>
                <VacancyCard
                  vacancy={vacancy}
                  isFavorite={isFavorite}
                  onClickFavorite={() => {
                    isFavorite
                      ? favorites.remove(vacancy.id)
                      : favorites.add(vacancy.id);
                  }}
                />
              </li>
            );
          })}
        </ul>
        {pagination.isVisible && (
          <Pagination
            position="center"
            value={pagination.page}
            onChange={(page) =>
              setSearchParams({ ...searchParams, page: page - 1 })
            }
            total={pagination.totalPages}
          />
        )}
      </SimpleGrid>
    </>
  );
};
