// MyApp.tsx
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import localFont from "@next/font/local";
import "../styles/global.css";
import { getUserRole } from "@/util/auth";
import Sidebar from "@/components/sidebar/sidebar";
import Login from "@/pages/login"; // Import your Login component

const geologica = localFont({ src: "../public/fonts/geologica.ttf" });

function MyApp({ Component, pageProps }: AppProps) {
  const userRole = getUserRole();
  // const authenticated = isAuthenticated();
  const authenticated = true;

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

      {authenticated ? (
        <div className="flex">
          <Sidebar userRole={userRole} />
          <main className={geologica.className}>
            <Component {...pageProps} />
          </main>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
