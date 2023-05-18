import {
  DEFAULT_SEARCH_PARAMS,
  getVacancies,
  useSearch,
} from "@/features/shared/api/superjob/hooks";
import {
  DehydratedState,
  QueryClient,
  dehydrate,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async ({ params, req }) => {
  const isFirstServerCall = !req?.url?.startsWith("/_next/data/");
  const queryClient = new QueryClient();
  // console.log(req.url);
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
      getVacancies({ ids: [id] })
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useSearch(
    { ids: [Number(router.query.id)] },
    {
      enabled: !!router.query.id,
      // @ts-expect-error
      initialData: () => {
        const d = queryClient
          .getQueriesData(["vacancies"])
          ?.find(([, data]) => {
            console.log(data);
            // @ts-expect-error
            const vacancy = data.objects.find(
              // @ts-expect-error
              ({ id }) => id === Number(router.query.id)
            );
            return vacancy;
          });
        console.log("----", d);
        return {
          // @ts-expect-error
          ...d[1],
          // @ts-expect-error
          objects: d[1].objects.filter(
            // @ts-expect-error
            ({ id }) => id === Number(router.query.id)
          ),
        };
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
