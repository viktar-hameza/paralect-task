import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  DehydratedState,
  QueryClient,
  dehydrate,
  useQueryClient,
} from "@tanstack/react-query";

import { useSearch } from "@/features/shared/api/superjob/hooks";
import { SearchResponse } from "../shared/api/superjob/types";

import { getVacancies } from "../shared/api/superjob/requests";

import { getAuthAxiosConfig } from "../shared/helpers/auth";
import { useFavorites } from "../shared/components/FavoritesProvider";
import { VacancyCard } from "../shared/components/VacancyCard";
import {
  Card,
  Space,
  TypographyStylesProvider,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  content: {
    ul: {
      listStyle: "initial",
    },
  },
}));

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async ({ params, req, res }) => {
  const isFirstServerCall = !req?.url?.startsWith("/_next/data/");
  const queryClient = new QueryClient();

  const { headers, transformRequest } = getAuthAxiosConfig(req, res);

  const id = Number(params?.id);
  if (Number.isNaN(id)) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  if (isFirstServerCall) {
    await queryClient.prefetchQuery(["vacancies", { ids: [id] }], () =>
      getVacancies({ params: { ids: [id] }, headers, transformRequest })
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      favorites: JSON.parse(req.cookies.favorites || "[]"),
    },
  };
};

export function Page() {
  const { classes, cx } = useStyles();
  const favorites = useFavorites();
  const queryClient = useQueryClient();
  const router = useRouter();
  const vacancyId = Number(router.query.id);

  const { data } = useSearch(
    { ids: [vacancyId] },
    {
      enabled: !!vacancyId,
      // try to find vacancy in cache
      initialData: () => {
        const searchQuery = queryClient.getQueriesData<SearchResponse>([
          "vacancies",
        ]);

        if (!searchQuery) {
          return;
        }

        for (const [, searchQueryData] of searchQuery) {
          const vacancy = searchQueryData?.objects.find(
            ({ id }) => id === vacancyId
          );

          if (searchQueryData && vacancy) {
            return {
              ...searchQueryData,
              objects: [vacancy],
            };
          }
        }
      },
    }
  );
  const isFavorite = favorites.has(vacancyId);
  return (
    <>
      {data?.objects[0] && (
        <VacancyCard
          vacancy={data?.objects[0]}
          isFavorite={isFavorite}
          isVacancyPage
          onClickFavorite={() => {
            isFavorite ? favorites.remove(vacancyId) : favorites.add(vacancyId);
          }}
        />
      )}

      <Space h="md" />
      <Card withBorder p="xl" radius="md" className={classes.content}>
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.objects[0].vacancyRichText || "",
            }}
          ></div>
        </TypographyStylesProvider>
      </Card>
    </>
  );
}
