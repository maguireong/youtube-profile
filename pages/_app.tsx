import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import relativeTime from "dayjs/plugin/relativeTime.js";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
