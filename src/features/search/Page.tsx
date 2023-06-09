import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, DehydratedState } from "@tanstack/react-query";

import { Grid } from "@mantine/core";

import { DEFAULT_SEARCH_PARAMS } from "@/features/shared/api/superjob/hooks";

import { getCatalogues, getVacancies } from "../shared/api/superjob/requests";

import { VacanciesList } from "@/features/search/components/VacanciesList";
import { SearchForm } from "./components/SearchForm";
import { FiltersToolbar } from "./components/FiltersToolbar";

import { getAuthAxiosConfig } from "../shared/helpers/auth";

import { ToolbarFilters } from "./types";

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async ({ req, res }) => {
  console.log("Search - getServerSideProps - START");

  const isFirstServerCall = !req?.url?.startsWith("/_next/data/");
  const queryClient = new QueryClient();
  const { headers, transformRequest } = getAuthAxiosConfig(req, res);

  if (isFirstServerCall) {
    await Promise.all([
      queryClient.prefetchQuery(["catalogues"], () =>
        getCatalogues({
          headers,
          transformRequest,
        })
      ),
      queryClient.prefetchQuery(
        ["vacancies", { ...DEFAULT_SEARCH_PARAMS }],
        () =>
          getVacancies({
            params: { ...DEFAULT_SEARCH_PARAMS },
            headers,
            transformRequest,
          })
      ),
    ]);
  }

  console.log("Search - getServerSideProps - END");

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      favorites: JSON.parse(req.cookies.favorites || "[]"),
    },
  };
};

export function Page() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [toolbarFilters, setToolbarFilters] = React.useState<ToolbarFilters>({
    catalogues: "",
    payment_from: 0,
    payment_to: 0,
  });

  const filters = React.useMemo(() => {
    return {
      keyword: searchQuery,
      catalogues: toolbarFilters.catalogues,
      currency: "rub",
      no_agreement:
        toolbarFilters.payment_from === 0 && toolbarFilters.payment_to === 0
          ? 0
          : 1,

      ...(toolbarFilters.payment_from === 0
        ? {}
        : { payment_from: toolbarFilters.payment_from }),

      ...(toolbarFilters.payment_to === 0
        ? {}
        : { payment_to: toolbarFilters.payment_to }),
    };
  }, [searchQuery, toolbarFilters]);

  return (
    <>
      <Head>
        <title>Superjob - Search</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid columns={10} gutter={28}>
        <Grid.Col md={3} sm={10}>
          <FiltersToolbar
            initialValue={{
              catalogues: "",
              payment_from: 0,
              payment_to: 0,
            }}
            onApply={setToolbarFilters}
            onClear={setToolbarFilters}
          />
        </Grid.Col>
        <Grid.Col md={7} sm={10}>
          <SearchForm initialValue={""} onSubmit={setSearchQuery} />
          <VacanciesList filters={filters} />
        </Grid.Col>
      </Grid>
    </>
  );
}
