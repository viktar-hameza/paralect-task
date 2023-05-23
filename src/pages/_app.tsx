import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { MantineProvider, ButtonStylesParams } from "@mantine/core";
import { FavoritesProvider } from "@/features/shared/components/FavoritesProvider";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "@/features/shared/components/Layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        fontFamily: inter.style.fontFamily,
        colors: {
          blue: [
            "#DEECFF",
            "#C9E0FF",
            "#B7D6FF",
            "#92C1FF",
            "#5E96FC",
            "#3B7CD3",
            "#228BE6",
            "#1C7ED6",
            "#1971C2",
            "#1864AB",
          ],
          greyScale: [
            "#FFFFFF",
            "#F5F5F5",
            "#EAEBED",
            "#D5D6DC",
            "#ACADB9",
            "#7B7C88",
            "#232134",
            "#495057",
            "#343A40",
            "#212529",
          ],
        },
        components: {
          Pagination: {
            styles: (theme) => ({
              control: {
                "&[data-active]": {
                  backgroundColor: theme.colors.blue[4],
                },
              },
            }),
          },
          Button: {
            styles: (theme, params: ButtonStylesParams, { variant }) => ({
              root: {
                fontSize: variant === "filled" ? "14px" : undefined,
                fontWeight: 500,
                borderRadius: "8px",
                backgroundColor:
                  variant === "filled" ? theme.colors.blue[4] : undefined,
                "&:hover": {
                  backgroundColor:
                    variant === "filled" ? theme.colors.blue[3] : undefined,
                },
                "&:active": {
                  backgroundColor:
                    variant === "filled" ? theme.colors.blue[6] : undefined,
                },
              },
            }),
          },
        },
      }}
    >
      <FavoritesProvider initialValue={pageProps.favorites}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </FavoritesProvider>
    </MantineProvider>
  );
}
