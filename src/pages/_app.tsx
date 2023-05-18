import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { MantineProvider } from '@mantine/core';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from '@/features/shared/components/Layout/Layout';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
        fontFamily: inter.style.fontFamily,
        colors: {
          blue: [
            '#DEECFF',
            '#C9E0FF',
            '#B7D6FF',
            '#92C1FF',
            '#5E96FC',
            '#3B7CD3',
            '#228BE6',
            '#1C7ED6',
            '#1971C2',
            '#1864AB',
          ],
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>

          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </MantineProvider>
  );
}
