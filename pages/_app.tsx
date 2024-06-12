// import React from "react";
// import { AppProps } from "next/app";
// import Head from "next/head";
// import NextNProgress from "nextjs-progressbar";
// import "../styles/globals.css";
// import localFont from "@next/font/local";
// import Layout from "@/components/layout";

// const geologica = localFont({ src: "../public/fonts/geologica.ttf" });

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <NextNProgress color="#162CF1" />
//       <Head>
//         <link rel="shortcut icon" href="/LogoWhite.ico" />
//         <meta
//           name="viewport"
//           content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no"
//         />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//       </Head>
//       <main className={geologica.className}>
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </main>
//     </>
//   );
// }

// export default MyApp;

// pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
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
    </>
  );
}

export default MyApp;
