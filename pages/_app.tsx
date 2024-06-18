import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";
import useGlobalStore from "@/store/global";
import Toast from "@/components/common/toast/toast";

function MyApp({ Component, pageProps }: AppProps) {
  const { toastData } = useGlobalStore();

  return (
    <>
      <NextNProgress color="#162CF1" />
      <Head>
        <link rel="shortcut icon" href="/LogoWhite.ico" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Component {...pageProps} />
      {toastData && <Toast message={toastData.message} type={toastData.type} />}
    </>
  );
}

export default MyApp;
