import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

import Head from "next/head";
import lightThemeOptions from "@/styles/darkThemeOptions";
import createEmotionCache from "@/util/createEmotionCache";
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const darkTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no, user-scalable=0"
        />
        {/* <title>{"InRadius - Dashboard"}</title> */}
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
