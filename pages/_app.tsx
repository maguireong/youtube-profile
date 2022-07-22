import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import relativeTime from "dayjs/plugin/relativeTime.js";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
