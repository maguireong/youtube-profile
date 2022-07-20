import Head from "next/head";
import { MainTemplate } from "../components";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Youtube Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full ">
        <MainTemplate />
      </main>
    </div>
  );
}
