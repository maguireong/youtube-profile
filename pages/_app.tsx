import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
// eslint-disable-next-line
import relativeTime from "dayjs/plugin/relativeTime.js";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ClientOnly } from "../components";
dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ClientOnly>
          <Component {...pageProps} />
        </ClientOnly>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
