import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, DehydratedState } from "@tanstack/react-query";

import { DEFAULT_SEARCH_PARAMS } from "@/features/shared/api/superjob/hooks";
import { getVacancies } from "../shared/api/superjob/requests";

import { useFavorites } from "@/features/shared/components/FavoritesProvider";

import { FavoritesList } from "@/features/favorites/components/FavoritesList";

import { getAuthAxiosConfig } from "../shared/helpers/auth";
import { Empty } from "../shared/components/Empty/Emty";
import { Button } from "@mantine/core";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async ({ req, res }) => {
  const isFirstServerCall = !req?.url?.startsWith("/_next/data/");
  const favoritesFromCookie = JSON.parse(
    req.cookies.favorites || "[]"
  ) as Array<number>;
  const queryClient = new QueryClient();

  const { headers, transformRequest } = getAuthAxiosConfig(req, res);

  if (isFirstServerCall) {
    await queryClient.prefetchQuery(
      ["vacancies", { ids: favoritesFromCookie, ...DEFAULT_SEARCH_PARAMS }],
      () =>
        getVacancies({
          params: { ids: favoritesFromCookie, ...DEFAULT_SEARCH_PARAMS },
          headers,
          transformRequest,
        })
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
  const favorites = useFavorites();

  const filters = React.useMemo(() => ({ ids: favorites.values }), [favorites]);

  return (
    <>
      <Head>
        <title>Superjob - Favorites</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {favorites.values.length !== 0 ? (
        <FavoritesList filters={filters} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Empty text={"Упс, здесь еще ничего нет!"} />

          <Link href="/">
            <Button variant="light" component="div" mt="40px">
              Поиск Вакансий
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
