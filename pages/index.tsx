import Head from "next/head";
import { MainTemplate } from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Youtube Profile</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <MainTemplate>
        <div>s</div>
      </MainTemplate>
    </>
  );
}
