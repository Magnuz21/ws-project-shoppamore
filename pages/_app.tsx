import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import Layout from "@/components/Layout";
import { Provider } from 'react-redux'
import { store, persistor } from "@/redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from "next-auth/react"
import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";
import { ThemeProvider } from "next-themes";

const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default function App({ Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
  <ThemeProvider enableSystem ={true}attribute="class">
  <Provider store={store}>
   <SessionProvider session={session}>
   <PersistGate loading={<LoadingSpinner/>} persistor={persistor}>
    <main className={`${open_sans.variable} font-open-sans`}>
    <Layout>
        <Component {...pageProps} />
    </Layout>
  </main>
    </PersistGate>
   </SessionProvider>
    </Provider>
    </ThemeProvider>
   
  );
}
