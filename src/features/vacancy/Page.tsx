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
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data?.objects[0].vacancyRichText || "",
      }}
    ></div>
  );
}
